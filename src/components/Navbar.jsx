import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiMenu, FiX, FiSettings, FiChevronDown } = FiIcons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const location = useLocation()
  const aboutDropdownRef = useRef(null)
  const servicesDropdownRef = useRef(null)
  const aboutTimeoutRef = useRef(null)
  const servicesTimeoutRef = useRef(null)

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'About', 
      hasDropdown: true,
      items: [
        { name: 'About Us', path: '/about' },
        { name: 'Leadership', path: '/leadership' },
        { 
          name: 'Messages', 
          hasNestedDropdown: true,
          items: [
            { name: "Manager's Message", path: '/managers-message' },
            { name: "Board Chair's Message", path: '/board-chair-message' }
          ]
        }
      ]
    },
    { 
      name: 'Services', 
      hasDropdown: true,
      items: [
        { name: 'Our Services', path: '/services' },
        { name: 'Resources/e-Lib', path: '/resources-e-lib' }
      ]
    },
    { name: 'Membership', path: '/membership' },
    { name: 'News Updates', path: '/blog' },
    { name: 'Work with us', path: '/work-with-us' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  }

  // Check if any message page is active
  const isMessageActive = () => {
    return location.pathname === '/managers-message' || location.pathname === '/board-chair-message';
  }

  // Handle hover with delay for better UX - About
  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current)
    }
    setIsAboutOpen(true)
  }

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setIsAboutOpen(false)
    }, 300)
  }

  // Handle hover with delay for better UX - Services
  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 300)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutOpen(false)
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current)
    }
  }, [])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        {/* Main navigation container with proper alignment */}
        <div className="flex items-start lg:items-center h-24 lg:h-16">
          {/* Logo on left side - positioned properly */}
          <div className="flex-shrink-0 lg:absolute lg:left-6 lg:top-0 z-10 pt-4 lg:pt-0">
            <Link to="/" className="flex items-center space-x-3 bg-transparent">
              <img 
                src="/images/KADCOS-02.png" 
                alt="KADCOS Logo" 
                className="h-16 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-secondary font-marcellus">KADCOS</span>
                <span className="text-sm text-gray-600 font-marcellus">Lubaga Cooperative Society</span>
              </div>
            </Link>
          </div>

          {/* Centered Navigation Items - properly aligned */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-8 pt-4 lg:pt-0">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div 
                    key={item.name}
                    className="relative group"
                    ref={item.name === 'About' ? aboutDropdownRef : servicesDropdownRef}
                    onMouseEnter={item.name === 'About' ? handleAboutMouseEnter : handleServicesMouseEnter}
                    onMouseLeave={item.name === 'About' ? handleAboutMouseLeave : handleServicesMouseLeave}
                  >
                    <button className={`flex items-center font-marcellus transition-colors duration-300 text-sm font-bold ${
                      (item.name === 'About' && (isActive('/about') || isActive('/leadership') || isMessageActive())) || 
                      (item.name === 'Services' && (isActive('/services') || isActive('/resources-e-lib')))
                        ? 'text-primary border-b-2 border-primary' 
                        : 'text-black hover:text-primary'
                    }`}>
                      {item.name}
                      <FiChevronDown className="ml-1" />
                    </button>
                    
                    <AnimatePresence>
                      {(item.name === 'About' && isAboutOpen) || (item.name === 'Services' && isServicesOpen) ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                          onMouseEnter={item.name === 'About' ? handleAboutMouseEnter : handleServicesMouseEnter}
                          onMouseLeave={item.name === 'About' ? handleAboutMouseLeave : handleServicesMouseLeave}
                        >
                          {item.items.map((dropdownItem) => (
                            dropdownItem.hasNestedDropdown ? (
                              <div key={dropdownItem.name} className="relative group/nested">
                                <div className="flex items-center justify-between px-4 py-2 text-sm font-marcellus font-bold text-black hover:bg-gray-50 hover:text-primary cursor-pointer">
                                  {dropdownItem.name}
                                  <FiChevronDown className="ml-1 transform rotate-0 group-hover/nested:rotate-180 transition-transform" />
                                </div>
                                <div className="absolute left-full top-0 ml-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-200">
                                  {dropdownItem.items.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.name}
                                      to={nestedItem.path}
                                      className={`block px-4 py-2 text-sm font-marcellus font-bold ${
                                        isActive(nestedItem.path)
                                          ? 'text-primary bg-orange-50'
                                          : 'text-black hover:bg-gray-50 hover:text-primary'
                                      }`}
                                      onClick={() => {
                                        if (item.name === 'About') setIsAboutOpen(false)
                                        if (item.name === 'Services') setIsServicesOpen(false)
                                      }}
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                className={`block px-4 py-2 text-sm font-marcellus font-bold ${
                                  isActive(dropdownItem.path)
                                    ? 'text-primary bg-orange-50'
                                    : 'text-black hover:bg-gray-50 hover:text-primary'
                                }`}
                                onClick={() => {
                                  if (item.name === 'About') setIsAboutOpen(false)
                                  if (item.name === 'Services') setIsServicesOpen(false)
                                }}
                              >
                                {dropdownItem.name}
                              </Link>
                            )
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-marcellus transition-colors duration-300 text-sm font-bold ${
                      isActive(item.path)
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-black hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Right-side Actions - properly aligned */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 ml-auto pt-4 lg:pt-0">
            <Link
              to="/membership"
              className="bg-primary text-white px-5 py-2 rounded-full font-marcellus font-bold hover:bg-orange-500 transition-colors duration-300 text-sm"
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

          {/* Mobile menu button - properly aligned */}
          <div className="lg:hidden ml-auto pt-4 lg:pt-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-primary"
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
            className="lg:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name}>
                    <button
                      onClick={() => {
                        if (item.name === 'About') {
                          setIsMobileAboutOpen(!isMobileAboutOpen)
                          setIsMobileServicesOpen(false)
                        } else if (item.name === 'Services') {
                          setIsMobileServicesOpen(!isMobileServicesOpen)
                          setIsMobileAboutOpen(false)
                        }
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 font-marcellus font-bold ${
                        (item.name === 'About' && (isActive('/about') || isActive('/leadership') || isMessageActive())) ||
                        (item.name === 'Services' && (isActive('/services') || isActive('/resources-e-lib')))
                          ? 'text-primary bg-orange-50'
                          : 'text-black hover:text-primary hover:bg-gray-50'
                      }`}
                    >
                      <span>{item.name}</span>
                      <FiChevronDown className={`transform transition-transform ${
                        (item.name === 'About' && isMobileAboutOpen) || 
                        (item.name === 'Services' && isMobileServicesOpen) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {(item.name === 'About' && isMobileAboutOpen) || (item.name === 'Services' && isMobileServicesOpen) ? (
                      <div className="pl-6">
                        {item.items.map((dropdownItem) => (
                          dropdownItem.hasNestedDropdown ? (
                            <div key={dropdownItem.name}>
                              <button
                                onClick={() => {
                                  // For mobile, we'll handle nested dropdowns by toggling
                                  const nestedItems = document.getElementById(`mobile-${dropdownItem.name.toLowerCase()}`);
                                  if (nestedItems) {
                                    nestedItems.classList.toggle('hidden');
                                  }
                                }}
                                className={`flex items-center justify-between w-full px-3 py-2 font-marcellus font-bold ${
                                  isMessageActive()
                                    ? 'text-primary bg-orange-50'
                                    : 'text-black hover:text-primary hover:bg-gray-50'
                                }`}
                              >
                                <span>{dropdownItem.name}</span>
                                <FiChevronDown className="transform transition-transform" />
                              </button>
                              <div id={`mobile-${dropdownItem.name.toLowerCase()}`} className="hidden pl-4">
                                {dropdownItem.items.map((nestedItem) => (
                                  <Link
                                    key={nestedItem.name}
                                    to={nestedItem.path}
                                    onClick={() => {
                                      setIsOpen(false)
                                      setIsMobileAboutOpen(false)
                                      setIsMobileServicesOpen(false)
                                    }}
                                    className={`block px-3 py-2 font-marcellus font-bold ${
                                      isActive(nestedItem.path)
                                        ? 'text-primary bg-orange-50'
                                        : 'text-black hover:text-primary hover:bg-gray-50'
                                    }`}
                                  >
                                    {nestedItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              onClick={() => {
                                setIsOpen(false)
                                setIsMobileAboutOpen(false)
                                setIsMobileServicesOpen(false)
                              }}
                              className={`block px-3 py-2 font-marcellus font-bold ${
                                isActive(dropdownItem.path)
                                  ? 'text-primary bg-orange-50'
                                  : 'text-black hover:text-primary hover:bg-gray-50'
                              }`}
                            >
                              {dropdownItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 font-marcellus font-bold ${
                      isActive(item.path)
                        ? 'text-primary bg-orange-50'
                        : 'text-black hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                to="/membership"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-4 bg-primary text-white rounded-md font-marcellus font-bold text-center"
              >
                Join Now
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 mt-2 text-gray-500 hover:text-secondary font-marcellus font-bold"
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