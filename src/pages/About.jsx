import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

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

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 font-marcellus">
              About KADCOS
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Kampala Archdiocese Development Cooperative Society - Empowering communities through faith-based financial services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
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
                src="/images/jakub-zerdzicki-ip7GFn5JqX8-unsplash.jpg" 
                alt="Community Meeting" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-accent bg-opacity-10 p-3 rounded-full mr-4">
                  <SafeIcon icon={FiEye} className="text-accent text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-secondary font-marcellus">Our Vision</h3>
              </div>
              <p className="text-gray-600 font-marcellus leading-relaxed">
                To be the Leading Cooperative in Kampala Archdiocese providing quality and Dynamic Services to the Members.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary bg-opacity-10 p-3 rounded-full mr-4">
                  <SafeIcon icon={FiTarget} className="text-primary text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-secondary font-marcellus">Our Mission</h3>
              </div>
              <p className="text-gray-600 font-marcellus leading-relaxed">
                To provide financial and non-financial services to members in an efficient, affordable and sustainable manner.
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
                  e.target.src = "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";
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