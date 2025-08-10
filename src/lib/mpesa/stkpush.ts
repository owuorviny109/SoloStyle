/**
 * M-Pesa STK Push Service
 * Handles payment initiation and request formatting
 */

import { darajaAuth } from './auth'
import { STKPushRequest, STKPushResponse } from '@/types'

interface STKPushPayload {
  BusinessShortCode: string
  Password: string
  Timestamp: string
  TransactionType: string
  Amount: string
  PartyA: string
  PartyB: string
  PhoneNumber: string
  CallBackURL: string
  AccountReference: string
  TransactionDesc: string
}

class STKPushService {
  private readonly baseUrl: string
  private readonly shortcode: string
  private readonly passkey: string
  private readonly callbackUrl: string

  constructor() {
    const environment = import.meta.env.VITE_MPESA_ENVIRONMENT || 'sandbox'
    
    this.baseUrl = environment === 'production' 
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'
    
    this.shortcode = import.meta.env.VITE_MPESA_SHORTCODE || '174379'
    this.passkey = import.meta.env.VITE_MPESA_PASSKEY || ''
    this.callbackUrl = import.meta.env.VITE_MPESA_CALLBACK_URL || ''
    
    if (!this.passkey) {
      console.warn('⚠️ M-Pesa passkey not found. Please check your environment variables.')
    }
    
    if (!this.callbackUrl) {
      console.warn('⚠️ M-Pesa callback URL not found. Please check your environment variables.')
    }
  }

  /**
   * Initiate STK Push payment
   */
  async initiatePayment(request: STKPushRequest): Promise<STKPushResponse> {
    try {
      console.log('💳 Initiating M-Pesa STK Push...', {
        phone: request.phoneNumber,
        amount: request.amount,
        orderId: request.orderId
      })

      // Validate request
      this.validateRequest(request)

      // Get OAuth token
      const accessToken = await darajaAuth.generateToken()

      // Generate timestamp and password
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword(timestamp)

      // Prepare STK Push payload
      const payload: STKPushPayload = {
        BusinessShortCode: this.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: request.amount.toString(),
        PartyA: request.phoneNumber,
        PartyB: this.shortcode,
        PhoneNumber: request.phoneNumber,
        CallBackURL: this.callbackUrl,
        AccountReference: request.accountReference,
        TransactionDesc: request.transactionDesc
      }

      console.log('📤 Sending STK Push request to Daraja API...')

      const response = await fetch(`${this.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const responseData = await response.json()

      if (!response.ok) {
        console.error('❌ STK Push request failed:', responseData)
        throw new Error(`STK Push failed: ${responseData.errorMessage || response.statusText}`)
      }

      // Check if the response indicates success
      if (responseData.ResponseCode !== '0') {
        console.error('❌ STK Push rejected:', responseData)
        throw new Error(`STK Push rejected: ${responseData.ResponseDescription || 'Unknown error'}`)
      }

      console.log('✅ STK Push initiated successfully:', {
        checkoutRequestId: responseData.CheckoutRequestID,
        merchantRequestId: responseData.MerchantRequestID
      })

      return {
        MerchantRequestID: responseData.MerchantRequestID,
        CheckoutRequestID: responseData.CheckoutRequestID,
        ResponseCode: responseData.ResponseCode,
        ResponseDescription: responseData.ResponseDescription,
        CustomerMessage: responseData.CustomerMessage
      }

    } catch (error) {
      console.error('❌ STK Push error:', error)
      throw new Error(`Payment initiation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Validate STK Push request
   */
  private validateRequest(request: STKPushRequest): void {
    if (!request.phoneNumber) {
      throw new Error('Phone number is required')
    }

    if (!this.isValidKenyanPhone(request.phoneNumber)) {
      throw new Error('Invalid Kenyan phone number format. Use 254XXXXXXXXX')
    }

    if (!request.amount || request.amount <= 0) {
      throw new Error('Amount must be greater than 0')
    }

    if (request.amount < 100) { // Minimum 1 KES
      throw new Error('Minimum amount is KES 1')
    }

    if (!request.orderId) {
      throw new Error('Order ID is required')
    }

    if (!request.accountReference) {
      throw new Error('Account reference is required')
    }

    if (!this.callbackUrl) {
      throw new Error('Callback URL not configured')
    }
  }

  /**
   * Validate Kenyan phone number format
   */
  private isValidKenyanPhone(phone: string): boolean {
    // Remove any spaces or special characters
    const cleaned = phone.replace(/[\s\-\(\)+]/g, '')
    
    // Check if it matches Kenyan format: 254XXXXXXXXX
    // Allow both Safaricom (254[17]) and other networks (254[0-9])
    const kenyanPhoneRegex = /^254[0-9]\d{8}$/
    return kenyanPhoneRegex.test(cleaned)
  }

  /**
   * Generate timestamp in required format: YYYYMMDDHHMMSS
   */
  private generateTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  /**
   * Generate password: Base64(Shortcode + Passkey + Timestamp)
   */
  private generatePassword(timestamp: string): string {
    const rawPassword = `${this.shortcode}${this.passkey}${timestamp}`
    return btoa(rawPassword)
  }

  /**
   * Format phone number to E.164 format
   */
  formatPhoneNumber(phone: string): string {
    // Remove any spaces, special characters, and + sign
    const cleaned = phone.replace(/[\s\-\(\)+]/g, '')
    
    // Convert to 254 format
    if (cleaned.startsWith('0')) {
      return `254${cleaned.slice(1)}`
    } else if (cleaned.startsWith('254')) {
      return cleaned
    } else if (cleaned.length === 9) {
      return `254${cleaned}`
    }
    
    return cleaned
  }

  /**
   * Get service configuration for debugging
   */
  getConfiguration(): {
    environment: string
    baseUrl: string
    shortcode: string
    hasPasskey: boolean
    hasCallbackUrl: boolean
  } {
    return {
      environment: import.meta.env.VITE_MPESA_ENVIRONMENT || 'sandbox',
      baseUrl: this.baseUrl,
      shortcode: this.shortcode,
      hasPasskey: !!this.passkey,
      hasCallbackUrl: !!this.callbackUrl
    }
  }
}

// Export singleton instance
export const stkPushService = new STKPushService()

// Export types
export type { STKPushPayload }