// App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth, AuthProvider } from './hooks/useAuth.jsx' // Updated import
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminCMS from './pages/AdminCMS'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Membership from './pages/Membership'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import ScrollToTop from './components/ScrollToTop'
import Governance from './pages/Governance'
import ResourcesELib from './pages/ResourcesELib'
import ManagersMessage from './pages/ManagersMessage'
import BoardChairMessage from './pages/BoardChairMessage'
import Vote from './pages/Vote'
import './App.css'

// Main App component wrapped with AuthProvider
function AppContent() {
  const { user, loading } = useAuth()
  
  useEffect(() => {
    console.log('App component mounted, user:', user)
  }, [user])
  
  try {
    if (loading) {
      console.log('Auth loading...')
      return (
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600 font-marcellus">Loading...</p>
          </div>
        </div>
      )
    }

    console.log('Auth loaded, user:', user)

    return (
      <Router>
        <div className="min-h-screen bg-white font-marcellus">
          <ScrollToTop />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Marcellus, serif'
              }
            }}
          />
          
          <Routes>
            {/* Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                user ? <AdminDashboard /> : <AdminLogin />
              } 
            />
            
            {/* Separate CMS Route */}
            <Route 
              path="/admin-cms" 
              element={
                user ? <AdminCMS /> : <AdminLogin />
              } 
            />
            
            {/* Public Routes */}
            <Route 
              path="/*" 
              element={
                <>
                  <Navbar />
                  <div>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<div className="pt-24"><About /></div>} />
                      <Route path="/services" element={<div className="pt-24"><Services /></div>} />
                      <Route path="/membership" element={<div className="pt-24"><Membership /></div>} />
                      <Route path="/contact" element={<div className="pt-24"><Contact /></div>} />
                      <Route path="/blog" element={<div className="pt-24"><Blog /></div>} />
                      <Route path="/governance" element={<div className="pt-24"><Governance /></div>} />
                      <Route path="/resources-e-lib" element={<div className="pt-24"><ResourcesELib /></div>} />
                      <Route path="/managers-message" element={<div className="pt-24"><ManagersMessage /></div>} />
                      <Route path="/board-chair-message" element={<div className="pt-24"><BoardChairMessage /></div>} />
                      <Route path="/vote" element={<div className="pt-24"><Vote /></div>} />
                    </Routes>
                  </div>
                  <Footer />
                  <WhatsAppButton />
                </>
              } 
            />
          </Routes>
        </div>
      </Router>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error.message}</p>
          <pre className="text-left mt-4 bg-gray-100 p-4 rounded">
            {error.stack}
          </pre>
        </div>
      </div>
    )
  }
}

// Wrap the app with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App