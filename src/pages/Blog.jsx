import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalendar, FiUser, FiArrowRight, FiEdit } = FiIcons;

const Blog = () => {
  const [posts] = useState([
    {
      id: 1,
      title: 'Understanding Cooperative Banking in Uganda',
      excerpt: 'Learn about the role of cooperative societies in Uganda\'s financial sector and how they contribute to economic development.',
      author: 'Dumba Patrick',
      date: '2024-01-15',
      image: '/images/mohammadreza-charkhgard-L5Hdw0o6cKg-unsplash.jpg',
      content: 'Cooperative banking has been a cornerstone of Uganda\'s financial inclusion strategy...'
    },
    {
      id: 2,
      title: 'The Importance of Savings Culture in Faith Communities',
      excerpt: 'Discover how faith-based savings groups are transforming lives in Kampala Archdiocese through collective financial empowerment.',
      author: 'KADCOS Team',
      date: '2024-01-10',
      image: '/images/jonathan-velasquez-c1ZN57GfDB0-unsplash.jpg',
      content: 'Building a savings culture within faith communities requires dedication and proper guidance...'
    },
    {
      id: 3,
      title: 'Financial Literacy: Your Path to Economic Freedom',
      excerpt: 'Essential financial literacy tips for KADCOS members to make informed decisions about savings, loans, and investments.',
      author: 'Financial Education Team',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'Financial literacy is the foundation of sound financial decision-making...'
    },
    {
      id: 4,
      title: 'KADCOS Success Stories: Members Who Transformed Their Lives',
      excerpt: 'Read inspiring stories of KADCOS members who have achieved their financial goals through our cooperative services.',
      author: 'Community Relations',
      date: '2023-12-28',
      image: '/images/peter-thomas-OUfn4MNUGA4-unsplash.jpg',
      content: 'Meet some of our successful members who have transformed their lives through KADCOS...'
    },
    {
      id: 5,
      title: 'Agricultural Loans: Supporting Farmers in Our Community',
      excerpt: 'How KADCOS agricultural loans are helping local farmers increase productivity and improve their livelihoods.',
      author: 'Loan Department',
      date: '2023-12-20',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      content: 'Agriculture remains a vital sector in Uganda\'s economy, and KADCOS is proud to support farmers...'
    },
    {
      id: 6,
      title: 'Building Strong Communities Through Cooperative Values',
      excerpt: 'Exploring how cooperative principles strengthen community bonds and promote collective prosperity.',
      author: 'KADCOS Leadership',
      date: '2023-12-15',
      image: '/images/1731587403135.jpeg',
      content: 'The cooperative movement is built on values that promote community development and mutual support...'
    }
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6 font-marcellus">
              KADCOS Blog
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Stay informed with the latest news, insights, and stories from our cooperative community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-12 font-marcellus text-center">
              Featured Article
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-4 text-gray-500">
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="text-primary" />
                    <span className="font-marcellus">{posts[0].author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="text-primary" />
                    <span className="font-marcellus">{new Date(posts[0].date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-dark mb-4 font-marcellus">
                  {posts[0].title}
                </h3>
                <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <button className="inline-flex items-center space-x-2 bg-primary text-dark px-6 py-3 rounded-full font-marcellus hover:bg-yellow-600 transition-colors duration-300">
                  <span>Read More</span>
                  <SafeIcon icon={FiArrowRight} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Discover insights, tips, and stories from our cooperative community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden card-hover"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiUser} className="text-primary" />
                      <span className="font-marcellus">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiCalendar} className="text-primary" />
                      <span className="font-marcellus">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 font-marcellus line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-marcellus leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button className="inline-flex items-center space-x-2 text-primary hover:text-yellow-600 transition-colors duration-300 font-marcellus">
                    <span>Read More</span>
                    <SafeIcon icon={FiArrowRight} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-marcellus">
              Want to Share Your Story?
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-marcellus max-w-3xl mx-auto">
              We'd love to feature your success story or insights from your journey with KADCOS. Contact us to contribute to our blog.
            </p>
            <button className="inline-flex items-center space-x-2 bg-primary text-dark px-8 py-4 rounded-full font-marcellus hover:bg-yellow-600 transition-colors duration-300">
              <SafeIcon icon={FiEdit} />
              <span>Contribute to Blog</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;