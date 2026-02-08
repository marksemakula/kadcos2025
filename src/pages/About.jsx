import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SEOHead from '../components/SEOHead';

const { FiTarget, FiEye, FiUsers, FiTrendingUp } = FiIcons;

const About = () => {
  const objectives = [
    'Harness and strengthen the spirit of co-operation for development',
    'Develop and uphold the savings culture among people of God for better investment opportunities',
    'Raise funds from amongst members through cooperative effort and invest them in high income generating projects',
    'Enhance cooperation amongst members through providing opportunity for association and contribution',
    'Tap the synergies of teamwork to provide high level of service',
    'Attain higher profits by capitalizing on large economies of scale'
  ];

  const carouselImages = [
    '/images/kadcos_lubaga_co_operative_society_cover.jpeg',
    '/images/kadcos_office_1.jpg',
    '/images/kadcos_office_2.jpg',
    '/images/kadcos_meeting_1.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        setTimeout(() => setIsTransitioning(false), 1000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length, isTransitioning]);

  return (
    <div className="min-h-screen">
      <SEOHead page="about" />
      {/* Hero Section with Image Carousel */}
      <section className="relative bg-primary h-[45vh] min-h-[400px] w-full overflow-hidden">
        {/* Image Carousel with Optimized Zoom Out Effect */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={carouselImages[currentImage]}
                alt="KADCOS Carousel"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/kadcos_lubaga_co_operative_society_cover.jpeg";
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Double Density Halftone Dot Filter Overlay */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, #2181A1 1px, transparent 1px),
              radial-gradient(circle at 1px 1px, #2181A1 1px, transparent 1px)
            `,
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 2px 2px',
            opacity: '0.35',
            mixBlendMode: 'multiply'
          }}
        />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center lg:text-left text-white max-w-3xl"
              >
                <h1 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 font-marcellus">
                  Kampala Archdiocese Development Cooperative Society
                </h1>
                <p className="text-lg lg:text-xl text-gray-100 font-marcellus">
                  Empowering communities through faith-based financial services
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentImage(index);
                setTimeout(() => setIsTransitioning(false), 1000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Rest of the sections remain exactly the same */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-secondary mb-6 font-marcellus">Our Story</h2>
              <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                KADCOS Lubaga Cooperative Society Ltd was established in 2007 by Kampala Archdiocese Cooperative office to financially empower people of God in Kampala Archdiocese by opening up branches in all its Parishes, Lubaga Parish being one of them.
              </p>
              <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                KADCOS has now spread to other parishes in Kampala Archdiocese namely, Nsambya, Kamwokya, Naddangira, Kisubi, Busega, among others. This Society has a membership of over 1700 people of different economic capacities.
              </p>
              <p className="text-gray-600 font-marcellus leading-relaxed">
                The Society has a series of community financial empowerment schemes that are tailored towards raising capital through cooperative effort and saving culture.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="/images/kadcos_lubaga_co_operative_society_cover.jpeg" 
                alt="Community Meeting" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/kadcos_lubaga_co_operative_society_cover.jpeg";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Only */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <SafeIcon icon={FiTarget} className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-secondary font-marcellus">Our Mission</h3>
              </div>
              <p className="text-gray-600 font-marcellus leading-relaxed">
                To offer financial and non-financial services to members in an efficient, affordable and sustainable mannner.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Our Objectives
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              We are committed to achieving these key objectives for the benefit of our members and community.
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Core Values
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Integrity. Efficientcy. Transparency. Equality. Confidentiality. Accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg"
              >
                <div className="bg-accent bg-opacity-10 p-2 rounded-full flex-shrink-0">
                  <SafeIcon icon={FiTrendingUp} className="text-accent" />
                </div>
                <p className="text-gray-700 font-marcellus leading-relaxed">{objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 font-marcellus">Visit Our Office</h2>
              <p className="text-gray-300 mb-6 font-marcellus leading-relaxed">
                Our office is conveniently located at Lubaga Cathedral Administration Building, easily accessible to our members and prospective clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiUsers} className="text-primary" />
                  <span className="font-marcellus">Manager: Dumba Patrick</span>
                </div>
                <div className="flex items-center space-x-3">
                  <SafeIcon icon={FiTarget} className="text-primary" />
                  <span className="font-marcellus">Working Hours: Mon-Fri 8:30am-5:00pm, Sat 8:00am-1:00pm</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="/images/kadcos_lubaga_co_operative_society_cover.jpeg" 
                alt="KADCOS Office Building" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/kadcos_lubaga_co_operative_society_cover.jpeg";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;