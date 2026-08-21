import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SafeIcon from '../common/SafeIcon'
import * as FiIcons from 'react-icons/fi'
import toast from 'react-hot-toast'
import SEOHead from '../components/SEOHead'

const { FiUser, FiUsers, FiUserPlus, FiCheckCircle } = FiIcons

const BRANCHES = [
  'Lubaga (Head Office)',
  'Mt Carmel Busega Parish',
  'Our Lady of Assumption Buyege Parish',
  'St Bruno Sserunkuuma Kasenge Parish'
]

// Uganda NIN: 2 letters followed by 12 alphanumeric characters (14 total).
// This is a format check only, not a live NIRA lookup.
const NIN_REGEX = /^[A-Z]{2}[A-Z0-9]{12}$/

const MAX_PHOTO_BYTES = 800 * 1024 // ~800KB per photo, keeps combined email attachments under Vercel's request body limit

const NIN_FIELDS_BY_TYPE = {
  individual: ['nin'],
  joint: ['signatory1NIN', 'signatory2NIN'],
  group: ['signatory1NIN', 'signatory2NIN', 'signatory3NIN']
}

const PHOTO_KEYS_BY_TYPE = {
  individual: ['individual'],
  joint: ['signatory1', 'signatory2'],
  group: ['signatory1', 'signatory2', 'signatory3']
}

const Membership = () => {
  const [selectedMembership, setSelectedMembership] = useState('individual')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ninErrors, setNinErrors] = useState({})
  const [photoFiles, setPhotoFiles] = useState({ individual: [], signatory1: [], signatory2: [], signatory3: [] })

  const initialFormData = {
    // Common fields
    branch: '',
    reasonForJoining: '',
    district: '',
    village: '',
    subParish: '',
    parish: '',
    referrerName: '',
    referrerContact: '',

    // Individual (and applicant-level) personal information
    name: '',
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
    otherSociety: '',

    // Joint Account specific
    jointAccountName: '',

    // Group Account specific
    registrationNumber: '',
    formationDate: '',
    membersCount: '',
    maleCount: '',
    femaleCount: '',

    // Signatories (joint uses 1 & 2 with full personal details; group uses 1-3 with the simpler set)
    signatory1Name: '', signatory1Contact: '', signatory1NIN: '', signatory1Email: '',
    signatory1Gender: '', signatory1MaritalStatus: '', signatory1DateOfBirth: '', signatory1Religion: '',
    signatory1Occupation: '', signatory1Whatsapp: '', signatory1Dependents: '', signatory1EducationLevel: '',

    signatory2Name: '', signatory2Contact: '', signatory2NIN: '', signatory2Email: '',
    signatory2Gender: '', signatory2MaritalStatus: '', signatory2DateOfBirth: '', signatory2Religion: '',
    signatory2Occupation: '', signatory2Whatsapp: '', signatory2Dependents: '', signatory2EducationLevel: '',

    signatory3Name: '', signatory3Contact: '', signatory3NIN: '', signatory3Email: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  const membershipOptions = [
    {
      id: 'individual',
      title: 'Individual Account',
      icon: FiUser,
      requirements: [
        'Photocopy of a valid National ID /Passport',
        'Three passport sized photos',
        'Completion of member application forms',
        'Paying entry fees of shs.19,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbxkZiuIzfyDdKgyTUCX3kNffyANvRPJY7Za0q7YJKKJye-ISC6la20y_bCiFo30VfmV7A/exec',
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
        'Paying entry fees of shs.29,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbyleByh_jNzu5y1f6bApnJb7238Rwe2YWtGdOtXZNhY8cyLW-br0tFp8ppOCWYjNwP3cA/exec',
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
        'Paying entry fees of shs.59,000',
        'Mandatory share purchase of shs.100,000'
      ],
      formUrl: 'https://script.google.com/macros/s/AKfycbxjQdo4azDlnTw9NCQcJtCbPxpPYqETMGhJFzMqetThlXwurXmO1hIL4xIbxqlYenTGAQ/exec',
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

  const handleNINBlur = (fieldName) => {
    const value = (formData[fieldName] || '').trim().toUpperCase()
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    setNinErrors(prev => ({ ...prev, [fieldName]: value.length > 0 && !NIN_REGEX.test(value) }))
  }

  const handlePhotoChange = (key, e) => {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload image files only for passport photos.')
        e.target.value = ''
        return
      }
      if (file.size > MAX_PHOTO_BYTES) {
        toast.error(`${file.name} is larger than 800KB. Please upload a smaller passport photo.`)
        e.target.value = ''
        return
      }
    }
    setPhotoFiles(prev => ({ ...prev, [key]: files.slice(0, 2) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate NIN format for every NIN field relevant to the selected form type
    const relevantNinFields = NIN_FIELDS_BY_TYPE[selectedMembership] || []
    const newNinErrors = {}
    let hasNinError = false
    relevantNinFields.forEach(field => {
      const value = (formData[field] || '').trim().toUpperCase()
      const invalid = !NIN_REGEX.test(value)
      newNinErrors[field] = invalid
      if (invalid) hasNinError = true
    })
    if (hasNinError) {
      setNinErrors(prev => ({ ...prev, ...newNinErrors }))
      toast.error('Please enter a valid National ID Number (2 letters followed by 12 letters/numbers) for all required fields.')
      return
    }

    setIsLoading(true)

    try {
      const currentMembership = membershipOptions.find(opt => opt.id === selectedMembership)

      // Prepare submission data (photo files are sent separately by email, see below)
      const submissionData = {
        formType: currentMembership.formType,
        timestamp: new Date().toISOString(),
        ...formData
      }

      // Submit via our serverless proxy (avoids browser CORS issues with
      // script.google.com). Data still lands in the same Google Sheets.
      const response = await fetch('/api/submit-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit application')
      }

      // Passport photos can't go through the text-only sheet submission above
      // (base64 image data would blow past Google Sheets' cell size limit),
      // so they're emailed separately if any were attached.
      const relevantPhotoKeys = PHOTO_KEYS_BY_TYPE[selectedMembership] || []
      const allPhotos = relevantPhotoKeys.flatMap(key => (photoFiles[key] || []).map(file => ({ key, file })))

      if (allPhotos.length > 0) {
        try {
          const attachments = await Promise.all(allPhotos.map(({ key, file }) => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve({ fileName: `${key}_${file.name}`, fileData: reader.result })
            reader.onerror = reject
            reader.readAsDataURL(file)
          })))

          const applicantName = selectedMembership === 'group'
            ? (formData.registrationNumber || 'Group application')
            : (formData.name || formData.jointAccountName || 'Applicant')

          const photoResponse = await fetch('/api/send-membership-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              formType: currentMembership.formType,
              applicantName,
              branch: formData.branch,
              attachments
            })
          })

          if (!photoResponse.ok) {
            console.warn('Passport photo email failed, application data was still submitted')
            toast('Application submitted, but passport photos could not be emailed. Please send them to admin@kadcoslubaga.co.ug.', { icon: '⚠️' })
          }
        } catch (photoError) {
          console.error('Passport photo submission error:', photoError)
          toast('Application submitted, but passport photos could not be emailed. Please send them to admin@kadcoslubaga.co.ug.', { icon: '⚠️' })
        }
      }

      setIsSubmitted(true)
      toast.success('Application submitted successfully!')

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData(initialFormData)
        setPhotoFiles({ individual: [], signatory1: [], signatory2: [], signatory3: [] })
        setNinErrors({})
      }, 3000)

    } catch (error) {
      console.error('Error submitting application:', error)

      // The Google Sheet proxy can fail (e.g. the Apps Script deployment
      // rejecting the request) independently of anything the applicant did.
      // Fall back to a pre-filled email so the application is never lost.
      try {
        const currentMembership = membershipOptions.find(opt => opt.id === selectedMembership)
        const summaryLines = Object.entries(formData)
          .filter(([, value]) => value !== '' && value !== null && value !== undefined)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
        const mailBody = `${currentMembership?.title || 'Membership'} application (auto-submission failed, sent via fallback):\n\n${summaryLines}`
        const mailtoLink = `mailto:admin@kadcoslubaga.co.ug?subject=${encodeURIComponent(`KADCOS ${currentMembership?.title || 'Membership'} Application - ${formData.name || formData.jointAccountName || 'Applicant'}`)}&body=${encodeURIComponent(mailBody)}`
        window.location.href = mailtoLink
        toast('Our online form is temporarily having trouble. We\'ve opened an email with your details pre-filled — please hit send so your application isn\'t lost.', { icon: '⚠️', duration: 8000 })
      } catch (fallbackError) {
        console.error('Mailto fallback also failed:', fallbackError)
        toast.error('Failed to submit application. Please email your details directly to admin@kadcoslubaga.co.ug.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderNINInput = (fieldName, label = 'National ID Number (NIN) *') => (
    <div>
      <label className="block text-gray-700 font-marcellus mb-2">
        {label}
      </label>
      <input
        type="text"
        name={fieldName}
        value={formData[fieldName]}
        onChange={handleChange}
        onBlur={() => handleNINBlur(fieldName)}
        required
        maxLength={14}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus ${ninErrors[fieldName] ? 'border-red-400' : 'border-gray-300'}`}
        placeholder="e.g. CM12345678AB"
      />
      {ninErrors[fieldName] && (
        <p className="text-xs text-red-500 mt-1">
          Enter a valid 14-character Ugandan NIN (2 letters followed by 12 letters/numbers). This checks the format only.
        </p>
      )}
    </div>
  )

  const renderPassportPhotoInput = (key, label = 'Passport Photo(s)') => (
    <div>
      <label className="block text-gray-700 font-marcellus mb-2">
        {label} <span className="text-gray-400 font-normal">(JPEG/PNG, max 800KB each, up to 2 photos)</span>
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={(e) => handlePhotoChange(key, e)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
      />
      {photoFiles[key]?.length > 0 && (
        <p className="text-xs text-green-600 mt-1">
          ✓ {photoFiles[key].map(f => f.name).join(', ')}
        </p>
      )}
    </div>
  )

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Name of the branch you're joining *
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
            >
              <option value="">Select a branch</option>
              {BRANCHES.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
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
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              District *
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Enter district"
            />
          </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Who introduced you to KADCOS? (Name)
            </label>
            <input
              type="text"
              name="referrerName"
              value={formData.referrerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Name of the person who introduced you"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-marcellus mb-2">
              Their Contact
            </label>
            <input
              type="tel"
              name="referrerContact"
              value={formData.referrerContact}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
              placeholder="Their phone number"
            />
          </div>
        </div>

        {selectedMembership === 'individual' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-marcellus mb-2">
                  Full Name *
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

              {renderNINInput('nin')}
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

            {renderPassportPhotoInput('individual')}

            <div>
              <label className="block text-gray-700 font-marcellus mb-2">
                Other Society Memberships
              </label>
              <textarea
                name="otherSociety"
                value={formData.otherSociety}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="List any other societies you're a member of"
              />
            </div>
          </>
        )}
      </>
    )

    const renderJointSignatories = () => (
      <div className="border-t pt-6 mt-6">
        <h3 className="text-xl font-bold text-dark mb-2 font-marcellus">
          Account Signatories
        </h3>
        <p className="text-sm text-gray-500 mb-4 font-marcellus">
          Each signatory's personal details are captured individually below, since signatories may differ in gender, marital status, and other details.
        </p>
        <div className="space-y-6">
          {[1, 2].map((index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg space-y-4">
              <h4 className="text-lg font-semibold text-dark font-marcellus">
                Signatory {index}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name={`signatory${index}Name`}
                    value={formData[`signatory${index}Name`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Full name"
                  />
                </div>
                {renderNINInput(`signatory${index}NIN`)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Gender *
                  </label>
                  <select
                    name={`signatory${index}Gender`}
                    value={formData[`signatory${index}Gender`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
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
                    name={`signatory${index}MaritalStatus`}
                    value={formData[`signatory${index}MaritalStatus`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
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
                    name={`signatory${index}DateOfBirth`}
                    value={formData[`signatory${index}DateOfBirth`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Religion *
                  </label>
                  <input
                    type="text"
                    name={`signatory${index}Religion`}
                    value={formData[`signatory${index}Religion`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Religion"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Occupation *
                  </label>
                  <input
                    type="text"
                    name={`signatory${index}Occupation`}
                    value={formData[`signatory${index}Occupation`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Occupation"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name={`signatory${index}Contact`}
                    value={formData[`signatory${index}Contact`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Contact number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name={`signatory${index}Whatsapp`}
                    value={formData[`signatory${index}Whatsapp`]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="WhatsApp number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name={`signatory${index}Email`}
                    value={formData[`signatory${index}Email`]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Number of Dependents *
                  </label>
                  <input
                    type="number"
                    name={`signatory${index}Dependents`}
                    value={formData[`signatory${index}Dependents`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Number of dependents"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Education Level *
                  </label>
                  <input
                    type="text"
                    name={`signatory${index}EducationLevel`}
                    value={formData[`signatory${index}EducationLevel`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Education level"
                  />
                </div>
              </div>

              {renderPassportPhotoInput(`signatory${index}`, `Signatory ${index} Passport Photo(s)`)}
            </div>
          ))}
        </div>
      </div>
    )

    const renderGroupSignatories = () => (
      <div className="border-t pt-6 mt-6">
        <h3 className="text-xl font-bold text-dark mb-4 font-marcellus">
          Account Signatories
        </h3>
        <div className="space-y-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg space-y-4">
              <h4 className="text-lg font-semibold text-dark mb-3 font-marcellus">
                Signatory {index}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name={`signatory${index}Name`}
                    value={formData[`signatory${index}Name`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Full name"
                  />
                </div>
                {renderNINInput(`signatory${index}NIN`)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-marcellus mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name={`signatory${index}Contact`}
                    value={formData[`signatory${index}Contact`]}
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
                    name={`signatory${index}Email`}
                    value={formData[`signatory${index}Email`]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                    placeholder="Email address"
                  />
                </div>
              </div>
              {renderPassportPhotoInput(`signatory${index}`, `Signatory ${index} Passport Photo(s)`)}
            </div>
          ))}
        </div>
      </div>
    )

    return (
      <>
        {commonFields}
        {selectedMembership === 'joint' && renderJointSignatories()}
        {selectedMembership === 'group' && renderGroupSignatories()}
      </>
    )
  }

  return (
    <div className="min-h-screen pt-0">
      <SEOHead page="membership" />
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
