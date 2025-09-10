import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

const { FiPhone, FiMail, FiMapPin, FiClock } = FiIcons;

const Footer = () => {
  // Office locations data
  const offices = [
    {
      name: "Lubaga Cathedral",
      address: "Administration Building",
      phone: "0783-077661"
    },
    {
      name: "Mt. Carmel Busega Parish",
      address: "Busega Catholic Parish",
      phone: "0752-599221"
    },
    {
      name: "Buyege Catholic Parish",
      address: "Buyege Parish Office",
      phone: "0772-455332"
    }
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex flex-col items-start mb-4">
              <div className="flex items-center space-x-4 mb-3">
                <img 
                  src="/images/KADCOS  1-01.svg"
                  alt="KADCOS Logo" 
                  className="h-40 w-auto"
                />
                <div className="pt-1">
                  <h3 className="text-2xl font-bold font-marcellus">KADCOS</h3>
                  <p className="text-gray-400 font-marcellus mt-1">Lubaga Cooperative Society Ltd.</p>
                </div>
              </div>
              <p className="text-gray-400 mb-3 font-marcellus leading-relaxed text-justify">
                Financially empowering people of God in Kampala Archdiocese through cooperative effort and savings culture since 2007.
              </p>
              <p className="text-sm text-gray-500 font-marcellus text-justify">ACTS 2:45-47</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col md:pl-4">
            <h4 className="text-lg font-semibold mb-3 font-marcellus">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Membership', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-primary transition-colors duration-300 font-marcellus"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Locations */}
          <div className="flex flex-col md:pl-2">
            <h4 className="text-lg font-semibold mb-3 font-marcellus">Our Offices</h4>
            <div className="space-y-2">
              {offices.map((office, index) => (
                <div key={index} className="bg-gray-750 p-2 rounded-lg">
                  <h5 className="font-medium text-primary font-marcellus text-sm">{office.name}</h5>
                  <div className="flex items-start space-x-2 mt-1">
                    <SafeIcon icon={FiMapPin} className="text-primary mt-0.5 flex-shrink-0 text-xs" />
                    <span className="text-gray-400 text-xs font-marcellus text-justify">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <SafeIcon icon={FiPhone} className="text-primary flex-shrink-0 text-xs" />
                    <span className="text-gray-400 text-xs font-marcellus">{office.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info with App Download Section */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-3 font-marcellus">Contact Info</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="text-primary" />
                <span className="text-gray-400 font-marcellus text-justify text-sm">admin@kadcos.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="text-primary mt-1" />
                <div className="text-gray-400 font-marcellus text-justify text-sm">
                  <p>Mon-Fri: 8:30am - 5:00pm</p>
                  <p>Sat: 8:00am - 1:00pm</p>
                </div>
              </div>
            </div>
            
            {/* App Download Section */}
            <div className="pt-3 border-t border-gray-700">
              <p className="text-gray-400 text-sm font-marcellus mb-2 text-justify">
                Coming to mobile app soon!
              </p>
              <div className="flex flex-row gap-2">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  href="#"
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 px-2 py-1.5 rounded transition-colors duration-300 flex-1"
                >
                  <FaApple className="text-white text-md" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on</div>
                    <div className="text-xs font-medium">App Store</div>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  href="#"
                  className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 px-2 py-1.5 rounded transition-colors duration-300 flex-1"
                >
                  <FaGooglePlay className="text-white text-md" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-xs font-medium">Google Play</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-marcellus text-justify text-sm">
            © 2025 KADCOS Lubaga Cooperative Society Ltd. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-xs font-marcellus">Powered by</span>
            <img 
              src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1749836650782-inzozi.png" 
              alt="Inzozi Logo" 
              className="h-8 w-auto brightness-0 invert" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;