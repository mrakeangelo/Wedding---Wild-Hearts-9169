import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiX, FiUser, FiMail, FiMessageSquare, FiCheck, FiUsers } = FiIcons;

const RsvpSection = ({ onClose }) => {
  const { addRsvp } = useWedding();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: 1,
    message: '',
    dietaryRestrictions: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await addRsvp({
        ...formData,
        created_at: new Date().toISOString()
      });

      if (result.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Your Details';
      case 2: return 'Will You Join Us?';
      case 3: return 'Additional Info';
      case 4: return 'Leave a Message';
      default: return 'RSVP';
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.name && formData.email;
      case 2: return formData.attending;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <SafeIcon icon={FiCheck} className="text-6xl text-green-500 mx-auto" />
          </motion.div>
          
          <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Thank You!
          </h3>
          
          <p className="text-slate-600 dark:text-ivory-200 mb-6">
            Your RSVP has been received. We can't wait to share this adventure with you!
          </p>
          
          <div className="animate-leaf-fall">
            <SafeIcon icon={FiCheck} className="text-sunrise-400 text-2xl mx-auto" />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-forest-900 dark:text-ivory-100">
            RSVP for Our Adventure
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-ivory-200 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-2xl" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600 dark:text-ivory-200">
              Step {currentStep} of 4
            </span>
            <span className="text-sm text-slate-600 dark:text-ivory-200">
              {getStepTitle()}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: '25%' }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              className="bg-gradient-to-r from-forest-500 to-sunrise-500 h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                  <SafeIcon icon={FiUser} className="inline mr-2" />
                  Full Name
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
                  <SafeIcon icon={FiMail} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Attendance */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-4">
                  Will you be joining us on this adventure?
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleInputChange}
                      className="mr-3 text-forest-600"
                    />
                    <span className="text-forest-900 dark:text-ivory-100">
                      Yes, I'll be there! 🏔️
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleInputChange}
                      className="mr-3 text-forest-600"
                    />
                    <span className="text-forest-900 dark:text-ivory-100">
                      Sorry, I can't make it
                    </span>
                  </label>
                </div>
              </div>

              {formData.attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4"
                >
                  <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                    <SafeIcon icon={FiUsers} className="inline mr-2" />
                    Number of Guests (including yourself)
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Additional Info */}
          {currentStep === 3 && formData.attending === 'yes' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                  Dietary Restrictions or Allergies
                </label>
                <textarea
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                  placeholder="Let us know if you have any dietary needs..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 4: Message */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-forest-700 dark:text-ivory-200 text-sm font-medium mb-2">
                  <SafeIcon icon={FiMessageSquare} className="inline mr-2" />
                  Leave us a message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                  placeholder="Share your excitement, memories, or well wishes..."
                />
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-ivory-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-gradient-to-r from-forest-600 to-sunrise-600 text-white rounded-lg hover:from-forest-700 hover:to-sunrise-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-forest-600 to-sunrise-600 text-white rounded-lg hover:from-forest-700 hover:to-sunrise-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RsvpSection;