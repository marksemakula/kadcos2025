import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SEOHead from '../components/SEOHead';

const { FiDownload, FiFileText, FiBookOpen, FiCalendar, FiUser } = FiIcons;

const ResourcesELib = () => {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Resources');

  useEffect(() => {
    const savedResources = JSON.parse(localStorage.getItem('cms_resources') || '[]');
    
    if (savedResources.length === 0) {
      // Use default data if no CMS data exists
      const defaultResources = [
        {
          id: 1,
          title: 'Annual Report 2023',
          description: 'Comprehensive overview of KADCOS activities, financial performance, and achievements in 2023',
          date: '2024-03-15',
          type: 'PDF',
          size: '2.4 MB',
          author: 'KADCOS Management',
          category: 'Financial Reports'
        },
        {
          id: 2,
          title: 'Cooperative Savings Guide',
          description: 'Comprehensive guide to maximizing your savings with KADCOS',
          date: '2024-03-01',
          type: 'PDF',
          size: '1.5 MB',
          author: 'Financial Education Team',
          category: 'Educational Materials'
        }
      ];
      setResources(defaultResources);
    } else {
      setResources(savedResources);
    }
  }, []);

  // Get unique categories from resources
  const categories = ['All Resources', ...new Set(resources.map(resource => resource.category))];

  // Filter resources by active category
  const filteredResources = activeCategory === 'All Resources' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const renderResourceCard = (resource, index, isPublication = false) => (
    <motion.div
      key={resource.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`p-8 rounded-lg shadow-lg card-hover ${isPublication ? 'bg-gray-50' : 'bg-white'}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-full ${isPublication ? 'bg-accent bg-opacity-10' : 'bg-primary bg-opacity-10'}`}>
          <SafeIcon 
            icon={isPublication ? FiBookOpen : FiFileText} 
            className={`text-2xl ${isPublication ? 'text-accent' : 'text-primary'}`} 
          />
        </div>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-marcellus">
          {resource.type}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-secondary mb-4 font-marcellus">
        {resource.title}
      </h3>
      <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
        {resource.description}
      </p>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-sm text-gray-500 font-marcellus">
          <SafeIcon icon={FiCalendar} className="mr-1" />
          {new Date(resource.date).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-500 font-marcellus">
          <SafeIcon icon={FiUser} className="mr-1" />
          {resource.author}
        </div>
        <div className="flex items-center text-sm text-gray-500 font-marcellus">
          {resource.size}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-marcellus ${
          isPublication 
            ? 'bg-accent bg-opacity-10 text-accent' 
            : 'bg-primary bg-opacity-10 text-primary'
        }`}>
          {resource.category}
        </span>
        <button className={`flex items-center transition-colors font-marcellus ${
          isPublication 
            ? 'text-accent hover:text-secondary' 
            : 'text-primary hover:text-secondary'
        }`}>
          <SafeIcon icon={FiDownload} className="mr-2" />
          Download
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20">
      <SEOHead page="resources" />
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
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full transition-colors duration-300 font-marcellus ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-secondary hover:bg-primary hover:text-white'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4 font-marcellus">
              {activeCategory === 'All Resources' ? 'All Resources' : activeCategory}
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              {activeCategory === 'All Resources' 
                ? 'Access our latest reports, publications, and educational resources'
                : `Browse our ${activeCategory.toLowerCase()}`
              }
            </p>
          </motion.div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResources.map((resource, index) => 
                renderResourceCard(resource, index, resource.category.includes('Educational') || resource.category.includes('Newsletter'))
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 font-marcellus">
                No resources found in this category. Check back soon for updates.
              </p>
            </div>
          )}
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