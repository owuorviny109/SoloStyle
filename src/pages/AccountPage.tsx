import { motion } from 'framer-motion'
import { User, Package, Heart, Settings, CreditCard, MapPin, Phone, Mail } from 'lucide-react'

const AccountPage = () => {
  const menuItems = [
    {
      icon: User,
      title: "Profile Information",
      description: "Update your personal details and preferences",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Package,
      title: "Order History",
      description: "View your past orders and track current ones",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Heart,
      title: "Wishlist",
      description: "Save your favorite shoes for later",
      color: "from-red-500 to-red-600"
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your M-Pesa and payment preferences",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Addresses",
      description: "Manage your delivery addresses",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Privacy, notifications, and security settings",
      color: "from-gray-500 to-gray-600"
    }
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2025-01-10",
      status: "Delivered",
      total: "KSh 8,500",
      items: 2
    },
    {
      id: "ORD-002",
      date: "2025-01-05",
      status: "In Transit",
      total: "KSh 12,000",
      items: 1
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
              <User className="h-10 w-10" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">My Account</h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Manage your profile, orders, and preferences all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Account Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-100 p-8 mb-12"
          >
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
                <p className="text-gray-600">Member since January 2025</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>john@example.com</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>+254 700 123 456</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Orders", value: "12", icon: Package },
              { label: "Wishlist Items", value: "5", icon: Heart },
              { label: "Total Spent", value: "KSh 45,000", icon: CreditCard },
              { label: "Loyalty Points", value: "450", icon: Settings }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-lg mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Menu */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${item.color} text-white rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-semibold text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-600">{order.date}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{order.items} items</span>
                        <span className="font-semibold text-primary-600">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                  View All Orders
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccountPage