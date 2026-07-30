import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SEOHead from '../components/SEOHead';

const { FiBriefcase, FiMapPin, FiClock, FiCalendar, FiMail } = FiIcons;

const defaultJobs = [
  {
    id: 1,
    title: 'Credit Officer',
    type: 'Full-time',
    location: 'KADCOS Lubaga - Head Office',
    description: "KADCOS Lubaga Cooperative Society Ltd is looking for a dedicated Credit Officer to assess loan applications, manage credit risk, and support members through the borrowing process.",
    requirements: [
      "Bachelor's degree in Finance, Accounting, Business Administration or a related field",
      "At least 2 years' experience in credit or loan administration, preferably in a SACCO or financial institution",
      'Strong analytical and communication skills',
      'Proficiency in MS Office and financial software',
      'High level of integrity and confidentiality'
    ],
    deadline: '',
    howToApply: 'Send your CV, academic documents, and a cover letter to admin@kadcoslubaga.co.ug',
    datePosted: '2026-07-30'
  }
];

const Careers = () => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    async function loadCareers() {
      // First try to fetch the committed JSON from the deployed site
      try {
        const resp = await fetch('/data/cms_careers.json', { cache: 'no-store' });
        if (resp.ok) {
          const remote = await resp.json();
          if (Array.isArray(remote) && remote.length > 0) {
            setJobs(remote);
            return;
          }
        }
      } catch (e) {
        // ignore fetch errors and fall back to localStorage
      }

      const savedJobs = JSON.parse(localStorage.getItem('cms_careers') || '[]');
      setJobs(savedJobs.length > 0 ? savedJobs : defaultJobs);
    }
    loadCareers();

    function handleStorage(e) {
      if (e.key === 'cms_careers') loadCareers();
    }
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', loadCareers);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', loadCareers);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <SEOHead page="careers" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 font-marcellus">
            Careers
          </h1>
          <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
            Join our mission to empower communities through financial cooperation.
            Explore current job openings at KADCOS.
          </p>
        </motion.div>

        {jobs.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4 font-marcellus">
                No Available Opportunities
              </h3>
              <p className="text-gray-600 font-marcellus">
                Currently there are no job openings. Please check back later or
                follow our social media for updates on new positions.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-secondary font-marcellus mb-2">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-marcellus">
                      {job.type && (
                        <span className="flex items-center gap-1">
                          <SafeIcon icon={FiBriefcase} className="text-primary" />
                          {job.type}
                        </span>
                      )}
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <SafeIcon icon={FiMapPin} className="text-primary" />
                          {job.location}
                        </span>
                      )}
                      {job.deadline && (
                        <span className="flex items-center gap-1">
                          <SafeIcon icon={FiClock} className="text-primary" />
                          Apply by {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      )}
                      {job.datePosted && (
                        <span className="flex items-center gap-1">
                          <SafeIcon icon={FiCalendar} className="text-primary" />
                          Posted {new Date(job.datePosted).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {job.description && (
                  <p className="text-gray-700 font-marcellus mb-4 leading-relaxed">
                    {job.description}
                  </p>
                )}

                {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-secondary font-marcellus mb-2">
                      Requirements
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 font-marcellus">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.howToApply && (
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-start gap-2">
                    <SafeIcon icon={FiMail} className="text-primary mt-1 flex-shrink-0" />
                    <p className="text-gray-700 font-marcellus">
                      <span className="font-semibold">How to apply: </span>
                      {job.howToApply}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
