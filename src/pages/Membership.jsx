import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiUser, FiMail, FiPhone, FiCreditCard, FiSend, FiCheckCircle } = FiIcons

const Membership = () => {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    email: '',
    phone: '',
    preferredProduct: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Updated with your actual Google Form URL and field IDs
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdoPT9QuRzQIuIgDTgLD56yI-ozIsti_C03a5C2l0w6L-vf_g/formResponse'
  const FIELD_IDS = {
    name: 'entry.2015379394',        // Name field
    nationalId: 'entry.335509197',   // National ID field
    email: 'entry.859308206',        // Email field
    phone: 'entry.1485494441',       // Phone field
    product: 'entry.1084949950'      // Product field
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Prepare form data for Google Forms
      const formPayload = new FormData()
      formPayload.append(FIELD_IDS.name, formData.name)
      formPayload.append(FIELD_IDS.nationalId, formData.nationalId)
      formPayload.append(FIELD_IDS.email, formData.email)
      formPayload.append(FIELD_IDS.phone, formData.phone)
      formPayload.append(FIELD_IDS.product, formData.preferredProduct)

      // Submit to Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formPayload,
        mode: 'no-cors' // Google Forms doesn't return CORS headers
      })

      // Since we're using no-cors, we can't check response status
      // But we assume it worked if no error was thrown
      setIsSubmitted(true)
      toast.success('Application submitted successfully!')

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: '',
          nationalId: '',
          email: '',
          phone: '',
          preferredProduct: ''
        })
      }, 3000)

    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    'Access to competitive loan products',
    'Attractive savings interest rates',
    'Financial literacy training',
    'Community networking opportunities',
    'Dividend sharing from profits',
    'Emergency financial support'
  ]

  const products = [
    'Regular Savings Account',
    'Fixed Deposit Account',
    'Personal Loan',
    'Business Loan',
    'Agricultural Loan',
    'School Fees Loan',
    'Construction Loan',
    'Emergency Loan'
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 font-marcellus">
              Join KADCOS Today
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Become part of our growing community and start your journey to financial empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Membership Benefits
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Enjoy exclusive benefits and services designed to support your financial growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg card-hover"
              >
                <div className="bg-primary bg-opacity-10 p-2 rounded-full flex-shrink-0">
                  <SafeIcon icon={FiCheckCircle} className="text-primary" />
                </div>
                <span className="text-gray-700 font-marcellus">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Member Registration
            </h2>
            <p className="text-xl text-gray-600 font-marcellus">
              Fill out the form below to start your membership application
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiUser} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      National ID Number *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiCreditCard} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="nationalId"
                        value={formData.nationalId}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                        placeholder="Enter your National ID"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiMail} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiPhone} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Preferred SACCO Product *
                  </label>
                  <select
                    name="preferredProduct"
                    value={formData.preferredProduct}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  >
                    <option value="">Select a product</option>
                    {products.map((product, index) => (
                      <option key={index} value={product}>{product}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-dark py-4 rounded-lg font-marcellus font-semibold hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <span>{isLoading ? 'Submitting...' : 'Submit Application'}</span>
                  {!isLoading && <SafeIcon icon={FiSend} />}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiCheckCircle} className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4 font-marcellus">
                  Application Submitted!
                </h3>
                <p className="text-gray-600 font-marcellus">
                  Thank you for your interest in joining KADCOS. We will contact you soon to complete your membership process.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6 font-marcellus">
                Membership Requirements
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Valid National ID or Passport</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Minimum monthly savings of 10,000 UGX</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Purchase of society shares</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Members" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Membership