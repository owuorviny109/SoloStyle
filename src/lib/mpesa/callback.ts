/**
 * M-Pesa Callback Handler
 * Processes payment results from Daraja API
 */

import { PaymentCallback, PaymentResult } from '@/types'
import { prisma } from '../prisma'
import { inventoryService } from '../inventory'

interface CallbackMetadataItem {
  Name: string
  Value: string | number
}

class CallbackService {
  /**
   * Process M-Pesa payment callback
   */
  async processCallback(payload: PaymentCallback): Promise<void> {
    try {
      console.log('📞 Processing M-Pesa callback...', {
        checkoutRequestId: payload.Body.stkCallback.CheckoutRequestID,
        resultCode: payload.Body.stkCallback.ResultCode
      })

      const callback = payload.Body.stkCallback
      const checkoutRequestId = callback.CheckoutRequestID
      const resultCode = callback.ResultCode

      // Find the order associated with this checkout request
      const order = await prisma.order.findUnique({
        where: { mpesaCheckoutId: checkoutRequestId },
        include: { items: true }
      })

      if (!order) {
        console.warn('⚠️ No order found for checkout request:', checkoutRequestId)
        // Log the event but don't fail - this might be a duplicate callback
        await this.logPaymentEvent(checkoutRequestId, 'callback_received_unknown', payload, resultCode, callback.ResultDesc)
        return
      }

      // Extract payment result
      const paymentResult = this.extractPaymentResult(callback)

      // Log the payment event
      await this.logPaymentEvent(order.id, 'callback_received', payload, resultCode, callback.ResultDesc)

      // Process based on result code
      if (resultCode === 0) {
        // Payment successful
        await this.handleSuccessfulPayment(order, paymentResult)
      } else {
        // Payment failed
        await this.handleFailedPayment(order, paymentResult)
      }

      console.log('✅ Callback processed successfully')

    } catch (error) {
      console.error('❌ Error processing callback:', error)
      throw error
    }
  }

  /**
   * Handle successful payment
   */
  private async handleSuccessfulPayment(order: any, paymentResult: PaymentResult): Promise<void> {
    try {
      console.log('💰 Processing successful payment for order:', order.orderNumber)

      await prisma.$transaction(async (tx) => {
        // Update order status
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: 'PAID',
            paymentStatus: 'COMPLETED',
            mpesaReceiptNumber: paymentResult.mpesaReceiptNumber,
            paidAt: paymentResult.transactionDate || new Date()
          }
        })

        // Confirm stock sales for all items
        for (const item of order.items) {
          await inventoryService.confirmSale(item.variantId, item.quantity)
        }

        // Log success event
        await tx.paymentEvent.create({
          data: {
            orderId: order.id,
            eventType: 'payment_completed',
            payload: { paymentResult },
            resultCode: 0,
            resultDesc: 'Payment completed successfully'
          }
        })
      })

      console.log('✅ Payment processed successfully:', {
        orderId: order.id,
        receiptNumber: paymentResult.mpesaReceiptNumber,
        amount: paymentResult.amount
      })

      // TODO: Send confirmation email/SMS to customer
      // TODO: Trigger order fulfillment process

    } catch (error) {
      console.error('❌ Error handling successful payment:', error)
      throw error
    }
  }

  /**
   * Handle failed payment
   */
  private async handleFailedPayment(order: any, paymentResult: PaymentResult): Promise<void> {
    try {
      console.log('❌ Processing failed payment for order:', order.orderNumber)

      await prisma.$transaction(async (tx) => {
        // Update order status
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: 'FAILED',
            paymentStatus: 'FAILED'
          }
        })

        // Release stock reservations for all items
        // Note: We'll need to implement session-based reservations for this
        // For now, we'll just log the failure

        // Log failure event
        await tx.paymentEvent.create({
          data: {
            orderId: order.id,
            eventType: 'payment_failed',
            payload: { paymentResult },
            resultCode: paymentResult.resultCode,
            resultDesc: paymentResult.resultDescription
          }
        })
      })

      console.log('❌ Payment failed:', {
        orderId: order.id,
        resultCode: paymentResult.resultCode,
        reason: paymentResult.resultDescription
      })

      // TODO: Send failure notification to customer
      // TODO: Release inventory reservations

    } catch (error) {
      console.error('❌ Error handling failed payment:', error)
      throw error
    }
  }

  /**
   * Extract payment result from callback metadata
   */
  private extractPaymentResult(callback: any): PaymentResult {
    const resultCode = callback.ResultCode
    const resultDescription = callback.ResultDesc
    const success = resultCode === 0

    if (!success) {
      return {
        success: false,
        resultCode,
        resultDescription
      }
    }

    // Extract metadata for successful payments
    const metadata = callback.CallbackMetadata?.Item || []
    const getMetadataValue = (name: string): string | number | undefined => {
      const item = metadata.find((item: CallbackMetadataItem) => item.Name === name)
      return item?.Value
    }

    return {
      success: true,
      mpesaReceiptNumber: getMetadataValue('MpesaReceiptNumber') as string,
      transactionDate: this.parseTransactionDate(getMetadataValue('TransactionDate') as number),
      phoneNumber: getMetadataValue('PhoneNumber') as string,
      amount: getMetadataValue('Amount') as number,
      resultCode,
      resultDescription
    }
  }

  /**
   * Parse M-Pesa transaction date
   */
  private parseTransactionDate(timestamp: number): Date | undefined {
    if (!timestamp) return undefined
    
    try {
      // M-Pesa timestamp is in format: YYYYMMDDHHMMSS
      const timestampStr = timestamp.toString()
      if (timestampStr.length !== 14) return undefined

      const year = parseInt(timestampStr.substr(0, 4))
      const month = parseInt(timestampStr.substr(4, 2)) - 1 // Month is 0-indexed
      const day = parseInt(timestampStr.substr(6, 2))
      const hour = parseInt(timestampStr.substr(8, 2))
      const minute = parseInt(timestampStr.substr(10, 2))
      const second = parseInt(timestampStr.substr(12, 2))

      return new Date(year, month, day, hour, minute, second)
    } catch (error) {
      console.warn('⚠️ Failed to parse transaction date:', timestamp)
      return undefined
    }
  }

  /**
   * Log payment event for audit trail
   */
  private async logPaymentEvent(
    orderIdOrCheckoutId: string,
    eventType: string,
    payload: any,
    resultCode: number,
    resultDesc: string
  ): Promise<void> {
    try {
      await prisma.paymentEvent.create({
        data: {
          orderId: orderIdOrCheckoutId,
          eventType,
          payload,
          resultCode,
          resultDesc
        }
      })
    } catch (error) {
      console.error('❌ Failed to log payment event:', error)
      // Don't throw - logging failure shouldn't break callback processing
    }
  }

  /**
   * Validate callback payload structure
   */
  validateCallback(payload: any): boolean {
    try {
      return !!(
        payload?.Body?.stkCallback?.CheckoutRequestID &&
        payload?.Body?.stkCallback?.MerchantRequestID &&
        typeof payload?.Body?.stkCallback?.ResultCode === 'number'
      )
    } catch {
      return false
    }
  }

  /**
   * Get callback processing statistics
   */
  async getCallbackStats(): Promise<{
    totalCallbacks: number
    successfulPayments: number
    failedPayments: number
    unknownCallbacks: number
  }> {
    const stats = await prisma.paymentEvent.groupBy({
      by: ['eventType'],
      _count: true
    })

    const getCount = (eventType: string) => 
      stats.find(s => s.eventType === eventType)?._count || 0

    return {
      totalCallbacks: getCount('callback_received'),
      successfulPayments: getCount('payment_completed'),
      failedPayments: getCount('payment_failed'),
      unknownCallbacks: getCount('callback_received_unknown')
    }
  }
}

// Export singleton instance
export const callbackService = new CallbackService()

// Export types
export type { CallbackMetadataItem }