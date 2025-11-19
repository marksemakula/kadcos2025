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
          <h3 className="font-bold text-secondary font-marcellus">{candidate.full_name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-marcellus flex items-center ${getStatusColor(candidate.status)}`}>
            <SafeIcon icon={getStatusIcon(candidate.status)} className="mr-1" />
            {candidate.status}
          </span>
        </div>
        <p className="text-sm text-primary font-marcellus mt-1">{candidate.position_applied_for}</p>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 text-xs">
        <div><span className="font-semibold">Timestamp:</span> {candidate.timestamp}</div>
        <div><span className="font-semibold">Membership Number:</span> {candidate.membership_number}</div>
        <div><span className="font-semibold">Email:</span> {candidate.email_address}</div>
        <div><span className="font-semibold">Phone:</span> {candidate.phone_number}</div>
        <div><span className="font-semibold">Membership Duration (Years):</span> {candidate.membership_duration_years}</div>
        <div><span className="font-semibold">Current Number of Shares:</span> {candidate.current_number_of_shares}</div>
        <div><span className="font-semibold">Current Savings Balance (UGX):</span> {candidate.current_savings_balance_ugx}</div>
        <div><span className="font-semibold">Language Proficiency:</span> {candidate.language_proficiency}</div>
        <div><span className="font-semibold">Educational Qualifications:</span> {candidate.educational_qualifications}</div>
        <div><span className="font-semibold">Leadership & Cooperative Experience:</span> {candidate.leadership_and_cooperative_experience}</div>
        <div><span className="font-semibold">Additional Qualifications & Skills:</span> {candidate.additional_qualifications_and_skills}</div>
        <div><span className="font-semibold">Vision for the Position:</span> {candidate.vision_for_the_position}</div>
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