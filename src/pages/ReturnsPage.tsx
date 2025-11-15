import { motion } from 'framer-motion'
import { RotateCcw, Clock, CheckCircle, Package, Truck, CreditCard } from 'lucide-react'

const ReturnsPage = () => {
  const steps = [
    {
      icon: Package,
      title: "Check Eligibility",
      description: "Items must be in original condition with tags attached within 30 days of purchase."
    },
    {
      icon: RotateCcw,
      title: "Initiate Return",
      description: "Contact our support team or use our online return form to start the process."
    },
    {
      icon: Truck,
      title: "Ship Back",
      description: "Package items securely and ship back using our provided return label."
    },
    {
      icon: CreditCard,
      title: "Get Refund",
      description: "Receive your refund via M-Pesa within 3-5 business days after we receive the item."
    }
  ]

  const policies = [
    {
      icon: Clock,
      title: "30-Day Return Window",
      description: "You have 30 days from the delivery date to return items for a full refund."
    },
    {
      icon: CheckCircle,
      title: "Original Condition Required",
      description: "Items must be unworn, with original tags, and in the original packaging."
    },
    {
      icon: Truck,
      title: "Free Returns in Kakamega",
      description: "We offer free pickup for returns within Kakamega town. Other areas may incur shipping costs."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-25 via-white to-accent-25">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-500 to-accent-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-gentle">
              <RotateCcw className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Returns & Exchanges</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Not satisfied with your purchase? We make returns easy and hassle-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How to Return Your Items
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to return your purchase
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6 text-center hover:shadow-xl transition-all duration-300 group hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Return Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Return Policy Details
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our return policy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-8 text-center hover:shadow-xl transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <policy.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{policy.title}</h3>
                <p className="text-gray-600 leading-relaxed">{policy.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Need Help with a Return?</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help you with any questions about returns or exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:returns@solestyle.co.ke"
                className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
              >
                <span>Email Support</span>
              </a>
              <a
                href="tel:+254700123456"
                className="inline-flex items-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                <span>Call Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ReturnsPage