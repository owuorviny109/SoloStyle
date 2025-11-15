import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

const ContactPage = () => {
  // Scroll to footer when component mounts
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+254 700 123 456',
      description: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@solestyle.co.ke',
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Kakamega, Kenya',
      description: 'Visit our showroom'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Sat: 8AM-6PM',
      description: 'Sunday: Closed'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-25 via-white to-accent-25">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 text-white py-20 animate-gradient-shift" style={{ backgroundSize: '400% 400%' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center border border-primary-100 hover:shadow-xl transition-all duration-300 hover:scale-105 hover-glow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600 rounded-full mb-4 hover:scale-110 transition-transform duration-300 animate-bounce-gentle">
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-primary-600 font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-500">{info.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-primary-100 hover-glow">
              <div className="text-center mb-8">
                <MessageCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input-field w-full"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input-field w-full"
                    placeholder="+254 700 123 456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="input-field w-full">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="input-field w-full resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Check out our contact information in the footer below, or call us directly for urgent matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+254700123456"
                className="btn-primary inline-flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
              <a
                href="mailto:hello@solestyle.co.ke"
                className="btn-secondary inline-flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage