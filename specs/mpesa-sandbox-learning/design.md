# Design Document - Production-Ready Shoes E-commerce Platform

## Overview

This design outlines a **simple but functional shoes e-commerce store** focused on mastering M-Pesa payment integration. The architecture prioritizes learning the complete payment flow from STK Push initiation to callback handling, while building a real store that you can actually use and potentially sell.

The system emphasizes clear, understandable code patterns for M-Pesa integration, proper error handling, inventory management, and order processing. The frontend features a **modern, premium UI design** with smooth animations, professional styling, and mobile-first responsive design that rivals top e-commerce sites like Nike, Adidas, or Zalando.

## Highly Scalable System Architecture

```mermaid
graph TB
    subgraph "Global CDN Layer"
        CDN1[Cloudflare CDN] --> CDN2[Edge Caching]
        CDN2 --> CDN3[Image Optimization]
    end
    
    subgraph "Load Balancer & API Gateway"
        LB[Load Balancer] --> AG[API Gateway]
        AG --> RL[Rate Limiting]
        RL --> AUTH[Auth Middleware]
    end
    
    subgraph "Microservices Architecture"
        MS1[Product Service] --> MS2[Inventory Service]
        MS2 --> MS3[Order Service]
        MS3 --> MS4[Payment Service]
        MS4 --> MS5[Customer Service]
        MS5 --> MS6[Notification Service]
        MS6 --> MS7[Analytics Service]
    end
    
    subgraph "Caching Layer"
        REDIS1[Redis Cluster] --> REDIS2[Session Cache]
        REDIS2 --> REDIS3[Product Cache]
        REDIS3 --> REDIS4[Inventory Cache]
    end
    
    subgraph "Database Cluster"
        DB1[Primary Database] --> DB2[Read Replicas]
        DB2 --> DB3[Analytics DB]
        DB3 --> DB4[Archive DB]
    end
    
    subgraph "Message Queue System"
        MQ1[Event Bus] --> MQ2[Order Queue]
        MQ2 --> MQ3[Payment Queue]
        MQ3 --> MQ4[Notification Queue]
        MQ4 --> MQ5[Analytics Queue]
    end
    
    subgraph "External Services"
        EXT1[M-Pesa Daraja API]
        EXT2[Email/SMS Providers]
        EXT3[Search Engine (Elasticsearch)]
        EXT4[File Storage (S3)]
        EXT5[Monitoring (DataDog)]
    end
    
    CDN1 --> LB
    LB --> MS1
    MS1 --> REDIS1
    MS1 --> DB1
    MS1 --> MQ1
    MS4 --> EXT1
    MS6 --> EXT2
    MS1 --> EXT3
    CDN3 --> EXT4
    MS7 --> EXT5
    
    style CDN1 fill:#ff9,stroke:#333,stroke-width:3px
    style LB fill:#f9f,stroke:#333,stroke-width:3px
    style REDIS1 fill:#9ff,stroke:#333,stroke-width:3px
    style DB1 fill:#bbf,stroke:#333,stroke-width:3px
    style MQ1 fill:#9f9,stroke:#333,stroke-width:3px
```

## Modern UI Design System

### Design Principles
- **Premium Feel**: Clean, modern aesthetics that build trust and confidence
- **Mobile-First**: Responsive design optimized for all devices
- **Performance**: Fast loading with smooth animations and transitions
- **Accessibility**: WCAG compliant with proper contrast and keyboard navigation
- **Brand Consistency**: Cohesive visual language throughout the experience

### UI Technology Stack
```typescript
// Modern Frontend Stack
interface UITechStack {
  framework: 'React 18 with TypeScript'
  styling: 'Tailwind CSS + Headless UI'
  animations: 'Framer Motion'
  icons: 'Heroicons + Lucide React'
  images: 'Next.js Image Optimization'
  forms: 'React Hook Form + Zod validation'
  state: 'Zustand for global state'
  notifications: 'React Hot Toast'
}
```

### Color Palette & Typography
```css
/* Modern Color System */
:root {
  /* Primary Brand Colors */
  --primary-50: #f0f9ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-900: #1e3a8a;
  
  /* Neutral Grays */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-500: #6b7280;
  --gray-900: #111827;
  
  /* Success/Error States */
  --success-500: #10b981;
  --error-500: #ef4444;
  --warning-500: #f59e0b;
}

/* Typography Scale */
.text-display-lg { font-size: 3.75rem; font-weight: 800; }
.text-display-md { font-size: 3rem; font-weight: 700; }
.text-heading-lg { font-size: 2.25rem; font-weight: 600; }
.text-heading-md { font-size: 1.875rem; font-weight: 600; }
.text-body-lg { font-size: 1.125rem; font-weight: 400; }
.text-body-md { font-size: 1rem; font-weight: 400; }
```

### Component Design System
```typescript
interface DesignComponents {
  // Product Cards
  ProductCard: {
    hover: 'scale-105 shadow-xl transition-all duration-300'
    image: 'aspect-square object-cover rounded-lg'
    badge: 'absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded-full text-xs'
  }
  
  // Buttons
  Button: {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
    secondary: 'border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition-colors'
    loading: 'opacity-50 cursor-not-allowed animate-pulse'
  }
  
  // Forms
  Input: {
    base: 'border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
    error: 'border-error-500 focus:ring-error-500'
    success: 'border-success-500 focus:ring-success-500'
  }
  
  // Cards & Containers
  Card: {
    base: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
    hover: 'hover:shadow-md transition-shadow duration-200'
    elevated: 'shadow-lg border-0'
  }
}
```

### Animation & Interaction Patterns
```typescript
interface AnimationPatterns {
  // Page Transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 }
    animate: { opacity: 1, y: 0 }
    exit: { opacity: 0, y: -20 }
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
  
  // Product Interactions
  productHover: {
    scale: 1.05
    shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    transition: { duration: 0.2 }
  }
  
  // Loading States
  skeleton: {
    animate: { opacity: [0.5, 1, 0.5] }
    transition: { duration: 1.5, repeat: Infinity }
  }
  
  // Cart Animations
  addToCart: {
    scale: [1, 1.2, 1]
    transition: { duration: 0.3 }
  }
}
```

## Core Services for M-Pesa Learning

### 1. M-Pesa Integration Service (`/lib/mpesa.ts`)

The heart of the learning experience - complete M-Pesa integration.

```typescript
interface MpesaService {
  // OAuth token management
  generateAccessToken(): Promise<string>
  refreshToken(): Promise<string>
  
  // STK Push payment initiation
  initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse>
  
  // Callback handling
  handlePaymentCallback(payload: CallbackPayload): Promise<void>
  
  // Transaction status checking
  queryTransactionStatus(checkoutRequestId: string): Promise<TransactionStatus>
  
  // Utility functions
  validatePhoneNumber(phoneNumber: string): boolean
  generatePassword(shortcode: string, passkey: string, timestamp: string): string
  formatTimestamp(): string
}

interface STKPushRequest {
  phoneNumber: string
  amount: number
  orderId: string
  accountReference: string
  transactionDesc: string
}

interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}
```

### 2. Order Management System (`/lib/orders.ts`)

Simple but complete order lifecycle management.

```typescript
interface OrderService {
  createOrder(cartItems: CartItem[], customerInfo: CustomerInfo): Promise<Order>
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>
  getOrderById(orderId: string): Promise<Order>
  processPaymentResult(orderId: string, paymentResult: PaymentResult): Promise<void>
  generateOrderNumber(): string
}

enum OrderStatus {
  PENDING = 'PENDING',           // Cart created, payment not initiated
  PAYMENT_PENDING = 'PAYMENT_PENDING', // STK Push sent, waiting for payment
  PAID = 'PAID',                 // Payment confirmed
  PROCESSING = 'PROCESSING',     // Order being prepared
  COMPLETED = 'COMPLETED',       // Order fulfilled
  CANCELLED = 'CANCELLED',       // Order cancelled
  FAILED = 'FAILED'              // Payment failed
}
```

### 3. Inventory Management System (`/lib/inventory.ts`)

Real-time inventory tracking with reservation system.

```typescript
interface InventoryService {
  checkAvailability(variantId: string): Promise<number>
  reserveStock(variantId: string, quantity: number, customerId: string): Promise<ReservationResult>
  confirmSale(reservationId: string): Promise<void>
  releaseReservation(reservationId: string): Promise<void>
  addStock(variantId: string, quantity: number): Promise<void>
  getLowStockAlerts(): Promise<LowStockAlert[]>
}

interface StockReservation {
  id: string
  variantId: string
  customerId: string
  quantity: number
  expiresAt: Date
  status: 'ACTIVE' | 'CONFIRMED' | 'RELEASED' | 'EXPIRED'
}

interface InventorySnapshot {
  variantId: string
  totalStock: number
  reservedStock: number
  soldStock: number
  availableStock: number // calculated: total - reserved - sold
  lastUpdated: Date
}
```

### 2. M-Pesa Payment Integration (`/lib/mpesa.ts`)

Production-ready M-Pesa integration with comprehensive error handling.

```typescript
interface MpesaService {
  initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse>
  handleCallback(payload: CallbackPayload): Promise<void>
  queryTransactionStatus(checkoutRequestId: string): Promise<TransactionStatus>
  generateAccessToken(): Promise<string>
  validateCallback(payload: any): boolean
}

interface STKPushRequest {
  phoneNumber: string
  amount: number
  orderId: string
  accountReference: string
  transactionDesc: string
  callbackUrl: string
}

interface PaymentResult {
  success: boolean
  mpesaReceiptNumber?: string
  transactionDate?: Date
  phoneNumber?: string
  amount?: number
  resultCode: number
  resultDescription: string
}
```

### 3. Order Management System (`/lib/orders.ts`)

Complete order lifecycle management with status tracking.

```typescript
interface OrderService {
  createOrder(cartItems: CartItem[], customerInfo: CustomerInfo): Promise<Order>
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>
  getOrderById(orderId: string): Promise<Order>
  getCustomerOrders(customerId: string): Promise<Order[]>
  processPaymentCallback(orderId: string, paymentResult: PaymentResult): Promise<void>
  generateInvoice(orderId: string): Promise<Invoice>
}

enum OrderStatus {
  PENDING = 'PENDING',           // Cart created, payment not initiated
  PAYMENT_PENDING = 'PAYMENT_PENDING', // STK Push sent, waiting for payment
  PAID = 'PAID',                 // Payment confirmed
  PROCESSING = 'PROCESSING',     // Order being prepared
  SHIPPED = 'SHIPPED',           // Order dispatched
  DELIVERED = 'DELIVERED',       // Order delivered
  CANCELLED = 'CANCELLED',       // Order cancelled
  REFUNDED = 'REFUNDED'          // Payment refunded
}
```

### 4. Customer Management (`/lib/customers.ts`)

Customer accounts, profiles, and relationship management.

```typescript
interface CustomerService {
  createCustomer(data: CustomerRegistration): Promise<Customer>
  updateProfile(customerId: string, data: ProfileUpdate): Promise<Customer>
  getCustomerAnalytics(customerId: string): Promise<CustomerAnalytics>
  getOrderHistory(customerId: string): Promise<Order[]>
  addToWishlist(customerId: string, productId: string): Promise<void>
  getRecommendations(customerId: string): Promise<Product[]>
}

interface Customer {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  addresses: Address[]
  preferences: CustomerPreferences
  loyaltyPoints: number
  totalSpent: number
  orderCount: number
  createdAt: Date
}
```

## Database Schema (Production-Ready)

### Enhanced Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          String @id @default(cuid())
  name        String
  brand       String
  description String?
  basePrice   Int    // Price in KES cents
  imageUrls   String[] // Multiple product images
  category    String @default("shoes")
  tags        String[] // For search and filtering
  seoSlug     String @unique
  metaTitle   String?
  metaDescription String?
  active      Boolean @default(true)
  featured    Boolean @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  variants    ProductVariant[]
  reviews     ProductReview[]
  
  @@index([category, active])
  @@index([featured, active])
}

model ProductVariant {
  id              String @id @default(cuid())
  productId       String
  size            String
  color           String?
  sku             String @unique
  priceAdjustment Int @default(0)
  
  // Inventory Management
  totalStock      Int @default(0)
  reservedStock   Int @default(0)
  soldStock       Int @default(0)
  lowStockThreshold Int @default(5)
  
  // Calculated field: availableStock = totalStock - reservedStock - soldStock
  
  product         Product @relation(fields: [productId], references: [id])
  orderItems      OrderItem[]
  reservations    StockReservation[]
  inventoryLogs   InventoryLog[]
  
  @@index([productId, size])
}

model StockReservation {
  id          String @id @default(cuid())
  variantId   String
  customerId  String?
  sessionId   String? // For guest users
  quantity    Int
  status      ReservationStatus @default(ACTIVE)
  expiresAt   DateTime
  createdAt   DateTime @default(now())
  
  variant     ProductVariant @relation(fields: [variantId], references: [id])
  customer    Customer? @relation(fields: [customerId], references: [id])
  
  @@index([expiresAt, status])
}

model Customer {
  id              String @id @default(cuid())
  email           String @unique
  phone           String? @unique
  firstName       String
  lastName        String
  dateOfBirth     DateTime?
  gender          String?
  loyaltyPoints   Int @default(0)
  totalSpent      Int @default(0)
  orderCount      Int @default(0)
  lastOrderAt     DateTime?
  emailVerified   Boolean @default(false)
  phoneVerified   Boolean @default(false)
  marketingOptIn  Boolean @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  orders          Order[]
  addresses       Address[]
  reviews         ProductReview[]
  wishlist        WishlistItem[]
  reservations    StockReservation[]
  supportTickets  SupportTicket[]
  
  @@index([email])
  @@index([phone])
}

model Order {
  id                  String @id @default(cuid())
  orderNumber         String @unique // Human-readable order number
  customerId          String?
  guestEmail          String? // For guest checkout
  status              OrderStatus @default(PENDING)
  
  // Pricing
  subtotal            Int // Before tax and shipping
  taxAmount           Int
  shippingAmount      Int
  discountAmount      Int @default(0)
  totalAmount         Int
  
  // Delivery
  shippingAddress     Json
  billingAddress      Json?
  deliveryMethod      String
  estimatedDelivery   DateTime?
  trackingNumber      String?
  
  // Payment
  paymentMethod       String @default("mpesa")
  paymentStatus       PaymentStatus @default(PENDING)
  mpesaCheckoutId     String? @unique
  mpesaMerchantReq    String?
  mpesaReceiptNumber  String?
  paidAt              DateTime?
  
  // Metadata
  customerNotes       String?
  adminNotes          String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  
  customer            Customer? @relation(fields: [customerId], references: [id])
  items               OrderItem[]
  paymentEvents       PaymentEvent[]
  statusHistory       OrderStatusHistory[]
  
  @@index([customerId])
  @@index([status])
  @@index([createdAt])
}

model OrderItem {
  id          String @id @default(cuid())
  orderId     String
  variantId   String
  quantity    Int
  unitPrice   Int // Price at time of order
  totalPrice  Int // unitPrice * quantity
  
  order       Order @relation(fields: [orderId], references: [id])
  variant     ProductVariant @relation(fields: [variantId], references: [id])
}

model InventoryLog {
  id          String @id @default(cuid())
  variantId   String
  type        InventoryLogType
  quantity    Int // Positive for additions, negative for reductions
  reason      String
  reference   String? // Order ID, adjustment ID, etc.
  userId      String? // Admin who made the change
  createdAt   DateTime @default(now())
  
  variant     ProductVariant @relation(fields: [variantId], references: [id])
  
  @@index([variantId, createdAt])
}

model ProductReview {
  id          String @id @default(cuid())
  productId   String
  customerId  String
  rating      Int // 1-5 stars
  title       String?
  comment     String?
  verified    Boolean @default(false) // Verified purchase
  helpful     Int @default(0) // Helpful votes
  createdAt   DateTime @default(now())
  
  product     Product @relation(fields: [productId], references: [id])
  customer    Customer @relation(fields: [customerId], references: [id])
  
  @@unique([productId, customerId])
  @@index([productId, rating])
}

model Address {
  id          String @id @default(cuid())
  customerId  String
  type        AddressType @default(SHIPPING)
  firstName   String
  lastName    String
  company     String?
  address1    String
  address2    String?
  city        String
  county      String
  postalCode  String?
  country     String @default("Kenya")
  phone       String?
  isDefault   Boolean @default(false)
  
  customer    Customer @relation(fields: [customerId], references: [id])
  
  @@index([customerId])
}

model WishlistItem {
  id          String @id @default(cuid())
  customerId  String
  productId   String
  createdAt   DateTime @default(now())
  
  customer    Customer @relation(fields: [customerId], references: [id])
  product     Product @relation(fields: [productId], references: [id])
  
  @@unique([customerId, productId])
}

model SupportTicket {
  id          String @id @default(cuid())
  customerId  String?
  email       String
  subject     String
  message     String
  status      TicketStatus @default(OPEN)
  priority    TicketPriority @default(MEDIUM)
  assignedTo  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  customer    Customer? @relation(fields: [customerId], references: [id])
  responses   TicketResponse[]
  
  @@index([status, priority])
}

model TicketResponse {
  id          String @id @default(cuid())
  ticketId    String
  message     String
  isCustomer  Boolean @default(false)
  createdAt   DateTime @default(now())
  
  ticket      SupportTicket @relation(fields: [ticketId], references: [id])
}

// Enums
enum OrderStatus {
  PENDING
  PAYMENT_PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}

enum ReservationStatus {
  ACTIVE
  CONFIRMED
  RELEASED
  EXPIRED
}

enum InventoryLogType {
  PURCHASE
  SALE
  ADJUSTMENT
  RETURN
  DAMAGE
  RESTOCK
}

enum AddressType {
  SHIPPING
  BILLING
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

// Amazon/Jumia Level Additional Models

model Vendor {
  id              String @id @default(cuid())
  businessName    String
  businessType    VendorType
  email           String @unique
  phone           String
  taxId           String? @unique
  status          VendorStatus @default(PENDING)
  commissionRate  Float @default(0.15) // 15% default commission
  rating          Float @default(0)
  totalSales      Int @default(0)
  joinedAt        DateTime @default(now())
  verifiedAt      DateTime?
  
  // Business details
  businessAddress Json
  bankDetails     Json
  documents       VendorDocument[]
  
  // Performance metrics
  fulfillmentRate Float @default(0)
  responseTime    Int @default(0) // in hours
  returnRate      Float @default(0)
  
  products        Product[]
  orders          Order[]
  payouts         VendorPayout[]
  reviews         VendorReview[]
  
  @@index([status])
  @@index([rating])
}

model VendorDocument {
  id          String @id @default(cuid())
  vendorId    String
  type        DocumentType
  fileName    String
  fileUrl     String
  status      DocumentStatus @default(PENDING)
  uploadedAt  DateTime @default(now())
  verifiedAt  DateTime?
  
  vendor      Vendor @relation(fields: [vendorId], references: [id])
}

model VendorPayout {
  id              String @id @default(cuid())
  vendorId        String
  amount          Int
  period          Json // { start: Date, end: Date }
  status          PayoutStatus @default(PENDING)
  transactionRef  String?
  processedAt     DateTime?
  createdAt       DateTime @default(now())
  
  vendor          Vendor @relation(fields: [vendorId], references: [id])
  orders          Order[]
  
  @@index([vendorId, status])
}

model VendorReview {
  id          String @id @default(cuid())
  vendorId    String
  customerId  String
  orderId     String
  rating      Int // 1-5 stars
  comment     String?
  createdAt   DateTime @default(now())
  
  vendor      Vendor @relation(fields: [vendorId], references: [id])
  customer    Customer @relation(fields: [customerId], references: [id])
  order       Order @relation(fields: [orderId], references: [id])
  
  @@unique([customerId, orderId])
}

model Recommendation {
  id              String @id @default(cuid())
  customerId      String
  productId       String
  type            RecommendationType
  score           Float
  context         Json
  shown           Boolean @default(false)
  clicked         Boolean @default(false)
  purchased       Boolean @default(false)
  createdAt       DateTime @default(now())
  
  customer        Customer @relation(fields: [customerId], references: [id])
  product         Product @relation(fields: [productId], references: [id])
  
  @@index([customerId, type])
  @@index([productId, type])
}

model UserBehavior {
  id          String @id @default(cuid())
  customerId  String?
  sessionId   String
  event       UserEventType
  productId   String?
  searchQuery String?
  page        String?
  timestamp   DateTime @default(now())
  metadata    Json?
  
  customer    Customer? @relation(fields: [customerId], references: [id])
  product     Product? @relation(fields: [productId], references: [id])
  
  @@index([customerId, timestamp])
  @@index([sessionId, timestamp])
}

model FraudAlert {
  id              String @id @default(cuid())
  orderId         String?
  customerId      String?
  type            FraudType
  riskScore       Float
  status          AlertStatus @default(ACTIVE)
  description     String
  investigatedBy  String?
  resolvedAt      DateTime?
  createdAt       DateTime @default(now())
  
  order           Order? @relation(fields: [orderId], references: [id])
  customer        Customer? @relation(fields: [customerId], references: [id])
  
  @@index([status, riskScore])
}

model Shipment {
  id              String @id @default(cuid())
  orderId         String @unique
  trackingNumber  String @unique
  carrier         String
  status          ShipmentStatus @default(PENDING)
  origin          Json
  destination     Json
  estimatedDelivery DateTime?
  actualDelivery  DateTime?
  cost            Int
  weight          Float?
  dimensions      Json?
  
  order           Order @relation(fields: [orderId], references: [id])
  events          ShipmentEvent[]
  
  @@index([trackingNumber])
  @@index([status])
}

model ShipmentEvent {
  id          String @id @default(cuid())
  shipmentId  String
  status      String
  description String
  location    Json?
  timestamp   DateTime @default(now())
  
  shipment    Shipment @relation(fields: [shipmentId], references: [id])
  
  @@index([shipmentId, timestamp])
}

model Promotion {
  id              String @id @default(cuid())
  name            String
  type            PromotionType
  code            String? @unique
  description     String?
  discountType    DiscountType
  discountValue   Float
  minOrderValue   Int?
  maxDiscount     Int?
  usageLimit      Int?
  usageCount      Int @default(0)
  startDate       DateTime
  endDate         DateTime
  active          Boolean @default(true)
  
  // Targeting
  customerSegments String[]
  productCategories String[]
  vendorIds       String[]
  
  orders          Order[]
  
  @@index([code])
  @@index([active, startDate, endDate])
}

model LoyaltyProgram {
  id              String @id @default(cuid())
  customerId      String @unique
  tier            LoyaltyTier @default(BRONZE)
  points          Int @default(0)
  lifetimeSpent   Int @default(0)
  joinedAt        DateTime @default(now())
  lastActivity    DateTime @default(now())
  
  customer        Customer @relation(fields: [customerId], references: [id])
  transactions    LoyaltyTransaction[]
  
  @@index([tier, points])
}

model LoyaltyTransaction {
  id              String @id @default(cuid())
  programId       String
  type            LoyaltyTransactionType
  points          Int
  description     String
  orderId         String?
  createdAt       DateTime @default(now())
  
  program         LoyaltyProgram @relation(fields: [programId], references: [id])
  order           Order? @relation(fields: [orderId], references: [id])
}

// Additional Enums
enum VendorType {
  INDIVIDUAL
  COMPANY
  ENTERPRISE
}

enum VendorStatus {
  PENDING
  APPROVED
  SUSPENDED
  REJECTED
}

enum DocumentType {
  BUSINESS_LICENSE
  TAX_CERTIFICATE
  BANK_STATEMENT
  ID_DOCUMENT
  PRODUCT_CATALOG
}

enum DocumentStatus {
  PENDING
  APPROVED
  REJECTED
}

enum PayoutStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

enum RecommendationType {
  PERSONALIZED
  COLLABORATIVE
  CONTENT_BASED
  TRENDING
  FREQUENTLY_BOUGHT_TOGETHER
}

enum UserEventType {
  PAGE_VIEW
  PRODUCT_VIEW
  SEARCH
  ADD_TO_CART
  REMOVE_FROM_CART
  PURCHASE
  WISHLIST_ADD
}

enum FraudType {
  PAYMENT_FRAUD
  ACCOUNT_TAKEOVER
  FAKE_ACCOUNT
  SUSPICIOUS_BEHAVIOR
  CHARGEBACK_RISK
}

enum AlertStatus {
  ACTIVE
  INVESTIGATING
  RESOLVED
  FALSE_POSITIVE
}

enum ShipmentStatus {
  PENDING
  PICKED_UP
  IN_TRANSIT
  OUT_FOR_DELIVERY
  DELIVERED
  FAILED
  RETURNED
}

enum PromotionType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
  BUY_ONE_GET_ONE
  BUNDLE
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
}

enum LoyaltyTier {
  BRONZE
  SILVER
  GOLD
  PLATINUM
  DIAMOND
}

enum LoyaltyTransactionType {
  EARNED
  REDEEMED
  EXPIRED
  BONUS
}
```

## API Architecture

### RESTful API Endpoints

```typescript
// Product Management
GET    /api/products              // List products with filtering
GET    /api/products/:id          // Get product details
POST   /api/products              // Create product (admin)
PUT    /api/products/:id          // Update product (admin)
DELETE /api/products/:id          // Delete product (admin)

// Inventory Management
GET    /api/inventory/:variantId  // Get stock levels
POST   /api/inventory/reserve     // Reserve stock
POST   /api/inventory/release     // Release reservation
POST   /api/inventory/adjust      // Adjust stock (admin)
GET    /api/inventory/alerts      // Low stock alerts (admin)

// Order Management
POST   /api/orders               // Create order
GET    /api/orders/:id           // Get order details
PUT    /api/orders/:id/status    // Update order status (admin)
GET    /api/orders/customer/:id  // Customer order history

// Payment Processing
POST   /api/payments/stkpush     // Initiate M-Pesa payment
POST   /api/payments/callback    // M-Pesa callback handler
GET    /api/payments/status/:id  // Check payment status

// Customer Management
POST   /api/customers/register   // Customer registration
POST   /api/customers/login      // Customer login
GET    /api/customers/profile    // Get customer profile
PUT    /api/customers/profile    // Update customer profile
POST   /api/customers/addresses  // Add address
GET    /api/customers/wishlist   // Get wishlist
POST   /api/customers/wishlist   // Add to wishlist

// Admin Analytics
GET    /api/admin/analytics/sales     // Sales analytics
GET    /api/admin/analytics/customers // Customer analytics
GET    /api/admin/analytics/inventory // Inventory analytics
GET    /api/admin/reports/financial   // Financial reports
```

## Security Architecture

### Authentication & Authorization

```typescript
interface SecurityService {
  authenticateCustomer(token: string): Promise<Customer | null>
  authenticateAdmin(token: string): Promise<Admin | null>
  generateJWT(user: Customer | Admin): string
  validatePermissions(user: any, resource: string, action: string): boolean
  encryptSensitiveData(data: string): string
  decryptSensitiveData(encryptedData: string): string
}

// Role-based access control
enum UserRole {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

interface Permission {
  resource: string // 'products', 'orders', 'customers', etc.
  actions: string[] // 'read', 'write', 'delete', etc.
}
```

### Data Protection & Compliance

- **Encryption**: All sensitive data encrypted at rest and in transit
- **PII Handling**: Minimal collection, secure storage, right to deletion
- **Audit Logging**: Complete audit trail for all data access and modifications
- **Backup & Recovery**: Automated daily backups with point-in-time recovery
- **GDPR/Kenya DPA Compliance**: Data protection and privacy controls

## High-Scale Performance & Architecture

### Multi-Layer Caching Strategy

```typescript
interface ScalableCacheService {
  // L1 Cache: Edge/CDN (Cloudflare)
  cacheAtEdge(key: string, data: any, ttl: number): Promise<void>
  
  // L2 Cache: Application Cache (Redis Cluster)
  cacheInMemory(key: string, data: any, ttl: number): Promise<void>
  
  // L3 Cache: Database Query Cache
  cacheQuery(query: string, result: any, ttl: number): Promise<void>
  
  // Cache Invalidation Strategies
  invalidatePattern(pattern: string): Promise<void>
  invalidateByTags(tags: string[]): Promise<void>
  
  // Cache Warming
  warmProductCache(): Promise<void>
  warmInventoryCache(): Promise<void>
  warmCustomerCache(customerId: string): Promise<void>
}

// Cache Hierarchy
enum CacheLayer {
  EDGE = 'edge',           // 1-5 minutes TTL
  MEMORY = 'memory',       // 5-30 minutes TTL  
  DATABASE = 'database',   // 30-60 minutes TTL
  PERSISTENT = 'persistent' // Hours to days TTL
}
```

### Database Scaling Architecture

```typescript
interface DatabaseCluster {
  // Primary-Replica Setup
  primary: DatabaseConnection      // Write operations
  readReplicas: DatabaseConnection[] // Read operations (auto-scaling)
  
  // Horizontal Partitioning
  shardByCustomer(customerId: string): DatabaseConnection
  shardByProduct(productId: string): DatabaseConnection
  shardByOrder(orderId: string): DatabaseConnection
  
  // Connection Pooling
  connectionPool: {
    min: 10,
    max: 100,
    acquireTimeoutMillis: 60000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200
  }
}

// Database Partitioning Strategy
interface ShardingStrategy {
  // Customer-based sharding (for orders, profiles)
  customerShard: (customerId: string) => number
  
  // Product-based sharding (for catalog, inventory)
  productShard: (productId: string) => number
  
  // Time-based sharding (for analytics, logs)
  timeShard: (timestamp: Date) => number
  
  // Geographic sharding (for regional data)
  geoShard: (region: string) => number
}
```

### Auto-Scaling Infrastructure

```typescript
interface AutoScalingConfig {
  // Horizontal Pod Autoscaler
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilization: 70
  targetMemoryUtilization: 80
  
  // Vertical Pod Autoscaler
  resourceRequests: {
    cpu: "100m"
    memory: "128Mi"
  }
  resourceLimits: {
    cpu: "2000m"
    memory: "2Gi"
  }
  
  // Database Auto-scaling
  readReplicaScaling: {
    minReplicas: 2
    maxReplicas: 10
    cpuThreshold: 75
    connectionThreshold: 80
  }
  
  // Cache Auto-scaling
  redisClusterScaling: {
    minNodes: 3
    maxNodes: 20
    memoryThreshold: 85
    connectionThreshold: 1000
  }
}
```

### Event-Driven Architecture

```typescript
interface EventBus {
  // High-throughput event streaming
  publishEvent(event: DomainEvent): Promise<void>
  subscribeToEvents(eventType: string, handler: EventHandler): void
  
  // Event sourcing for audit trails
  appendToEventStore(streamId: string, events: DomainEvent[]): Promise<void>
  readEventStream(streamId: string, fromVersion?: number): Promise<DomainEvent[]>
  
  // CQRS (Command Query Responsibility Segregation)
  executeCommand(command: Command): Promise<CommandResult>
  executeQuery(query: Query): Promise<QueryResult>
}

// Domain Events for Scalability
interface DomainEvent {
  id: string
  type: string
  aggregateId: string
  version: number
  timestamp: Date
  data: any
  metadata?: any
}

// Event Types
enum EventType {
  PRODUCT_CREATED = 'product.created',
  INVENTORY_UPDATED = 'inventory.updated',
  ORDER_PLACED = 'order.placed',
  PAYMENT_COMPLETED = 'payment.completed',
  CUSTOMER_REGISTERED = 'customer.registered',
  STOCK_LOW = 'stock.low'
}
```

### Search & Discovery at Scale

```typescript
interface SearchService {
  // Elasticsearch cluster for product search
  searchProducts(query: SearchQuery): Promise<SearchResult>
  indexProduct(product: Product): Promise<void>
  bulkIndexProducts(products: Product[]): Promise<void>
  
  // Auto-complete and suggestions
  getAutoComplete(query: string): Promise<string[]>
  getSuggestions(customerId: string): Promise<Product[]>
  
  // Analytics-driven search
  trackSearchQuery(query: string, results: number, customerId?: string): Promise<void>
  getPopularSearches(): Promise<SearchTerm[]>
  
  // Faceted search for filtering
  getFacets(query: string): Promise<SearchFacet[]>
  applyFilters(query: string, filters: SearchFilter[]): Promise<SearchResult>
}

interface SearchQuery {
  text?: string
  filters?: SearchFilter[]
  sort?: SortOption[]
  pagination?: PaginationOptions
  facets?: string[]
  boost?: BoostRule[]
}
```

### CDN & Global Distribution

```typescript
interface GlobalCDNStrategy {
  // Multi-CDN setup for redundancy
  primaryCDN: 'cloudflare'
  secondaryCDN: 'aws-cloudfront'
  
  // Edge computing capabilities
  edgeWorkers: {
    // A/B testing at edge
    abTesting: (request: Request) => Response
    
    // Personalization at edge
    personalization: (customerId: string) => PersonalizedContent
    
    // Bot protection
    botProtection: (request: Request) => boolean
    
    // Geographic routing
    geoRouting: (request: Request) => string
  }
  
  // Image optimization pipeline
  imageOptimization: {
    formats: ['webp', 'avif', 'jpeg']
    sizes: [320, 640, 1024, 1920]
    quality: 85
    lazyLoading: true
    progressiveJPEG: true
  }
}
```

### Performance Monitoring & Observability

```typescript
interface ObservabilityStack {
  // Application Performance Monitoring
  apm: {
    provider: 'datadog' | 'newrelic' | 'dynatrace'
    tracing: boolean
    profiling: boolean
    errorTracking: boolean
  }
  
  // Infrastructure Monitoring
  infrastructure: {
    metrics: ['cpu', 'memory', 'disk', 'network']
    alerts: AlertRule[]
    dashboards: Dashboard[]
  }
  
  // Business Metrics
  businessMetrics: {
    conversionRate: number
    averageOrderValue: number
    customerLifetimeValue: number
    inventoryTurnover: number
  }
  
  // Real-time Analytics
  realTimeAnalytics: {
    activeUsers: number
    currentOrders: number
    systemHealth: HealthStatus
    alerting: AlertingConfig
  }
}
```

### Disaster Recovery & High Availability

```typescript
interface DisasterRecoveryPlan {
  // Multi-region deployment
  regions: {
    primary: 'us-east-1'
    secondary: 'eu-west-1'
    tertiary: 'ap-southeast-1'
  }
  
  // Backup strategy
  backups: {
    database: {
      frequency: 'hourly'
      retention: '30 days'
      crossRegion: true
    }
    files: {
      frequency: 'daily'
      retention: '90 days'
      versioning: true
    }
  }
  
  // Failover procedures
  failover: {
    automaticFailover: true
    rto: '5 minutes'  // Recovery Time Objective
    rpo: '1 minute'   // Recovery Point Objective
    healthChecks: HealthCheck[]
  }
  
  // Circuit breaker pattern
  circuitBreaker: {
    failureThreshold: 5
    timeout: 60000
    resetTimeout: 30000
  }
}
```

## Monitoring & Analytics

### Business Intelligence

```typescript
interface AnalyticsService {
  getSalesMetrics(period: DateRange): Promise<SalesMetrics>
  getCustomerMetrics(period: DateRange): Promise<CustomerMetrics>
  getInventoryMetrics(): Promise<InventoryMetrics>
  getConversionFunnel(period: DateRange): Promise<ConversionMetrics>
  getProfitabilityAnalysis(period: DateRange): Promise<ProfitMetrics>
}

interface SalesMetrics {
  totalRevenue: number
  orderCount: number
  averageOrderValue: number
  topSellingProducts: ProductSales[]
  salesByCategory: CategorySales[]
  dailySales: DailySales[]
}
```

### System Monitoring

- **Application Performance Monitoring**: Response times, error rates, throughput
- **Infrastructure Monitoring**: Server health, database performance, memory usage
- **Business Metrics**: Sales, conversion rates, customer satisfaction
- **Alert System**: Automated alerts for critical issues and thresholds

## Deployment Architecture

### Production Environment

```yaml
# Vercel Configuration
vercel.json:
  functions:
    "api/**/*.ts":
      maxDuration: 30
  headers:
    - source: "/api/(.*)"
      headers:
        - key: "Access-Control-Allow-Origin"
          value: "https://yourdomain.com"
        - key: "X-Content-Type-Options"
          value: "nosniff"
        - key: "X-Frame-Options"
          value: "DENY"
```

### Environment Configuration

```typescript
interface EnvironmentConfig {
  // Database
  DATABASE_URL: string
  DATABASE_POOL_SIZE: number
  
  // M-Pesa Configuration
  MPESA_ENVIRONMENT: 'sandbox' | 'production'
  MPESA_CONSUMER_KEY: string
  MPESA_CONSUMER_SECRET: string
  MPESA_SHORTCODE: string
  MPESA_PASSKEY: string
  MPESA_CALLBACK_URL: string
  
  // External Services
  EMAIL_SERVICE_API_KEY: string
  SMS_SERVICE_API_KEY: string
  CDN_URL: string
  
  // Security
  JWT_SECRET: string
  ENCRYPTION_KEY: string
  
  // Business Configuration
  TAX_RATE: number
  SHIPPING_RATES: ShippingRate[]
  CURRENCY: string
}
```

This production-ready design provides a comprehensive foundation for building a scalable, secure, and profitable shoes e-commerce platform that can compete with established players in the market.