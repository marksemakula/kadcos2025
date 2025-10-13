import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import MemberCard from '../components/MemberCard'
import BulkActions from '../components/BulkActions'
import toast from 'react-hot-toast'

const { FiUsers, FiDollarSign, FiTrendingUp, FiLogOut, FiSearch, FiFilter, FiPlus, FiRefreshCw } = FiIcons

const AdminDashboard = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMembers, setSelectedMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingMembers: 0,
    totalSavings: 0
  })

  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

  const { signOut } = useAuth()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      
      // Fetch data from Google Apps Script
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getMembers`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        // Transform Google Sheets data to match our expected format
        const formattedMembers = data.members.map((member, index) => ({
          id: index + 1, // Google Sheets doesn't have IDs, so we generate them
          name: member.name || member['Full Name'] || '',
          national_id: member.nationalId || member['National ID'] || '',
          email: member.email || member['Email Address'] || '',
          phone: member.phone || member['Phone Number'] || '',
          preferred_product: member.preferredProduct || member['Preferred Product'] || '',
          status: member.status || 'pending',
          created_at: member.timestamp || member['Timestamp'] || new Date().toISOString()
        }))
        
        setMembers(formattedMembers)
        calculateStats(formattedMembers)
        toast.success('Members data loaded successfully')
      } else {
        throw new Error(data.error || 'Failed to fetch members')
      }
    } catch (error) {
      console.error('Error fetching members:', error)
      
      // Fallback: Load sample data if Google Sheets fails
      const sampleMembers = [
        {
          id: 1,
          name: 'John Doe',
          national_id: 'CM123456789',
          email: 'john.doe@example.com',
          phone: '+256712345678',
          preferred_product: 'Regular Savings Account',
          status: 'active',
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Jane Smith',
          national_id: 'CM987654321',
          email: 'jane.smith@example.com',
          phone: '+256712345679',
          preferred_product: 'Business Loan',
          status: 'pending',
          created_at: '2024-01-16T14:20:00Z'
        }
      ]
      
      setMembers(sampleMembers)
      calculateStats(sampleMembers)
      toast.error('Using sample data. Check Google Script configuration.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const calculateStats = (membersData) => {
    const total = membersData.length
    const active = membersData.filter(m => m.status === 'active').length
    const pending = membersData.filter(m => !m.status || m.status === 'pending').length

    setStats({
      totalMembers: total,
      activeMembers: active,
      pendingMembers: pending,
      totalSavings: total * 10000 // Estimated based on minimum savings
    })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchMembers()
  }

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id))
    }
  }

  const handleDeleteMember = async (memberId) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      // Send delete request to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteMember',
          memberId: memberId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        // Remove from local state
        setMembers(prev => prev.filter(m => m.id !== memberId))
        setSelectedMembers(prev => prev.filter(id => id !== memberId))
        toast.success('Member deleted successfully')
      } else {
        throw new Error(result.error || 'Failed to delete member')
      }
    } catch (error) {
      console.error('Error deleting member:', error)
      toast.error('Failed to delete member. Please try again.')
    }
  }

  const handleBulkStatusUpdate = async (newStatus) => {
    if (!confirm(`Are you sure you want to update ${selectedMembers.length} members to ${newStatus}?`)) return

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'bulkUpdateStatus',
          memberIds: selectedMembers,
          status: newStatus
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.success) {
        // Update local state
        setMembers(prev => 
          prev.map(member => 
            selectedMembers.includes(member.id) 
              ? { ...member, status: newStatus }
              : member
          )
        )
        setSelectedMembers([])
        setShowBulkActions(false)
        toast.success(`Updated ${selectedMembers.length} members to ${newStatus}`)
      } else {
        throw new Error(result.error || 'Failed to update members')
      }
    } catch (error) {
      console.error('Error updating members:', error)
      toast.error('Failed to update members. Please try again.')
    }
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && member.status === 'active') ||
                         (filterStatus === 'pending' && (!member.status || member.status === 'pending'))
    
    return matchesSearch && matchesStatus
  })

  const handleLogout = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-marcellus">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://greta-preview.s3.us-east-2.amazonaws.com/assets/logo.svg" 
                alt="KADCOS Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-secondary font-marcellus">
                KADCOS Admin Dashboard
              </h1>
              <span className="text-xs bg-primary text-dark px-2 py-1 rounded font-marcellus">
                Google Sheets
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors font-marcellus disabled:opacity-50"
              >
                <SafeIcon icon={FiRefreshCw} className={refreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors font-marcellus"
              >
                <SafeIcon icon={FiLogOut} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                <SafeIcon icon={FiUsers} className="text-primary text-2xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-secondary font-marcellus">
                  {stats.totalMembers}
                </h3>
                <p className="text-gray-600 font-marcellus">Total Members</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-accent bg-opacity-10 p-3 rounded-full">
                <SafeIcon icon={FiTrendingUp} className="text-accent text-2xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-secondary font-marcellus">
                  {stats.activeMembers}
                </h3>
                <p className="text-gray-600 font-marcellus">Active Members</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <SafeIcon icon={FiUsers} className="text-yellow-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-secondary font-marcellus">
                  {stats.pendingMembers}
                </h3>
                <p className="text-gray-600 font-marcellus">Pending Members</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <SafeIcon icon={FiDollarSign} className="text-green-600 text-2xl" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-secondary font-marcellus">
                  {stats.totalSavings.toLocaleString()} UGX
                </h3>
                <p className="text-gray-600 font-marcellus">Est. Total Savings</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-marcellus"
              >
                {selectedMembers.length === filteredMembers.length ? 'Deselect All' : 'Select All'}
              </button>

              {selectedMembers.length > 0 && (
                <button
                  onClick={() => setShowBulkActions(true)}
                  className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-orange-500 transition-colors font-marcellus"
                >
                  Bulk Actions ({selectedMembers.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              selected={selectedMembers.includes(member.id)}
              onSelect={() => handleSelectMember(member.id)}
              onEdit={() => toast.info('Edit functionality coming soon')}
              onDelete={() => handleDeleteMember(member.id)}
            />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiUsers} className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 font-marcellus mb-2">
              No members found
            </h3>
            <p className="text-gray-400 font-marcellus">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No members have registered yet'}
            </p>
          </div>
        )}
      </div>

      {/* Bulk Actions Modal */}
      {showBulkActions && (
        <BulkActions
          selectedMembers={selectedMembers}
          members={members}
          onClose={() => setShowBulkActions(false)}
          onBulkStatusUpdate={handleBulkStatusUpdate}
        />
      )}
    </div>
  )
}

export default AdminDashboard