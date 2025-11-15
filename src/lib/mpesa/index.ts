/**
 * M-Pesa Integration - Main Export
 * Provides a unified interface for all M-Pesa operations
 */

import { darajaAuth } from './auth'
import { stkPushService } from './stkpush'
import { callbackService } from './callback'
import { STKPushRequest, STKPushResponse, PaymentCallback } from '@/types'

/**
 * Main M-Pesa service class that orchestrates all payment operations
 */
class MpesaService {
  /**
   * Initialize M-Pesa payment
   */
  async initiatePayment(request: STKPushRequest): Promise<STKPushResponse> {
    console.log('🚀 Starting M-Pesa payment process...')

    try {
      // Format phone number
      const formattedPhone = stkPushService.formatPhoneNumber(request.phoneNumber)

      const formattedRequest = {
        ...request,
        phoneNumber: formattedPhone
      }

      // Initiate STK Push
      const response = await stkPushService.initiatePayment(formattedRequest)

      console.log('✅ M-Pesa payment initiated successfully')
      return response

    } catch (error) {
      console.error('❌ M-Pesa payment initiation failed:', error)
      throw error
    }
  }

  /**
   * Process payment callback
   */
  async processCallback(payload: PaymentCallback): Promise<void> {
    console.log('📞 Processing M-Pesa callback...')

    try {
      // Validate callback structure
      if (!callbackService.validateCallback(payload)) {
        throw new Error('Invalid callback payload structure')
      }

      await callbackService.processCallback(payload)
      console.log('✅ Callback processed successfully')

    } catch (error) {
      console.error('❌ Callback processing failed:', error)
      throw error
    }
  }

  /**
   * Get OAuth token (for testing/debugging)
   */
  async getAuthToken(): Promise<string> {
    return darajaAuth.generateToken()
  }

  /**
   * Refresh OAuth token
   */
  async refreshAuthToken(): Promise<string> {
    return darajaAuth.refreshToken()
  }

  /**
   * Get system status and configuration
   */
  getSystemStatus(): {
    auth: ReturnType<typeof darajaAuth.getEnvironmentInfo>
    stkpush: ReturnType<typeof stkPushService.getConfiguration>
    token: ReturnType<typeof darajaAuth.getTokenStatus>
  } {
    return {
      auth: darajaAuth.getEnvironmentInfo(),
      stkpush: stkPushService.getConfiguration(),
      token: darajaAuth.getTokenStatus()
    }
  }

  /**
   * Test M-Pesa connectivity (sandbox only)
   */
  async testConnectivity(): Promise<{
    success: boolean
    message: string
    details?: any
  }> {
    try {
      const status = this.getSystemStatus()

      if (!status.auth.hasCredentials) {
        return {
          success: false,
          message: 'M-Pesa credentials not configured'
        }
      }

      // Try to get a token
      const token = await this.getAuthToken()

      return {
        success: true,
        message: 'M-Pesa connectivity test successful',
        details: {
          environment: status.auth.environment,
          tokenLength: token.length,
          hasToken: !!token
        }
      }

    } catch (error) {
      return {
        success: false,
        message: `Connectivity test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: { error }
      }
    }
  }

  /**
   * Format phone number for M-Pesa
   */
  formatPhoneNumber(phone: string): string {
    return stkPushService.formatPhoneNumber(phone)
  }

  /**
   * Validate phone number format
   */
  validatePhoneNumber(phone: string): boolean {
    try {
      const formatted = this.formatPhoneNumber(phone)
      const kenyanPhoneRegex = /^254[17]\d{8}$/
      return kenyanPhoneRegex.test(formatted)
    } catch {
      return false
    }
  }

  /**
   * Get callback statistics
   */
  async getCallbackStats() {
    return callbackService.getCallbackStats()
  }
}

// Export singleton instance
export const mpesaService = new MpesaService()

// Re-export individual services for advanced usage
export { darajaAuth, stkPushService, callbackService }

// Re-export types
export type { STKPushRequest, STKPushResponse, PaymentCallback }