// src/pages/Vote.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Vote = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the valid member ID range (hidden from users)
  const validMemberIdRange = {
    min: 9838001,
    max: 98381736
  };

  // Position qualifications based on the document
  const positionQualifications = {
    'Board Chairperson': {
      membershipDuration: '7 years',
      shares: '100 shares',
      savings: 'UGX 1,000,000',
      education: 'Not specified',
      experience: 'Must have held a position on the Committee',
      languages: 'Fluent in Luganda and English',
      additional: 'Actively attending all AGMs, actively transacting with society'
    },
    'Vice Chairperson': {
      membershipDuration: '7 years',
      shares: '100 shares',
      savings: 'UGX 1,000,000',
      education: 'Not specified',
      experience: 'Leadership experience',
      languages: 'Fluent in Luganda and English',
      additional: 'Actively attending all AGMs, actively transacting with society'
    },
    'Treasurer': {
      membershipDuration: '7 years',
      shares: 'Not specified',
      savings: 'UGX 1,000,000',
      education: 'Diploma in Business Management or Accounting',
      experience: 'Accounting and financial management skills',
      languages: 'Read and write English and Luganda',
      additional: 'Computer literate, actively transacting with society'
    },
    'Secretary': {
      membershipDuration: '5 years',
      shares: '50 shares',
      savings: 'UGX 500,000',
      education: 'Certificate in Secretarial or Business Management',
      experience: 'Administrative experience',
      languages: 'Fluent in Luganda and English',
      additional: 'Computer literate, actively transacting with society, actively attending AGMs'
    },
    'Committee Member': {
      membershipDuration: '5 years',
      shares: '50 shares',
      savings: 'UGX 500,000',
      education: 'Certificate in any field',
      experience: 'Not specified',
      languages: 'Read and write English and Luganda',
      additional: 'Actively transacting with society'
    },
    'Supervisory Board Member': {
      membershipDuration: 'Same as Chairperson',
      shares: 'Same as Chairperson',
      savings: 'Same as Chairperson',
      education: 'Administrative, financial and accounting knowledge preferred',
      experience: 'Clean record in cooperative community',
      languages: 'Same as Chairperson',
      additional: 'Persons with administrative, financial and accounting skills if available'
    }
  };

  // Mock data - will be replaced with actual data from your backend
  const mockPositions = [
    {
      id: 1,
      title: 'Board Chairperson',
      type: 'executive',
      candidates: [
        { id: 1, name: 'Mrs. Nseerikomawa Josephine', votes: 0, status: 'approved' },
        { id: 2, name: 'John Kamya', votes: 0, status: 'approved' },
        { id: 3, name: 'Sarah Nakato', votes: 0, status: 'pending' },
      ]
    },
    {
      id: 2,
      title: 'Vice Chairperson',
      type: 'executive',
      candidates: [
        { id: 1, name: 'Council Jude Mbabaali', votes: 0, status: 'approved' },
        { id: 2, name: 'David Ssemwanga', votes: 0, status: 'approved' },
      ]
    },
    {
      id: 3,
      title: 'Treasurer',
      type: 'executive',
      candidates: [
        { id: 1, name: 'Mr. Tenywa Herman Musisi', votes: 0, status: 'approved' },
        { id: 2, name: 'Grace Nalubega', votes: 0, status: 'approved' },
      ]
    },
    {
      id: 4,
      title: 'Secretary',
      type: 'executive',
      candidates: [
        { id: 1, name: 'Ms. Namaganda Justine', votes: 0, status: 'approved' },
        { id: 2, name: 'Peter Wasswa', votes: 0, status: 'approved' },
      ]
    },
    {
      id: 5,
      title: 'Committee Member',
      type: 'committee',
      candidates: [
        { id: 1, name: 'Mr. Budde Harry Dominic', votes: 0, status: 'approved' },
        { id: 2, name: 'Mrs. Kalanda Annette Kizza', votes: 0, status: 'approved' },
        { id: 3, name: 'Mr. Ssekamatte Patrick', votes: 0, status: 'approved' },
      ]
    },
    {
      id: 6,
      title: 'Supervisory Board Member',
      type: 'supervisory',
      candidates: [
        { id: 1, name: 'Mr. Gerald Katusabe', votes: 0, status: 'approved' },
        { id: 2, name: 'Mrs. Josephine Sekatuba', votes: 0, status: 'approved' },
        { id: 3, name: 'Mrs. Rose Ssali', votes: 0, status: 'approved' },
      ]
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setPositions(mockPositions);
    setLoading(false);
    // TODO: Fetch actual data from backend
  }, []);

  const calculatePercentage = (candidateVotes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((candidateVotes / totalVotes) * 100).toFixed(1);
  };

  const isValidMemberId = (memberId) => {
    const idNumber = parseInt(memberId);
    return !isNaN(idNumber) && 
           idNumber >= validMemberIdRange.min && 
           idNumber <= validMemberIdRange.max;
  };

  const handleVote = async (positionId, candidateId) => {
    // Prompt for member ID without revealing the range
    const memberId = window.prompt(
      'Please enter your Member ID number to vote:'
    );

    // If user cancels the prompt
    if (memberId === null) {
      return;
    }

    // Validate member ID
    if (!isValidMemberId(memberId)) {
      alert('Invalid Member ID! Please enter a valid Member ID.');
      return;
    }

    // TODO: Implement vote submission to backend with member ID verification
    console.log(`Voted for position ${positionId}, candidate ${candidateId} by member ${memberId}`);
    
    // Check if this member has already voted for this position (you might want to implement this)
    // For now, we'll proceed with the vote
    
    // Temporary mock update
    setPositions(prev => prev.map(position => {
      if (position.id === positionId) {
        return {
          ...position,
          candidates: position.candidates.map(candidate => 
            candidate.id === candidateId 
              ? { ...candidate, votes: candidate.votes + 1 }
              : candidate
          )
        };
      }
      return position;
    }));
    
    alert('Vote submitted successfully!');
  };

  const handleApplication = async (applicationData) => {
    // TODO: Submit application to Google Forms/backend
    console.log('Application submitted:', applicationData);
    
    // Here you would typically send data to Google Forms via their API
    // or to your backend which then forwards to Google Forms
    
    alert('Application submitted successfully! Your application will be reviewed by the vetting committee.');
  };

  // Get only approved candidates for voting
  const getApprovedCandidates = (candidates) => {
    return candidates.filter(candidate => candidate.status === 'approved');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-marcellus">Loading election data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-secondary mb-4 font-marcellus">
            KADCOS Leadership Elections 2026
          </h1>
          <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
            Apply for leadership positions or vote for your preferred candidates. 
            All applications undergo a thorough vetting process based on cooperative policies.
          </p>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-blue-800 font-marcellus">
              <strong>Voting Eligibility:</strong> Only verified members with valid Member ID numbers can vote.
            </p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1 flex">
            <button
              onClick={() => setActiveTab('vote')}
              className={`px-6 py-3 rounded-md font-marcellus font-semibold transition-all duration-300 ${
                activeTab === 'vote'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Vote
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`px-6 py-3 rounded-md font-marcellus font-semibold transition-all duration-300 ${
                activeTab === 'apply'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Apply for Position
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === 'vote' ? (
            <VoteSection 
              positions={positions} 
              onVote={handleVote}
              calculatePercentage={calculatePercentage}
              getApprovedCandidates={getApprovedCandidates}
            />
          ) : (
            <ApplicationSection 
              positions={positions}
              positionQualifications={positionQualifications}
              onApply={handleApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Vote Section Component - Only shows approved candidates
const VoteSection = ({ positions, onVote, calculatePercentage, getApprovedCandidates }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6 font-marcellus text-center">
        Cast Your Vote
      </h2>
      <p className="text-gray-600 text-center mb-8 font-marcellus">
        Vote for your preferred candidates in each position. Only vetted and approved candidates are displayed.
      </p>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800 font-marcellus text-center">
          <strong>Important:</strong> You will be asked to enter your Member ID when voting. 
          Only verified members with valid Member IDs can vote.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {positions.map((position) => {
          const approvedCandidates = getApprovedCandidates(position.candidates);
          const totalVotes = approvedCandidates.reduce((sum, candidate) => sum + candidate.votes, 0);
          
          return (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-secondary font-marcellus">
                  {position.title}
                </h3>
                <span className="bg-primary text-white text-xs px-2 py-1 rounded font-marcellus">
                  {position.type === 'executive' ? 'Executive' : 
                   position.type === 'supervisory' ? 'Supervisory' : 'Committee'}
                </span>
              </div>
              
              {/* Top 3 Approved Candidates Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3 font-marcellus">
                  Current Standings:
                </h4>
                {approvedCandidates.length > 0 ? (
                  <div className="space-y-2">
                    {approvedCandidates.slice(0, 3).map((candidate, index) => (
                      <div key={candidate.id} className="flex items-center justify-between bg-white px-3 py-2 rounded border">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-primary text-white rounded-full text-xs flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                          <span className="font-marcellus text-sm">{candidate.name}</span>
                        </div>
                        <span className="text-primary font-bold text-sm">
                          {calculatePercentage(candidate.votes, totalVotes)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm font-marcellus text-center py-4">
                    No approved candidates yet
                  </p>
                )}
              </div>

              {/* Voting Options - Only approved candidates */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-600 mb-2 font-marcellus">
                  Select your candidate:
                </h4>
                {approvedCandidates.length > 0 ? (
                  approvedCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between bg-white p-3 rounded border">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary font-bold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-marcellus">{candidate.name}</span>
                      </div>
                      <button
                        onClick={() => onVote(position.id, candidate.id)}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-marcellus text-sm"
                      >
                        Vote
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4 font-marcellus">
                    No candidates approved for this position yet
                  </p>
                )}
              </div>

              {/* Total votes for this position */}
              {approvedCandidates.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center font-marcellus">
                    Total votes: {totalVotes}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Application Section Component
const ApplicationSection = ({ positions, positionQualifications, onApply }) => {
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
    agreesToTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!applicationForm.positionId || !applicationForm.fullName || !applicationForm.agreesToTerms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }

    try {
      await onApply(applicationForm);
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
        agreesToTerms: false
      });
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

  const getSelectedPosition = () => {
    return positions.find(p => p.id === parseInt(applicationForm.positionId));
  };

  const getPositionQualification = (positionTitle) => {
    return positionQualifications[positionTitle] || {};
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary mb-6 font-marcellus text-center">
        Apply for Leadership Position
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-secondary mb-4 font-marcellus">
            Candidate Application Form
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Position Applied For *
              </label>
              <select
                name="positionId"
                value={applicationForm.positionId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              >
                <option value="">Select a position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={applicationForm.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Membership Number *
                </label>
                <input
                  type="text"
                  name="membershipNumber"
                  value={applicationForm.membershipNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your membership number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicationForm.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={applicationForm.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            {/* Membership Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Membership Duration (Years) *
                </label>
                <input
                  type="number"
                  name="membershipDuration"
                  value={applicationForm.membershipDuration}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="How many years as member"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Current Number of Shares *
                </label>
                <input
                  type="number"
                  name="currentShares"
                  value={applicationForm.currentShares}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your current shares"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Current Savings Balance (UGX) *
              </label>
              <input
                type="number"
                name="currentSavings"
                value={applicationForm.currentSavings}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Your current savings balance"
                required
              />
            </div>

            {/* Qualifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Educational Qualifications *
              </label>
              <textarea
                name="education"
                value={applicationForm.education}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="List your educational qualifications and certificates"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Leadership & Cooperative Experience *
              </label>
              <textarea
                name="experience"
                value={applicationForm.experience}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Describe your relevant leadership and cooperative experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Additional Qualifications & Skills *
              </label>
              <textarea
                name="qualifications"
                value={applicationForm.qualifications}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Other qualifications, skills, language proficiency, etc."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Vision for the Position *
              </label>
              <textarea
                name="vision"
                value={applicationForm.vision}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Share your vision, goals, and plans for this leadership position"
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreesToTerms"
                checked={applicationForm.agreesToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                required
              />
              <label className="ml-2 block text-sm text-gray-700 font-marcellus">
                I confirm that all information provided is accurate and I meet the eligibility requirements *
              </label>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800 font-marcellus">
                <strong>Note:</strong> All applications will be reviewed by the vetting committee against the qualification requirements. 
                Only approved candidates will appear on the voting ballot. You will be notified of your application status via email.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded hover:bg-secondary transition-colors font-marcellus font-semibold"
            >
              Submit Application
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
              <h3 className="text-lg font-bold text-secondary mb-4 font-marcellus">
                Requirements for {getSelectedPosition()?.title}
              </h3>
              <div className="space-y-3">
                {Object.entries(getPositionQualification(getSelectedPosition()?.title)).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700 font-marcellus capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}:
                    </span>
                    <span className="text-sm text-gray-600 font-marcellus text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Eligibility Requirements */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-secondary mb-4 font-marcellus">
              General Eligibility Requirements
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 font-marcellus list-disc list-inside">
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

          {/* Application Process */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h4 className="font-bold text-secondary mb-3 font-marcellus">
              Application & Election Process
            </h4>
            <ol className="text-sm text-gray-700 space-y-2 font-marcellus">
              <li><strong>1. Application:</strong> Submit complete application with required information</li>
              <li><strong>2. Vetting:</strong> Committee reviews against qualification requirements</li>
              <li><strong>3. Approval:</strong> Eligible candidates are approved for ballot</li>
              <li><strong>4. Voting:</strong> Members vote for preferred candidates</li>
              <li><strong>5. Results:</strong> Winners announced after voting period</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Vote;