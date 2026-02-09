import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SEOHead from '../components/SEOHead';

const { FiCalendar, FiUser, FiArrowRight, FiEdit } = FiIcons;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        // Try to fetch blog posts from JSON files
        const blogFiles = [
          'understanding-cooperative-banking-in-uganda',
          'the-importance-of-savings-culture-in-faith-communities',
          'financial-literacy-your-path-to-economic-freedom'
        ];
        
        const loadedPosts = [];
        
        for (const file of blogFiles) {
          try {
            const response = await fetch(`/data/blog/${file}.json`);
            if (response.ok) {
              const post = await response.json();
              loadedPosts.push(post);
            }
          } catch (e) {
            console.log(`Could not load ${file}:`, e);
          }
        }
        
        if (loadedPosts.length > 0) {
          // Sort by date (newest first)
          loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(loadedPosts);
        } else {
          // Fall back to localStorage CMS data or default posts
          const savedPosts = JSON.parse(localStorage.getItem('cms_blogPosts') || '[]');
          if (savedPosts.length > 0) {
            setPosts(savedPosts);
          } else {
            // Use default posts as final fallback
            const defaultPosts = [
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
                image: '/images/peter-thomas-OUfn4MNUGA4-unsplash.jpg',
                content: 'Financial literacy is the foundation of sound financial decision-making...'
              }
            ];
            setPosts(defaultPosts);
          }
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-marcellus">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead page="blog" />

      {/* Featured Post - Show first post as featured */}
      {posts.length > 0 && (
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
                    onError={(e) => {
                      e.target.src = '/images/placeholder-blog.jpg';
                    }}
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
      )}

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
                  onError={(e) => {
                    e.target.src = '/images/placeholder-blog.jpg';
                  }}
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

          {/* Show message if no additional posts */}
          {posts.length <= 1 && (
            <div className="text-center py-12">
              <p className="text-gray-500 font-marcellus">
                More articles coming soon...
              </p>
            </div>
          )}
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