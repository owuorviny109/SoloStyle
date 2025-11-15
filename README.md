# SoleStyle - Professional E-commerce Platform

A modern, professional e-commerce platform for premium footwear with integrated M-Pesa payment processing. Built with React, TypeScript, and Tailwind CSS to deliver a business-grade shopping experience.

## Features

### E-commerce Platform
- **Professional Design** - Clean, business-focused interface inspired by leading e-commerce sites
- **Product Catalog** - Comprehensive shoe collection from top brands
- **Shopping Cart** - Persistent cart with real-time updates
- **Secure Checkout** - M-Pesa integration for Kenyan customers
- **Order Management** - Complete order tracking and confirmation system
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Technical Implementation
- **React 18 + TypeScript** - Modern frontend with type safety
- **Tailwind CSS** - Professional styling with custom design system
- **Express.js API** - Robust backend for payment processing
- **State Management** - Zustand for efficient state handling
- **Form Validation** - React Hook Form with Zod schemas
- **M-Pesa Integration** - Complete Daraja API implementation

## Platform Overview

### Product Catalog
- **Premium Footwear** - Curated selection of Nike, Adidas, Puma, Vans, and Converse
- **Detailed Product Pages** - High-quality images, descriptions, and sizing options
- **Category Navigation** - Easy browsing by brand and shoe type
- **Search Functionality** - Quick product discovery

### User Experience
- **Professional Interface** - Clean, modern design without distracting elements
- **Intuitive Navigation** - Clear menu structure and user flows
- **Mobile Optimized** - Seamless experience across all devices
- **Fast Performance** - Optimized loading and smooth interactions

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

## Platform Statistics

- **Complete Product Catalog** - 12 premium shoe models
- **Multi-Brand Support** - Nike, Adidas, Puma, Vans, Converse
- **Full Page Coverage** - Home, Products, About, Contact, Account, Legal pages
- **Mobile Responsive** - 100% compatibility across devices
- **Payment Integration** - Full M-Pesa implementation for Kenya
- **Professional Design** - Business-grade user interface

## Technology Stack

### Frontend
- **React 18** - Modern component-based architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Professional styling framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side navigation
- **Zustand** - Lightweight state management

### Backend
- **Express.js** - RESTful API server
- **M-Pesa Daraja API** - Payment processing
- **Environment Management** - Secure configuration
- **Error Handling** - Robust error management
- **Webhook Processing** - Real-time payment callbacks

### Development & Deployment
- **Vite** - Fast development build tool
- **Vercel** - Production deployment platform
- **Git** - Version control
- **TypeScript** - Development tooling

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- M-Pesa Sandbox credentials (for payment testing)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/solestyle.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your M-Pesa credentials

# Start development server
npm run dev
```

### Environment Setup
```bash
# M-Pesa Configuration
VITE_MPESA_ENVIRONMENT=sandbox
VITE_MPESA_CONSUMER_KEY=your_key
VITE_MPESA_CONSUMER_SECRET=your_secret
VITE_MPESA_SHORTCODE=174379
VITE_MPESA_PASSKEY=your_passkey
```

## Production Deployment

The platform is production-ready and can be deployed to Vercel, Netlify, or any modern hosting platform.

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Contributing

This is a professional e-commerce platform. Contributions are welcome for:
- Performance improvements
- UI/UX enhancements
- Additional payment methods
- Feature additions

## License

MIT License - see LICENSE file for details.

---

**SoleStyle** - Professional footwear e-commerce platform for the Kenyan market.