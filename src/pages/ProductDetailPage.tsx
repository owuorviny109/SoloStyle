import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, Heart } from 'lucide-react'
import { ApiService } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { Product, ProductVariant } from '@/types'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    if (id) {
      loadProduct(id)
    }
  }, [id])

  const loadProduct = async (productId: string) => {
    try {
      setLoading(true)
      const data = await ApiService.getProduct(productId)
      setProduct(data)
      if (data?.variants.length) {
        setSelectedVariant(data.variants[0])
      }
    } catch (error) {
      console.error('Failed to load product:', error)
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      if (selectedVariant.availableStock < quantity) {
        toast.error('Not enough stock available')
        return
      }
      
      addItem(product, selectedVariant, quantity)
    }
  }

  const getCurrentPrice = () => {
    if (!product || !selectedVariant) return 0
    return product.basePrice + selectedVariant.priceAdjustment
  }

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square loading-skeleton rounded-lg"></div>
            <div className="space-y-4">
              <div className="loading-skeleton h-8 w-3/4"></div>
              <div className="loading-skeleton h-6 w-1/2"></div>
              <div className="loading-skeleton h-4 w-full"></div>
              <div className="loading-skeleton h-4 w-full"></div>
              <div className="loading-skeleton h-4 w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link to="/products" className="btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link to="/products" className="hover:text-primary-600 flex items-center space-x-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.imageUrls[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.imageUrls.length > 1 && (
              <div className="flex space-x-2">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? 'border-primary-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Brand and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-primary-600">{product.brand}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-600">4.8 (124 reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              {formatCurrency(getCurrentPrice())}
              {selectedVariant?.priceAdjustment !== 0 && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {formatCurrency(product.basePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.availableStock === 0}
                    className={`p-3 text-center border rounded-lg font-medium transition-all ${
                      selectedVariant?.id === variant.id
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : variant.availableStock > 0
                        ? 'border-gray-300 hover:border-primary-300 text-gray-700'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <div>{variant.size}</div>
                    {variant.availableStock === 0 && (
                      <div className="text-xs text-red-500">Out of Stock</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Info */}
            {selectedVariant && (
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  selectedVariant.availableStock > 10 ? 'bg-green-500' :
                  selectedVariant.availableStock > 5 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">
                  {selectedVariant.availableStock > 10 
                    ? 'In Stock' 
                    : `Only ${selectedVariant.availableStock} left`
                  }
                </span>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-300"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant?.availableStock || 1, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-primary-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.availableStock < quantity}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-300 hover:text-primary-600">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">Free delivery within Nairobi</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="text-gray-700">100% authentic guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage