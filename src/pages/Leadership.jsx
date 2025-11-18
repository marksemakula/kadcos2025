import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Governance = () => {
  const [leadershipData, setLeadershipData] = useState({
    executive: [],
    supervisory: [],
    management: []
  });

  useEffect(() => {
    const savedLeadership = JSON.parse(localStorage.getItem('cms_leadership') || '[]');
    
    if (savedLeadership.length === 0) {
      // Use default data if no CMS data exists
      const defaultExecutiveCommittee = [
        {
          id: 1,
          name: "Mrs. Nseerikomawa Josephine",
          position: "Board Chairperson",
          image: "/images/Nseerikomawa_Josephine.jpg",
          bio: "Experienced leader providing strategic direction and oversight.",
          category: "executive"
        },
        {
          id: 2,
          name: "Council Jude Mbabaali",
          position: "Vice Chairperson",
          image: "/images/Jude_Mbabaali.jpg",
          bio: "Supports the chairperson in governance and strategic planning.",
          category: "executive"
        }
      ];

      const defaultSupervisoryCommittee = [
        {
          id: 1,
          name: "Mr. Gerald Katusabe",
          position: "Supervisory Committee",
          image: "/images/Gerald_Katusabe.jpg",
          bio: "Oversees compliance and operational integrity.",
          category: "supervisory"
        }
      ];

      const defaultManagementStaff = [
        {
          id: 1,
          name: "Mr. Dumba Patrick",
          position: "Manager",
          image: "/images/PatrickDdumba.png",
          bio: "Business development specialist focused on expanding cooperative services.",
          category: "management"
        }
      ];

      setLeadershipData({
        executive: defaultExecutiveCommittee,
        supervisory: defaultSupervisoryCommittee,
        management: defaultManagementStaff
      });
    } else {
      // Group CMS data by category
      const executive = savedLeadership.filter(item => item.category === 'executive');
      const supervisory = savedLeadership.filter(item => item.category === 'supervisory');
      const management = savedLeadership.filter(item => item.category === 'management');
      
      setLeadershipData({
        executive,
        supervisory,
        management
      });
    }
  }, []);

  const renderLeadershipSection = (title, description, members, delay = 0) => {
    if (members.length === 0) return null;

    return (
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
            {title}
          </h2>
          <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + delay }}
              className="bg-white rounded-lg shadow-lg overflow-hidden card-hover text-center"
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-profile.jpg';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2 font-marcellus">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4 font-marcellus">
                  {member.position}
                </p>
                <p className="text-gray-600 font-marcellus">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-secondary mb-6 font-marcellus">
            Our Governance
          </h1>
          <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
            Meet the dedicated teams that guide and manage KADCOS Lubaga Cooperative Society, 
            ensuring transparency, accountability, and member-focused leadership.
          </p>
        </motion.div>

        {/* Executive Committee Section */}
        {renderLeadershipSection(
          "Executive Committee",
          "Our executive committee provides strategic guidance and oversight to ensure KADCOS remains focused on our mission of member financial empowerment and cooperative values.",
          leadershipData.executive,
          0.2
        )}

        {/* Supervisory Committee Section */}
        {renderLeadershipSection(
          "Supervisory Committee",
          "Our supervisory committee ensures compliance with regulations, maintains operational integrity, and upholds the highest standards of cooperative governance.",
          leadershipData.supervisory,
          0.4
        )}

        {/* Management and Staff Section */}
        {renderLeadershipSection(
          "Management and Staff",
          "Our dedicated team works daily to serve our members, implement the strategic vision, and ensure the smooth operation of all cooperative services.",
          leadershipData.management,
          0.6
        )}

        {/* Show message if no leadership data */}
        {leadershipData.executive.length === 0 && 
         leadershipData.supervisory.length === 0 && 
         leadershipData.management.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-marcellus">
              Leadership information will be available soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Governance;