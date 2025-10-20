import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiCreditCard, FiTrendingUp, FiCalendar, FiPercent, FiClock } = FiIcons;

const Services = () => {
  const loanProducts = [
    {
      title: 'Personal Loan',
      description: 'For home renovation, buying furniture, and personal needs',
      maxPeriod: '12 months',
      interestRate: '2% per month',
      icon: FiDollarSign
    },
    {
      title: 'School Fees Loan',
      description: 'Educational financing for your children\'s future',
      maxPeriod: '6 months',
      interestRate: '2% per month',
      icon: FiTrendingUp
    },
    {
      title: 'Business Loan',
      description: 'Capital for business expansion and development',
      maxPeriod: '12 months',
      interestRate: '2% per month',
      icon: FiCreditCard
    },
    {
      title: 'Agricultural/Farming Loan',
      description: 'Support for agricultural activities and farming',
      maxPeriod: '12 months',
      interestRate: '2% per month',
      icon: FiTrendingUp
    },
    {
      title: 'Construction Loan',
      description: 'Financing for construction and building projects',
      maxPeriod: '12 months',
      interestRate: '2% per month',
      icon: FiDollarSign
    },
    {
      title: 'Weekend Loan',
      description: 'Special rates for members',
      maxPeriod: '12 months',
      interestRate: '1% per week',
      icon: FiPercent
    },
    {
      title: 'Loans in Kind',
      description: 'Capital for business expansion and development',
      maxPeriod: '12 months',
      interestRate: '3% per month',
      icon: FiCreditCard
    },
    {
      title: 'Emergency Loan',
      description: 'Quick loans for unexpected expenses',
      maxPeriod: '3 months',
      interestRate: '3% per month',
      icon: FiClock
    }
  ];

  const savingsFeatures = [
    {
      title: 'Regular Savings',
      description: 'Minimum monthly savings of 10,000 UGX with competitive returns',
      icon: FiDollarSign
    },
    {
      title: 'Fixed Deposits',
      description: 'Secure your money with our fixed deposit accounts',
      icon: FiTrendingUp
    },
    {
      title: 'Flexible Withdrawals',
      description: 'Access your savings when you need them (minimum balance: 20,000 UGX)',
      icon: FiCreditCard
    }
  ];

  const loanRequirements = [
    'Full membership',
    'Regular savings for at least a period of 3 months',
    'At least one guarantor who is fully registered and in good standing with the cooperative',
    'Loan application letter and a fully filled loan application form',
    'Collateral on loans above 2.5 million'
  ];

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
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-arthelo">
              Services and Products
            </h1>
            <p className="text-xl text-gray-700 font-marcellus max-w-3xl mx-auto">
              Comprehensive financial services designed to meet your needs and help you achieve your goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Savings Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Savings Services
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Build your financial future with our flexible savings options
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {savingsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-lg shadow-lg card-hover"
              >
                <div className="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-4 font-marcellus">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-marcellus leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4 font-marcellus">
              Loan Products
            </h2>
            <p className="text-xl text-gray-600 font-marcellus max-w-3xl mx-auto">
              Access credit facilities tailored to your specific needs. Collateral is required for loans above 2.5m
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loanProducts.map((loan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg card-hover"
              >
                <div className="bg-primary bg-opacity-10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <SafeIcon icon={loan.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-dark mb-4 font-marcellus">
                  {loan.title}
                </h3>
                <p className="text-gray-600 mb-6 font-marcellus leading-relaxed">
                  {loan.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-marcellus">Max Period:</span>
                    <span className="text-dark font-semibold font-marcellus">{loan.maxPeriod}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-marcellus">Interest Rate:</span>
                    <span className="text-primary font-semibold font-marcellus">{loan.interestRate}</span>
                  </div>
                </div>
                
                {/* Loan Requirements added to each loan product */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-dark mb-3 font-marcellus">Requirements:</h4>
                  <ul className="text-xs text-gray-600 space-y-1 font-marcellus">
                    <li>• Full membership</li>
                    <li>• 3+ months regular savings</li>
                    <li>• At least one guarantor</li>
                    <li>• Application letter & form</li>
                    <li>• Collateral for loans above 2.5m</li>
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Requirements - Detailed Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6 font-marcellus">
                Loan Eligibility Requirements
              </h2>
              <p className="text-gray-600 mb-8 font-marcellus leading-relaxed">
                To qualify for our loan products, members must meet the following requirements:
              </p>
              <ul className="space-y-4">
                {loanRequirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="bg-primary bg-opacity-10 p-1 rounded-full flex-shrink-0 mt-1">
                      <SafeIcon icon={FiTrendingUp} className="text-primary text-sm" />
                    </div>
                    <span className="text-gray-700 font-marcellus">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src="/images/loan.jpg" 
                alt="Financial Planning" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meeting Schedule */}
      <section className="py-20 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-marcellus">
              Meeting Schedule
            </h2>
            <p className="text-xl text-gray-300 font-marcellus max-w-3xl mx-auto">
              Stay connected with our regular meetings and governance activities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AGM', frequency: 'Once a year' },
              { title: 'Executive Board', frequency: 'Once a month' },
              { title: 'Supervisory Board', frequency: 'Once a month' },
              { title: 'Committees', frequency: 'Once a month' }
            ].map((meeting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg text-center"
              >
                <div className="bg-primary bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={FiCalendar} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-marcellus">{meeting.title}</h3>
                <p className="text-gray-300 font-marcellus">{meeting.frequency}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;