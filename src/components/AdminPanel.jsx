import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWedding } from '../context/WeddingContext';
import { supabase } from '../lib/supabase';

const { FiEdit, FiSave, FiUsers, FiMessageSquare, FiLogOut, FiEye, FiSettings } = FiIcons;

const AdminPanel = () => {
  const { weddingData, updateWeddingData, rsvps, guestbook } = useWedding();
  const [activeTab, setActiveTab] = useState('content');
  const [editData, setEditData] = useState(weddingData);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateWeddingData(editData);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (path, value) => {
    const pathArray = path.split('.');
    const newData = { ...editData };
    let current = newData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    setEditData(newData);
  };

  const tabs = [
    { id: 'content', label: 'Content', icon: FiEdit },
    { id: 'rsvps', label: 'RSVPs', icon: FiUsers },
    { id: 'guestbook', label: 'Guestbook', icon: FiMessageSquare },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-serif text-forest-900 dark:text-ivory-100">
                Wild Hearts Admin
              </h1>
              <p className="text-slate-600 dark:text-ivory-200">
                Manage your adventure wedding website
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/', '_blank')}
                className="flex items-center px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
              >
                <SafeIcon icon={FiEye} className="mr-2" />
                Preview Site
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <SafeIcon icon={FiLogOut} className="mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-forest-100 dark:bg-forest-800 text-forest-900 dark:text-ivory-100'
                        : 'text-slate-600 dark:text-ivory-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="mr-3" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'content' && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-serif text-forest-900 dark:text-ivory-100">
                    Website Content
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
                  >
                    <SafeIcon icon={FiSave} className="mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Couple Names */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                        Partner 1 Name
                      </label>
                      <input
                        type="text"
                        value={editData.coupleNames.partner1}
                        onChange={(e) => handleInputChange('coupleNames.partner1', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                        Partner 2 Name
                      </label>
                      <input
                        type="text"
                        value={editData.coupleNames.partner2}
                        onChange={(e) => handleInputChange('coupleNames.partner2', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      />
                    </div>
                  </div>

                  {/* Wedding Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={editData.weddingDate}
                      onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                    />
                  </div>

                  {/* Hero Quote */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                      Hero Quote
                    </label>
                    <input
                      type="text"
                      value={editData.heroQuote}
                      onChange={(e) => handleInputChange('heroQuote', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                    />
                  </div>

                  {/* Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                        Location Name
                      </label>
                      <input
                        type="text"
                        value={editData.location.name}
                        onChange={(e) => handleInputChange('location.name', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-ivory-200 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={editData.location.address}
                        onChange={(e) => handleInputChange('location.address', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent dark:bg-slate-700 dark:text-ivory-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rsvps' && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
                  RSVP Responses ({rsvps.length})
                </h2>
                
                <div className="space-y-4">
                  {rsvps.map((rsvp, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-forest-900 dark:text-ivory-100">
                          {rsvp.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rsvp.attending === 'yes' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {rsvp.attending === 'yes' ? 'Attending' : 'Not Attending'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-ivory-200 mb-2">
                        {rsvp.email}
                      </p>
                      
                      {rsvp.attending === 'yes' && (
                        <p className="text-sm text-slate-600 dark:text-ivory-200 mb-2">
                          Guests: {rsvp.guests}
                        </p>
                      )}
                      
                      {rsvp.message && (
                        <p className="text-sm text-slate-700 dark:text-ivory-200 bg-slate-50 dark:bg-slate-700 p-2 rounded">
                          "{rsvp.message}"
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {rsvps.length === 0 && (
                    <p className="text-center text-slate-500 dark:text-ivory-300 py-8">
                      No RSVP responses yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'guestbook' && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
                  Guestbook Entries ({guestbook.length})
                </h2>
                
                <div className="space-y-4">
                  {guestbook.map((entry, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-forest-900 dark:text-ivory-100">
                          {entry.name}
                        </h3>
                        {entry.location && (
                          <span className="text-xs text-slate-500 dark:text-ivory-300">
                            {entry.location}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-slate-700 dark:text-ivory-200 mb-2">
                        {entry.message}
                      </p>
                      
                      <p className="text-xs text-slate-500 dark:text-ivory-300">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  
                  {guestbook.length === 0 && (
                    <p className="text-center text-slate-500 dark:text-ivory-300 py-8">
                      No guestbook entries yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-serif text-forest-900 dark:text-ivory-100 mb-6">
                  Website Settings
                </h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-forest-50 dark:bg-forest-900 rounded-lg">
                    <h3 className="font-semibold text-forest-900 dark:text-ivory-100 mb-2">
                      Site Preview
                    </h3>
                    <p className="text-sm text-forest-700 dark:text-ivory-200 mb-4">
                      Your wedding website is live and ready to share!
                    </p>
                    <button
                      onClick={() => window.open('/', '_blank')}
                      className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
                    >
                      View Live Site
                    </button>
                  </div>
                  
                  <div className="p-4 bg-sunrise-50 dark:bg-sunrise-900 rounded-lg">
                    <h3 className="font-semibold text-forest-900 dark:text-ivory-100 mb-2">
                      Auto-Save
                    </h3>
                    <p className="text-sm text-forest-700 dark:text-ivory-200">
                      Changes are automatically saved as you edit. No need to worry about losing your work!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;