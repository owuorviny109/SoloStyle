import { motion } from 'framer-motion'

const AccountPage = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            My Account
          </h1>
          <div className="bg-gray-100 rounded-lg p-12">
            <p className="text-xl text-gray-600">
              Account page coming soon!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AccountPage