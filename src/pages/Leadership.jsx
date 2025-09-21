import React from 'react';
import { motion } from 'framer-motion';

const Leadership = () => {
  const executiveCommittee = [
    {
      name: "Mrs. Nseerikomawa Josephine",
      position: "Board Chairperson",
      image: "/images/Nseerikomawa_Josephine.jpg",
      bio: "Experienced leader providing strategic direction and oversight."
    },
    {
      name: "Council Jude Mbabaali",
      position: "Vice Chairperson",
      image: "/images/Jude_Mbabaali.jpg",
      bio: "Supports the chairperson in governance and strategic planning."
    },
    {
      name: "Ms. Namaganda Justine",
      position: "Secretary",
      image: "/images/Namaganda_Justine.jpg",
      bio: "Responsible for documentation and official communications."
    },
    {
      name: "Mr. Tenywa Herman Musisi",
      position: "Treasurer",
      image: "/images/Tenywa_Herman.jpg",
      bio: "Manages financial oversight and fiscal responsibility."
    },
    {
      name: "Mr. Budde Harry Dominic",
      position: "Member",
      image: "/images/Budde_Harry.jpg",
      bio: "Committee member contributing to strategic decisions."
    },
    {
      name: "Mrs. Kalanda Annette Kizza",
      position: "Member",
      image: "/images/Kalanda_Annette.jpg",
      bio: "Committee member with focus on member welfare."
    },
    {
      name: "Mr. Ssekamatte Patrick",
      position: "Member",
      image: "/images/Ssekamatte_Patrick.jpg",
      bio: "Committee member providing operational insights."
    },
    {
      name: "Mr. Mutebi Emmanuel",
      position: "Member",
      image: "/images/Mutebi_Emmanuel.jpg",
      bio: "Committee member with community development expertise."
    },
    {
      name: "Mr. Mukalazi Vienny",
      position: "Member",
      image: "/images/Mukalazi_Vienny.jpg",
      bio: "Committee member focused on growth initiatives."
    }
  ];

  const supervisoryCommittee = [
    {
      name: "Mr. Gerald Katusabe",
      position: "Supervisory Committee",
      image: "/images/Gerald_Katusabe.jpg",
      bio: "Oversees compliance and operational integrity."
    },
    {
      name: "Mrs. Josephine Sekatuba",
      position: "Supervisory Committee",
      image: "/images/Josephine_Sekatuba.jpg",
      bio: "Ensures regulatory compliance and best practices."
    },
    {
      name: "Mrs. Rose Ssali",
      position: "Supervisory Committee",
      image: "/images/Rose_Ssali.jpg",
      bio: "Monitors operational efficiency and member satisfaction."
    }
  ];

  const managementStaff = [
    {
      name: "Mr. Dumba Patrick",
      position: "Manager",
      image: "/images/PatrickDdumba.png",
      bio: "Business development specialist focused on expanding cooperative services."
    },
    {
      name: "Ms. Nyago Mary Goretti",
      position: "Accountant",
      image: "/images/Mary_Goretti.jpg",
      bio: "Manages financial records and reporting."
    },
    {
      name: "Ms. Namukasa Proscovia",
      position: "Credit Officer",
      image: "/images/Proscovia_Namukasa.jpg",
      bio: "Handles credit assessments and loan management."
    },
    {
      name: "Ms. Kansiime Anna",
      position: "Assistant Credit Officer",
      image: "/images/Anna_Kansiime.jpg",
      bio: "Supports credit operations and member services."
    },
    {
      name: "Ms. Namugga Maria",
      position: "Cashier",
      image: "/images/Maria_Namugga.jpg",
      bio: "Manages daily transactions and member accounts."
    },
    {
      name: "Ms. Nanyonga Gladys",
      position: "Cashier",
      image: "/images/Gladys_Nanyonga.jpg",
      bio: "Handles financial transactions and customer service."
    },
    {
      name: "Ms. Nyago Grace",
      position: "Support Staff",
      image: "/images/Grace_Nyago.jpg",
      bio: "Provides operational support and maintenance."
    },
    {
      name: "Ms. Nabagereka Victoria",
      position: "Office Attendant/Receptionist",
      image: "/images/nabagerekavictoria.jpeg",
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
            Our Leadership
          </h1>
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
              Our executive committee provides strategic guidance and oversight to ensure KADCOS remains focused on our mission of member financial empowerment.
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
              Our supervisory committee ensures compliance with regulations and maintains operational integrity.
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
              Our dedicated team works daily to serve our members and implement the vision set by our executive committee.
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

export default Leadership;