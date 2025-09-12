import React from 'react';
import { motion } from 'framer-motion';

const Leadership = () => {
  const boardMembers = [
    {
      name: "Rev. Fr. Paul Ssemwogerere",
      position: "Patron",
      image: "/images/Fr.PaulSsemwogere.png",
      bio: "Spiritual guide and advisor with over 15 years of experience in community development."
    },
    {
      name: "Mrs. Bako Margaret",
      position: "Chairperson",
      image: "/images/Margaret-Bako.jpg",
      bio: "Experienced leader with 10+ years in cooperative management and financial oversight."
    },
    {
      name: "Monica Byarugaba",
      position: "Vice Chairperson",
      image: "/images/Monica_Byarugaba.jpg",
      bio: "Dedicated to member empowerment and financial growth with a background in microfinance."
    },
    {
      name: "Rev. Fr. Raphael Mpony Wokorach",
      position: "Board Member",
      image: "/images/RevRaphaelMponyWokorach.jpg",
      bio: "Financial expert with extensive experience in accounting and fund management."
    },
    {
      name: "Fr. Anthony Kimbowa Kibira",
      position: "Board Member",
      image: "/images/Fr. Anthony Kimbowa Kibira Mccj.png",
      bio: "Organized administrator with excellent record-keeping and communication skills."
    }
  ];

  const teamMembers = [
    {
      name: "Patrick Ddumba",
      position: "Manager",
      image: "/images/PatrickDdumba.png",
      bio: "Business development specialist focused on expanding cooperative services."
    },
    {
      name: "Victoria Nabagereka",
      position: "Administrative Assistant",
      image: "/images/nabagerekavictoria.jpeg",
      bio: "Dedicated to providing exceptional service and support to our members."
    },
    {
      name: "Phillip Kizito",
      position: "Financial Advisor",
      image: "/images/Phillip_Kizito.jpg",
      bio: "Expert in financial planning with a focus on sustainable growth strategies."
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

        {/* Board of Directors Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
              Board of Directors
            </h2>
            <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
              Our board provides strategic guidance and oversight to ensure KADCOS remains focused on our mission of member financial empowerment.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
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

        {/* The Team Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-4 font-marcellus">
              The Team
            </h2>
            <p className="text-lg text-gray-600 font-marcellus max-w-3xl mx-auto">
              Our dedicated team works daily to serve our members and implement the vision set by our board of directors.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
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
      </div>
    </div>
  );
};

export default Leadership;