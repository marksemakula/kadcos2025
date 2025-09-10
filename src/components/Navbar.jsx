import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMenu, FiX, FiSettings } = FiIcons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Membership', path: '/membership' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/KADCOS 4-04.svg" 
              alt="KADCOS Logo" 
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-secondary font-marcellus">KADCOS</span>
              <span className="text-sm text-gray-600 font-marcellus">Lubaga Cooperative Society</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-marcellus transition-colors duration-300 ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/membership"
              className="bg-primary text-white px-6 py-2 rounded-full font-marcellus hover:bg-orange-500 transition-colors duration-300"
            >
              Join Now
            </Link>

            <Link
              to="/admin"
              className="text-gray-500 hover:text-secondary transition-colors duration-300 p-2"
              title="Admin Login"
            >
              <SafeIcon icon={FiSettings} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <SafeIcon icon={isOpen ? FiX : FiMenu} className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 font-marcellus ${
                    isActive(item.path)
                      ? 'text-primary bg-orange-50'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/membership"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-4 bg-primary text-white rounded-md font-marcellus text-center"
              >
                Join Now
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-2 text-gray-500 hover:text-secondary font-marcellus"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar