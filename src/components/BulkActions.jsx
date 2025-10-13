import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiUsers, FiCheckCircle, FiClock, FiPause } from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import toast from 'react-hot-toast'

const BulkActions = ({ selectedMembers, members, onClose, onBulkStatusUpdate }) => {
  const [selectedAction, setSelectedAction] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [customStatus, setCustomStatus] = useState('')

  const selectedMembersData = members.filter(member => 
    selectedMembers.includes(member.id)
  )

  const actionOptions = [
    {
      value: 'active',
      label: 'Mark as Active',
      description: 'Set selected members to active status',
      icon: FiCheckCircle,
      color: 'text-green-600'
    },
    {
      value: 'pending',
      label: 'Mark as Pending',
      description: 'Set selected members to pending status',
      icon: FiClock,
      color: 'text-yellow-600'
    },
    {
      value: 'inactive',
      label: 'Mark as Inactive',
      description: 'Set selected members to inactive status',
      icon: FiPause,
      color: 'text-gray-600'
    },
    {
      value: 'custom',
      label: 'Custom Status',
      description: 'Set a custom status for selected members',
      icon: FiUsers,
      color: 'text-blue-600'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedAction) {
      toast.error('Please select an action')
      return
    }

    const statusToUpdate = selectedAction === 'custom' ? customStatus : selectedAction

    if (!statusToUpdate.trim()) {
      toast.error('Please enter a status value')
      return
    }

    setIsProcessing(true)

    try {
      await onBulkStatusUpdate(statusToUpdate)
      // The toast and closing will be handled in the parent component
    } catch (error) {
      console.error('Error in bulk action:', error)
      toast.error('Failed to process bulk action')
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'inactive': return 'text-gray-600 bg-gray-50'
      default: return 'text-blue-600 bg-blue-50'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-full">
              <SafeIcon icon={FiUsers} className="text-primary text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-secondary font-marcellus">
                Bulk Actions
              </h2>
              <p className="text-sm text-gray-600 font-marcellus">
                {selectedMembers.length} members selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <SafeIcon icon={FiX} />
          </button>
        </div>

        {/* Selected Members Preview */}
        <div className="p-6 border-b border-gray-200 max-h-40 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 font-marcellus">
            Selected Members:
          </h3>
          <div className="space-y-2">
            {selectedMembersData.slice(0, 5).map(member => (
              <div key={member.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-800 font-marcellus truncate flex-1">
                  {member.name}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium font-marcellus ${getStatusColor(member.status)}`}>
                  {member.status || 'pending'}
                </span>
              </div>
            ))}
            {selectedMembersData.length > 5 && (
              <p className="text-xs text-gray-500 text-center font-marcellus">
                +{selectedMembersData.length - 5} more members
              </p>
            )}
          </div>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 font-marcellus">
                Select Action:
              </label>
              <div className="space-y-2">
                {actionOptions.map((action) => (
                  <label
                    key={action.value}
                    className={`flex items-start space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAction === action.value
                        ? 'border-primary bg-primary bg-opacity-5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="action"
                      value={action.value}
                      checked={selectedAction === action.value}
                      onChange={(e) => setSelectedAction(e.target.value)}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={action.icon} className={`${action.color}`} />
                        <span className="font-semibold text-gray-800 font-marcellus">
                          {action.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 font-marcellus">
                        {action.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Status Input */}
            {selectedAction === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-marcellus">
                  Custom Status:
                </label>
                <input
                  type="text"
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  placeholder="Enter status (e.g., verified, approved, etc.)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                />
                <p className="text-xs text-gray-500 mt-1 font-marcellus">
                  This will be applied to all selected members
                </p>
              </motion.div>
            )}

            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 font-marcellus">
                    <strong>Note:</strong> This action will update {selectedMembers.length} member(s) in Google Sheets. 
                    This process might take a few seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-marcellus disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !selectedAction}
              className="flex-1 px-4 py-2 bg-primary text-dark rounded-lg hover:bg-orange-500 transition-colors font-marcellus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Update ${selectedMembers.length} Members`
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default BulkActions