import { Link } from 'react-router-dom'
import { } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-white mb-4 block">
              SoleStyle
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover premium shoes with secure M-Pesa payments. Fast delivery across Kenya. 
              Your style, your comfort, your choice.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Instagram
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products/sneakers" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Sneakers
                </Link>
              </li>
              <li>
                <Link to="/products/formal" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Formal Shoes
                </Link>
              </li>
              <li>
                <Link to="/products/boots" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Boots
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Phone: +254 700 123 456</li>
              <li className="text-gray-300">Email: hello@solestyle.co.ke</li>
              <li className="text-gray-300">Location: Kakamega, Kenya</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 SoleStyle. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/returns" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer