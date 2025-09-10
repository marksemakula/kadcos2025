import React from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'

const { FiUser, FiMail, FiPhone, FiCalendar, FiEdit, FiTrash2 } = FiIcons

const MemberCard = ({ member, onEdit, onDelete, selected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-all duration-300 ${
        selected ? 'border-primary bg-orange-50' : 'border-transparent hover:shadow-xl'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <div className="bg-primary bg-opacity-10 p-3 rounded-full">
            <SafeIcon icon={FiUser} className="text-primary text-xl" />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <SafeIcon icon={FiEdit} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
          >
            <SafeIcon icon={FiTrash2} />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-secondary mb-2 font-marcellus">
        {member.name}
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiMail} className="text-primary" />
          <span className="font-marcellus">{member.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiPhone} className="text-primary" />
          <span className="font-marcellus">{member.phone}</span>
        </div>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiCalendar} className="text-primary" />
          <span className="font-marcellus">
            Joined: {new Date(member.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-marcellus">Product:</span>
          <span className="text-sm font-semibold text-secondary font-marcellus">
            {member.preferred_product}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-500 font-marcellus">Status:</span>
          <span className={`text-sm font-semibold font-marcellus ${
            member.status === 'active' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {member.status || 'Pending'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default MemberCard