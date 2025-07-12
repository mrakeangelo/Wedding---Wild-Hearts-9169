import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiHeart } = FiIcons;

const FloatingRsvpButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-forest-600 to-sunrise-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="flex items-center"
      >
        <SafeIcon icon={FiCalendar} className="text-xl mr-2" />
        <span className="hidden sm:inline font-medium">RSVP</span>
        <SafeIcon icon={FiHeart} className="text-sm ml-1 group-hover:animate-pulse" />
      </motion.div>
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-sunrise-400 rounded-full opacity-30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

export default FloatingRsvpButton;