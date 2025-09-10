import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiDollarSign, FiTrendingUp, FiShield, FiArrowRight, FiCheckCircle } = FiIcons;

const Home = () => {
  const services = [
    {
      icon: FiDollarSign,
      title: 'Savings Accounts',
      description: 'Regular savings with competitive interest rates starting from 10,000 UGX monthly.',
    },
    {
      icon: FiTrendingUp,
      title: 'Loan Services',
      description: 'Various loan products including personal, business, agricultural, and emergency loans.',
    },
    {
      icon: FiUsers,
      title: 'Membership Benefits',
      description: 'Join our community of over 1,700 members and enjoy exclusive cooperative benefits.',
    },
    {
      icon: FiShield,
      title: 'Secure Investment',
      description: 'Your investments are secure with our regulated cooperative society framework.',
    },
  ];

  const stats = [
    { number: '1,700+', label: 'Active Members' },
    { number: '17+', label: 'Years of Service' },
    { number: '10+', label: 'Parish Branches' },
    { number: '2%', label: 'Monthly Interest' },
  ];

  // Array of partner logos using local images from public/images folder
  const partnerLogos = [
    "/images/Centenary.jpg",
    "/images/holysee.png",
    "/images/airtel.png",
    "/images/caritas.png",
    "/images/mtn.jpeg",
    "/images/undp.png",
    "/images/bou.png",
    "/images/dpf.png",
    "/images/fia.png",
    "/images/wcc.jpeg"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Modified for consistent yellow and no gap */}
      <section className="bg-[#FFB100] py-16 -mt-4"> {/* Changed to solid yellow and negative margin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 font-marcellus">
                Your Trusted <span className="text-white">Financial Partner</span>
              </h1>
              <p className="text-xl text-gray-800 mb-8 font-marcellus leading-relaxed">
                Financially empowering people of God in Kampala Archdiocese through cooperative effort and savings culture since 2007.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/membership"
                  className="bg-secondary text-white px-8 py-4 rounded-full font-marcellus hover:bg-blue-800 transition-colors duration-300 text-center"
                >
                  Become a Member
                </Link>
                <Link
                  to="/services"
                  className="border-2 border-secondary text-secondary px-8 py-4 rounded-full font-marcellus hover:bg-secondary hover:text-white transition-colors duration-300 text-center"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="/images/KADCOS  1-01.svg"
                alt="KADCOS Logo" 
                className="h-64 w-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-2 font-marcellus">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-marcellus">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              We collaborate with communities & leading organizations to better serve our members.
            </p>
          </motion.div>
          
          {/* Carousel Container - Fixed for seamless looping */}
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll">
              {/* Combine original and duplicated logos in a single continuous flex container */}
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-8">
                  <img 
                    src={logo} 
                    alt={`Partner ${index % partnerLogos.length + 1}`} 
                    className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 object-contain"
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient fade effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
          </div>
        </div>
        
        {/* Animation styles for seamless looping */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 2));
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              We provide comprehensive financial services tailored to empower our members through cooperative effort.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg card-hover"
              >
                <div className="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <SafeIcon icon={service.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4 font-marcellus">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-marcellus leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-marcellus">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-marcellus max-w-3xl mx-auto">
              Start your journey towards financial empowerment with KADCOS. Join over 1,700 members who trust us with their financial future.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center space-x-2 bg-primary text-secondary px-8 py-4 rounded-full font-marcellus hover:bg-orange-500 transition-colors duration-300"
            >
              <span>Get Started Today</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;