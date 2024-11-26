import { create } from "zustand";
import Cookies from 'js-cookie';

const useAllPostDataStore = create((set) => ({
    allPosts: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1,

    fetchAllPostedData: async (url, type) => {
        set({ loading: true, error: null });
        try {
            // Retrieve the token from cookies
            const token = Cookies.get('token');

            if (!token) {
                throw new Error("No token found in cookies");
            }

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json', // or other appropriate content type
                    'Authorization': `Bearer ${token}`, // Add token to Authorization header
                  },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await response.json();

            set(() => ({
                totalPages: data.pagination?.totalPages || 0,
                currentPage: data.pagination?.page || 1,
                allPosts: data.articles || [],
                loading: false,
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
            console.error("Error fetching data:", error);
        }
    },
}));

export default useAllPostDataStore;
