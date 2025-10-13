// App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// import { useAuth } from './hooks/useAuth' - Temporarily comment out
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Membership from './pages/Membership'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import ScrollToTop from './components/ScrollToTop'
import Leadership from './pages/Leadership'
import ResourcesELib from './pages/ResourcesELib'
import WorkWithUs from './pages/WorkWithUs'
import ManagersMessage from './pages/ManagersMessage'
import BoardChairMessage from './pages/BoardChairMessage'
import './App.css'

// Temporary mock auth hook since we're commenting out the real one
const useAuth = () => {
  return {
    user: null,
    loading: false
  }
}

function App() {
  // Moved useAuth to the top level - must be called unconditionally
  const { user, loading } = useAuth()
  
  useEffect(() => {
    console.log('App component mounted')
  }, [])
  
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
              path="/admin" 
              element={
                user ? <AdminDashboard /> : <AdminLogin />
              } 
            />
            
            {/* Public Routes */}
            <Route 
              path="/*" 
              element={
                <>
                  <Navbar />
                  <div className="pt-0"> {/* No padding top since navbar is reduced */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/membership" element={<Membership />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/work-with-us" element={<WorkWithUs />} />
                      <Route path="/leadership" element={<Leadership />} />
                      <Route path="/resources-e-lib" element={<ResourcesELib />} />
                      <Route path="/managers-message" element={<ManagersMessage />} />
                      <Route path="/board-chair-message" element={<BoardChairMessage />} />
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

export default App