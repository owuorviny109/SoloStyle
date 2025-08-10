# M-Pesa E-commerce Integration Learning Project

A hands-on learning project demonstrating M-Pesa payment integration in a modern React e-commerce application. Built to understand Safaricom's Daraja API implementation and real-world payment processing.

## Learning Goals Achieved

### M-Pesa Integration Mastery
- **OAuth Token Management** - Automated token generation and refresh
- **STK Push Implementation** - Customer-initiated payments via phone
- **Callback Handling** - Real-time payment status updates
- **Error Handling** - Robust payment failure management
- **Sandbox Testing** - Complete testing environment setup

### Technical Skills Developed
- **React 18 + TypeScript** - Modern frontend development
- **Express.js API** - Backend payment processing
- **State Management** - Zustand for cart and order state
- **Form Validation** - React Hook Form + Zod schemas
- **Responsive Design** - Mobile-first Tailwind CSS
- **Production Deployment** - Vercel deployment with environment variables

## What Was Built

### Core Features
- **12-Product Catalog** - Nike, Adidas, Puma, Vans, Converse shoes
- **Shopping Cart** - Add/remove items with persistent storage
- **M-Pesa Checkout** - Complete payment flow with phone verification
- **Order Management** - Order tracking and confirmation system
- **Responsive UI** - Works on desktop, tablet, and mobile

### Technical Architecture
```
Frontend (React/TypeScript)
├── Product Catalog & Cart
├── Checkout Form & Validation
└── Payment Status Tracking

Backend (Express.js)
├── M-Pesa OAuth Handler
├── STK Push API
└── Payment Callback Processor

M-Pesa Integration
├── Sandbox Environment
├── Real Phone Testing
└── Payment Confirmation Flow
```

## Key Technical Implementations

### M-Pesa Payment Flow
```javascript
// 1. Generate OAuth Token
const token = await generateOAuthToken()

// 2. Initiate STK Push
const stkResponse = await initiateSTKPush({
  phoneNumber: '254708374149',
  amount: 1200,
  orderId: 'ORD-123'
})

// 3. Handle Callback
app.post('/api/mpesa/callback', (req, res) => {
  const { ResultCode, CallbackMetadata } = req.body.Body.stkCallback
  // Process payment result
})
```

### Phone Number Validation
```javascript
// Kenyan phone number formatting
const formatPhoneNumber = (phone) => {
  if (phone.startsWith('0')) return `254${phone.slice(1)}`
  if (phone.startsWith('254')) return phone
  return `254${phone}`
}
```

### Environment Configuration
```bash
# M-Pesa Sandbox Credentials
VITE_MPESA_ENVIRONMENT=sandbox
VITE_MPESA_CONSUMER_KEY=your_consumer_key
VITE_MPESA_CONSUMER_SECRET=your_consumer_secret
VITE_MPESA_SHORTCODE=174379
VITE_MPESA_PASSKEY=your_passkey
VITE_MPESA_CALLBACK_URL=your_callback_url
```

## M-Pesa Integration Learnings

### Key Discoveries
1. **Sandbox Behavior** - Test numbers return hardcoded responses
2. **Callback Timing** - Callbacks can take 5-30 seconds
3. **Error Codes** - Different failure scenarios require specific handling
4. **Phone Formats** - Must use 254XXXXXXXXX format
5. **Token Expiry** - OAuth tokens expire every hour

### Common Challenges Solved
- **CORS Issues** - Proper Express server setup
- **Environment Variables** - Vite vs Node.js environment handling
- **Callback URLs** - Local development with ngrok
- **Phone Validation** - Kenyan number format requirements
- **Payment Polling** - Frontend status checking implementation

## Deployment Process

### Local Development
```bash
# Start both frontend and backend
npm run dev:full

# Or separately
npm run dev:server  # Express API on :3001
npm run dev         # Vite frontend on :3000
```

### Production Deployment
```bash
# Deploy to Vercel
npx vercel --prod

# Add environment variables in Vercel dashboard
# Update callback URL to production domain
```

## Project Metrics

- **12 Products** - Complete shoe catalog
- **5 Brands** - Nike, Adidas, Puma, Vans, Converse
- **3 Pages** - Home, About, Contact with modern design
- **100% Mobile Responsive** - Works on all devices
- **Real M-Pesa Testing** - Actual payment integration

## Skills Demonstrated

### Frontend Development
- Modern React patterns and hooks
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Form handling and validation
- State management with Zustand

### Backend Development
- Express.js API development
- M-Pesa API integration
- Environment variable management
- Error handling and logging
- Webhook/callback processing

### DevOps & Deployment
- Git version control
- Vercel deployment
- Environment configuration
- Production vs development setup

## Live Demo

**Production URL**: https://mpesa-ecommerce-blueprint.vercel.app/

Test the complete M-Pesa integration flow:
1. Browse products and add to cart
2. Proceed to checkout
3. Enter Kenyan phone number (use 0708374149 for sandbox)
4. Complete M-Pesa payment flow

## Next Steps for Production

- [ ] Add user authentication
- [ ] Implement order history
- [ ] Add inventory management
- [ ] Set up email notifications
- [ ] Add analytics tracking
- [ ] Implement proper error logging
- [ ] Add unit and integration tests

---

**Learning Focus**: This project prioritizes understanding M-Pesa integration patterns, modern React development, and production deployment workflows over complex business logic.