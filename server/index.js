import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// M-Pesa OAuth Token
app.post('/api/mpesa/auth', async (req, res) => {
  try {
    const consumerKey = process.env.VITE_MPESA_CONSUMER_KEY
    const consumerSecret = process.env.VITE_MPESA_CONSUMER_SECRET
    const environment = process.env.VITE_MPESA_ENVIRONMENT || 'sandbox'

    if (!consumerKey || !consumerSecret) {
      return res.status(500).json({ error: 'M-Pesa credentials not configured' })
    }

    const baseUrl = environment === 'production' 
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OAuth request failed:', errorText)
      return res.status(response.status).json({ error: 'Authentication failed' })
    }

    const data = await response.json()
    
    if (!data.access_token) {
      return res.status(500).json({ error: 'No access token received' })
    }

    console.log('✅ M-Pesa OAuth token generated successfully')
    
    res.json({
      access_token: data.access_token,
      expires_in: data.expires_in
    })

  } catch (error) {
    console.error('❌ OAuth error:', error)
    res.status(500).json({ 
      error: 'Authentication failed',
      message: error.message
    })
  }
})

// M-Pesa STK Push
app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { phoneNumber, amount, orderId, accountReference, transactionDesc } = req.body

    if (!phoneNumber || !amount || !orderId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const consumerKey = process.env.VITE_MPESA_CONSUMER_KEY
    const consumerSecret = process.env.VITE_MPESA_CONSUMER_SECRET
    const shortcode = process.env.VITE_MPESA_SHORTCODE || '174379'
    const passkey = process.env.VITE_MPESA_PASSKEY
    const callbackUrl = process.env.VITE_MPESA_CALLBACK_URL
    const environment = process.env.VITE_MPESA_ENVIRONMENT || 'sandbox'

    if (!consumerKey || !consumerSecret || !passkey || !callbackUrl) {
      return res.status(500).json({ error: 'M-Pesa configuration incomplete' })
    }

    const baseUrl = environment === 'production' 
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'

    // Get OAuth token
    console.log('🔑 Getting M-Pesa OAuth token...')
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const authResponse = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    })

    if (!authResponse.ok) {
      const errorText = await authResponse.text()
      console.error('❌ OAuth failed:', errorText)
      return res.status(500).json({ error: 'Authentication failed' })
    }

    const authData = await authResponse.json()
    const accessToken = authData.access_token

    if (!accessToken) {
      return res.status(500).json({ error: 'No access token received' })
    }

    console.log('✅ OAuth token received')

    // Generate STK Push parameters
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

    // Send STK Push
    console.log('💳 Sending STK Push request...')
    console.log('📱 Phone number being sent to M-Pesa:', phoneNumber)
    
    const stkPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount.toString(),
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    }

    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkPayload)
    })

    const stkData = await stkResponse.json()

    if (!stkResponse.ok) {
      console.error('❌ STK Push failed:', stkData)
      return res.status(500).json({ 
        error: 'STK Push failed',
        details: stkData
      })
    }

    if (stkData.ResponseCode !== '0') {
      console.error('❌ STK Push rejected:', stkData)
      return res.status(400).json({
        error: 'STK Push rejected',
        message: stkData.ResponseDescription
      })
    }

    console.log('✅ STK Push successful:', {
      checkoutRequestId: stkData.CheckoutRequestID,
      merchantRequestId: stkData.MerchantRequestID
    })

    res.json({
      MerchantRequestID: stkData.MerchantRequestID,
      CheckoutRequestID: stkData.CheckoutRequestID,
      ResponseCode: stkData.ResponseCode,
      ResponseDescription: stkData.ResponseDescription,
      CustomerMessage: stkData.CustomerMessage
    })

  } catch (error) {
    console.error('❌ STK Push error:', error)
    res.status(500).json({ 
      error: 'Payment initiation failed',
      message: error.message
    })
  }
})

// M-Pesa Callback
app.post('/api/mpesa/callback', (req, res) => {
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
      console.log('✅ Payment successful!')
      
      if (CallbackMetadata?.Item) {
        const metadata = CallbackMetadata.Item
        const getMetadataValue = (name) => {
          const item = metadata.find((item) => item.Name === name)
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
    } else {
      console.log('❌ Payment failed:', ResultDesc)
    }

    res.json({ 
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully'
    })

  } catch (error) {
    console.error('❌ Callback processing error:', error)
    res.json({ 
      ResultCode: 1,
      ResultDesc: 'Callback processing failed'
    })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 M-Pesa API server running on http://localhost:${PORT}`)
  console.log(`📱 Callback URL: http://localhost:${PORT}/api/mpesa/callback`)
})