# SoleStyle - Premium Shoes Store with M-Pesa Integration

A modern, responsive shoes e-commerce store built with React, TypeScript, and M-Pesa payment integration. This project demonstrates how to build a production-ready online store with secure payment processing using Safaricom's Daraja API.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **M-Pesa Integration**: Secure STK Push payments with Daraja API
- **Real-time Inventory**: Live stock management and reservation system
- **Shopping Cart**: Persistent cart with local storage
- **Order Management**: Complete order lifecycle tracking
- **Mobile Optimized**: PWA-ready with mobile-first design
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Payments**: M-Pesa Daraja API
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoes-store-mpesa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and M-Pesa credentials.

4. **Set up the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Copy your project URL and anon key to `.env`
3. Run the Prisma migrations to set up your database schema

### M-Pesa Daraja API Setup
1. Register at [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create a new app and get your credentials
3. Add your credentials to `.env`
4. Set up your callback URL (use ngrok for local development)

## 📱 M-Pesa Integration

This project demonstrates:
- OAuth token generation and management
- STK Push payment initiation
- Callback handling and order updates
- Error handling and retry logic
- Sandbox to production transition

### Payment Flow
1. Customer adds items to cart
2. Proceeds to checkout with phone number
3. STK Push sent to customer's phone
4. Customer enters M-Pesa PIN
5. Payment callback updates order status
6. Order confirmation sent to customer

## 🎨 Design System

The project includes a comprehensive design system with:
- Consistent color palette
- Typography scale
- Component library
- Animation patterns
- Responsive breakpoints

## 📚 Learning Objectives

This project teaches:
- M-Pesa payment integration from scratch
- Modern React development patterns
- TypeScript best practices
- State management with Zustand
- Database design with Prisma
- Responsive UI development
- Production deployment strategies

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Environment Variables for Production
- Update `MPESA_ENVIRONMENT` to `production`
- Use production M-Pesa credentials
- Set production callback URLs

## 📖 Documentation

- [M-Pesa Integration Guide](docs/mpesa-integration.md)
- [Database Schema](docs/database-schema.md)
- [API Documentation](docs/api-documentation.md)
- [Deployment Guide](docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Safaricom for the Daraja API
- Supabase for the backend infrastructure
- The React and TypeScript communities

---

**Note**: This is a learning project for M-Pesa integration. Always follow security best practices when handling real payments and customer data.