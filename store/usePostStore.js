import { create } from 'zustand';

const API_URL = "https://sportzpoint-be.onrender.com";

const usePostStore = create((set) => ({
  // State
  categories: [],
  tags: [],
  loading: false,
  error: null,
  selectedProperties: {
    primaryCategory: null,
    additionalCategories: [],
    tags: [],
    credits: [],
    focusKeyphrase: '',
  },

  // Fetch Categories
  fetchCategories: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_URL}/category`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedCategories = data.categories.map(cat => ({
        value: cat.slug,
        label: cat.name,
        id: cat._id
      }));

      set({ categories: formattedCategories, loading: false });
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      set({ error: 'Failed to fetch categories', loading: false });
    }
  },

  // Fetch Tags
  fetchTags: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`${API_URL}/tag`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const formattedTags = data.tags.map(tag => ({
        value: tag.slug,
        label: tag.name,
        id: tag._id
      }));

      set({ tags: formattedTags, loading: false });
    } catch (error) {
      console.error('Error fetching tags:', error.message);
      set({ error: 'Failed to fetch tags', loading: false });
    }
  },

  // Update Selected Properties
  updateSelectedProperties: (updates) => {
    set((state) => ({
      selectedProperties: {
        ...state.selectedProperties,
        ...updates,
      },
    }));
  },

  // Reset Selected Properties
  resetSelectedProperties: () => {
    set((state) => ({
      selectedProperties: {
        primaryCategory: null,
        additionalCategories: [],
        tags: [],
        credits: [],
        focusKeyphrase: '',
      },
    }));
  },
}));

export default usePostStore; 