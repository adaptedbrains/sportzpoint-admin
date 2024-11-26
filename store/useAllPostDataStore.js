import { create } from "zustand";

const useAllPostDataStore = create((set) => ({
    allArticlePost: [],
    allLivePost: [],
    loading: false,
    error: null,
    
    // Fetch dropdown data dynamically
    fetchAllPostedData: async (url, type) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch dropdown data");
            }

            const data = await response.json();
            console.log(data);
            
            set((state) => {
                if (type === "article") {

                    return { allArticlePost: data.articles || [], loading: false };
                } else if (type === "category") {
                    return { allCategory: data.categories || [], loading: false };
                } else if (type === "roleBaseUser") {
                    return { allRoleBaseUser: data.users || [], loading: false };
                }
                return { loading: false };
            });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },



}));

export default useAllPostDataStore;
