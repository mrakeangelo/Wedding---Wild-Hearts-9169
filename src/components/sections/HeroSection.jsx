import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiChevronDown, FiHeart, FiMountain } = FiIcons;

const HeroSection = () => {
  const { weddingData } = useWedding();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-transparent to-forest-900/80" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <SafeIcon 
            icon={FiMountain} 
            className="text-6xl text-sunrise-400 mb-4 animate-mountain-glow" 
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-6xl md:text-8xl font-serif text-ivory-100 mb-6"
        >
          {weddingData.coupleNames.partner1}
          <span className="text-sunrise-400 mx-4">
            <SafeIcon icon={FiHeart} className="inline text-4xl md:text-6xl" />
          </span>
          {weddingData.coupleNames.partner2}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-xl md:text-2xl text-ivory-200 mb-8 italic font-serif"
        >
          "{weddingData.heroQuote}"
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-ivory-300 font-sans"
        >
          <p className="text-lg mb-2">
            {new Date(weddingData.weddingDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-base opacity-80">{weddingData.location.name}</p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-ivory-100 hover:text-sunrise-400 transition-colors duration-300"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-sm mb-2 font-sans">Scroll to explore</span>
            <SafeIcon icon={FiChevronDown} className="text-2xl" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;