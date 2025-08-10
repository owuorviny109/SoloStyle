import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('📞 M-Pesa callback received:', JSON.stringify(req.body, null, 2))

    const callback = req.body?.Body?.stkCallback

    if (!callback) {
      console.warn('⚠️ Invalid callback structure')
      return res.status(400).json({ error: 'Invalid callback structure' })
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata
    } = callback

    console.log('📋 Callback details:', {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc
    })

    if (ResultCode === 0) {
      // Payment successful
      console.log('✅ Payment successful!')
      
      if (CallbackMetadata?.Item) {
        const metadata = CallbackMetadata.Item
        const getMetadataValue = (name: string) => {
          const item = metadata.find((item: any) => item.Name === name)
          return item?.Value
        }

        const paymentDetails = {
          amount: getMetadataValue('Amount'),
          mpesaReceiptNumber: getMetadataValue('MpesaReceiptNumber'),
          transactionDate: getMetadataValue('TransactionDate'),
          phoneNumber: getMetadataValue('PhoneNumber')
        }

        console.log('💰 Payment details:', paymentDetails)
      }

      // TODO: Update order status in database
      // TODO: Send confirmation email/SMS
      
    } else {
      // Payment failed
      console.log('❌ Payment failed:', ResultDesc)
      
      // TODO: Update order status to failed
      // TODO: Release inventory reservation
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ 
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully'
    })

  } catch (error) {
    console.error('❌ Callback processing error:', error)
    
    // Still return 200 to avoid M-Pesa retries
    res.status(200).json({ 
      ResultCode: 1,
      ResultDesc: 'Callback processing failed'
    })
  }
}