import { create } from "zustand";

const useAllPostDataStore = create((set) => ({
    // allArticlePost: [],
    // createAtByMe: [],
    // allLivePost: [],
    // allNewsletter: [],
    // allCustomPageData: [],
    // allVideoPost: [],
    // allGalleryPost: [],
    // allWebStoryPost: [],
    totalPage: 0, // To store total pages
    currentPage: 1, // To store the current page
    allPosts: [],
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

            // Update totalPage
            set(() => ({
                totalPage: data.pagination?.totalPages || 0,
            }));

            // Update currentPage
            set(() => ({
                currentPage: data.pagination?.page || 1,
            }));
            set(() => ({
                allPosts: data.articles || [],
            }));
            allPosts
            // Update specific post type
            // set((state) => {
            //     const updatedState = { loading: false };

            //     switch (type) {
            //         case "Article":
            //             updatedState.allArticlePost = data.articles || [];
            //             break;
            //         case "LiveBlog":
            //             updatedState.allLivePost = data.articles || [];
            //             break;
            //         case "Video":
            //             updatedState.allVideoPost = data.articles || [];
            //             break;
            //         case "Newsletter":
            //             updatedState.allNewsletter = data.articles || [];
            //             break;
            //         case "CustomPage":
            //             updatedState.allCustomPageData = data.articles || [];
            //             break;
            //         case "Gallery":
            //             updatedState.allGalleryPost = data.articles || [];
            //             break;
            //         case "Web Story":
            //             updatedState.allWebStoryPost = data.articles || [];
            //             break;
            //         default:
            //             break;
            //     }

            //     return updatedState;
            // });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));

export default useAllPostDataStore;
