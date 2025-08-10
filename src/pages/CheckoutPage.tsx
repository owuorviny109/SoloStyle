import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CreditCard, Truck, Shield, User, MapPin, Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, formatPhoneNumber, validatePhoneNumber, generateOrderNumber } from '@/lib/utils'
import toast from 'react-hot-toast'

// Form validation schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().refine(validatePhoneNumber, 'Please enter a valid Kenyan phone number'),
  address1: z.string().min(5, 'Address must be at least 5 characters'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  county: z.string().min(2, 'County is required'),
  postalCode: z.string().optional(),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form')
  const [orderNumber, setOrderNumber] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  })

  const totalPrice = getTotalPrice()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const onSubmit = async (data: CheckoutForm) => {
    try {
      setIsProcessing(true)
      setPaymentStep('processing')

      // Generate order number
      const newOrderNumber = generateOrderNumber()
      setOrderNumber(newOrderNumber)

      // Format phone number for M-Pesa
      const formattedPhone = formatPhoneNumber(data.phone)
      console.log('📱 Phone number formatting:', {
        original: data.phone,
        formatted: formattedPhone
      })

      // Create order in database (we'll implement this API endpoint)
      const orderData = {
        orderNumber: newOrderNumber,
        customerInfo: data,
        items: items.map(item => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          unitPrice: item.product.basePrice + item.variant.priceAdjustment,
          size: item.variant.size,
          color: item.variant.color
        })),
        totalAmount: totalPrice,
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          county: data.county,
          postalCode: data.postalCode,
          phone: formattedPhone
        }
      }

      console.log('Creating order:', orderData)

      // For now, simulate order creation
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Initiate M-Pesa STK Push via our API
      console.log('Initiating M-Pesa payment...')

      const stkPushResponse = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: Math.round(totalPrice / 100), // Convert from cents to KES
          orderId: newOrderNumber,
          accountReference: newOrderNumber,
          transactionDesc: `Payment for shoes order ${newOrderNumber}`
        })
      })

      if (!stkPushResponse.ok) {
        const errorData = await stkPushResponse.json()
        throw new Error(errorData.message || errorData.error || 'Payment initiation failed')
      }

      const stkPushData = await stkPushResponse.json()
      console.log('STK Push Response:', stkPushData)

      if (stkPushData.ResponseCode === '0') {
        // STK Push successful - show instructions
        toast.success('Payment request sent to your phone!')

        // Start polling for payment status (we'll implement this)
        pollPaymentStatus(newOrderNumber)

      } else {
        throw new Error(stkPushData.ResponseDescription || 'Payment initiation failed')
      }

    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error instanceof Error ? error.message : 'Checkout failed')
      setIsProcessing(false)
      setPaymentStep('form')
    }
  }

  const pollPaymentStatus = async (orderId: string) => {
    // Poll for payment status every 5 seconds for up to 2 minutes
    let attempts = 0
    const maxAttempts = 24 // 2 minutes

    const poll = async () => {
      attempts++

      try {
        // In a real app, this would call your API to check order status
        // For now, we'll simulate the polling
        console.log(`Polling payment status... Attempt ${attempts}`)

        if (attempts >= maxAttempts) {
          // Timeout
          toast.error('Payment timeout. Please check your M-Pesa messages.')
          setIsProcessing(false)
          setPaymentStep('form')
          return
        }

        // Simulate random success after some attempts (for demo)
        if (attempts >= 3 && Math.random() > 0.3) {
          // Payment successful
          setPaymentStep('success')
          setIsProcessing(false)
          clearCart()
          toast.success('Payment successful! Order confirmed.')

          // Redirect to order confirmation after 3 seconds
          setTimeout(() => {
            navigate(`/order-confirmation/${orderId}`)
          }, 3000)

          return
        }

        // Continue polling
        setTimeout(poll, 5000)

      } catch (error) {
        console.error('Polling error:', error)
        setTimeout(poll, 5000)
      }
    }

    poll()
  }

  if (items.length === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order with secure M-Pesa payment</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${paymentStep === 'form' ? 'text-primary-600' : 'text-green-600'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'form' ? 'bg-primary-600 text-white' : 'bg-green-600 text-white'
                }`}>
                {paymentStep === 'form' ? '1' : '✓'}
              </div>
              <span className="font-medium">Details</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            <div className={`flex items-center space-x-2 ${paymentStep === 'processing' ? 'text-primary-600' :
              paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'processing' ? 'bg-primary-600 text-white' :
                paymentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                {paymentStep === 'success' ? '✓' : '2'}
              </div>
              <span className="font-medium">Payment</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-300"></div>

            <div className={`flex items-center space-x-2 ${paymentStep === 'success' ? 'text-green-600' : 'text-gray-400'
              }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                {paymentStep === 'success' ? '✓' : '3'}
              </div>
              <span className="font-medium">Complete</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {paymentStep === 'form' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Customer Information */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                      <User className="h-5 w-5 text-primary-600" />
                      <span>Customer Information</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          {...register('firstName')}
                          className={`input-field w-full ${errors.firstName ? 'input-error' : ''}`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          {...register('lastName')}
                          className={`input-field w-full ${errors.lastName ? 'input-error' : ''}`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          className={`input-field w-full ${errors.email ? 'input-error' : ''}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number (M-Pesa)
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          className={`input-field w-full ${errors.phone ? 'input-error' : ''}`}
                          placeholder="0708374149 or 254708374149"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          This number will receive the M-Pesa payment prompt
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-primary-600" />
                      <span>Delivery Address</span>
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <input
                          {...register('address1')}
                          className={`input-field w-full ${errors.address1 ? 'input-error' : ''}`}
                          placeholder="Enter your street address"
                        />
                        {errors.address1 && (
                          <p className="text-red-500 text-sm mt-1">{errors.address1.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          {...register('address2')}
                          className="input-field w-full"
                          placeholder="Apartment, suite, unit, building, floor, etc."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            {...register('city')}
                            className={`input-field w-full ${errors.city ? 'input-error' : ''}`}
                            placeholder="Nairobi"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            County
                          </label>
                          <input
                            {...register('county')}
                            className={`input-field w-full ${errors.county ? 'input-error' : ''}`}
                            placeholder="Nairobi"
                          />
                          {errors.county && (
                            <p className="text-red-500 text-sm mt-1">{errors.county.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code (optional)
                          </label>
                          <input
                            {...register('postalCode')}
                            className="input-field w-full"
                            placeholder="00100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Pay with M-Pesa</span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* Processing State */}
            {paymentStep === 'processing' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-8 shadow-sm text-center"
              >
                <div className="text-6xl mb-6">📱</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Check Your Phone
                </h2>
                <p className="text-gray-600 mb-6">
                  We've sent an M-Pesa payment request to your phone.
                  Please enter your M-Pesa PIN to complete the payment.
                </p>

                <div className="flex items-center justify-center space-x-2 text-primary-600 mb-6">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Waiting for payment confirmation...</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-2">Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-left">
                    <li>Check your phone for the M-Pesa prompt</li>
                    <li>Enter your M-Pesa PIN</li>
                    <li>Wait for confirmation</li>
                  </ol>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {paymentStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg p-8 shadow-sm text-center"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your order <strong>{orderNumber}</strong> has been confirmed.
                  You'll receive an email confirmation shortly.
                </p>

                <div className="bg-green-50 rounded-lg p-4 text-sm text-green-800 mb-6">
                  <p>Redirecting to order confirmation...</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg p-6 shadow-sm sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.imageUrls[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Size {item.variant.size} • Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency((item.product.basePrice + item.variant.priceAdjustment) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>

                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure M-Pesa Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free delivery within Nairobi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage