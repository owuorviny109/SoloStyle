// Simple test script to verify M-Pesa API endpoints
async function testMpesaAuth() {
  try {
    console.log('🔑 Testing M-Pesa Auth endpoint...')
    
    const response = await fetch('http://localhost:3001/api/mpesa/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Auth test failed:', response.status, errorText)
      return false
    }

    const data = await response.json()
    console.log('✅ Auth test successful:', {
      hasAccessToken: !!data.access_token,
      expiresIn: data.expires_in
    })
    
    return true
  } catch (error) {
    console.error('❌ Auth test error:', error.message)
    return false
  }
}

async function testMpesaSTKPush() {
  try {
    console.log('💳 Testing M-Pesa STK Push endpoint...')
    
    const testPayload = {
      phoneNumber: '254708374149',
      amount: 1,
      orderId: 'TEST-' + Date.now(),
      accountReference: 'TEST-ORDER',
      transactionDesc: 'Test payment'
    }

    const response = await fetch('http://localhost:3001/api/mpesa/stkpush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload)
    })

    const data = await response.json()
    
    if (!response.ok) {
      console.error('❌ STK Push test failed:', response.status, data)
      return false
    }

    console.log('✅ STK Push test successful:', {
      responseCode: data.ResponseCode,
      merchantRequestId: data.MerchantRequestID,
      checkoutRequestId: data.CheckoutRequestID,
      customerMessage: data.CustomerMessage
    })
    
    return true
  } catch (error) {
    console.error('❌ STK Push test error:', error.message)
    return false
  }
}

async function runTests() {
  console.log('🚀 Starting M-Pesa API tests...\n')
  
  // Wait a moment for server to be ready
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const authSuccess = await testMpesaAuth()
  console.log('')
  
  if (authSuccess) {
    await testMpesaSTKPush()
  } else {
    console.log('⏭️ Skipping STK Push test due to auth failure')
  }
  
  console.log('\n🏁 Tests completed')
}

runTests()