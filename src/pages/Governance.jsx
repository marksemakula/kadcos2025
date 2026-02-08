import React from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const Governance = () => {
  const [leadershipData, setLeadershipData] = React.useState({
    executive: [],
    supervisory: [],
    management: []
  });

  React.useEffect(() => {
    async function loadLeadership() {
      // First try to fetch committed JSON from the deployed site
      try {
        const resp = await fetch('/data/cms_leadership.json', { cache: 'no-store' });
        if (resp.ok) {
          const remote = await resp.json();
          if (Array.isArray(remote) && remote.length > 0) {
            const executive = remote.filter(item => item.category === 'executive');
            const supervisory = remote.filter(item => item.category === 'supervisory');
            const management = remote.filter(item => item.category === 'management');
            setLeadershipData({ executive, supervisory, management });
            return;
          }
        }
      } catch (e) {
        // ignore fetch errors and fall back to localStorage
        // console.debug('[Governance] Remote fetch failed', e);
      }

      const savedLeadership = JSON.parse(localStorage.getItem('cms_leadership') || '[]');
      if (savedLeadership.length === 0) {
        // Use default data if no CMS data exists
        const defaultExecutiveCommittee = [
          {
            id: 1,
            name: "Mrs. Nseerikomawa Josephine",
            position: "Board Chairperson",
            image: "/images/Mrs.Nseerikomawa Josephine.jpeg",
            bio: "Experienced leader providing strategic direction and oversight.",
            category: "executive"
          },
          {
            id: 2,
            name: "Council Jude Mbabaali",
            position: "Vice Chairperson",
            image: "/images/Counsel Jude Mbabaali.jpeg",
            bio: "Supports the chairperson in governance and strategic planning.",
            category: "executive"
          },
          {
            id: 3,
            name: "Ms. Namaganda Justine",
            position: "Secretary",
            image: "/images/Miss.Namaganda Justine.jpeg",
            bio: "Responsible for documentation and official communications.",
            category: "executive"
          },
          {
            id: 4,
            name: "Mr. Tenywa Herman Musisi",
            position: "Treasurer",
            image: "/images/Mr. Herman Musisi Tenywa.jpeg",
            bio: "Manages financial oversight and fiscal responsibility.",
            category: "executive"
          },
          {
            id: 5,
            name: "Mr. Budde Harry Dominic",
            position: "Member",
            image: "/images/Mr.Harry Dominic Budde Kigonya.jpeg",
            bio: "Committee member contributing to strategic decisions.",
            category: "executive"
          },
          {
            id: 6,
            name: "Mrs. Kalanda Annette Kizza",
            position: "Member",
            image: "/images/Mrs.Kizza Annette Kalanda.jpeg",
            bio: "Committee member contributing to strategic decisions.",
            category: "executive"
          },
          {
            id: 7,
            name: "Mr. Ssekamatte Patrick",
            position: "Member",
            image: "/images/Mr.Ssekamate Patrick.jpeg",
            bio: "Committee member contributing to strategic decisions.",
            category: "executive"
          },
          {
            id: 8,
            name: "Mr. Mutebi Emmanuel",
            position: "Member",
            image: "/images/Mr.Mutebi Ronald.jpeg",
            bio: "Committee member contributing to strategic decisions.",
            category: "executive"
          },
          {
            id: 9,
            name: "Mr. Mukalazi Vienny",
            position: "Member",
            image: "/images/Mr.Mukalazi John Vianney.jpeg",
            bio: "Committee member contributing to strategic decisions.",
            category: "executive"
          }
        ];
        const defaultSupervisoryCommittee = [
          {
            id: 1,
            name: "Mr. Gerald Katusabe",
            position: "Supervisory Committee",
            image: "/images/Mr. Gerald Katusabe.jpeg",
            bio: "Oversees compliance and operational integrity.",
            category: "supervisory"
          },
          {
            id: 2,
            name: "Mrs. Josephine Sekatuba",
            position: "Supervisory Committee",
            image: "/images/Mrs.Josephine Ssekatuba.jpeg",
            bio: "Oversees compliance and operational integrity.",
            category: "supervisory"
          },
          {
            id: 3,
            name: "Mrs. Rose Ssali",
            position: "Supervisory Committee",
            image: "/images/Miss. Rose Ssali.jpeg",
            bio: "Oversees compliance and operational integrity.",
            category: "supervisory"
          }
        ];
        const defaultManagementStaff = [
          {
            id: 1,
            name: "Mr. Dumba Patrick",
            position: "Manager",
            image: "/images/Dumba Patrick.jpg",
            bio: "Leads the cooperative's daily operations and strategic implementation.",
            category: "management"
          },
          {
            id: 2,
            name: "Ms. Nyago Mary Goretti",
            position: "Accountant",
            image: "/images/Nyago Mary Gorreti.jpeg",
            bio: "Manages financial records and accounting operations.",
            category: "management"
          },
          {
            id: 3,
            name: "Ms. Namukasa Proscovia",
            position: "Credit Officer",
            image: "/images/Namukasa Proscovia.JPG",
            bio: "Handles loan applications and credit assessments.",
            category: "management"
          },
          {
            id: 4,
            name: "Ms. Kansiime Anna",
            position: "Assistant Credit Officer",
            image: "/images/Kansiime AnnaMaria.jpg",
            bio: "Assists with loan processing and member support.",
            category: "management"
          },
          {
            id: 5,
            name: "Ms. Namugga Maria",
            position: "Cashier",
            image: "/images/Namugga Maria.jpg",
            bio: "Handles member transactions and cash management.",
            category: "management"
          },
          {
            id: 6,
            name: "Ms. Nanyonga Gladys",
            position: "Cashier",
            image: "/images/Nanyonga Gladys.jpg",
            bio: "Handles member transactions and cash management.",
            category: "management"
          },
          {
            id: 7,
            name: "Ms. Nyago Grace",
            position: "Support Staff",
            image: "/images/Ms.Nyago Grace.JPG",
            bio: "Provides operational support for daily activities.",
            category: "management"
          },
          {
            id: 8,
            name: "Ms. Nabagereka Victoria",
            position: "Office Attendant/Receptionist",
            image: "/images/Nabagereka Victoria.jpg",
            bio: "Welcomes visitors and manages front office operations.",
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
    }
    loadLeadership();
    // Listen for localStorage changes (from other tabs/windows)
    function handleStorage(e) {
      if (e.key === 'cms_leadership') {
        loadLeadership();
      }
    }
    window.addEventListener('storage', handleStorage);
    // Also update when window regains focus (for single-tab edits)
    function handleFocus() {
      loadLeadership();
    }
    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
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
        <div className="min-h-screen bg-white pt-6">
          <SEOHead page="governance" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
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