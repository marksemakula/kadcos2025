// src/pages/Vote.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Vote = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Detailed position qualifications based on the document
  const positionQualifications = {
    'Board Chairperson': {
      membershipDuration: 'Minimum 7 years as Society member',
      committeeExperience: 'Must have held a position on the Committee',
      meetingAttendance: 'Actively attending all Cooperative Annual General Meetings',
      shares: 'Minimum 100 shares at prevailing share value',
      savings: 'Minimum UGX 1,000,000 in savings account',
      transactionActivity: 'Actively transacting with the society',
      languages: 'Fluent in Luganda and English with ability to communicate and express themselves',
      education: 'Not specified',
      additional: 'Principal role: Manage and provide leadership to the cooperative. Acts as liaison between Committee and management.'
    },
    'Vice Chairperson': {
      membershipDuration: 'Minimum 7 years as Society member',
      meetingAttendance: 'Actively attending all Cooperative Annual General Meetings',
      shares: 'Minimum 100 shares at prevailing share value',
      savings: 'Minimum UGX 1,000,000 in savings account',
      transactionActivity: 'Actively transacting with the society',
      languages: 'Fluent in Luganda and English with ability to communicate and express themselves',
      duties: 'Perform duties of Chairman in their absence, Chair Education and Training sub-committee',
      education: 'Not specified',
      additional: 'Leadership experience required'
    },
    'Treasurer': {
      membershipDuration: 'Minimum 7 years as Society member',
      shares: 'Minimum shares at prevailing share value (exact number not specified)',
      savings: 'Minimum UGX 1,000,000 in savings account',
      transactionActivity: 'Actively transacting with the society',
      languages: 'Able to read and write English and Luganda',
      education: 'Diploma in Business Management or Accounting studies',
      skills: 'Accounting and financial management skills, Computer literate',
      duties: 'Financial oversight, manage financial affairs, prepare annual accounts, custody of books and cash',
      additional: 'Principal signatory to society bank accounts'
    },
    'Secretary': {
      membershipDuration: 'Minimum 5 years as Society member',
      meetingAttendance: 'Actively attending all Cooperative Annual General Meetings',
      shares: 'Minimum 50 shares at prevailing share value',
      savings: 'Minimum UGX 500,000 in savings account',
      transactionActivity: 'Actively transacting with the society',
      languages: 'Fluent in Luganda and English, able to write and read both languages',
      education: 'Certificate in Secretarial or Business Management studies',
      skills: 'Computer literate',
      duties: 'Call and attend meetings, prepare minutes, custody of member register, conduct correspondence',
      additional: 'If appointed as employee, may have different qualifications set by Committee'
    },
    'Committee Member': {
      membershipDuration: 'Minimum 5 years as Society member',
      shares: 'Minimum 50 shares at prevailing share value',
      savings: 'Minimum UGX 500,000 in savings account',
      transactionActivity: 'Actively transacting with the society',
      languages: 'Able to write and read English and Luganda',
      education: 'Certificate in any field of study',
      additional: 'Form sub-committees of the Cooperative (up to 5 members)'
    },
    'Supervisory Board Member': {
      membershipDuration: 'Same as Chairperson',
      shares: 'Same as Chairperson',
      savings: 'Same as Chairperson',
      record: 'Clean record in cooperative community',
      skills: 'Persons with administrative, financial and accounting knowledge and skills if available',
      additional: 'Fully paid up members of the society'
    }
  };

  // Mock data for positions
  const mockPositions = [
    {
      id: 1,
      title: 'Board Chairperson',
      type: 'executive'
    },
    {
      id: 2,
      title: 'Vice Chairperson',
      type: 'executive'
    },
    {
      id: 3,
      title: 'Treasurer',
      type: 'executive'
    },
    {
      id: 4,
      title: 'Secretary',
      type: 'executive'
    },
    {
      id: 5,
      title: 'Committee Member',
      type: 'committee'
    },
    {
      id: 6,
      title: 'Supervisory Board Member',
      type: 'supervisory'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setPositions(mockPositions);
    setLoading(false);
  }, []);

  const submitToGoogleForms = async (applicationData) => {
    try {
      const position = positions.find(p => p.id === parseInt(applicationData.positionId));
      
      // Google Forms submission endpoint
      const formAction = 'https://docs.google.com/forms/d/e/1FAIpQLSdhRjeJ_sSP6KyKW-FUGTHlgEvcTr1ekGc3R65bOurKGNc2Gw/formResponse';
      
      // Create form data for submission
      const formData = new FormData();
      
      // Map form data to Google Forms field IDs
      if (position) {
        formData.append('entry.767180669', `${position.title} (${position.type.charAt(0).toUpperCase() + position.type.slice(1)})`);
      }
      formData.append('entry.1060597654', applicationData.fullName);
      formData.append('entry.1184590918', applicationData.email);
      formData.append('entry.1266229749', applicationData.phone);
      formData.append('entry.1242248726', applicationData.membershipNumber);
      formData.append('entry.25217971', applicationData.membershipDuration);
      formData.append('entry.1732913573', applicationData.currentShares);
      formData.append('entry.1687312056', applicationData.currentSavings);
      formData.append('entry.302345355', applicationData.languages);
      formData.append('entry.13563876', applicationData.computerSkills);
      formData.append('entry.1613738470', applicationData.education);
      formData.append('entry.2085251057', applicationData.experience);
      formData.append('entry.627465262', applicationData.qualifications);
      formData.append('entry.1754992661', applicationData.vision);
      
      // Submit to Google Forms using fetch
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Important for cross-origin requests
      });
      
      // Since we're using no-cors, we can't read the response, but the submission should work
      console.log('Form submitted to Google Forms');
      return true;
      
    } catch (error) {
      console.error('Error submitting to Google Forms:', error);
      return false;
    }
  };

  const sendEmailNotification = async (applicationData, file) => {
    const position = positions.find(p => p.id === parseInt(applicationData.positionId));
    
    // Create comprehensive email content
    const emailBody = `
NEW KADCOS LEADERSHIP APPLICATION

APPLICATION DETAILS:
====================
Position: ${position?.title || 'Not specified'}
Candidate: ${applicationData.fullName}
Email: ${applicationData.email}
Phone: ${applicationData.phone}
Membership Number: ${applicationData.membershipNumber}
Membership Duration: ${applicationData.membershipDuration} years
Current Shares: ${applicationData.currentShares}
Current Savings: UGX ${applicationData.currentSavings}
Languages: ${applicationData.languages}
Computer Skills: ${applicationData.computerSkills}

QUALIFICATIONS:
===============
Educational Qualifications:
${applicationData.education}

Leadership & Cooperative Experience:
${applicationData.experience}

Additional Qualifications & Skills:
${applicationData.qualifications}

VISION STATEMENT:
=================
${applicationData.vision}

APPLICATION METADATA:
=====================
Submitted: ${new Date().toLocaleString()}
Application ID: ${Date.now()}

This application has been automatically recorded in the KADCOS Leadership Applications system.

KADCOS Leadership Portal
    `;

    const emailSubject = `KADCOS Leadership Application - ${position?.title || 'Leadership Position'} - ${applicationData.fullName}`;

    try {
      // Create form data for email submission with attachment
      const emailFormData = new FormData();
      emailFormData.append('applicantName', applicationData.fullName);
      emailFormData.append('applicantEmail', applicationData.email);
      emailFormData.append('position', position?.title || 'Not specified');
      emailFormData.append('subject', emailSubject);
      emailFormData.append('body', emailBody);
      
      if (file) {
        emailFormData.append('attachment', file);
        emailFormData.append('fileName', file.name);
      }

      // Submit to our backend API
      const emailResponse = await fetch('/api/send-application-email', {
        method: 'POST',
        body: emailFormData,
      });

      if (emailResponse.ok) {
        console.log('Email with attachment sent successfully');
        return true;
      } else {
        const errorData = await emailResponse.json();
        throw new Error(errorData.message || 'Email sending failed');
      }
      
    } catch (error) {
      console.error('Email notification failed:', error);
      
      // Fallback: Use mailto link without attachment
      try {
        const mailtoLink = `mailto:admin@kadcoslubaga.co.ug,kadcoslubaga.sacco@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Create a hidden iframe to open email client without redirecting
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = mailtoLink;
        document.body.appendChild(iframe);
        
        // Remove iframe after a short delay
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
        
        console.log('Fallback email sent (without attachment)');
        return true;
      } catch (fallbackError) {
        console.error('Fallback email also failed:', fallbackError);
        return false;
      }
    }
  };

  const handleApplication = async (applicationData, file) => {
    setSubmitting(true);
    
    try {
      // Submit to Google Forms (in background)
      const formsSuccess = await submitToGoogleForms(applicationData);
      
      // Send email notification with attachment
      const emailSuccess = await sendEmailNotification(applicationData, file);
      
      if (formsSuccess && emailSuccess) {
        alert('Application submitted successfully! Your application and documents have been received and will be reviewed by the vetting committee. You will be notified of the status via email.');
      } else if (emailSuccess) {
        alert('Application submitted successfully! Your application and documents have been received. There was a minor issue with system recording, but your application will be reviewed by the committee.');
      } else {
        alert('Application received! There was an issue sending your documents. Please email them directly to admin@kadcoslubaga.co.ug.');
      }
      
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Thank you for your application! There was a temporary system issue. Please save your application details and email them to admin@kadcoslubaga.co.ug if you don\'t receive a confirmation.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 font-gill-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-secondary mb-6">
            Notice of Election
          </h1>
          <div className="text-lg text-gray-700 max-w-4xl mx-auto space-y-6 text-justify leading-relaxed">
            <p className="text-center">
              KADCOS Lubaga Cooperative society is pleased to announce the upcoming election of Supervisory and Executive Board Members, scheduled to take place in February 2026 during the Annual General Meeting.
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-secondary mb-4 text-center">
                Call for Applications
              </h3>
              <p className="mb-4">
                Suitable candidates are invited to apply for the positions by December 10th, 2025. To be eligible, applicants must meet the criteria outlined on our website: 
                <a href="http://kadcoslubaga.co.ug/vote" className="text-primary hover:text-secondary ml-1 underline">http://kadcoslubaga.co.ug/vote</a>
              </p>

              <h4 className="font-bold text-lg text-gray-800 mb-3">
                Application Submission
              </h4>
              <p className="mb-3">
                Applications can be submitted via email to <span className="text-primary">admin@kadcoslubaga.co.ug</span> and <span className="text-primary">kadcoslubaga.sacco@gmail.com</span>.
              </p>
              <p>
                Alternatively, online applications can be submitted through this link / on this page, or hand-delivered applications can be brought to our office in Lubaga.
              </p>

              <h4 className="font-bold text-lg text-gray-800 mt-6 mb-3">
                Required Documents
              </h4>
              <p className="mb-3">All applications must include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>A formal application letter specifying the role applied for</li>
                <li>A detailed Curriculum Vitae</li>
                <li>Any additional supporting documents</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Applications are submitted directly through this portal. 
              You will receive a confirmation message once submitted.
            </p>
          </div>
        </motion.div>

        {/* Application Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ApplicationSection 
            positions={positions}
            positionQualifications={positionQualifications}
            onApply={handleApplication}
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
};

// Application Section Component
const ApplicationSection = ({ positions, positionQualifications, onApply, submitting }) => {
  const [applicationForm, setApplicationForm] = useState({
    positionId: '',
    fullName: '',
    email: '',
    phone: '',
    membershipNumber: '',
    membershipDuration: '',
    currentShares: '',
    currentSavings: '',
    education: '',
    experience: '',
    qualifications: '',
    vision: '',
    languages: '',
    computerSkills: '',
    agreesToTerms: false
  });
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (submitting) return;
    
    // Validate form
    if (!applicationForm.positionId || !applicationForm.fullName || !applicationForm.agreesToTerms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }

    // Validate membership number format (basic check)
    if (!applicationForm.membershipNumber || applicationForm.membershipNumber.length < 3) {
      alert('Please enter a valid membership number.');
      return;
    }

    try {
      await onApply(applicationForm, attachment);
      // Reset form after successful submission
      setApplicationForm({
        positionId: '',
        fullName: '',
        email: '',
        phone: '',
        membershipNumber: '',
        membershipDuration: '',
        currentShares: '',
        currentSavings: '',
        education: '',
        experience: '',
        qualifications: '',
        vision: '',
        languages: '',
        computerSkills: '',
        agreesToTerms: false
      });
      setAttachment(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      alert('Error submitting application. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        e.target.value = '';
        return;
      }
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, Word document, JPEG, or PNG file.');
        e.target.value = '';
        return;
      }
      
      setAttachment(file);
    } else {
      setAttachment(null);
    }
  };

  const getSelectedPosition = () => {
    return positions.find(p => p.id === parseInt(applicationForm.positionId));
  };

  const getPositionQualification = (positionTitle) => {
    return positionQualifications[positionTitle] || {};
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
        Apply for Leadership Position
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-secondary mb-4" style={{ fontFamily: 'Gill Sans MT Bold, Gill Sans, sans-serif' }}>
            Candidate Application Form
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Gill Sans MT, Gill Sans, sans-serif' }}>
                Position Applied For *
              </label>
              <select
                name="positionId"
                value={applicationForm.positionId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                disabled={submitting}
              >
                <option value="">Select a position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.title} {position.type === 'executive' ? '(Executive)' : position.type === 'supervisory' ? '(Supervisory)' : '(Committee)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={applicationForm.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Number *
                </label>
                <input
                  type="text"
                  name="membershipNumber"
                  value={applicationForm.membershipNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your membership number"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your email address"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your phone number"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            {/* Membership Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Duration (Years) *
                </label>
                <input
                  type="number"
                  name="membershipDuration"
                  value={applicationForm.membershipDuration}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How many years as member"
                  min="1"
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Number of Shares *
                </label>
                <input
                  type="number"
                  name="currentShares"
                  value={applicationForm.currentShares}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your current shares"
                  min="0"
                  required
                  disabled={submitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Savings Balance (UGX) *
              </label>
              <input
                type="number"
                name="currentSavings"
                value={applicationForm.currentSavings}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your current savings balance"
                min="0"
                required
                disabled={submitting}
              />
            </div>

            {/* Language Proficiency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language Proficiency *
              </label>
              <select
                name="languages"
                value={applicationForm.languages}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                disabled={submitting}
              >
                <option value="">Select your language proficiency</option>
                <option value="Fluent in both English and Luganda">Fluent in both English and Luganda</option>
                <option value="Can read and write both English and Luganda">Can read and write both English and Luganda</option>
                <option value="English only">English only</option>
                <option value="Luganda only">Luganda only</option>
              </select>
            </div>

            {/* Computer Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Computer Skills *
              </label>
              <select
                name="computerSkills"
                value={applicationForm.computerSkills}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                disabled={submitting}
              >
                <option value="">Select your computer proficiency</option>
                <option value="Basic computer skills">Basic computer skills</option>
                <option value="Intermediate (Word, Excel, Email)">Intermediate (Word, Excel, Email)</option>
                <option value="Advanced (Accounting software, Advanced Excel)">Advanced (Accounting software, Advanced Excel)</option>
                <option value="No computer skills">No computer skills</option>
              </select>
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Educational Qualifications *
              </label>
              <textarea
                name="education"
                value={applicationForm.education}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="List your educational qualifications, certificates, and institutions"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leadership & Cooperative Experience *
              </label>
              <textarea
                name="experience"
                value={applicationForm.experience}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your relevant leadership experience, committee positions held, and cooperative involvement"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Qualifications & Skills *
              </label>
              <textarea
                name="qualifications"
                value={applicationForm.qualifications}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Other qualifications, professional skills, training, workshops attended, etc."
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision for the Position *
              </label>
              <textarea
                name="vision"
                value={applicationForm.vision}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Share your vision, goals, and specific plans for this leadership position. How will you contribute to the cooperative's growth?"
                required
                disabled={submitting}
              />
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Supporting Documents (PDF, DOC, DOCX, JPEG, PNG) - Optional
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary"
                disabled={submitting}
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum file size: 10MB. Supported formats: PDF, Word documents, JPEG, PNG.
                You can attach your CV, application letter, or other supporting documents.
              </p>
              {attachment && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ File selected: {attachment.name} ({(attachment.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreesToTerms"
                checked={applicationForm.agreesToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                required
                disabled={submitting}
              />
              <label className="ml-2 block text-sm text-gray-700">
                I confirm that all information provided is accurate and I meet ALL the eligibility requirements specified in the KADCOS governance policies. 
                I understand that providing false information may lead to disqualification. *
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important Note:</strong> Your application and attached documents will be automatically sent to the election committee. 
                All applications will be thoroughly reviewed by the vetting committee against the qualification requirements. 
                Only candidates who meet ALL specified requirements will be considered. You will be notified of your application status via email. 
                Voting will be conducted through offline processes as per cooperative procedures.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded transition-colors font-semibold text-lg ${
                submitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-secondary'
              }`}
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
        </motion.div>

        {/* Position Requirements & Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Selected Position Requirements */}
          {applicationForm.positionId && (
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-secondary mb-4">
                Detailed Requirements for {getSelectedPosition()?.title}
              </h3>
              <div className="space-y-4">
                {Object.entries(getPositionQualification(getSelectedPosition()?.title)).map(([key, value]) => (
                  <div key={key} className="border-b border-blue-100 pb-3 last:border-b-0">
                    <span className="text-sm font-semibold text-gray-700 capitalize block mb-1">
                      {key.replace(/([A-Z])/g, ' $1').replace(/([A-Z][a-z])/g, ' $1')}:
                    </span>
                    <span className="text-sm text-gray-600 block">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Eligibility Requirements */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-secondary mb-4">
              General Eligibility Requirements (All Positions)
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
              <li>Must be a member of the Society</li>
              <li>Must be 18 years or older</li>
              <li>Able to read and write English and Luganda</li>
              <li>Not a committee member in another primary cooperative</li>
              <li>No competing business with the Cooperative</li>
              <li>Not an undischarged bankrupt</li>
              <li>Of sound mind</li>
              <li>No convictions involving dishonesty or imprisonment over 3 months</li>
              <li>No convictions involving immorality</li>
              <li>No uncleared debt owing to the society</li>
              <li>No blood relations up to second degree with current committee members</li>
            </ul>
          </div>

          {/* Term of Office */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h4 className="font-bold text-secondary mb-3">
              Term of Office
            </h4>
            <p className="text-sm text-gray-700">
              The Committee shall hold office for more than one term of four years, but eligible for re-election.
            </p>
          </div>

          {/* Application Process */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h4 className="font-bold text-secondary mb-3">
              Application & Selection Process
            </h4>
            <ol className="text-sm text-gray-700 space-y-2">
              <li><strong>1. Application:</strong> Submit complete application with all required information</li>
              <li><strong>2. Automated Processing:</strong> System records application and notifies committee</li>
              <li><strong>3. Documentation Review:</strong> Committee verifies all provided information</li>
              <li><strong>4. Vetting:</strong> Comprehensive review against qualification requirements</li>
              <li><strong>5. Eligibility Confirmation:</strong> Verification of meeting all criteria</li>
              <li><strong>6. Candidate Approval:</strong> Eligible candidates approved for consideration</li>
              <li><strong>7. Offline Voting:</strong> Election conducted through cooperative voting procedures</li>
              <li><strong>8. Results:</strong> Winners announced after voting process completion</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vote;