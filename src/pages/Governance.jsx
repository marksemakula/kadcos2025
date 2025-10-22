import React from 'react';
import { motion } from 'framer-motion';

const Governance = () => {
  const executiveCommittee = [
    {
      name: "Mrs. Nseerikomawa Josephine",
      position: "Board Chairperson",
      image: "/images/Mrs.Nseerikomawa Josephine1.jpeg",
      bio: "Experienced leader providing strategic direction and oversight."
    },
    {
      name: "Council Jude Mbabaali",
      position: "Vice Chairperson",
      image: "/images/Counsel Jude Mbabaali.jpeg",
      bio: "Supports the chairperson in governance and strategic planning."
    },
    {
      name: "Ms. Namaganda Justine",
      position: "Secretary",
      image: "/images/Miss.Namaganda Justine.jpeg",
      bio: "Responsible for documentation and official communications."
    },
    {
      name: "Mr. Tenywa Herman Musisi",
      position: "Treasurer",
      image: "/images/Mr. Herman Musisi Tenywa.jpeg",
      bio: "Manages financial oversight and fiscal responsibility."
    },
    {
      name: "Mr. Budde Harry Dominic",
      position: "Member",
      image: "/images/Mr.Harry Dominic Budde Kigonya.jpeg",
      bio: "Committee member contributing to strategic decisions."
    },
    {
      name: "Mrs. Kalanda Annette Kizza",
      position: "Member",
      image: "/images/Mrs.Kizza Annette Kalanda.jpeg",
      bio: "Committee member with focus on member welfare."
    },
    {
      name: "Mr. Ssekamatte Patrick",
      position: "Member",
      image: "/images/Mr.Ssekamate Patrick.jpeg",
      bio: "Committee member providing operational insights."
    },
    {
      name: "Mr. Mutebi Emmanuel",
      position: "Member",
      image: "/images/Mr.Mutebi Ronald.jpeg",
      bio: "Committee member with community development expertise."
    },
    {
      name: "Mr. Mukalazi Vienny",
      position: "Member",
      image: "/images/Mr.Mukalazi John Vianney.jpeg",
      bio: "Committee member focused on growth initiatives."
    }
  ];

  const supervisoryCommittee = [
    {
      name: "Mr. Gerald Katusabe",
      position: "Supervisory Committee",
      image: "/images/Mr. Gerald Katusabe.jpeg",
      bio: "Oversees compliance and operational integrity."
    },
    {
      name: "Mrs. Josephine Sekatuba",
      position: "Supervisory Committee",
      image: "/images/Mrs.Josephine Ssekatuba.jpeg",
      bio: "Ensures regulatory compliance and best practices."
    },
    {
      name: "Mrs. Rose Ssali",
      position: "Supervisory Committee",
      image: "/images/Miss. Rose Ssali.jpeg",
      bio: "Monitors operational efficiency and member satisfaction."
    }
  ];

  const managementStaff = [
    {
      name: "Mr. Dumba Patrick",
      position: "Manager",
      image: "/images/PatrickDdumba1.png",
      bio: "Business development specialist focused on expanding cooperative services."
    },
    {
      name: "Ms. Nyago Mary Goretti",
      position: "Accountant",
      image: "/images/Nyago Mary Gorreti.jpeg",
      bio: "Manages financial records and reporting."
    },
    {
      name: "Ms. Namukasa Proscovia",
      position: "Credit Officer",
      image: "/images/Namukasa Proscovia.JPG",
      bio: "Handles credit assessments and loan management."
    },
    {
      name: "Ms. Kansiime Anna",
      position: "Assistant Credit Officer",
      image: "/images/Kansiime AnnaMaria.jpg",
      bio: "Supports credit operations and member services."
    },
    {
      name: "Ms. Namugga Maria",
      position: "Cashier",
      image: "/images/Namugga Maria.jpg",
      bio: "Manages daily transactions and member accounts."
    },
    {
      name: "Ms. Nanyonga Gladys",
      position: "Cashier",
      image: "/images/Nanyonga Gladys.jpg",
      bio: "Handles financial transactions and customer service."
    },
    {
      name: "Ms. Nyago Grace",
      position: "Support Staff",
      image: "/images/Ms.Nyago Grace.JPG",
      bio: "Provides operational support and maintenance."
    },
    {
      name: "Ms. Nabagereka Victoria",
      position: "Office Attendant/Receptionist",
      image: "/images/Nabagereka Victoria.jpg",
      bio: "Dedicated to providing exceptional service and support to our members."
    }
  ];

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
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
              Executive Committee
            </h2>
            <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
              Our executive committee provides strategic guidance and oversight to ensure KADCOS 
              remains focused on our mission of member financial empowerment and cooperative values.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveCommittee.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover text-center"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
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

        {/* Supervisory Committee Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
              Supervisory Committee
            </h2>
            <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
              Our supervisory committee ensures compliance with regulations, maintains operational 
              integrity, and upholds the highest standards of cooperative governance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supervisoryCommittee.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover text-center"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
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

        {/* Management and Staff Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
              Management and Staff
            </h2>
            <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
              Our dedicated team works daily to serve our members, implement the strategic vision, 
              and ensure the smooth operation of all cooperative services.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementStaff.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover text-center"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
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
      </div>
    </div>
  );
};

export default Governance;