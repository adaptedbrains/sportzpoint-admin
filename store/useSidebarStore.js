'use client'
import { create } from 'zustand';

const useSidebarStore = create((set, get) => ({
  collapsed: false,
  toggleSidebar: () => {
    const { collapsed } = get();  // Access the current state
    set({ collapsed: !collapsed });  // Toggle the collapsed state
  },
}));

export default useSidebarStore;
