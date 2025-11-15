import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, Phone, Mail, ShoppingCart, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: MessageCircle,
      label: 'Chat Support',
      href: '/contact',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+254700123456',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:hello@solestyle.co.ke',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      href: '/cart',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                {action.href.startsWith('/') ? (
                  <Link
                    to={action.href}
                    className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
                  </Link>
                ) : (
                  <a
                    href={action.href}
                    className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
                  </a>
                )}
              </motion.div>
            ))}
            
            {/* Scroll to top button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: actions.length * 0.1 }}
              onClick={scrollToTop}
              className="flex items-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <ArrowUp className="h-5 w-5" />
              <span className="text-sm font-medium whitespace-nowrap">Back to Top</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? -45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <div className="w-6 h-0.5 bg-white"></div>
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}

export default FloatingActionButton