import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiMapPin, FiCalendar, FiHeart } = FiIcons;

const Timeline = () => {
  const { weddingData } = useWedding();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-ivory-50 dark:bg-slate-800 bg-stone-grain transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Our Adventure Timeline
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Every great love story has its milestones. Here's how our journey unfolded.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-forest-400 via-sunrise-400 to-burnt-500 rounded-full hidden md:block" />

          {weddingData.timeline.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <SafeIcon 
                      icon={FiCalendar} 
                      className="text-forest-600 dark:text-sunrise-400 mr-3" 
                    />
                    <span className="text-forest-600 dark:text-sunrise-400 font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif text-forest-900 dark:text-ivory-100 mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-ivory-200 mb-4">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-forest-500 dark:text-sunrise-300">
                    <SafeIcon icon={FiMapPin} className="mr-2" />
                    <span>Adventure milestone</span>
                  </div>
                </div>
              </div>

              {/* Timeline Point */}
              <div className="hidden md:flex w-2/12 justify-center">
                <div className="w-4 h-4 bg-sunrise-400 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10 relative">
                  <div className="absolute inset-0 bg-sunrise-400 rounded-full animate-ping opacity-75" />
                </div>
              </div>

              {/* Image */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} mt-6 md:mt-0`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-forest-600 to-sunrise-600 p-8 rounded-lg text-white">
            <SafeIcon icon={FiHeart} className="text-4xl mb-4 mx-auto animate-pulse" />
            <h3 className="text-2xl font-serif mb-4">
              Ready to Join Our Adventure?
            </h3>
            <p className="text-lg opacity-90">
              The best adventures are shared with the people we love most.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;