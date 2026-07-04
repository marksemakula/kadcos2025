import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import InterestWidget from '../components/InterestWidget';
import SEOHead from '../components/SEOHead';

const { FiUsers, FiDollarSign, FiTrendingUp, FiShield, FiArrowRight, FiCheckCircle, FiPlay, FiPause, FiAward, FiMapPin } = FiIcons;

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const videos = [
    {
      src: "/videos/KADCOS HOME PAGE.mp4",
      title: "Welcome to KADCOS",
      description: "Discover our financial services and community"
    },
    {
      src: "/videos/KADCOS MEMBERSHIP.mp4",
      title: "Membership Benefits",
      description: "Learn about the advantages of joining KADCOS"
    }
  ];

  const keyBenefits = [
    {
      icon: FiAward,
      title: '17+ Years of Excellence',
      description: 'A proven track record of trusted financial service to our community since 2007.',
    },
    {
      icon: FiShield,
      title: 'Secure & Regulated',
      description: 'Fully protected under Uganda\'s cooperative society regulatory framework.',
    },
    {
      icon: FiTrendingUp,
      title: 'Competitive Returns',
      description: 'Grow your savings with returns of up to 2% monthly interest.',
    }
  ];

  const stats = [
    { number: '1,700+', label: 'Active Members' },
    { number: '17+', label: 'Years of Service' },
    { number: '4', label: 'Parish Branches' },
    { number: '2%', label: 'Monthly Interest' },
  ];

  const trustPoints = [
    { icon: FiShield, text: 'Regulated SACCO' },
    { icon: FiUsers, text: '1,700+ Members' },
    { icon: FiMapPin, text: '4 Parish Branches' },
  ];

  // Array of partner logos using local images from public/images folder
  const partnerLogos = [
    "/images/Centenary.jpg",
    "/images/holysee.png",
    "/images/airtel.png",
    "/images/caritas.png",
    "/images/mtn.jpeg",
    "/images/undp.png",
    "/images/bou.png",
    "/images/dpf.png",
    "/images/fia.png",
    "/images/wcc.jpeg"
  ];

  const handleVideoEnd = () => {
    // When video ends, move to next video
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    // Reset playing state for next video
    setIsPlaying(true);
  };

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Effect to handle play/pause when video changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.log('Video play failed:', error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentVideoIndex, isPlaying]);

  return (
    <div className="min-h-screen font-urbanist">
      <SEOHead page="home" />
      <InterestWidget />

      {/* Hero Section - original brand teal with corporate refinements */}
      <section className="relative bg-[#035D75] pt-36 pb-32 overflow-hidden">
        {/* Subtle decorative glows for depth */}
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-white opacity-[0.06] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-black opacity-[0.10] rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white bg-white/10 border border-white/25 rounded-full px-4 py-2 mb-6">
                Savings &amp; Credit Co-operative &bull; Est. 2007
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                Your Trusted <span className="text-white">Financial Partner</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-100 mb-10 leading-relaxed max-w-xl">
                Financially empowering people through cooperative effort and a strong savings culture since 2007.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-black/20 hover:bg-blue-900 transition-colors duration-300 text-center"
                >
                  <span>Become a Member</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300 text-center"
                >
                  Explore Our Services
                </Link>
              </div>
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6">
                {trustPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-100 text-sm">
                    <SafeIcon icon={point.icon} className="text-white" />
                    <span>{point.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <img
                src="/images/KADCOS-02.png"
                alt="KADCOS Logo"
                className="h-[28rem] max-w-full w-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Band - elevated card overlapping the hero */}
      <section className="relative z-20 -mt-16 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center py-10 px-4"
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section: Video Carousel + Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why KADCOS</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mt-3 mb-4">
              Why Choose KADCOS Lubaga Co-operative Society?
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </motion.div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Video Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Video Player */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-black ring-1 ring-gray-200">
                <video
                  ref={videoRef}
                  key={videos[currentVideoIndex].src}
                  className="w-full h-auto max-h-96 object-cover"
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={videos[currentVideoIndex].src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <button
                    onClick={togglePlayPause}
                    className="bg-primary bg-opacity-90 hover:bg-opacity-100 text-white p-2.5 rounded-full shadow-md transition-all duration-300"
                  >
                    {isPlaying ?
                      <SafeIcon icon={FiPause} className="text-lg" /> :
                      <SafeIcon icon={FiPlay} className="text-lg" />
                    }
                  </button>

                  <div className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full">
                    <span className="text-sm">
                      {currentVideoIndex + 1} / {videos.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Navigation */}
              <div className="flex space-x-4 justify-center">
                {videos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => handleVideoSelect(index)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      index === currentVideoIndex
                        ? 'bg-secondary text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {video.title}
                  </button>
                ))}
              </div>

              {/* Current Video Info */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  {videos[currentVideoIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Right: Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-5 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="bg-primary/10 p-3.5 rounded-lg flex-shrink-0">
                    <SafeIcon icon={benefit.icon} className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-2"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-2 text-primary font-semibold hover:text-secondary transition-colors duration-300"
                >
                  <span>Learn More About Us</span>
                  <SafeIcon icon={FiArrowRight} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-400">
              Trusted By &amp; Working With Leading Institutions
            </span>
          </motion.div>

          {/* Carousel Container - Fixed for seamless looping */}
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll">
              {/* Combine original and duplicated logos in a single continuous flex container */}
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-8">
                  <img
                    src={logo}
                    alt={`Partner ${index % partnerLogos.length + 1}`}
                    className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300 object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Gradient fade effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent"></div>
          </div>
        </div>

        {/* Animation styles for seamless looping */}
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 2));
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
            }
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-[#0F2240] to-[#0A1930]"></div>
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Start your journey towards financial empowerment with KADCOS. Join over 1,700 members who trust us with their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/25 hover:bg-[#1B6E8A] transition-colors duration-300"
              >
                <span>Get Started Today</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Talk to Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
