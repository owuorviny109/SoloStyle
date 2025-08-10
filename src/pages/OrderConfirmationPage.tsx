import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Truck, Phone, Mail, Download, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

// Mock order data - in real app, this would come from API
const mockOrder = {
  id: 'ORD-2024-001',
  orderNumber: 'ORD-2024-001',
  status: 'PAID',
  totalAmount: 1200000, // KES 12,000 in cents
  customerEmail: 'customer@example.com',
  customerPhone: '254708374149',
  mpesaReceiptNumber: 'NLJ7RT61SV',
  paidAt: new Date(),
  createdAt: new Date(),
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main Street',
    city: 'Nairobi',
    county: 'Nairobi',
    phone: '254708374149'
  },
  items: [
    {
      id: '1',
      productName: 'Nike Air Max 270',
      brand: 'Nike',
      size: '42',
      color: 'Black',
      quantity: 1,
      unitPrice: 1200000,
      totalPrice: 1200000,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    }
  ]
}

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const [order, setOrder] = useState(mockOrder)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading order data
    const loadOrder = async () => {
      try {
        setLoading(true)
        // In real app: const orderData = await ApiService.getOrder(orderId)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrder({ ...mockOrder, orderNumber: orderId || mockOrder.orderNumber })
      } catch (error) {
        console.error('Failed to load order:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="loading-skeleton w-16 h-16 rounded-full mx-auto mb-4"></div>
            <div className="loading-skeleton h-8 w-64 mx-auto mb-4"></div>
            <div className="loading-skeleton h-4 w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Order #{order.orderNumber}
              </h2>
              <p className="text-gray-600">
                Placed on {order.createdAt.toLocaleDateString('en-KE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-4 w-4 mr-1" />
                Payment Confirmed
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">M-Pesa Payment Successful</span>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <p>Receipt Number: <span className="font-mono font-medium">{order.mpesaReceiptNumber}</span></p>
              <p>Amount Paid: <span className="font-medium">{formatCurrency(order.totalAmount)}</span></p>
              <p>Phone: <span className="font-medium">{order.customerPhone}</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.productName}</h4>
                    <p className="text-sm text-gray-600">
                      {item.brand} • Size {item.size} • {item.color}
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Paid</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Truck className="h-5 w-5 text-primary-600" />
            <span>Delivery Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
              <div className="text-gray-600 space-y-1">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.county}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Delivery Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Order confirmed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Processing (1-2 business days)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Shipped (2-3 business days)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Mail className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Email Confirmation</h4>
              <p className="text-sm text-gray-600">
                Check your email for order details and tracking information.
              </p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Package className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Order Processing</h4>
              <p className="text-sm text-gray-600">
                We'll prepare your shoes and notify you when they're shipped.
              </p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <Truck className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 mb-1">Track Delivery</h4>
              <p className="text-sm text-gray-600">
                You'll receive tracking details once your order ships.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/products">
            <button className="btn-primary flex items-center space-x-2">
              <span>Continue Shopping</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          
          <Link to="/account">
            <button className="btn-secondary">
              View Order History
            </button>
          </Link>
          
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Receipt</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage