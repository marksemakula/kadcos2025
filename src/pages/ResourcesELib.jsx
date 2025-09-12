import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDownload, FiFileText, FiBookOpen, FiCalendar, FiUser } = FiIcons;

const ResourcesELib = () => {
  const reports = [
    {
      title: 'Annual Report 2023',
      description: 'Comprehensive overview of KADCOS activities, financial performance, and achievements in 2023',
      date: 'March 15, 2024',
      type: 'PDF',
      size: '2.4 MB',
      author: 'KADCOS Management',
      category: 'Financial Reports'
    },
    {
      title: 'Quarterly Financial Statement Q1 2024',
      description: 'Detailed financial performance for the first quarter of 2024',
      date: 'April 10, 2024',
      type: 'PDF',
      size: '1.2 MB',
      author: 'Finance Department',
      category: 'Financial Reports'
    },
    {
      title: 'Member Growth Analysis 2023',
      description: 'Analysis of membership trends and demographic information',
      date: 'February 28, 2024',
      type: 'PDF',
      size: '0.8 MB',
      author: 'Membership Committee',
      category: 'Analytical Reports'
    },
    {
      title: 'Strategic Plan 2024-2028',
      description: 'Five-year strategic roadmap for KADCOS development and growth',
      date: 'January 15, 2024',
      type: 'PDF',
      size: '3.1 MB',
      author: 'Strategic Planning Committee',
      category: 'Strategic Documents'
    }
  ];

  const publications = [
    {
      title: 'Cooperative Savings Guide',
      description: 'Comprehensive guide to maximizing your savings with KADCOS',
      date: 'March 1, 2024',
      type: 'PDF',
      size: '1.5 MB',
      author: 'Financial Education Team',
      category: 'Educational Materials'
    },
    {
      title: 'Loan Products Handbook',
      description: 'Detailed information about all loan products offered by KADCOS',
      date: 'February 15, 2024',
      type: 'PDF',
      size: '2.0 MB',
      author: 'Loan Department',
      category: 'Product Guides'
    },
    {
      title: 'Financial Literacy Newsletter - Q1 2024',
      description: 'Quarterly newsletter with tips for financial management and planning',
      date: 'April 5, 2024',
      type: 'PDF',
      size: '1.8 MB',
      author: 'Communications Team',
      category: 'Newsletters'
    },
    {
      title: 'Member Success Stories',
      description: 'Inspiring stories from members who have benefited from KADCOS services',
      date: 'March 20, 2024',
      type: 'PDF',
      size: '2.5 MB',
      author: 'Member Relations',
      category: 'Testimonials'
    }
  ];

  const categories = [
    'All Resources',
    'Financial Reports',
    'Strategic Documents',
    'Educational Materials',
    'Product Guides',
    'Newsletters',
    'Analytical Reports',
    'Testimonials'
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
            <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 font-marcellus">
              Resources & e-Library
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Access our comprehensive collection of reports, publications, and educational resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-secondary mb-8 text-center font-marcellus">
              Browse Resources by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-6 py-3 bg-gray-100 text-secondary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 font-marcellus"
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Reports & Publications
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Access our latest reports, financial statements, and official publications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reports.map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg card-hover"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full">
                    <SafeIcon icon={FiFileText} className="text-primary text-2xl" />
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-marcellus">
                    {report.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4 font-marcellus">
                  {report.title}
                </h3>
                <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                  {report.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    <SafeIcon icon={FiCalendar} className="mr-1" />
                    {report.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    <SafeIcon icon={FiUser} className="mr-1" />
                    {report.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    {report.size}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm font-marcellus">
                    {report.category}
                  </span>
                  <button className="flex items-center text-primary hover:text-secondary transition-colors font-marcellus">
                    <SafeIcon icon={FiDownload} className="mr-2" />
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              Educational Materials
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Guides, handbooks, and newsletters to help you make the most of our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg shadow-lg card-hover"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-accent bg-opacity-10 p-4 rounded-full">
                    <SafeIcon icon={FiBookOpen} className="text-accent text-2xl" />
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-marcellus">
                    {publication.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4 font-marcellus">
                  {publication.title}
                </h3>
                <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                  {publication.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    <SafeIcon icon={FiCalendar} className="mr-1" />
                    {publication.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    <SafeIcon icon={FiUser} className="mr-1" />
                    {publication.author}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 font-marcellus">
                    {publication.size}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="bg-accent bg-opacity-10 text-accent px-3 py-1 rounded-full text-sm font-marcellus">
                    {publication.category}
                  </span>
                  <button className="flex items-center text-accent hover:text-secondary transition-colors font-marcellus">
                    <SafeIcon icon={FiDownload} className="mr-2" />
                    Download
                  </button>
                </div>
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
              Need Additional Resources?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-marcellus max-w-3xl mx-auto">
              Contact us if you need specific information or documents not available in our e-library
            </p>
            <button className="bg-primary text-white px-8 py-4 rounded-full font-marcellus hover:bg-orange-500 transition-colors duration-300">
              Contact Our Team
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesELib;