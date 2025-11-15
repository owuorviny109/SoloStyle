import { motion } from 'framer-motion'
import { } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'Shoes Delivered', value: '25,000+' },
    { label: 'Years in Business', value: '1+' },
    { label: 'Customer Rating', value: '4.9/5' }
  ]

  const values = [
    {
      title: 'Customer First',
      description: 'Every decision we make puts our customers at the center. Your satisfaction is our success.'
    },
    {
      title: 'Quality Guaranteed',
      description: 'We source only authentic, high-quality shoes from trusted brands and manufacturers.'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across Kenya, with same-day delivery in Kakamega.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              About SoleStyle
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Your trusted partner for premium footwear in Kenya, bringing style and comfort to every step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2025 in the heart of Kakamega, SoleStyle began with a simple mission: 
                to make premium footwear accessible to everyone in Kenya through innovative payment solutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We were among the first shoe retailers to fully integrate M-Pesa payments, 
                making it easier than ever for Kenyans to purchase quality footwear online.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve customers across Kenya, offering authentic shoes 
                from top global brands with the convenience of mobile money payments.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop"
                alt="Our Story"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-25 via-white to-accent-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at SoleStyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded p-6 shadow-sm text-center hover:shadow-md transition-shadow duration-200 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage