/**
 * M-Pesa Integration Test Utilities
 * For testing and debugging M-Pesa functionality
 */

import { mpesaService } from './index'
import { STKPushRequest } from '@/types'

/**
 * Test M-Pesa integration with sandbox
 */
export class MpesaTestUtils {
  /**
   * Test OAuth token generation
   */
  static async testAuth(): Promise<void> {
    console.log('🧪 Testing M-Pesa OAuth authentication...')
    
    try {
      const token = await mpesaService.getAuthToken()
      console.log('✅ OAuth test successful')
      console.log('📋 Token preview:', token.substring(0, 20) + '...')
    } catch (error) {
      console.error('❌ OAuth test failed:', error)
      throw error
    }
  }

  /**
   * Test STK Push with sandbox test number
   */
  static async testSTKPush(orderId: string = 'TEST-ORDER-001'): Promise<void> {
    console.log('🧪 Testing M-Pesa STK Push...')
    
    try {
      const testRequest: STKPushRequest = {
        phoneNumber: '254708374149', // Sandbox test number
        amount: 100, // KES 1.00 in cents
        orderId,
        accountReference: orderId,
        transactionDesc: 'Test payment for shoes'
      }

      const response = await mpesaService.initiatePayment(testRequest)
      
      console.log('✅ STK Push test successful')
      console.log('📋 Response:', {
        checkoutRequestId: response.CheckoutRequestID,
        merchantRequestId: response.MerchantRequestID,
        responseCode: response.ResponseCode,
        customerMessage: response.CustomerMessage
      })

      return response
    } catch (error) {
      console.error('❌ STK Push test failed:', error)
      throw error
    }
  }

  /**
   * Test phone number validation
   */
  static testPhoneValidation(): void {
    console.log('🧪 Testing phone number validation...')
    
    const testNumbers = [
      '0708374149',    // Valid Kenyan format
      '708374149',     // Valid without leading 0
      '254708374149',  // Valid E.164 format
      '+254708374149', // Valid with +
      '0712345678',    // Valid Airtel
      '0701234567',    // Invalid - too short
      '1234567890',    // Invalid - not Kenyan
      '254812345678'   // Invalid - wrong network code
    ]

    testNumbers.forEach(number => {
      const isValid = mpesaService.validatePhoneNumber(number)
      const formatted = mpesaService.formatPhoneNumber(number)
      
      console.log(`📱 ${number} -> ${formatted} (${isValid ? '✅ Valid' : '❌ Invalid'})`)
    })
  }

  /**
   * Test system connectivity
   */
  static async testConnectivity(): Promise<void> {
    console.log('🧪 Testing M-Pesa system connectivity...')
    
    try {
      const result = await mpesaService.testConnectivity()
      
      if (result.success) {
        console.log('✅ Connectivity test passed')
        console.log('📋 Details:', result.details)
      } else {
        console.error('❌ Connectivity test failed:', result.message)
      }
    } catch (error) {
      console.error('❌ Connectivity test error:', error)
    }
  }

  /**
   * Get system status
   */
  static getSystemStatus(): void {
    console.log('🔍 M-Pesa System Status:')
    
    const status = mpesaService.getSystemStatus()
    
    console.log('🔐 Authentication:', {
      environment: status.auth.environment,
      baseUrl: status.auth.baseUrl,
      hasCredentials: status.auth.hasCredentials
    })
    
    console.log('💳 STK Push:', {
      environment: status.stkpush.environment,
      baseUrl: status.stkpush.baseUrl,
      shortcode: status.stkpush.shortcode,
      hasPasskey: status.stkpush.hasPasskey,
      hasCallbackUrl: status.stkpush.hasCallbackUrl
    })
    
    console.log('🎫 Token:', {
      hasToken: status.token.hasToken,
      isValid: status.token.isValid,
      expiresIn: status.token.expiresIn ? `${status.token.expiresIn}s` : 'N/A'
    })
  }

  /**
   * Run all tests
   */
  static async runAllTests(): Promise<void> {
    console.log('🧪 Running M-Pesa integration tests...\n')
    
    try {
      // System status
      this.getSystemStatus()
      console.log('\n' + '='.repeat(50) + '\n')
      
      // Phone validation
      this.testPhoneValidation()
      console.log('\n' + '='.repeat(50) + '\n')
      
      // Connectivity test
      await this.testConnectivity()
      console.log('\n' + '='.repeat(50) + '\n')
      
      // OAuth test
      await this.testAuth()
      console.log('\n' + '='.repeat(50) + '\n')
      
      // STK Push test (commented out to avoid accidental charges)
      // await this.testSTKPush()
      
      console.log('✅ All tests completed!')
      
    } catch (error) {
      console.error('❌ Test suite failed:', error)
    }
  }

  /**
   * Mock callback for testing
   */
  static getMockSuccessCallback(checkoutRequestId: string, merchantRequestId: string) {
    return {
      Body: {
        stkCallback: {
          MerchantRequestID: merchantRequestId,
          CheckoutRequestID: checkoutRequestId,
          ResultCode: 0,
          ResultDesc: "The service request is processed successfully.",
          CallbackMetadata: {
            Item: [
              { Name: "Amount", Value: 100 },
              { Name: "MpesaReceiptNumber", Value: "NLJ7RT61SV" },
              { Name: "TransactionDate", Value: 20231201143022 },
              { Name: "PhoneNumber", Value: 254708374149 }
            ]
          }
        }
      }
    }
  }

  /**
   * Mock failed callback for testing
   */
  static getMockFailedCallback(checkoutRequestId: string, merchantRequestId: string) {
    return {
      Body: {
        stkCallback: {
          MerchantRequestID: merchantRequestId,
          CheckoutRequestID: checkoutRequestId,
          ResultCode: 1032,
          ResultDesc: "Request cancelled by user"
        }
      }
    }
  }
}

// Export for use in development
export default MpesaTestUtils