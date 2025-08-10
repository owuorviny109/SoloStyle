import type { VercelRequest, VercelResponse } from '@vercel/node'

interface TokenResponse {
  access_token: string
  expires_in: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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

    // Create Basic Auth header
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

    const data: TokenResponse = await response.json()
    
    if (!data.access_token) {
      return res.status(500).json({ error: 'No access token received' })
    }

    console.log('✅ M-Pesa OAuth token generated successfully')
    
    res.status(200).json({
      access_token: data.access_token,
      expires_in: data.expires_in
    })

  } catch (error) {
    console.error('❌ OAuth error:', error)
    res.status(500).json({ 
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}