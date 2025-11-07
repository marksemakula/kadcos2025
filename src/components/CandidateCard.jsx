// src/components/CandidateCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiMail, FiPhone, FiCheck, FiX, FiClock } = FiIcons

const CandidateCard = ({ candidate, onApprove, onReject }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return FiCheck;
      case 'rejected': return FiX;
      default: return FiClock;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-secondary font-marcellus">{candidate.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-marcellus flex items-center ${getStatusColor(candidate.status)}`}>
            <SafeIcon icon={getStatusIcon(candidate.status)} className="mr-1" />
            {candidate.status}
          </span>
        </div>
        <p className="text-sm text-primary font-marcellus mt-1">{candidate.position}</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMail} className="mr-2" />
          <span>{candidate.email}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiPhone} className="mr-2" />
          <span>{candidate.phone}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="font-semibold">Membership:</span>
            <p>{candidate.membershipNumber}</p>
          </div>
          <div>
            <span className="font-semibold">Duration:</span>
            <p>{candidate.membershipDuration}</p>
          </div>
          <div>
            <span className="font-semibold">Shares:</span>
            <p>{candidate.shares}</p>
          </div>
          <div>
            <span className="font-semibold">Savings:</span>
            <p>{candidate.savings}</p>
          </div>
        </div>

        <div className="text-xs">
          <span className="font-semibold">Education:</span>
          <p className="mt-1 text-gray-600 line-clamp-2">{candidate.education}</p>
        </div>

        <div className="text-xs">
          <span className="font-semibold">Experience:</span>
          <p className="mt-1 text-gray-600 line-clamp-3">{candidate.experience}</p>
        </div>
      </div>

      {/* Actions */}
      {candidate.status === 'pending' && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex space-x-2">
          <button
            onClick={onApprove}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-marcellus hover:bg-green-700 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-marcellus hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default CandidateCard