import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiMapPin, FiNavigation, FiMountain, FiCompass } = FiIcons;

const LocationDetails = () => {
  const { weddingData } = useWedding();

  const openInMaps = () => {
    const { lat, lng } = weddingData.location.coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 bg-forest-50 dark:bg-slate-800 bg-linen transition-colors duration-700">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiMapPin} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto animate-pulse" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Where We Say "I Do"
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Join us at one of nature's most breathtaking venues
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
                {weddingData.location.name}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                  <span className="text-slate-700 dark:text-ivory-200">
                    {weddingData.location.address}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <SafeIcon icon={FiMountain} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                  <span className="text-slate-700 dark:text-ivory-200">
                    Elevation: {weddingData.location.elevation}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <SafeIcon icon={FiCompass} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                  <span className="text-slate-700 dark:text-ivory-200">
                    GPS: {weddingData.location.coordinates.lat}, {weddingData.location.coordinates.lng}
                  </span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openInMaps}
                className="mt-6 bg-gradient-to-r from-forest-600 to-sunrise-600 text-white px-6 py-3 rounded-lg font-medium hover:from-forest-700 hover:to-sunrise-700 transition-all duration-300 flex items-center"
              >
                <SafeIcon icon={FiNavigation} className="mr-2" />
                Get Directions
              </motion.button>
            </div>
            
            {/* Additional Info */}
            <div className="bg-sunrise-50 dark:bg-forest-800 p-6 rounded-lg border-l-4 border-sunrise-400">
              <h4 className="text-lg font-serif text-forest-900 dark:text-ivory-100 mb-3">
                Trail Information
              </h4>
              <ul className="space-y-2 text-slate-700 dark:text-ivory-200">
                <li>• Moderate hiking difficulty</li>
                <li>• 2-mile trail to ceremony site</li>
                <li>• Parking available at trailhead</li>
                <li>• Bring sturdy hiking shoes</li>
              </ul>
            </div>
          </motion.div>

          {/* Map/Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
                alt="Wedding Location"
                className="w-full h-96 object-cover"
              />
              
              {/* Overlay with coordinates */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="mr-2" />
                  <span className="text-sm">
                    {weddingData.location.coordinates.lat}, {weddingData.location.coordinates.lng}
                  </span>
                </div>
              </div>
              
              {/* Elevation tag */}
              <div className="absolute top-4 right-4 bg-sunrise-400/90 text-forest-900 px-3 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <SafeIcon icon={FiMountain} className="mr-2" />
                  <span className="text-sm font-medium">
                    {weddingData.location.elevation}
                  </span>
                </div>
              </div>
              
              {/* Click to expand overlay */}
              <motion.div
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={openInMaps}
              >
                <div className="bg-white/90 px-4 py-2 rounded-lg">
                  <span className="text-forest-900 font-medium">Click to view in maps</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;