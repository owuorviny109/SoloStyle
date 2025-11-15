import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react'

const PrivacyPage = () => {
  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support."
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: "We use your information to process orders, provide customer support, send updates about your orders, and improve our services."
    },
    {
      icon: Shield,
      title: "Information Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: "We do not sell, trade, or rent your personal information to third parties. We only share information as necessary to complete your orders."
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
              <Shield className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Last Updated: January 2025</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              At SoleStyle, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
              or make a purchase from us.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <section.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl p-8 text-center"
          >
            <Mail className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
            <p className="text-primary-100 mb-6">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <a
              href="mailto:privacy@solestyle.co.ke"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-300"
            >
              <Mail className="h-5 w-5" />
              <span>privacy@solestyle.co.ke</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPage