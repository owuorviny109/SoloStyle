// Product Types
export interface Product {
  id: string
  name: string
  brand: string
  description: string
  basePrice: number // in cents
  imageUrls: string[]
  category: string
  active: boolean
  variants: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  productId: string
  size: string
  color?: string
  sku: string
  priceAdjustment: number
  totalStock: number
  reservedStock: number
  soldStock: number
  availableStock: number // calculated field
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  totalAmount: number
  phoneNumber: string
  customerEmail?: string
  shippingAddress: Address
  mpesaCheckoutId?: string
  mpesaMerchantReq?: string
  mpesaReceiptNumber?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  variantId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product: Product
  variant: ProductVariant
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED'
}

// Address Types
export interface Address {
  firstName: string
  lastName: string
  phone: string
  address1: string
  address2?: string
  city: string
  county: string
  postalCode?: string
}

// M-Pesa Types
export interface STKPushRequest {
  phoneNumber: string
  amount: number
  orderId: string
  accountReference: string
  transactionDesc: string
}

export interface STKPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

export interface PaymentCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata?: {
        Item: Array<{
          Name: string
          Value: string | number
        }>
      }
    }
  }
}

export interface PaymentResult {
  success: boolean
  mpesaReceiptNumber?: string
  transactionDate?: Date
  phoneNumber?: string
  amount?: number
  resultCode: number
  resultDescription: string
}

// UI Types
export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}