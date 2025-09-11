import React from 'react';
import { motion } from 'framer-motion';

const WorkWithUs = () => {
  // Sample data - to be replaced with CMS content
  const tenders = [
    {
      id: 1,
      title: "Office Supplies Procurement",
      description: "Supply of stationery and office materials for 2024",
      deadline: "2024-12-15",
      status: "Open"
    },
    {
      id: 2,
      title: "IT Infrastructure Upgrade",
      description: "Upgrade of computer systems and network infrastructure",
      deadline: "2024-11-30",
      status: "Open"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 font-marcellus">
            Work With Us
          </h1>
          <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
            Join our mission to empower communities through financial cooperation. 
            Explore opportunities to collaborate with KADCOS.
          </p>
        </motion.div>

        {/* Jobs Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center font-marcellus">
              Career Opportunities
            </h2>
            <div className="text-center py-12">
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
          </div>
        </motion.section>

        {/* Tenders & Contracts Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center font-marcellus">
              Tenders & Contracts
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tenders.map((tender) => (
                <motion.div
                  key={tender.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-lg p-6 card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-secondary font-marcellus">
                      {tender.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tender.status === 'Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tender.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 font-marcellus">
                    {tender.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-marcellus">
                      Deadline: {new Date(tender.deadline).toLocaleDateString()}
                    </span>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-marcellus">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CMS Integration Documentation */}
            <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 font-marcellus">
                CMS Integration Note
              </h3>
              <p className="text-blue-700 font-marcellus">
                This section will be managed through a CMS. To connect:
                1. Create a content model for "Tenders" with fields: title, description, deadline, status
                2. Use environment variables to store API endpoints
                3. Implement fetch logic in a useEffect hook to retrieve data
                4. Add loading states and error handling
              </p>
              <pre className="bg-gray-800 text-green-400 p-4 rounded mt-4 text-sm">
{`// Example API fetch implementation
useEffect(() => {
  const fetchTenders = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_CMS_API + '/tenders');
      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error('Error fetching tenders:', error);
    }
  };
  fetchTenders();
}, []);`}
              </pre>
            </div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-primary bg-opacity-10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-4 font-marcellus">
              Interested in Working Together?
            </h2>
            <p className="text-gray-600 mb-6 font-marcellus">
              Even if we don't have current openings, we're always interested in connecting 
              with talented professionals who share our mission.
            </p>
            <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-marcellus">
              Submit Your Resume
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default WorkWithUs;