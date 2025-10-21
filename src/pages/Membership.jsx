import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'

const { FiUser, FiUsers, FiUserPlus, FiCheckCircle } = FiIcons

const Membership = () => {
  const [selectedMembership, setSelectedMembership] = useState('individual')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    // Common fields
    branch: '',
    reasonForJoining: '',
    
    // Personal Information
    name: '',
    village: '',
    subParish: '',
    parish: '',
    nin: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    religion: '',
    telephone: '',
    whatsapp: '',
    email: '',
    dependents: '',
    occupation: '',
    educationLevel: '',
    seminarsAttended: '',
    otherSociety: '',

    // Joint Account specific
    jointAccountName: '',
    jointTelephone1: '',
    jointTelephone2: '',
    
    // Group Account specific
    registrationNumber: '',
    formationDate: '',
    membersCount: '',
    maleCount: '',
    femaleCount: '',
    mainOccupation: '',
    groupEducationLevel: '',
    groupSeminarsAttended: '',
    groupOtherSociety: '',

    // Signatories
    signatory1Name: '',
    signatory1Signature: '',
    signatory1Contact: '',
    signatory1NIN: '',
    signatory1Email: '',

    signatory2Name: '',
    signatory2Signature: '',
    signatory2Contact: '',
    signatory2NIN: '',
    signatory2Email: '',

    signatory3Name: '',
    signatory3Signature: '',
    signatory3Contact: '',
    signatory3NIN: '',
    signatory3Email: ''
  })

  const membershipOptions = [
    {
      id: 'individual',
      title: 'Individual Account',
      icon: FiUser,
      requirements: [
        'Photocopy of a valid National ID /Passport',
        'Three passport sized photos',
        'Completion of member application forms',
        'Paying entry fees of shs.16,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbyJeZia1hn2EgeY9wAqCCgm80mRan63aHzeD6mdHlFUhYMOs7TiKLcUPTgyROv-Osd4/exec',
      formType: 'individual'
    },
    {
      id: 'joint',
      title: 'Joint Account',
      icon: FiUserPlus,
      requirements: [
        'Photocopy of a valid National ID/ Passport for the two account signatories',
        'Three passport sized photos for each signatory',
        'Completion of joint account application forms',
        'Paying entry fees of shs.26,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbyJeZia1hn2EgeY9wAqCCgm80mRan63aHzeD6mdHlFUhYMOs7TiKLcUPTgyROv-Osd4/exec',
      formType: 'joint'
    },
    {
      id: 'group',
      title: 'Group Accounts',
      icon: FiUsers,
      requirements: [
        'Photocopy of a valid National ID/ Passport for the three account signatories',
        'Three passport sized photos for each signatory',
        'Completion of group application forms',
        'Paying entry fees of shs.56,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbyJeZia1hn2EgeY9wAqCCgm80mRan63aHzeD6mdHlFUhYMOs7TiKLcUPTgyROv-Osd4/exec',
      formType: 'group'
    }
  ]

  const benefits = [
    'Access to competitive loan products',
    'Attractive savings interest rates',
    'Financial literacy training',
    'Community networking opportunities',
    'Dividend sharing from profits',
    'Emergency financial support'
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const currentMembership = membershipOptions.find(opt => opt.id === selectedMembership)
      
      // Prepare submission data
      const submissionData = {
        formType: currentMembership.formType,
        timestamp: new Date().toISOString(),
        ...formData
      }

      // Submit to Google Apps Script Web App
      const response = await fetch(currentMembership.formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(submissionData)
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        toast.success('Application submitted successfully!')

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            branch: '',
            reasonForJoining: '',
            name: '',
            village: '',
            subParish: '',
            parish: '',
            nin: '',
            gender: '',
            maritalStatus: '',
            dateOfBirth: '',
            religion: '',
            telephone: '',
            whatsapp: '',
            email: '',
            dependents: '',
            occupation: '',
            educationLevel: '',
            seminarsAttended: '',
            otherSociety: '',
            jointAccountName: '',
            jointTelephone1: '',
            jointTelephone2: '',
            registrationNumber: '',
            formationDate: '',
            membersCount: '',
            maleCount: '',
            femaleCount: '',
            mainOccupation: '',
            groupEducationLevel: '',
            groupSeminarsAttended: '',
            groupOtherSociety: '',
            signatory1Name: '',
            signatory1Signature: '',
            signatory1Contact: '',
            signatory1NIN: '',
            signatory1Email: '',
            signatory2Name: '',
            signatory2Signature: '',
            signatory2Contact: '',
            signatory2NIN: '',
            signatory2Email: '',
            signatory3Name: '',
            signatory3Signature: '',
            signatory3Contact: '',
            signatory3NIN: '',
            signatory3Email: ''
          })
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to submit application')
      }

    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Name of the branch you're joining *
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Why do you want to join KADCOS? *
            </label>
            <input
              type="text"
              name="reasonForJoining"
              value={formData.reasonForJoining}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Your reason for joining"
            />
          </div>
        </div>

        {selectedMembership === 'joint' && (
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Joint Account Name *
            </label>
            <input
              type="text"
              name="jointAccountName"
              value={formData.jointAccountName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter joint account name"
            />
          </div>
        )}

        {selectedMembership === 'group' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter registration number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Formation Date *
                </label>
                <input
                  type="date"
                  name="formationDate"
                  value={formData.formationDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Total Members *
                </label>
                <input
                  type="number"
                  name="membersCount"
                  value={formData.membersCount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Total members"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Male Members *
                </label>
                <input
                  type="number"
                  name="maleCount"
                  value={formData.maleCount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Male count"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Female Members *
                </label>
                <input
                  type="number"
                  name="femaleCount"
                  value={formData.femaleCount}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Female count"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Main Occupation *
                </label>
                <input
                  type="text"
                  name="mainOccupation"
                  value={formData.mainOccupation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Main occupation"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Education Level (Most Members) *
                </label>
                <input
                  type="text"
                  name="groupEducationLevel"
                  value={formData.groupEducationLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Education level"
                />
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Village *
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter village"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Sub-Parish *
            </label>
            <input
              type="text"
              name="subParish"
              value={formData.subParish}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter sub-parish"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Parish *
            </label>
            <input
              type="text"
              name="parish"
              value={formData.parish}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter parish"
            />
          </div>
        </div>

        {(selectedMembership === 'individual' || selectedMembership === 'joint') && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Full Name {selectedMembership === 'joint' ? '(Primary)' : ''} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  National ID Number (NIN) *
                </label>
                <input
                  type="text"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter NIN"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Marital Status *
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                >
                  <option value="">Select Status</option>
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Religion *
                </label>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter religion"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Occupation *
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter occupation"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Telephone *
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Telephone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="WhatsApp number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Number of Dependents *
                </label>
                <input
                  type="number"
                  name="dependents"
                  value={formData.dependents}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Number of people you look after"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Education Level *
                </label>
                <input
                  type="text"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your education level"
                />
              </div>
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 font-marcellus mb-2">
            Development Seminars Attended
          </label>
          <textarea
            name={selectedMembership === 'group' ? 'groupSeminarsAttended' : 'seminarsAttended'}
            value={selectedMembership === 'group' ? formData.groupSeminarsAttended : formData.seminarsAttended}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
            placeholder="List development seminars attended and when"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-marcellus mb-2">
            Other Society Memberships
          </label>
          <textarea
            name={selectedMembership === 'group' ? 'groupOtherSociety' : 'otherSociety'}
            value={selectedMembership === 'group' ? formData.groupOtherSociety : formData.otherSociety}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
            placeholder="List any other societies you're a member of"
          />
        </div>
      </>
    )

    const renderSignatories = () => {
      if (selectedMembership === 'individual') return null

      const signatoryCount = selectedMembership === 'joint' ? 2 : 3
      
      return (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-bold text-dark mb-4 font-marcellus">
            Account Signatories
          </h3>
          <div className="space-y-6">
            {Array.from({ length: signatoryCount }, (_, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-dark mb-3 font-marcellus">
                  Signatory {index + 1}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name={`signatory${index + 1}Name`}
                      value={formData[`signatory${index + 1}Name`]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      National ID Number (NIN) *
                    </label>
                    <input
                      type="text"
                      name={`signatory${index + 1}NIN`}
                      value={formData[`signatory${index + 1}NIN`]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="NIN"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name={`signatory${index + 1}Contact`}
                      value={formData[`signatory${index + 1}Contact`]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name={`signatory${index + 1}Email`}
                      value={formData[`signatory${index + 1}Email`]}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Email address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <>
        {commonFields}
        {renderSignatories()}
      </>
    )
  }

  return (
    <div className="min-h-screen pt-0">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 font-marcellus">
              Join KADCOS Today
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Become part of our growing community and start your journey to financial empowerment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Membership Benefits
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Enjoy exclusive benefits and services designed to support your financial growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg card-hover"
              >
                <div className="bg-primary bg-opacity-10 p-2 rounded-full flex-shrink-0">
                  <SafeIcon icon={FiCheckCircle} className="text-primary" />
                </div>
                <span className="text-gray-700 font-marcellus">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Options Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Choose Your Membership Type
            </h2>
            <p className="text-xl text-gray-600 font-marcellus">
              Select the account type that best fits your needs
            </p>
          </motion.div>

          {/* Membership Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {membershipOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedMembership === option.id
                    ? 'bg-primary text-dark border-2 border-primary'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                }`}
                onClick={() => setSelectedMembership(option.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <SafeIcon 
                    icon={option.icon} 
                    className={`text-2xl ${
                      selectedMembership === option.id ? 'text-dark' : 'text-primary'
                    }`} 
                  />
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedMembership === option.id 
                      ? 'bg-dark border-dark' 
                      : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {selectedMembership === option.id && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-marcellus mb-2">{option.title}</h3>
                <div className="text-sm opacity-75">
                  {option.requirements[3]} {/* Show the entry fee */}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Requirements and Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            {!isSubmitted ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-6 font-marcellus">
                    Requirements for {membershipOptions.find(opt => opt.id === selectedMembership)?.title}
                  </h3>
                  <div className="space-y-4">
                    {membershipOptions
                      .find(opt => opt.id === selectedMembership)
                      ?.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                            <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                          </div>
                          <span className="text-gray-700 font-marcellus">{requirement}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-dark mb-6 font-marcellus">
                    Application Form
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {renderFormFields()}
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-dark py-4 rounded-lg font-marcellus font-semibold hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <span>{isLoading ? 'Submitting...' : 'Submit Application'}</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={FiCheckCircle} className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-dark mb-4 font-marcellus">
                  Application Submitted Successfully!
                </h3>
                <p className="text-gray-600 font-marcellus mb-4">
                  Thank you for your {membershipOptions.find(opt => opt.id === selectedMembership)?.title} application. We will contact you soon to complete your membership process.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-primary text-dark px-6 py-2 rounded-lg font-marcellus font-semibold hover:bg-yellow-600 transition-colors duration-300"
                >
                  Submit Another Application
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6 font-marcellus">
                Why Choose KADCOS?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Trusted financial partner since establishment</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Competitive dividend payments</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                    <SafeIcon icon={FiCheckCircle} className="text-primary text-sm" />
                  </div>
                  <span className="text-gray-700 font-marcellus">Flexible loan repayment terms</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Members" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Membership