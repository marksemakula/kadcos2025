import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import InterestWidget from '../components/InterestWidget';
import SEOHead from '../components/SEOHead';

const { FiUsers, FiDollarSign, FiTrendingUp, FiShield, FiArrowRight, FiCheckCircle, FiPlay, FiPause, FiAward, FiMapPin } = FiIcons;

const Home = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const heroImages = [
    '/images/kadcos_office_meeting_5.jpg',
    '/images/kadcos_community_1.jpg',
    '/images/kadcos_office_meeting_2.jpg',
    '/images/kadcos_community_3.jpg'
  ];
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    },
    {
      src: "/videos/KADCOS NEWS STORY.mp4",
      title: "KADCOS News Story",
      description: "See KADCOS in the news and in the community"
    }
  ];

  const communityPhotos = [
    { src: '/images/kadcos_community_1.jpg', caption: 'Annual General Meeting' },
    { src: '/images/kadcos_office_meeting_2.jpg', caption: 'Community outreach' },
    { src: '/images/kadcos_office_meeting_5.jpg', caption: 'Partner events' },
    { src: '/images/kadcos_community_3.jpg', caption: 'Member engagement' }
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
      description: 'Fully protected under Uganda\'s cooperative society regulatory framework. REG No : 9838/RCS',
    },
    {
      icon: FiTrendingUp,
      title: 'Competitive Returns',
      description: 'Grow your savings with returns of up to 2% monthly interest.',
    }
  ];

  const stats = [
    { number: '2,000+', label: 'Active Members' },
    { number: '17+', label: 'Years of Service' },
    { number: '4', label: 'Parish Branches' },
    { number: '2%', label: 'Monthly Interest' },
  ];

  const trustPoints = [
    { icon: FiShield, text: 'Regulated SACCO' },
    { icon: FiUsers, text: '2,000+ Members' },
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

      {/* Hero Section - full-bleed photographic hero with editorial overlay */}
      <section className="relative min-h-[100svh] lg:min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed background photo slideshow */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={heroImages[currentHeroImage]}
              src={heroImages[currentHeroImage]}
              alt="KADCOS Lubaga Cooperative Society members"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04222c] via-[#04222c]/85 to-[#0B3A4A]/50"></div>
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        {/* Slideshow indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              aria-label={`Show hero image ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentHeroImage ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 lg:py-0">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-white/85 border-b border-primary pb-2 mb-8"
            >
              Multi-Purpose Co-operative &bull; Est. 2007
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            >
              KADCOS LUBAGA, Your Trusted<br />
              <span className="font-marcellus text-white">Financial Partner</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg lg:text-xl text-gray-200 mb-10 leading-relaxed max-w-lg"
            >
              Financially empowering people through cooperative effort and a strong savings culture since 2007.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link
                to="/membership"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-secondary px-8 py-4 font-semibold text-white shadow-lg shadow-black/30 text-center"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="relative flex items-center gap-2">
                  Become a Member
                  <SafeIcon icon={FiArrowRight} />
                </span>
              </Link>
              <Link
                to="/services"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-white/40 px-8 py-4 font-semibold text-white text-center"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-white/15 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="relative">Explore Our Services</span>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6"
            >
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-100 text-sm">
                  <SafeIcon icon={point.icon} className="text-white" />
                  <span>{point.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats strip - quiet transition below the hero, not meant to compete for attention */}
      <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-4 lg:divide-x divide-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:px-4">
              <p className="text-xl lg:text-2xl font-bold text-secondary">{stat.number}</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Split Section: Video Carousel + Benefits */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="hidden sm:block h-px w-10 bg-primary/40"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">Why KADCOS</span>
              <span className="hidden sm:block h-px w-10 bg-primary/40"></span>
            </div>
            <h2 className="font-marcellus text-3xl lg:text-5xl font-bold text-secondary leading-tight">
              Why Choose KADCOS Lubaga Co-operative Society?
            </h2>
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
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 bg-secondary/90 text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  Featured
                </div>
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
              className="space-y-8"
            >
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
                {keyBenefits.map((benefit, index) => {
                  const accentColors = ['border-primary text-primary', 'border-secondary text-secondary', 'border-amber-500 text-amber-500'];
                  const accent = accentColors[index % accentColors.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`flex items-start gap-5 p-6 border-l-4 ${accent.split(' ')[0]} hover:bg-gray-50 transition-colors duration-300`}
                    >
                      <div className="flex-shrink-0">
                        <span className={`block text-xs font-mono tracking-widest ${accent.split(' ')[1]} mb-2`}>
                          0{index + 1}
                        </span>
                        <SafeIcon icon={benefit.icon} className={`text-2xl ${accent.split(' ')[1]}`} />
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
                  );
                })}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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

      {/* In the Community Section */}
      <section className="py-20 lg:py-28 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="hidden sm:block h-px w-10 bg-white/25"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">In the Community</span>
              <span className="hidden sm:block h-px w-10 bg-white/25"></span>
            </div>
            <h2 className="font-marcellus text-3xl lg:text-5xl font-bold leading-tight">
              Real Members, Real Impact
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {communityPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-xl overflow-hidden shadow-lg group h-56"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                <p className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Carousel Section */}
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="hidden sm:block h-px w-10 bg-gray-300"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gray-400">
                Trusted By &amp; Working With Leading Institutions
              </span>
              <span className="hidden sm:block h-px w-10 bg-gray-300"></span>
            </div>
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
      <section className="relative py-24 lg:py-28 bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-[#0F2240] to-[#0A1930]"></div>
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="hidden sm:block h-px w-10 bg-white/25"></span>
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-primary">Get Started</span>
              <span className="hidden sm:block h-px w-10 bg-white/25"></span>
            </div>
            <h2 className="font-marcellus text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg lg:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Start your journey towards financial empowerment with KADCOS. Join over 2,000 members who trust us with their financial future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/membership"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/25"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-[#1B6E8A] transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="relative flex items-center gap-2">
                  Get Started Today
                  <SafeIcon icon={FiArrowRight} />
                </span>
              </Link>
              <Link
                to="/contact"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-white/30 px-8 py-4 font-semibold text-white"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-white/15 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="relative">Talk to Our Team</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
