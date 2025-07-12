import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiMusic, FiPlay, FiExternalLink, FiHeadphones } = FiIcons;

const PlaylistSection = () => {
  const { weddingData } = useWedding();

  const openPlaylist = () => {
    window.open(weddingData.playlist.spotifyUrl, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-burnt-50 to-sunrise-100 dark:from-forest-900 dark:to-burnt-900 transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={FiMusic} 
            className="text-4xl text-burnt-600 dark:text-sunrise-400 mb-4 mx-auto animate-pulse" 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Our Adventure Soundtrack
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            The songs that fuel our adventures and soundtrack our love story.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Playlist Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
                {weddingData.playlist.title}
              </h3>
              
              <p className="text-slate-600 dark:text-ivory-200 mb-6">
                From campfire acoustics to summit celebrations, these are the songs that accompany us on every adventure.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-slate-700 dark:text-ivory-200">
                  <SafeIcon icon={FiHeadphones} className="mr-3 text-burnt-500" />
                  <span>Perfect for trail hikes and quiet moments</span>
                </div>
                
                <div className="flex items-center text-slate-700 dark:text-ivory-200">
                  <SafeIcon icon={FiPlay} className="mr-3 text-burnt-500" />
                  <span>Updated regularly with new discoveries</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openPlaylist}
                className="mt-6 bg-gradient-to-r from-burnt-600 to-sunrise-600 text-white px-8 py-3 rounded-lg font-medium hover:from-burnt-700 hover:to-sunrise-700 transition-all duration-300 inline-flex items-center"
              >
                <SafeIcon icon={FiExternalLink} className="mr-2" />
                Listen on Spotify
              </motion.button>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-burnt-400 to-sunrise-500 p-8 rounded-lg shadow-xl">
              {/* Spotify-like Interface */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <SafeIcon icon={FiMusic} className="text-3xl mr-3" />
                  <div>
                    <h4 className="font-bold text-lg">Now Playing</h4>
                    <p className="text-sm opacity-80">Adventure Playlist</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>"Mountain High"</span>
                    <span>3:24</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="bg-white h-1 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <SafeIcon icon={FiPlay} className="text-2xl" />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
              
              {/* Floating Music Notes */}
              <div className="absolute -top-4 -right-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white text-2xl"
                >
                  ♪
                </motion.div>
              </div>
              
              <div className="absolute top-8 -left-4">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="text-white text-xl"
                >
                  ♫
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured Tracks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-8 text-center">
            Featured Adventure Tracks
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Mountain High", artist: "Trail Runners", mood: "Energetic" },
              { title: "Sunrise Serenade", artist: "Campfire Collective", mood: "Peaceful" },
              { title: "Wild & Free", artist: "Adventure Souls", mood: "Inspiring" }
            ].map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiMusic} className="text-burnt-500 mr-3" />
                  <span className="text-xs bg-burnt-100 dark:bg-burnt-800 text-burnt-700 dark:text-burnt-200 px-2 py-1 rounded-full">
                    {track.mood}
                  </span>
                </div>
                
                <h4 className="font-serif text-lg text-forest-900 dark:text-ivory-100 mb-1">
                  {track.title}
                </h4>
                
                <p className="text-slate-600 dark:text-ivory-200 text-sm">
                  by {track.artist}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaylistSection;