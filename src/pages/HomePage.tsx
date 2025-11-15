import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const HomePage = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Shoes Delivered', value: '25,000+' },
    { label: 'Customer Rating', value: '4.9/5' },
    { label: 'Years in Business', value: '1+' }
  ]

  const features = [
    {
      title: 'Free Delivery',
      description: 'Free delivery within Kakamega. Fast shipping across Kenya.'
    },
    {
      title: 'Quality Guaranteed',
      description: 'Authentic shoes from trusted brands with warranty.'
    },
    {
      title: 'M-Pesa Payments',
      description: 'Secure and convenient mobile money payments.'
    }
  ]

  const brands = [
    { name: 'Nike' },
    { name: 'Adidas' },
    { name: 'Puma' },
    { name: 'Vans' },
    { name: 'Converse' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-primary-50 text-primary-700 rounded px-3 py-1 mb-4 text-sm font-medium">
                Kenya's #1 Online Shoe Store
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Premium Footwear Collection
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover authentic shoes from top brands with secure M-Pesa payments and fast delivery across Kenya.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                <Link
                  to="/products"
                  className="bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center justify-center space-x-2 px-6 py-3 font-medium rounded transition-colors duration-200"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center px-6 py-3 font-medium rounded transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <span>4.9/5 Rating</span>
                <span className="text-gray-300">|</span>
                <span>10,000+ Customers</span>
                <span className="text-gray-300">|</span>
                <span>Fast Delivery</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <img
                src="/home.jpeg"
                alt="SoleStyle Premium Footwear Collection"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Trusted Brands
            </h2>
            <p className="text-gray-600 text-sm">
              Premium footwear from leading brands
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="px-4 py-2 text-gray-700 font-medium"
              >
                {brand.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Shop?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse our collection of premium shoes with secure M-Pesa payments and fast delivery across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="bg-primary-600 text-white hover:bg-primary-700 inline-flex items-center justify-center space-x-2 px-6 py-3 font-medium rounded transition-colors duration-200"
              >
                <span>View Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 inline-flex items-center justify-center px-6 py-3 font-medium rounded transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage