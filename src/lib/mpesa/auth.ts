/**
 * M-Pesa Daraja API Authentication Service
 * Handles OAuth token generation and management
 */

interface TokenResponse {
  access_token: string
  expires_in: string
}

interface TokenCache {
  token: string
  expiresAt: number
}

class DarajaAuthService {
  private tokenCache: TokenCache | null = null
  private readonly baseUrl: string
  private readonly consumerKey: string
  private readonly consumerSecret: string

  constructor() {
    const environment = import.meta.env.VITE_MPESA_ENVIRONMENT || 'sandbox'
    
    // Determine base URL based on environment
    this.baseUrl = environment === 'production' 
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'
    
    this.consumerKey = import.meta.env.VITE_MPESA_CONSUMER_KEY || ''
    this.consumerSecret = import.meta.env.VITE_MPESA_CONSUMER_SECRET || ''
    
    if (!this.consumerKey || !this.consumerSecret) {
      console.warn('⚠️ M-Pesa credentials not found. Please check your environment variables.')
    }
  }

  /**
   * Generate OAuth access token
   */
  async generateToken(): Promise<string> {
    try {
      // Check if we have a valid cached token
      if (this.isTokenValid()) {
        console.log('🔄 Using cached M-Pesa token')
        return this.tokenCache!.token
      }

      console.log('🔑 Generating new M-Pesa OAuth token...')

      // Create Basic Auth header
      const credentials = btoa(`${this.consumerKey}:${this.consumerSecret}`)
      
      const response = await fetch(`${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`OAuth request failed: ${response.status} - ${errorText}`)
      }

      const data: TokenResponse = await response.json()
      
      if (!data.access_token) {
        throw new Error('No access token received from Daraja API')
      }

      // Cache the token (expires in 1 hour, we'll refresh 5 minutes early)
      const expiresIn = parseInt(data.expires_in) || 3600
      this.tokenCache = {
        token: data.access_token,
        expiresAt: Date.now() + (expiresIn - 300) * 1000 // 5 minutes buffer
      }

      console.log('✅ M-Pesa OAuth token generated successfully')
      return data.access_token

    } catch (error) {
      console.error('❌ Failed to generate M-Pesa token:', error)
      throw new Error(`M-Pesa authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Check if current token is valid
   */
  private isTokenValid(): boolean {
    if (!this.tokenCache) return false
    return Date.now() < this.tokenCache.expiresAt
  }

  /**
   * Force refresh token (useful for error recovery)
   */
  async refreshToken(): Promise<string> {
    console.log('🔄 Force refreshing M-Pesa token...')
    this.tokenCache = null
    return this.generateToken()
  }

  /**
   * Get current token status for debugging
   */
  getTokenStatus(): { hasToken: boolean; isValid: boolean; expiresIn?: number } {
    if (!this.tokenCache) {
      return { hasToken: false, isValid: false }
    }

    const isValid = this.isTokenValid()
    const expiresIn = isValid ? Math.floor((this.tokenCache.expiresAt - Date.now()) / 1000) : 0

    return {
      hasToken: true,
      isValid,
      expiresIn: isValid ? expiresIn : undefined
    }
  }

  /**
   * Clear token cache (useful for testing)
   */
  clearTokenCache(): void {
    this.tokenCache = null
    console.log('🗑️ M-Pesa token cache cleared')
  }

  /**
   * Get environment info
   */
  getEnvironmentInfo(): { environment: string; baseUrl: string; hasCredentials: boolean } {
    return {
      environment: import.meta.env.VITE_MPESA_ENVIRONMENT || 'sandbox',
      baseUrl: this.baseUrl,
      hasCredentials: !!(this.consumerKey && this.consumerSecret)
    }
  }
}

// Export singleton instance
export const darajaAuth = new DarajaAuthService()

// Export types
export type { TokenResponse, TokenCache }