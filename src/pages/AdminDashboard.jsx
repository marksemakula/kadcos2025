// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth.jsx' // Updated import
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import MemberCard from '../components/MemberCard'
import BulkActions from '../components/BulkActions'
import AdminCMS from './AdminCMS'
import toast from 'react-hot-toast'

const { FiUsers, FiDollarSign, FiTrendingUp, FiLogOut, FiSearch, FiFilter, FiUserCheck, FiUserX, FiGrid, FiRefreshCw } = FiIcons

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members')
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
    pendingMembers: 0
  })

  const { user, signOut } = useAuth()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch members
      const sheetMembers = await fetchMembersFromSheet().catch(err => {
        console.warn('Failed to fetch members from Google Sheet:', err);
        return null;
      });
      // Fallback mock data
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
      setMembers(sheetMembers && sheetMembers.length > 0 ? sheetMembers : mockMembers);
      calculateStats(sheetMembers && sheetMembers.length > 0 ? sheetMembers : mockMembers);
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const SHEET_ID = '1eOm6v1MKMzjUJePU0yHEoNRs-8GEZ38Ldvq9uPoiMaQ';

  const fetchMembersFromSheet = async () => {
    // GViz endpoint (works for public sheets)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
    const text = await res.text();
    // Strip google.visualization wrapper
    const jsonText = text.replace(/^.*?setResponse\(/s, '').replace(/\);\s*$/s, '');
    const data = JSON.parse(jsonText);
    const cols = data.table.cols.map(c => (c.label || c.id || '').trim());
    const rows = data.table.rows || [];
    const members = rows.map((r, idx) => {
      const obj = { id: `sheet-${idx + 1}` };
      (r.c || []).forEach((cell, i) => {
        const keyRaw = cols[i] || `col${i}`;
        const key = keyRaw.toLowerCase().replace(/\s+/g, '_');
        obj[key] = cell && cell.v !== null ? cell.v : '';
      });
      return obj;
    });
    // Persist to localStorage for dashboard use
    try { localStorage.setItem('cms_members', JSON.stringify(members)); } catch (e) { console.warn('Could not persist members', e); }
    return members;
  };

  const calculateStats = (membersData) => {
    const totalMembers = membersData.length
    const activeMembers = membersData.filter(m => m.status === 'active').length
    const pendingMembers = membersData.filter(m => !m.status || m.status === 'pending').length

    setStats({
      totalMembers,
      activeMembers,
      pendingMembers
    })
  }

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/admin';
  };

  const filteredMembers = members.filter(member => {
    const name = member.name || '';
    const email = member.email || '';
    const membershipNumber = member.membershipNumber || member.membership_number || '';
    const status = member.status || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         membershipNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
        {activeTab === 'members' && (
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
                    {stats.totalMembers}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    Total Members
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
                    {stats.activeMembers}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    Active Members
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
                    {stats.pendingMembers}
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    Pending Members
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
            onImport={async () => {
              try {
                setRefreshing(true);
                const sheetMembers = await fetchMembersFromSheet();
                if (sheetMembers && sheetMembers.length > 0) {
                  setMembers(sheetMembers);
                  calculateStats(sheetMembers);
                  toast.success('Imported members from Google Sheet');
                } else {
                  toast('No members found in sheet');
                }
              } catch (e) {
                console.error(e);
                toast.error('Failed to import members from sheet');
              } finally {
                setRefreshing(false);
              }
            }}
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
  , onImport
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
            <div className="flex items-center space-x-2">
              <button
                onClick={onImport}
                className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-marcellus"
              >
                <SafeIcon icon={FiRefreshCw} />
                <span>Import from Google Sheet</span>
              </button>
            </div>
          </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.membershipNumber || member.membership_number || ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {member.status || 'pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => alert('Edit not implemented')} className="text-primary hover:text-secondary">Edit</button>
                    <button onClick={() => alert('Delete not implemented')} className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AdminDashboard