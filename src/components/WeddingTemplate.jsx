import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './sections/HeroSection';
import Timeline from './sections/Timeline';
import Gallery from './sections/Gallery';
import LocationDetails from './sections/LocationDetails';
import RsvpSection from './sections/RsvpSection';
import GearList from './sections/GearList';
import Guestbook from './sections/Guestbook';
import PlaylistSection from './sections/PlaylistSection';
import CountdownTimer from './sections/CountdownTimer';
import StorySection from './sections/StorySection';
import WeatherWidget from './sections/WeatherWidget';
import ThemeToggle from './ui/ThemeToggle';
import FloatingRsvpButton from './ui/FloatingRsvpButton';
import { useWedding } from '../context/WeddingContext';

const WeddingTemplate = () => {
  const { weddingData, loading } = useWedding();
  const [showRsvp, setShowRsvp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-900 via-slate-800 to-forest-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-pulse text-ivory-100 text-xl font-serif mb-4">
            Loading your adventure...
          </div>
          <div className="w-16 h-16 border-4 border-sunrise-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-slate-900 bg-paper-texture transition-all duration-700">
      <ThemeToggle />
      <FloatingRsvpButton onClick={() => setShowRsvp(true)} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Countdown Timer */}
      <CountdownTimer />
      
      {/* Timeline */}
      <Timeline />
      
      {/* Gallery */}
      <Gallery />
      
      {/* Location Details */}
      <LocationDetails />
      
      {/* Weather Widget */}
      <WeatherWidget />
      
      {/* Story Section */}
      <StorySection />
      
      {/* Playlist */}
      <PlaylistSection />
      
      {/* Gear List */}
      <GearList />
      
      {/* Guestbook */}
      <Guestbook />
      
      {/* RSVP Modal */}
      <AnimatePresence>
        {showRsvp && (
          <RsvpSection onClose={() => setShowRsvp(false)} />
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-forest-900 text-ivory-100 py-8 text-center">
        <p className="text-sm opacity-80">
          Wild Hearts – An Adventure Wedding Template by{' '}
          <span className="text-sunrise-400 font-medium">Mrake Agency</span>
        </p>
      </footer>
    </div>
  );
};

export default WeddingTemplate;