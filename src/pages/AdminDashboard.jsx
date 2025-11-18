// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx' // Updated import
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import MemberCard from '../components/MemberCard'
import CandidateCard from '../components/CandidateCard'
import BulkActions from '../components/BulkActions'
import AdminCMS from './AdminCMS'
import toast from 'react-hot-toast'

const { FiUsers, FiDollarSign, FiTrendingUp, FiLogOut, FiSearch, FiFilter, FiUserCheck, FiUserX, FiGrid, FiRefreshCw } = FiIcons

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members')
  const [members, setMembers] = useState([])
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMembers, setSelectedMembers] = useState([])
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingMembers: 0,
    totalCandidates: 0,
    approvedCandidates: 0,
    pendingCandidates: 0
  })

  const { user, signOut } = useAuth()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Use mock data only
      const mockMembers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+256712345678',
          membershipNumber: 'M00123',
          status: 'active',
          joinedAt: '2023-01-15',
          shares: '50',
          savings: 'UGX 500,000'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          phone: '+256712345679',
          membershipNumber: 'M00124',
          status: 'pending',
          joinedAt: '2024-01-20',
          shares: '25',
          savings: 'UGX 250,000'
        }
      ];

      const mockCandidates = [
        {
          id: 1,
          name: 'John Kamya',
          position: 'Board Chairperson',
          email: 'john.kamya@example.com',
          phone: '+256712345678',
          membershipNumber: 'M00123',
          membershipDuration: '8 years',
          shares: '120',
          savings: 'UGX 1,200,000',
          education: 'Bachelor of Commerce',
          experience: '5 years committee experience',
          status: 'pending',
          appliedAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Sarah Nakato',
          position: 'Treasurer',
          email: 'sarah.nakato@example.com',
          phone: '+256712345679',
          membershipNumber: 'M00124',
          membershipDuration: '6 years',
          shares: '80',
          savings: 'UGX 900,000',
          education: 'Diploma in Accounting',
          experience: '3 years financial management',
          status: 'approved',
          appliedAt: '2024-01-14'
        }
      ];
      
      setMembers(mockMembers);
      setCandidates(mockCandidates);
      calculateStats(mockMembers, mockCandidates);
      
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const calculateStats = (membersData, candidatesData) => {
    const totalMembers = membersData.length
    const activeMembers = membersData.filter(m => m.status === 'active').length
    const pendingMembers = membersData.filter(m => !m.status || m.status === 'pending').length
    const totalCandidates = candidatesData.length
    const approvedCandidates = candidatesData.filter(c => c.status === 'approved').length
    const pendingCandidates = candidatesData.filter(c => c.status === 'pending').length

    setStats({
      totalMembers,
      activeMembers,
      pendingMembers,
      totalCandidates,
      approvedCandidates,
      pendingCandidates
    })
  }

  const handleApproveCandidate = async (candidateId) => {
    try {
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, status: 'approved' }
            : candidate
        )
      );
      toast.success('Candidate approved successfully');
    } catch (error) {
      console.error('Error approving candidate:', error);
      toast.error('Failed to approve candidate');
    }
  }

  const handleRejectCandidate = async (candidateId) => {
    try {
      setCandidates(prev => 
        prev.map(candidate => 
          candidate.id === candidateId 
            ? { ...candidate, status: 'rejected' }
            : candidate
        )
      );
      toast.success('Candidate rejected successfully');
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      toast.error('Failed to reject candidate');
    }
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || candidate.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-marcellus">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/KADCOS-02.png" 
                alt="KADCOS Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold text-secondary font-marcellus">
                KADCOS Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchData}
                disabled={refreshing}
                className="flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors font-marcellus disabled:opacity-50"
              >
                <SafeIcon icon={FiRefreshCw} className={refreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors font-marcellus"
              >
                <SafeIcon icon={FiLogOut} />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          <div className="flex space-x-8 border-b">
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-marcellus font-semibold flex items-center space-x-2 ${
                activeTab === 'members'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={FiUsers} />
              <span>Members</span>
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`py-4 px-1 border-b-2 font-marcellus font-semibold flex items-center space-x-2 ${
                activeTab === 'candidates'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={FiUserCheck} />
              <span>Leadership Candidates</span>
            </button>
            <button
              onClick={() => setActiveTab('cms')}
              className={`py-4 px-1 border-b-2 font-marcellus font-semibold flex items-center space-x-2 ${
                activeTab === 'cms'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <SafeIcon icon={FiGrid} />
              <span>Content Management</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(activeTab === 'members' || activeTab === 'candidates') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    {activeTab === 'members' ? stats.totalMembers : stats.totalCandidates}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    {activeTab === 'members' ? 'Total Members' : 'Total Candidates'}
                  </p>
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
                <div className="bg-green-100 p-3 rounded-full">
                  <SafeIcon icon={FiUserCheck} className="text-green-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-secondary font-marcellus">
                    {activeTab === 'members' ? stats.activeMembers : stats.approvedCandidates}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    {activeTab === 'members' ? 'Active Members' : 'Approved Candidates'}
                  </p>
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
                  <SafeIcon icon={FiUserX} className="text-yellow-600 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-secondary font-marcellus">
                    {activeTab === 'members' ? stats.pendingMembers : stats.pendingCandidates}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    {activeTab === 'members' ? 'Pending Members' : 'Pending Candidates'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'members' && (
          <MembersSection 
            members={filteredMembers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}

        {activeTab === 'candidates' && (
          <CandidatesSection 
            candidates={filteredCandidates}
            onApprove={handleApproveCandidate}
            onReject={handleRejectCandidate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}

        {activeTab === 'cms' && <AdminCMS />}
      </div>
    </div>
  )
}

const MembersSection = ({ 
  members, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus 
}) => {
  return (
    <div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
          />
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 font-marcellus mb-2">
            No members found
          </h3>
          <p className="text-gray-400 font-marcellus">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'No members registered yet'}
          </p>
        </div>
      )}
    </div>
  )
}

const CandidatesSection = ({ 
  candidates, 
  onApprove, 
  onReject, 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus 
}) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onApprove={() => onApprove(candidate.id)}
            onReject={() => onReject(candidate.id)}
          />
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiUsers} className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 font-marcellus mb-2">
            No candidates found
          </h3>
          <p className="text-gray-400 font-marcellus">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'No candidates have applied yet'}
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard