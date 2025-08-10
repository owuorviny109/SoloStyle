import type { VercelRequest, VercelResponse } from '@vercel/node'

interface STKPushRequest {
  phoneNumber: string
  amount: number
  orderId: string
  accountReference: string
  transactionDesc: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { phoneNumber, amount, orderId, accountReference, transactionDesc }: STKPushRequest = req.body

    // Validate request
    if (!phoneNumber || !amount || !orderId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Get environment variables
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

    // Step 1: Get OAuth token
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

    // Step 2: Generate STK Push parameters
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

    // Step 3: Send STK Push
    console.log('💳 Sending STK Push request...')
    
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

    res.status(200).json({
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
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}