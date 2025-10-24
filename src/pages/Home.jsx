import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import InterestWidget from '../components/InterestWidget';

const { FiUsers, FiDollarSign, FiTrendingUp, FiShield, FiArrowRight, FiCheckCircle, FiPlay, FiPause } = FiIcons;

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const videos = [
    {
      src: "/videos/KADCOS HOME PAGE.mp4",
      title: "Welcome to KADCOS",
      description: "Discover our financial services and community"
    },
    {
      src: "/videos/KADCOS MEMBERSHIP.mp4", 
      title: "Membership Benefits",
      description: "Learn about the advantages of joining KADCOS"
    }
  ];

  const keyBenefits = [
    {
      icon: FiCheckCircle,
      title: '17+ Years Experience',
      description: 'Trusted financial service since 2007.',
    },
    {
      icon: FiShield,
      title: 'Secure & Regulated',
      description: 'Protected under cooperative society framework.',
    },
    {
      icon: FiTrendingUp,
      title: 'Competitive Returns',
      description: 'Earn up to 2% monthly interest.',
    }
  ];

  const stats = [
    { number: '1,700+', label: 'Active Members' },
    { number: '17+', label: 'Years of Service' },
    { number: '4', label: 'Parish Branches' },
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

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change video every 8 seconds

    return () => clearInterval(interval);
  }, [isPlaying, videos.length]);

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen font-urbanist">
      <InterestWidget />
      
      {/* Hero Section - Modified for consistent yellow and no gap */}
      <section className="bg-[#035D75] py-16 -mt-4"> {/* Changed to solid color margin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 font-arthelo">
                Your Trusted <span className="text-white font-urbanist">Financial Partner</span>
              </h1>
              <p className="text-xl text-gray-800 mb-8 font-marcellus leading-relaxed">
                Financially empowering people through cooperative effort and savings culture since 2007.
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
                src="/images/KADCOS-02.png"
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

      {/* Split Section: Video Carousel + Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-arthelo">
              Why Choose KADCOS Lubaga Co-operative Society?
            </h2>
          </motion.div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Video Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
                <video 
                  key={videos[currentVideoIndex].src}
                  className="w-full h-auto max-h-96 object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={videos[currentVideoIndex].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <button
                    onClick={togglePlayPause}
                    className="bg-primary bg-opacity-80 hover:bg-opacity-100 text-white p-2 rounded-full transition-all duration-300"
                  >
                    {isPlaying ? 
                      <SafeIcon icon={FiPause} className="text-lg" /> : 
                      <SafeIcon icon={FiPlay} className="text-lg" />
                    }
                  </button>
                  
                  <div className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-marcellus">
                      {currentVideoIndex + 1} / {videos.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Navigation */}
              <div className="flex space-x-4 justify-center">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleVideoSelect(index)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                      index === currentVideoIndex 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-current mb-2"></div>
                    <span className="text-sm font-marcellus whitespace-nowrap">
                      {video.title}
                    </span>
                  </button>
                ))}
              </div>

              {/* Current Video Info */}
              <div className="text-center">
                <h3 className="text-xl font-arthelo text-secondary mb-2">
                  {videos[currentVideoIndex].title}
                </h3>
                <p className="text-gray-600 font-marcellus">
                  {videos[currentVideoIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Right: Minimalist Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full flex-shrink-0">
                    <SafeIcon icon={benefit.icon} className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-arthelo text-secondary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 font-marcellus leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center pt-4"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-full font-arthelo hover:bg-blue-800 transition-colors duration-300"
                >
                  <span>Learn More About Us</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section - Moved to bottom */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-urbanist">
              Our Partners
            </h2>
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
              className="inline-flex items-center space-x-2 bg-primary text-secondary px-8 py-4 rounded-full font-arthelo hover:bg-orange-500 transition-colors duration-300"
            >
              <span className="font-arthelo">Get Started Today</span>
              <SafeIcon icon={FiArrowRight} className="font-arthelo" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;