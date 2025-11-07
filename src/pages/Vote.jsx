// src/pages/Vote.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Vote = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [positions, setPositions] = useState([]);
  const [applications, setApplications] = useState([]);
  const [votes, setVotes] = useState([]);

  // Mock data structure - replace with actual Google Forms API integration
  const mockPositions = [
    {
      id: 1,
      title: 'Board Chairperson',
      qualifications: 'Minimum 5 years leadership experience, financial literacy, cooperative principles knowledge',
      candidates: [
        { id: 1, name: 'Mrs. Nseerikomawa Josephine', votes: 45, image: '/images/Nseerikomawa_Josephine.jpg', status: 'approved' },
        { id: 2, name: 'Candidate B', votes: 30, image: '/images/placeholder.jpg', status: 'approved' },
        { id: 3, name: 'Candidate C', votes: 25, image: '/images/placeholder.jpg', status: 'pending' },
      ]
    },
    {
      id: 2,
      title: 'Vice Chairperson',
      qualifications: 'Minimum 3 years leadership experience, understanding of cooperative governance',
      candidates: [
        { id: 1, name: 'Council Jude Mbabaali', votes: 50, image: '/images/Jude_Mbabaali.jpg', status: 'approved' },
        { id: 2, name: 'Candidate D', votes: 35, image: '/images/placeholder.jpg', status: 'approved' },
        { id: 3, name: 'Candidate E', votes: 15, image: '/images/placeholder.jpg', status: 'approved' },
      ]
    },
    {
      id: 3,
      title: 'Treasurer',
      qualifications: 'Accounting qualification, financial management experience, integrity clearance',
      candidates: [
        { id: 1, name: 'Mr. Tenywa Herman Musisi', votes: 60, image: '/images/Tenywa_Herman.jpg', status: 'approved' },
        { id: 2, name: 'Candidate F', votes: 40, image: '/images/placeholder.jpg', status: 'approved' },
      ]
    },
    // Add more positions...
  ];

  useEffect(() => {
    // Initialize with mock data
    setPositions(mockPositions);
    // TODO: Fetch actual data from Google Forms
  }, []);

  const calculatePercentage = (candidateVotes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((candidateVotes / totalVotes) * 100).toFixed(1);
  };

  const handleVote = (positionId, candidateId) => {
    // TODO: Implement vote submission to Google Forms
    console.log(`Voted for position ${positionId}, candidate ${candidateId}`);
    alert('Vote submitted successfully!');
  };

  const handleApplication = (positionId, applicationData) => {
    // TODO: Implement application submission to Google Forms
    console.log(`Applied for position ${positionId} with data:`, applicationData);
    alert('Application submitted successfully! Your application will be reviewed by the vetting committee.');
  };

  // Get only approved candidates for voting
  const getApprovedCandidates = (candidates) => {
    return candidates.filter(candidate => candidate.status === 'approved');
  };

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
            Leadership Elections 2025/26
          </h1>
          <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
            Apply for leadership positions or vote for your preferred candidates. 
            All applications undergo a vetting process before appearing on the ballot.
          </p>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <h3 className="text-xl font-bold text-secondary mb-2 font-marcellus">
                {position.title}
              </h3>
              
              {/* Top 3 Approved Candidates Preview */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3 font-marcellus">
                  Current Standings:
                </h4>
                {approvedCandidates.length > 0 ? (
                  <div className="space-y-2">
                    {approvedCandidates.slice(0, 3).map((candidate, index) => (
                      <div key={candidate.id} className="flex items-center justify-between bg-white px-3 py-2 rounded">
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
                  <p className="text-gray-500 text-sm font-marcellus">No approved candidates yet</p>
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
                        <img 
                          src={candidate.image} 
                          alt={candidate.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Application Section Component
const ApplicationSection = ({ positions, onApply }) => {
  const [applicationForm, setApplicationForm] = useState({
    positionId: '',
    fullName: '',
    email: '',
    phone: '',
    membershipNumber: '',
    qualifications: '',
    experience: '',
    vision: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applicationForm.positionId && applicationForm.fullName) {
      onApply(applicationForm.positionId, applicationForm);
      setApplicationForm({
        positionId: '',
        fullName: '',
        email: '',
        phone: '',
        membershipNumber: '',
        qualifications: '',
        experience: '',
        vision: ''
      });
    }
  };

  const getPositionQualifications = (positionId) => {
    const position = positions.find(p => p.id === parseInt(positionId));
    return position ? position.qualifications : '';
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
            Application Form
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Select Position *
              </label>
              <select
                value={applicationForm.positionId}
                onChange={(e) => setApplicationForm({...applicationForm, positionId: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                required
              >
                <option value="">Choose a position</option>
                {positions.map((position) => (
                  <option key={position.id} value={position.id}>
                    {position.title}
                  </option>
                ))}
              </select>
              {applicationForm.positionId && (
                <div className="mt-2 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-blue-800 font-marcellus">
                    <strong>Qualifications Required:</strong> {getPositionQualifications(applicationForm.positionId)}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={applicationForm.fullName}
                  onChange={(e) => setApplicationForm({...applicationForm, fullName: e.target.value})}
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
                  value={applicationForm.membershipNumber}
                  onChange={(e) => setApplicationForm({...applicationForm, membershipNumber: e.target.value})}
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
                  value={applicationForm.email}
                  onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
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
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Qualifications & Education *
              </label>
              <textarea
                value={applicationForm.qualifications}
                onChange={(e) => setApplicationForm({...applicationForm, qualifications: e.target.value})}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="List your relevant qualifications and educational background"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Leadership Experience *
              </label>
              <textarea
                value={applicationForm.experience}
                onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Describe your relevant leadership and cooperative experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marcellus">
                Vision for the Position *
              </label>
              <textarea
                value={applicationForm.vision}
                onChange={(e) => setApplicationForm({...applicationForm, vision: e.target.value})}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                placeholder="Share your vision and goals for this leadership position"
                required
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800 font-marcellus">
                <strong>Note:</strong> All applications will be reviewed by the vetting committee. 
                Only approved candidates will appear on the voting ballot. You will be notified of your application status.
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

        {/* Available Positions with Requirements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-secondary mb-4 font-marcellus">
            Available Positions & Requirements
          </h3>
          
          <div className="space-y-6">
            {positions.map((position) => (
              <div key={position.id} className="bg-white p-4 rounded border border-gray-200">
                <h4 className="font-bold text-secondary font-marcellus mb-2">
                  {position.title}
                </h4>
                <p className="text-sm text-gray-600 font-marcellus mb-3">
                  <strong>Qualifications:</strong> {position.qualifications}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-marcellus">
                    {getApprovedCandidates(position.candidates).length} approved candidates
                  </span>
                  <span className="text-primary font-marcellus">
                    {position.candidates.length} total applications
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Application Process Info */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-secondary mb-3 font-marcellus">
              Application Process
            </h4>
            <ol className="text-sm text-gray-700 space-y-2 font-marcellus">
              <li>1. Submit your application with required information</li>
              <li>2. Vetting committee reviews all applications</li>
              <li>3. Approved candidates are notified</li>
              <li>4. Approved candidates appear on voting ballot</li>
              <li>5. Members vote for their preferred candidates</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function to get approved candidates
const getApprovedCandidates = (candidates) => {
  return candidates.filter(candidate => candidate.status === 'approved');
};

export default Vote;