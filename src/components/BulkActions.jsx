import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiMail, FiMessageSquare, FiDownload, FiSend, FiX } = FiIcons

const BulkActions = ({ selectedMembers, members, onClose }) => {
  const [activeAction, setActiveAction] = useState(null)
  const [emailData, setEmailData] = useState({ subject: '', message: '' })
  const [smsMessage, setSmsMessage] = useState('')

  const selectedMembersList = members.filter(member => selectedMembers.includes(member.id))

  const handleEmail = () => {
    if (!emailData.subject || !emailData.message) {
      toast.error('Please fill in all email fields')
      return
    }

    const emailList = selectedMembersList.map(m => m.email).join(';')
    const mailtoLink = `mailto:${emailList}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.message)}`
    
    window.open(mailtoLink, '_blank')
    toast.success(`Email composed for ${selectedMembersList.length} members`)
    onClose()
  }

  const handleSMS = () => {
    if (!smsMessage) {
      toast.error('Please enter SMS message')
      return
    }

    const phoneNumbers = selectedMembersList.map(m => m.phone).join(',')
    toast.success(`SMS ready for ${selectedMembersList.length} members: ${phoneNumbers}`)
    onClose()
  }

  const handleExport = (format) => {
    const data = selectedMembersList.map(member => ({
      Name: member.name,
      Email: member.email,
      Phone: member.phone,
      'National ID': member.national_id,
      'Preferred Product': member.preferred_product,
      Status: member.status || 'Pending',
      'Join Date': new Date(member.created_at).toLocaleDateString()
    }))

    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `kadcos_members_${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }

    toast.success(`Exported ${selectedMembersList.length} members as ${format.toUpperCase()}`)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-secondary font-marcellus">
              Bulk Actions ({selectedMembersList.length} members)
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <SafeIcon icon={FiX} className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!activeAction ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveAction('email')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all duration-300"
              >
                <SafeIcon icon={FiMail} className="text-3xl text-primary mb-3" />
                <span className="font-marcellus font-semibold">Send Email</span>
                <span className="text-sm text-gray-500 font-marcellus">Bulk email to members</span>
              </button>

              <button
                onClick={() => setActiveAction('sms')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all duration-300"
              >
                <SafeIcon icon={FiMessageSquare} className="text-3xl text-primary mb-3" />
                <span className="font-marcellus font-semibold">Send SMS</span>
                <span className="text-sm text-gray-500 font-marcellus">Bulk SMS to members</span>
              </button>

              <button
                onClick={() => setActiveAction('export')}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all duration-300"
              >
                <SafeIcon icon={FiDownload} className="text-3xl text-primary mb-3" />
                <span className="font-marcellus font-semibold">Export Data</span>
                <span className="text-sm text-gray-500 font-marcellus">Download member data</span>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setActiveAction(null)}
                className="mb-4 text-primary hover:text-orange-600 font-marcellus"
              >
                ← Back to actions
              </button>

              {activeAction === 'email' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-marcellus">Compose Email</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Enter email subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailData.message}
                      onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Enter your message"
                    />
                  </div>
                  <button
                    onClick={handleEmail}
                    className="w-full bg-primary text-secondary py-3 rounded-lg font-marcellus font-semibold hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiSend} />
                    <span>Send Email to {selectedMembersList.length} Members</span>
                  </button>
                </div>
              )}

              {activeAction === 'sms' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-marcellus">Compose SMS</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 font-marcellus mb-2">
                      Message (160 characters max)
                    </label>
                    <textarea
                      value={smsMessage}
                      onChange={(e) => setSmsMessage(e.target.value)}
                      maxLength={160}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Enter your SMS message"
                    />
                    <p className="text-sm text-gray-500 font-marcellus mt-1">
                      {smsMessage.length}/160 characters
                    </p>
                  </div>
                  <button
                    onClick={handleSMS}
                    className="w-full bg-primary text-secondary py-3 rounded-lg font-marcellus font-semibold hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiMessageSquare} />
                    <span>Send SMS to {selectedMembersList.length} Members</span>
                  </button>
                </div>
              )}

              {activeAction === 'export' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold font-marcellus">Export Member Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleExport('csv')}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-orange-50 transition-all duration-300"
                    >
                      <SafeIcon icon={FiDownload} className="text-2xl text-primary mb-2 mx-auto" />
                      <span className="block font-marcellus font-semibold">Export as CSV</span>
                      <span className="text-sm text-gray-500 font-marcellus">Excel compatible format</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BulkActions