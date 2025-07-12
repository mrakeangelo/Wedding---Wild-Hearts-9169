import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const WeddingContext = createContext();

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};

const defaultWeddingData = {
  coupleNames: {
    partner1: 'Alex',
    partner2: 'Jordan'
  },
  weddingDate: '2024-08-15',
  location: {
    name: 'Yosemite National Park',
    address: 'Glacier Point, CA',
    coordinates: { lat: 37.7309, lng: -119.5731 },
    elevation: '7,214 ft'
  },
  heroQuote: 'Not all who wander are lost',
  timeline: [
    {
      date: '2020-03-15',
      title: 'First Hike Together',
      description: 'Where our adventure began on the Appalachian Trail',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop'
    },
    {
      date: '2022-06-20',
      title: 'The Proposal',
      description: 'Under the stars at Mount Washington summit',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    {
      date: '2024-08-15',
      title: 'Our Wedding Day',
      description: 'Saying "I do" at Glacier Point',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
    }
  ],
  gallery: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
      caption: 'Morning mist in the valley'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      caption: 'Summit celebrations'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop',
      caption: 'Trail adventures together'
    }
  ],
  playlist: {
    title: 'Our Adventure Soundtrack',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd'
  },
  gearList: [
    'Hiking boots',
    'Warm layers',
    'Camera',
    'Sense of adventure'
  ],
  story: {
    title: 'How We Eloped',
    content: 'Our love story began on a mountain trail and continues with every step we take together...'
  }
};

export const WeddingProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState(defaultWeddingData);
  const [loading, setLoading] = useState(true);
  const [rsvps, setRsvps] = useState([]);
  const [guestbook, setGuestbook] = useState([]);

  useEffect(() => {
    loadWeddingData();
    loadRsvps();
    loadGuestbook();
  }, []);

  const loadWeddingData = async () => {
    try {
      const { data, error } = await supabase
        .from('wedding_data')
        .select('*')
        .single();

      if (data && !error) {
        setWeddingData({ ...defaultWeddingData, ...data.content });
      }
    } catch (error) {
      console.error('Error loading wedding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRsvps = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setRsvps(data);
      }
    } catch (error) {
      console.error('Error loading RSVPs:', error);
    }
  };

  const loadGuestbook = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setGuestbook(data);
      }
    } catch (error) {
      console.error('Error loading guestbook:', error);
    }
  };

  const updateWeddingData = async (newData) => {
    try {
      const { error } = await supabase
        .from('wedding_data')
        .upsert({
          id: 1,
          content: newData,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setWeddingData(newData);
      }
    } catch (error) {
      console.error('Error updating wedding data:', error);
    }
  };

  const addRsvp = async (rsvpData) => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert([rsvpData])
        .select();

      if (data && !error) {
        setRsvps([data[0], ...rsvps]);
        return { success: true };
      }
      return { success: false, error };
    } catch (error) {
      console.error('Error adding RSVP:', error);
      return { success: false, error };
    }
  };

  const addGuestbookEntry = async (entry) => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .insert([entry])
        .select();

      if (data && !error) {
        setGuestbook([data[0], ...guestbook]);
        return { success: true };
      }
      return { success: false, error };
    } catch (error) {
      console.error('Error adding guestbook entry:', error);
      return { success: false, error };
    }
  };

  return (
    <WeddingContext.Provider value={{
      weddingData,
      updateWeddingData,
      rsvps,
      addRsvp,
      guestbook,
      addGuestbookEntry,
      loading
    }}>
      {children}
    </WeddingContext.Provider>
  );
};