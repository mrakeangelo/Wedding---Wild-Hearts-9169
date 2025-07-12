import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useWedding } from '../../context/WeddingContext';

const { FiCloud, FiSun, FiCloudRain, FiWind, FiThermometer, FiEye } = FiIcons;

const WeatherWidget = () => {
  const { weddingData } = useWedding();
  const [weather, setWeather] = useState({
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 45,
    windSpeed: 8,
    visibility: 10,
    forecast: [
      { day: 'Today', high: 75, low: 52, condition: 'Sunny' },
      { day: 'Tomorrow', high: 68, low: 48, condition: 'Cloudy' },
      { day: 'Wedding Day', high: 73, low: 55, condition: 'Perfect' }
    ]
  });

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'perfect':
        return FiSun;
      case 'cloudy':
      case 'partly cloudy':
        return FiCloud;
      case 'rainy':
        return FiCloudRain;
      default:
        return FiSun;
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'perfect':
        return 'text-sunrise-500';
      case 'cloudy':
      case 'partly cloudy':
        return 'text-slate-500';
      case 'rainy':
        return 'text-blue-500';
      default:
        return 'text-sunrise-500';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-forest-50 dark:from-slate-800 dark:to-forest-800 transition-colors duration-700">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <SafeIcon 
            icon={getWeatherIcon(weather.condition)} 
            className={`text-4xl mb-4 mx-auto ${getWeatherColor(weather.condition)}`} 
          />
          <h2 className="text-4xl md:text-5xl font-serif text-forest-900 dark:text-ivory-100 mb-4">
            Mountain Weather
          </h2>
          <p className="text-lg text-slate-600 dark:text-ivory-200 max-w-2xl mx-auto">
            Current conditions at {weddingData.location.name}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Current Weather */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg"
          >
            <div className="text-center mb-6">
              <SafeIcon 
                icon={getWeatherIcon(weather.condition)} 
                className={`text-6xl mb-4 mx-auto ${getWeatherColor(weather.condition)}`} 
              />
              <h3 className="text-3xl font-serif text-forest-900 dark:text-ivory-100 mb-2">
                {weather.temperature}°F
              </h3>
              <p className="text-lg text-slate-600 dark:text-ivory-200">
                {weather.condition}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center p-4 bg-forest-50 dark:bg-slate-700 rounded-lg">
                <SafeIcon icon={FiWind} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-ivory-200">Wind</div>
                  <div className="font-semibold text-forest-900 dark:text-ivory-100">
                    {weather.windSpeed} mph
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-forest-50 dark:bg-slate-700 rounded-lg">
                <SafeIcon icon={FiThermometer} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-ivory-200">Humidity</div>
                  <div className="font-semibold text-forest-900 dark:text-ivory-100">
                    {weather.humidity}%
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-forest-50 dark:bg-slate-700 rounded-lg col-span-2">
                <SafeIcon icon={FiEye} className="text-forest-600 dark:text-sunrise-400 mr-3" />
                <div>
                  <div className="text-sm text-slate-600 dark:text-ivory-200">Visibility</div>
                  <div className="font-semibold text-forest-900 dark:text-ivory-100">
                    {weather.visibility} miles
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Forecast */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
              3-Day Forecast
            </h3>

            <div className="space-y-4">
              {weather.forecast.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
                    day.day === 'Wedding Day' 
                      ? 'bg-gradient-to-r from-forest-100 to-sunrise-100 dark:from-forest-800 dark:to-sunrise-800 border-2 border-forest-400 dark:border-sunrise-400' 
                      : 'bg-forest-50 dark:bg-slate-700 hover:bg-forest-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center">
                    <SafeIcon 
                      icon={getWeatherIcon(day.condition)} 
                      className={`text-2xl mr-4 ${getWeatherColor(day.condition)}`} 
                    />
                    <div>
                      <div className="font-semibold text-forest-900 dark:text-ivory-100">
                        {day.day}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-ivory-200">
                        {day.condition}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-forest-900 dark:text-ivory-100">
                      {day.high}°
                    </div>
                    <div className="text-sm text-slate-600 dark:text-ivory-200">
                      {day.low}°
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Weather Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-forest-600 to-sunrise-600 p-8 rounded-lg text-white"
        >
          <h3 className="text-2xl font-serif mb-4">Mountain Weather Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Layer Up</h4>
              <p className="text-sm opacity-90">
                Mountain weather can change quickly. Bring layers you can add or remove as needed.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Stay Hydrated</h4>
              <p className="text-sm opacity-90">
                Higher elevation means you'll dehydrate faster. Bring extra water for the trail.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherWidget;