import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Filter } from 'lucide-react'
import { ApiService } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const { addItem } = useCartStore()

    useEffect(() => {
        loadProducts()
    }, [selectedCategory])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const filters = selectedCategory !== 'all' ? { category: selectedCategory } : undefined
            const data = await ApiService.getProducts(filters)
            setProducts(data)
        } catch (error) {
            console.error('Failed to load products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = (product: Product, variantId: string) => {
        const variant = product.variants.find(v => v.id === variantId)
        if (variant && variant.availableStock > 0) {
            addItem(product, variant)
        }
    }

    const categories = [
        { id: 'all', name: 'All Shoes' },
        { id: 'sneakers', name: 'Sneakers' },
        { id: 'formal', name: 'Formal' },
        { id: 'boots', name: 'Boots' }
    ]

    if (loading) {
        return (
            <div className="min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="product-card">
                                <div className="aspect-square loading-skeleton mb-4"></div>
                                <div className="p-6">
                                    <div className="loading-skeleton h-4 mb-2"></div>
                                    <div className="loading-skeleton h-6 mb-4"></div>
                                    <div className="loading-skeleton h-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Premium Shoes Collection
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our curated selection of premium shoes. From casual sneakers to formal wear,
                        find your perfect fit with secure M-Pesa payments.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${selectedCategory === category.id
                                    ? 'bg-primary-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:text-primary-600'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="product-card group"
                        >
                            {/* Product Image */}
                            <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.variants.some(v => v.availableStock <= 5) && (
                                    <div className="absolute top-3 left-3 bg-warning-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Low Stock
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-primary-600">{product.brand}</span>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">4.8</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {product.name}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {product.description}
                                </p>

                                {/* Price and Sizes */}
                                <div className="mb-4">
                                    <div className="text-2xl font-bold text-gray-900 mb-2">
                                        {formatCurrency(product.basePrice)}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {product.variants.slice(0, 4).map((variant) => (
                                            <span
                                                key={variant.id}
                                                className={`px-2 py-1 text-xs rounded border ${variant.availableStock > 0
                                                        ? 'border-gray-300 text-gray-700'
                                                        : 'border-gray-200 text-gray-400 line-through'
                                                    }`}
                                            >
                                                {variant.size}
                                            </span>
                                        ))}
                                        {product.variants.length > 4 && (
                                            <span className="px-2 py-1 text-xs text-gray-500">
                                                +{product.variants.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="flex-1 btn-secondary text-center text-sm py-2"
                                    >
                                        View Details
                                    </Link>

                                    {product.variants.some(v => v.availableStock > 0) ? (
                                        <button
                                            onClick={() => {
                                                const availableVariant = product.variants.find(v => v.availableStock > 0)
                                                if (availableVariant) {
                                                    handleAddToCart(product, availableVariant.id)
                                                }
                                            }}
                                            className="btn-primary text-sm py-2 px-4 flex items-center space-x-1"
                                        >
                                            <ShoppingCart className="h-4 w-4" />
                                            <span>Add</span>
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="btn-primary text-sm py-2 px-4 opacity-50 cursor-not-allowed"
                                        >
                                            Sold Out
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {products.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="text-6xl mb-4">👟</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No shoes found
                        </h3>
                        <p className="text-gray-600">
                            Try selecting a different category or check back later.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ProductsPage