import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Shield, CreditCard, Users, Award, TrendingUp, Heart, Zap, CheckCircle } from 'lucide-react'
import { ApiService } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await ApiService.getFeaturedProducts()
        setFeaturedProducts(products)
      } catch (error) {
        console.error('Failed to load featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedProducts()
  }, [])

  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Shoes Delivered', value: '25,000+', icon: Truck },
    { label: 'Customer Rating', value: '4.9/5', icon: Star },
    { label: 'Brand New', value: '2025', icon: Award }
  ]

  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'Free delivery within Kakamega. Fast shipping across Kenya.',
      color: 'bg-blue-500'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Authentic shoes from trusted brands with warranty.',
      color: 'bg-green-500'
    },
    {
      icon: CreditCard,
      title: 'M-Pesa Payments',
      description: 'Secure and convenient mobile money payments.',
      color: 'bg-purple-500'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Dedicated support team ready to help you.',
      color: 'bg-red-500'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Quick order processing and instant confirmations.',
      color: 'bg-yellow-500'
    },
    {
      icon: CheckCircle,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy.',
      color: 'bg-indigo-500'
    }
  ]

  const brands = [
    { name: 'Nike', logo: '👟' },
    { name: 'Adidas', logo: '⚡' },
    { name: 'Puma', logo: '🐾' },
    { name: 'Vans', logo: '🛹' },
    { name: 'Converse', logo: '⭐' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 text-white overflow-hidden animate-gradient-shift" style={{ backgroundSize: '400% 400%' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Kenya's #1 Online Shoe Store</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
                Step Into
                <span className="block bg-gradient-to-r from-primary-100 via-accent-100 to-white bg-clip-text text-transparent animate-float">
                  Your Style
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-primary-100 mb-8 leading-relaxed">
                Discover premium shoes with secure M-Pesa payments. 
                Fast delivery across Kenya from our Kakamega store.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/products"
                  className="group bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:glow-effect animate-bounce-gentle"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-primary-200">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">10,000+</span>
                  <span className="text-sm">Customers</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
                  alt="Premium Shoes"
                  className="rounded-2xl shadow-2xl"
                />
                
                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -top-4 -right-4 bg-white text-primary-600 rounded-xl p-4 shadow-lg"
                >
                  <div className="text-2xl font-bold">25K+</div>
                  <div className="text-sm">Delivered</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">M-Pesa Ready</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-white via-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-full mb-4 hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-primary-25 to-accent-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SoleStyle?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best shoe shopping experience in Kenya
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 hover-glow border border-primary-100"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted Brands We Carry
            </h2>
            <p className="text-gray-600">
              Premium footwear from the world's leading brands
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 hover:bg-primary-50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 border border-primary-100"
              >
                <span className="text-2xl">{brand.logo}</span>
                <span className="font-semibold text-gray-900">{brand.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-primary-25 via-white to-accent-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular shoes loved by customers
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl h-96 animate-pulse shadow-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:scale-105 border border-primary-100 hover-glow"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrls[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {product.brand}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-600">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary-600">
                        {formatCurrency(product.basePrice)}
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300 inline-flex items-center space-x-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white py-20 overflow-hidden animate-gradient-shift" style={{ backgroundSize: '400% 400%' }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Pair?
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Browse our collection of premium shoes and experience the convenience of M-Pesa payments. 
              Join thousands of satisfied customers across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="group bg-white text-primary-600 hover:bg-primary-50 inline-flex items-center justify-center space-x-2 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Start Shopping</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage