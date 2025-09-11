import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPhone, FiMail, FiMapPin, FiClock, FiUser, FiSend } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link
    const mailtoLink = `mailto:kadcoslubaga.sacco@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
    
    window.location.href = mailtoLink;
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone Numbers',
      details: ['0783-077661', '0701763688'],
      link: 'tel:0783077661'
    },
    {
      icon: FiMail,
      title: 'Email Addresses',
      details: ['kadcoslubaga.sacco@gmail.com', 'dpatrik005@gmail.com'],
      link: 'mailto:kadcoslubaga.sacco@gmail.com'
    },
    {
      icon: FiMapPin,
      title: 'Office Location',
      details: ['Lubaga Cathedral', 'Administration Building'],
      link: '#'
    },
    {
      icon: FiClock,
      title: 'Working Hours',
      details: ['Mon-Fri: 8:30am - 5:00pm', 'Saturday: 8:00am - 1:00pm'],
      link: '#'
    }
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Get in touch with us for any inquiries about our services, membership, or general information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              We're here to help you with all your financial needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg shadow-lg card-hover text-center"
              >
                <div className="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <SafeIcon icon={info.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-4 font-marcellus">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 font-marcellus">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Manager Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-8 font-marcellus">
                Send Us a Message
              </h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <SafeIcon icon={FiUser} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-marcellus mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <SafeIcon icon={FiMail} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-marcellus mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <SafeIcon icon={FiPhone} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-marcellus mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-marcellus resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-dark py-4 rounded-lg font-marcellus font-semibold hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <SafeIcon icon={FiSend} />
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <SafeIcon icon={FiSend} className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-4 font-marcellus">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 font-marcellus">
                    Thank you for contacting us. We will get back to you soon.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Manager Info and Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Manager Info */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-dark mb-6 font-marcellus">
                  Society Manager
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    <SafeIcon icon={FiUser} className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-dark font-marcellus">Ddumba Patrick</h4>
                    <p className="text-gray-600 font-marcellus">Manager</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiPhone} className="text-primary" />
                    <span className="text-gray-600 font-marcellus">0783-077661</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMail} className="text-primary" />
                    <span className="text-gray-600 font-marcellus">dpatrik005@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Office Image */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="/images/kadcos_lubaga_co_operative_society_cover.jpeg" 
                  alt="KADCOS Office" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-center text-gray-600 font-marcellus mt-4">
                  Lubaga Cathedral Administration Building
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;