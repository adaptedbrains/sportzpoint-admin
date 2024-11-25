'use client'
import { create } from 'zustand';

const useLivePost = create((set, get) => ({
  
  liveBlogData: null, 
 
  fetchLiveBlogData: async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ liveBlogData: data });  // Store the fetched live blog data
    } catch (error) {
      console.error('Error fetching live blog data:', error);
    }
  },
}));

export default useLivePost;
