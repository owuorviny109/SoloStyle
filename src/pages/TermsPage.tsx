import { motion } from 'framer-motion'
import { FileText, Scale, CreditCard, Truck, RotateCcw, AlertTriangle } from 'lucide-react'

const TermsPage = () => {
  const terms = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content: "By accessing and using SoleStyle, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      icon: CreditCard,
      title: "Payment Terms",
      content: "All payments are processed securely through M-Pesa. Prices are in Kenyan Shillings and include applicable taxes."
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: "We offer free delivery within Kakamega. Delivery times vary by location. We are not responsible for delays caused by external factors."
    },
    {
      icon: RotateCcw,
      title: "Returns & Exchanges",
      content: "Items can be returned within 30 days of purchase in original condition. Return shipping costs may apply for areas outside Kakamega."
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: "SoleStyle shall not be liable for any indirect, incidental, special, consequential, or punitive damages."
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FileText className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-100 p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agreement Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of the SoleStyle website and services. 
              By using our website, you agree to these terms in full.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If you disagree with these terms or any part of these terms, you must not use our website.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {terms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <term.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{term.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{term.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>Modifications:</strong> We reserve the right to modify these terms at any time. 
                Changes will be effective immediately upon posting.
              </p>
              <p>
                <strong>Governing Law:</strong> These terms are governed by the laws of Kenya.
              </p>
              <p>
                <strong>Contact:</strong> For questions about these terms, contact us at legal@solestyle.co.ke
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TermsPage