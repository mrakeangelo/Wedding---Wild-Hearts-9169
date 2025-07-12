import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiClock, FiMountain } = FiIcons;

const CountdownTimer = () => {
  const { weddingData } = useWedding();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(weddingData.weddingDate);
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingData.weddingDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 to-forest-100 dark:from-slate-800 dark:to-forest-800 transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <SafeIcon 
            icon={FiClock} 
            className="text-4xl text-forest-600 dark:text-sunrise-400 mb-4 mx-auto animate-pulse" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Adventure Countdown
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200">
            Until we say "I do" under the open sky
          </p>
        </motion.div>

        {/* Countdown Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-2"
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.div>
              <div className="text-sm text-slate-600 dark:text-ivory-200 font-medium uppercase tracking-wide">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mountain Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl text-forest-600 dark:text-sunrise-400"
            >
              <SafeIcon icon={FiMountain} className="animate-mountain-glow" />
            </motion.div>
            
            {/* Animated dots around mountain */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-sunrise-400 rounded-full"
                  animate={{
                    x: Math.cos(i * Math.PI / 4) * 40,
                    y: Math.sin(i * Math.PI / 4) * 40,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-lg text-slate-600 dark:text-ivory-200 italic font-serif"
          >
            "The mountains are calling, and our hearts are answering"
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-forest-900 dark:text-ivory-100 font-serif text-lg">
              Adventure Progress
            </span>
            <span className="text-slate-600 dark:text-ivory-200 text-sm">
              {Math.max(0, Math.min(100, 100 - (timeLeft.days * 100 / 365)))}% complete
            </span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: `${Math.max(0, Math.min(100, 100 - (timeLeft.days * 100 / 365)))}%` }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.2 }}
              className="bg-gradient-to-r from-forest-500 to-sunrise-500 h-3 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownTimer;