// App.jsx (Debug Version)
import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
// import { useAuth } from './hooks/useAuth' - Temporarily comment out
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Membership from './pages/Membership'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// Temporary mock auth hook since we're commenting out the real one
const useAuth = () => {
  return {
    user: null,
    loading: false
  }
}

function App() {
  const [debugInfo, setDebugInfo] = useState('App starting...')
  // Moved useAuth to the top level - must be called unconditionally
  const { user, loading } = useAuth()
  
  useEffect(() => {
    setDebugInfo('App mounted successfully')
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
          
          {/* Debug info overlay - remove in production */}
          <div className="fixed bottom-4 right-4 bg-secondary text-white p-2 rounded text-xs z-50">
            {debugInfo}
          </div>
          
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
                  <div className="pt-0"> {/* REMOVED: pt-16 padding that was creating the gap */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/membership" element={<Membership />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/blog" element={<Blog />} />
                    </Routes>
                  </div>
                  <Footer />
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