import React from 'react';
import { motion } from 'framer-motion';

const ManagersMessage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-6 font-arthelo">
              Manager's Message
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-lg p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <img 
                src="/images/PatrickDdumba.png" 
                alt="Manager"
                className="w-48 h-48 object-cover rounded-full border-4 border-primary"
              />
              <div>
                <h2 className="text-2xl font-bold text-secondary mb-2 font-marcellus">
                  Mr. Dumba Patrick, <span className="font-marcellus text-base">CFIP</span>
                </h2>
                <p className="text-gray-600 font-marcellus mb-2 text-l">Manager</p>
                <p className="text-gray-500 font-marcellus text-l">
                  KADCOS Lubaga Cooperative Society Ltd
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 mb-6 font-marcellus text-l leading-relaxed">
                Dear valued members and partners,
              </p>
              
              <p className="text-gray-700 mb-6 font-marcellus text-l leading-relaxed">
                Welcome to KADCOS Lubaga Co-operative Society Ltd. We are dedicated to promoting financial empowerment, 
                sustainable growth and shared prosperity for all our members. Guided with integrity and good governance, 
                we remain committed to providing reliable services that create lasting value for our community members 
                through cooperative effort and a strong savings culture.
              </p>
              
              <p className="text-gray-700 mb-6 font-marcellus text-l leading-relaxed">
                Our journey has been remarkable, growing from a small initiative to a thriving cooperative with over 
                1,700 members. This growth is a testament to your trust in our services and the dedication of our team 
                to provide exceptional financial solutions.
              </p>
              
              <p className="text-gray-700 mb-6 font-marcellus text-l leading-relaxed">
                As we look to the future, we remain focused on innovation, member satisfaction, and sustainable growth. 
                We will continue to introduce new services and improve existing ones to better serve you.
              </p>
              
              <p className="text-gray-700 mb-6 font-marcellus text-l leading-relaxed">
                I invite you to explore our services, join our growing community, and experience the benefits of being 
                part of KADCOS. Together, we can achieve financial freedom and build a prosperous community.
              </p>
              
              <p className="text-gray-700 font-marcellus text-l leading-relaxed">
                Thank you for your continued trust and support.
              </p>
              
              <p className="text-gray-700 mt-8 font-marcellus text-l leading-relaxed">
                Sincerely,<br />
                <strong>Patrick Dumba, CFIP</strong><br />
                Manager<br />
                KADCOS Lubaga Cooperative Society Ltd
              </p>
            </div>
          </motion.div>
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
              Become part of our growing family and enjoy the benefits of cooperative banking
            </p>
            <a
              href="/membership"
              className="inline-flex items-center bg-primary text-secondary px-8 py-4 rounded-full font-marcellus hover:bg-orange-500 transition-colors duration-300"
            >
              Become a Member
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ManagersMessage;