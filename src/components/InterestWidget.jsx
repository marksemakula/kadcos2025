import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InterestWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-black text-white p-4 rounded-r-lg shadow-lg w-48 ml-0"
          >
            <h3 className="text-lg font-bold mb-2 font-marcellus">2% Monthly Interest</h3>
            <p className="text-sm font-marcellus">
              Our savings accounts offer competitive 2% monthly interest rates to help your money grow faster.
            </p>
            <button className="mt-3 bg-primary text-secondary px-3 py-1 rounded text-sm font-marcellus hover:bg-orange-400 transition-colors">
              Learn More
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white p-2 rounded-r-lg shadow-lg font-marcellus flex items-center"
      >
        <span className="writing-mode-vertical mr-1">2% Monthly Interest</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default InterestWidget;