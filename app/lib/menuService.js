// Server-side menu fetching service with caching
import { cache } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.13:8000/api';

// Fallback menu data in case API fails
const FALLBACK_MENU = [
  {
    key: 'silk-sarees',
    label: 'Silk Sarees',
    items: ['Banarasi Silk', 'Kanchipuram Jacquard', 'Kanchipuram Traditional', 'Soft Silks']
  },
  {
    key: 'silk-sarees-casual',
    label: 'Silk Sarees Casual',
    items: ['Chiniya Silk', 'Georgette Sarees', 'Kadhi Tussar Silk']
  },
  {
    key: 'silk-cotton',
    label: 'Silk Cotton',
    items: ['Patola Silk Cotton', 'Soft Silk']
  },
  {
    key: 'fancy-sarees',
    label: 'Fancy Sarees',
    items: ['Ikkat Sarees']
  },
  {
    key: 'new-silk-saree',
    label: 'New Silk saree',
    items: ['Latest Sarees']
  }
];

// Cache the menu fetch for the entire build/request
export const getMenuData = cache(async () => {
  // During build time, return fallback immediately
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
    console.log('Build time: Using fallback menu');
    return FALLBACK_MENU;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/ecom/menu`, {
      // Cache for 1 hour in production, revalidate every hour
      next: { 
        revalidate: 3600, // 1 hour in seconds
        tags: ['menu'] // Tag for on-demand revalidation
      },
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging during build
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`Menu API failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Menu API Response:', data);
    
    // Handle different response structures
    const menuData = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : FALLBACK_MENU);
    console.log('Processed Menu Data:', menuData);
    
    return menuData;
  } catch (error) {
    // console.error('Failed to fetch menu:', error.message);
    // Return fallback menu if API fails
    return FALLBACK_MENU;
  }
});

// Client-side fetch with localStorage caching
export async function getMenuDataClient() {
  const CACHE_KEY = 'menu_data';
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

  // Check localStorage cache first
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // Return cached data if less than 1 hour old
        if (age < CACHE_DURATION) {
          return data;
        }
      } catch (e) {
        // Invalid cache, continue to fetch
      }
    }
  }

  // Fetch fresh data
  try {
    const response = await fetch(`${API_BASE_URL}/ecom/menu`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Menu API failed: ${response.status}`);
    }

    const result = await response.json();
    const data = Array.isArray(result) ? result : (result.data || FALLBACK_MENU);

    // Cache in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch menu:', error);
    return FALLBACK_MENU;
  }
}
