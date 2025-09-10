import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiMail, FiLock, FiEye, FiEyeOff } = FiIcons

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back, Admin!')
      }
    } catch (error) {
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <div className="flex justify-center">
            <img 
              src="/images/kadcos-logo-trsp1.png" 
              alt="KADCOS Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-secondary font-marcellus">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-marcellus">
            Access the KADCOS Management System
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus">
                Email Address
              </label>
              <div className="mt-1 relative">
                <SafeIcon icon={FiMail} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="admin@kadcos.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 font-marcellus">
                Password
              </label>
              <div className="mt-1 relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} />
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-secondary py-3 px-4 rounded-lg font-marcellus font-semibold hover:bg-orange-500 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin