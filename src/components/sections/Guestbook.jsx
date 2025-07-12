import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiEdit3, FiMapPin, FiHeart, FiUser, FiMessageSquare, FiSend } = FiIcons;

const Guestbook = () => {
  const { guestbook, addGuestbookEntry } = useWedding();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await addGuestbookEntry({
        ...formData,
        created_at: new Date().toISOString()
      });

      if (result.success) {
        setFormData({ name: '', message: '', location: '' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding guestbook entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const trailIcons = [FiMapPin, FiHeart, FiUser];

  return (
    <section className="py-20 bg-ivory-50 dark:bg-slate-900 bg-paper-texture transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiEdit3} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Leave a Trail Mark
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto mb-8">
            Share your thoughts, memories, and well wishes for our adventure together.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-forest-600 to-sunrise-600 text-white px-8 py-3 rounded-lg font-medium hover:from-forest-700 hover:to-sunrise-700 transition-all duration-300 inline-flex items-center"
          >
            <SafeIcon icon={FiEdit3} className="mr-2" />
            Leave Your Mark
          </motion.button>
        </motion.div>

        {/* Guestbook Entries */}
        <div className="space-y-6">
          <AnimatePresence>
            {guestbook.map((entry, index) => (
              <motion.div
                key={entry.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-forest-400"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <SafeIcon 
                      icon={trailIcons[index % trailIcons.length]} 
                      className="text-2xl text-forest-600 dark:text-sunrise-400" 
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <h4 className="font-serif text-lg text-forest-900 dark:text-ivory-100 mr-3">
                        {entry.name}
                      </h4>
                      {entry.location && (
                        <span className="text-sm text-slate-500 dark:text-ivory-300 flex items-center">
                          <SafeIcon icon={FiMapPin} className="mr-1" />
                          {entry.location}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-700 dark:text-ivory-200 mb-3">
                      {entry.message}
                    </p>
                    
                    <div className="text-xs text-slate-400 dark:text-ivory-400">
                      {new Date(entry.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {guestbook.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <SafeIcon icon={FiMessageSquare} className="text-4xl text-slate-400 mb-4 mx-auto" />
              <p className="text-slate-500 dark:text-ivory-300">
                Be the first to leave a trail mark!
              </p>
            </motion.div>
          )}
        </div>

        {/* Guestbook Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
                  Leave Your Trail Mark
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                      <SafeIcon icon={FiUser} className="inline mr-2" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                      <SafeIcon icon={FiMapPin} className="inline mr-2" />
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      placeholder="Where are you writing from?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                      <SafeIcon icon={FiMessageSquare} className="inline mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      placeholder="Share your thoughts, memories, or well wishes..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-ivory-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-gradient-to-r from-forest-600 to-sunrise-600 text-white rounded-lg hover:from-forest-700 hover:to-sunrise-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                    >
                      <SafeIcon icon={FiSend} className="mr-2" />
                      {isSubmitting ? 'Sending...' : 'Leave Mark'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Guestbook;