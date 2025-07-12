import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiPackage, FiCheck, FiInfo } = FiIcons;

const GearList = () => {
  const { weddingData } = useWedding();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-forest-50 to-sunrise-50 dark:from-slate-800 dark:to-forest-800 transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiPackage} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Adventure Gear Guide
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Pack light, adventure hard. Here's what you'll need for our mountain celebration.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Essential Gear */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6 flex items-center">
              <SafeIcon icon={FiCheck} className="text-green-500 mr-3" />
              Essential Items
            </h3>
            
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {weddingData.gearList.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-3 bg-forest-50 dark:bg-slate-600 rounded-lg hover:bg-forest-100 dark:hover:bg-slate-500 transition-colors duration-200"
                >
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-forest-900 dark:text-ivory-100 font-medium">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Recommended Gear */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6 flex items-center">
              <SafeIcon icon={FiInfo} className="text-sunrise-500 mr-3" />
              Recommended
            </h3>
            
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                'Trekking poles',
                'Headlamp/flashlight',
                'Portable phone charger',
                'Insect repellent',
                'Sunscreen & sunglasses',
                'Light rain jacket'
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-center p-3 bg-sunrise-50 dark:bg-slate-600 rounded-lg hover:bg-sunrise-100 dark:hover:bg-slate-500 transition-colors duration-200"
                >
                  <SafeIcon icon={FiInfo} className="text-sunrise-500 mr-3 flex-shrink-0" />
                  <span className="text-forest-900 dark:text-ivory-100 font-medium">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Additional Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-forest-600 to-sunrise-600 p-8 rounded-lg text-white"
        >
          <h3 className="text-2xl font-serif mb-4">Adventure Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Weather Preparedness</h4>
              <p className="text-sm opacity-90">
                Mountain weather can change quickly. Layer up and bring rain protection!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Trail Etiquette</h4>
              <p className="text-sm opacity-90">
                Stay on marked trails and pack out all trash. Leave only footprints!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GearList;