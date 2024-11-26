import { create } from "zustand";

const useAllPostDataStore = create((set) => ({
    allPosts: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,

    fetchAllPostedData: async (url, type) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();
            
            set(() => ({
                allPosts: data.articles || [],
                totalPages: data.pagination?.totalpages || 0,
                currentPage: data.pagination?.page || 1,
                loading: false
            }));

        } catch (error) {
            set({ error: error.message, loading: false });
            console.error('Error fetching data:', error);
        }
    },
}));

export default useAllPostDataStore;
