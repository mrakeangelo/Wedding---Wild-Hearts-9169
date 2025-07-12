import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiBook, FiHeart, FiFeather } = FiIcons;

const StorySection = () => {
  const { weddingData } = useWedding();

  return (
    <section className="py-20 bg-gradient-to-br from-ivory-50 to-forest-50 dark:from-slate-900 dark:to-forest-900 bg-linen transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiBook} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            {weddingData.story.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Every adventure has a story. Here's how ours began and where it's taking us.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <SafeIcon icon={FiFeather} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100">
                  Our Beginning
                </h3>
              </div>
              
              <div className="prose prose-lg text-slate-700 dark:text-ivory-200 leading-relaxed">
                <p className="mb-4">
                  {weddingData.story.content}
                </p>
                
                <p className="mb-4">
                  From that first shared sunrise on a mountain peak to countless trails explored together, 
                  our love has been forged in the wilderness. Each step has brought us closer, each summit 
                  a new chapter in our story.
                </p>
                
                <p className="mb-4">
                  We chose to elope not because we wanted to be alone, but because we wanted to be 
                  surrounded by the raw beauty that first brought us together. The mountains have been 
                  our witness, our sanctuary, and our inspiration.
                </p>
                
                <p>
                  This isn't just a wedding—it's the beginning of our greatest adventure yet. 
                  Thank you for being part of our journey.
                </p>
              </div>
            </div>
            
            {/* Quote Box */}
            <div className="bg-gradient-to-r from-forest-600 to-sunrise-600 p-6 rounded-lg text-white">
              <SafeIcon icon={FiHeart} className="text-2xl mb-4" />
              <blockquote className="text-lg italic font-serif">
                "In every walk with nature, one receives far more than they seek. 
                In every walk with you, I found my home."
              </blockquote>
              <cite className="text-sm opacity-80 mt-2 block">
                - {weddingData.coupleNames.partner1} & {weddingData.coupleNames.partner2}
              </cite>
            </div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop"
                alt="Our Story"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm opacity-90">
                  Where our adventure began
                </p>
              </div>
            </div>
            
            {/* Story Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
                <div className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-2">
                  47
                </div>
                <div className="text-sm text-slate-600 dark:text-ivory-200">
                  Trails Explored
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
                <div className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-2">
                  12
                </div>
                <div className="text-sm text-slate-600 dark:text-ivory-200">
                  States Visited
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
                <div className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-2">
                  3
                </div>
                <div className="text-sm text-slate-600 dark:text-ivory-200">
                  Years Together
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg text-center">
                <div className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-2">
                  ∞
                </div>
                <div className="text-sm text-slate-600 dark:text-ivory-200">
                  Adventures Ahead
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;