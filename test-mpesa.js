/**
 * Quick M-Pesa Integration Test
 * Run this to test your Daraja API credentials
 */

// Simple test using fetch to avoid module issues
async function testMpesaAuth() {
  console.log('🚀 Testing M-Pesa OAuth Authentication...\n')
  
  const consumerKey = 'YNDGJpcIr1LC9D9jzMG8kRZQPjslgEAcnast3qFEblx3Y4hL'
  const consumerSecret = 'FTSHHoutke9RIGCC87CWmbwxcqyeQ1mfkB9bH1Ait06PVfH1krnexh48CYLrIQTr'
  
  try {
    // Create Basic Auth header
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    console.log('🔑 Requesting OAuth token from Daraja API...')
    
    const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    
    if (response.ok && data.access_token) {
      console.log('✅ OAuth test successful!')
      console.log('📋 Token preview:', data.access_token.substring(0, 20) + '...')
      console.log('⏰ Expires in:', data.expires_in, 'seconds')
      console.log('\n🎉 Your M-Pesa credentials are working correctly!')
      console.log('🚀 Ready to proceed with Task 4!')
    } else {
      console.error('❌ OAuth test failed:')
      console.error('Response:', data)
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('1. Check your internet connection')
    console.log('2. Verify your credentials are correct')
    console.log('3. Make sure your Daraja app is active')
  }
}

// Test phone number validation
function testPhoneValidation() {
  console.log('\n📱 Testing phone number formats:')
  
  const testNumbers = [
    '0708374149',    // Valid Kenyan format
    '708374149',     // Valid without leading 0
    '254708374149',  // Valid E.164 format
    '+254708374149', // Valid with +
    '0712345678',    // Valid Airtel
    '0701234567',    // Invalid - too short
  ]
  
  testNumbers.forEach(number => {
    // Simple validation
    const cleaned = number.replace(/[\s\-\(\)+]/g, '')
    let formatted = cleaned
    
    if (cleaned.startsWith('0')) {
      formatted = `254${cleaned.slice(1)}`
    } else if (!cleaned.startsWith('254') && cleaned.length === 9) {
      formatted = `254${cleaned}`
    }
    
    const isValid = /^254[17]\d{8}$/.test(formatted)
    console.log(`   ${number} -> ${formatted} (${isValid ? '✅ Valid' : '❌ Invalid'})`)
  })
}

// Run tests
async function runTests() {
  console.log('🧪 M-Pesa Integration Test Suite\n')
  console.log('=' .repeat(50))
  
  // Test phone validation
  testPhoneValidation()
  
  console.log('\n' + '='.repeat(50))
  
  // Test OAuth
  await testMpesaAuth()
}

runTests()