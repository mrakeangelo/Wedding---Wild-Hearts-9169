import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiX, FiChevronLeft, FiChevronRight, FiCamera } = FiIcons;

const Gallery = () => {
  const { weddingData } = useWedding();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(weddingData.gallery[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % weddingData.gallery.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(weddingData.gallery[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(weddingData.gallery[prevIndex]);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 to-ivory-100 dark:from-slate-900 dark:to-forest-900 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiCamera} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Adventure Gallery
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Capturing the wild beauty of our journey together
          </p>
        </motion.div>

        {/* Horizontal Scroll Gallery */}
        <div className="overflow-x-auto pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-6"
            style={{ width: `${weddingData.gallery.length * 400}px` }}
          >
            {weddingData.gallery.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group cursor-pointer flex-shrink-0"
                onClick={() => openLightbox(index)}
              >
                <div className="w-96 h-64 overflow-hidden rounded-lg shadow-lg">
                  <motion.img
                    src={image.image}
                    alt={image.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-sunrise-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white hover:text-sunrise-400 transition-colors z-10"
                >
                  <SafeIcon icon={FiX} className="text-2xl" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-sunrise-400 transition-colors z-10"
                >
                  <SafeIcon icon={FiChevronLeft} className="text-3xl" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-sunrise-400 transition-colors z-10"
                >
                  <SafeIcon icon={FiChevronRight} className="text-3xl" />
                </button>

                {/* Image */}
                <img
                  src={selectedImage.image}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    {selectedImage.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;