import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://demo-supabase-url.supabase.co';
const supabaseKey = 'demo-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize tables if needed
export const initializeTables = async () => {
  try {
    // Check if tables exist and create demo data
    const { data: weddingData } = await supabase
      .from('wedding_data')
      .select('*')
      .single();

    if (!weddingData) {
      // Create demo wedding data
      await supabase
        .from('wedding_data')
        .insert([{
          id: 1,
          content: {
            coupleNames: { partner1: 'Alex', partner2: 'Jordan' },
            weddingDate: '2024-08-15',
            location: {
              name: 'Yosemite National Park',
              address: 'Glacier Point, CA',
              coordinates: { lat: 37.7309, lng: -119.5731 },
              elevation: '7,214 ft'
            },
            heroQuote: 'Not all who wander are lost'
          }
        }]);
    }
  } catch (error) {
    console.log('Demo mode - using local data');
  }
};