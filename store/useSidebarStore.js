'use client'
import { create } from 'zustand';

const useSidebarStore = create((set, get) => ({
  collapsed: false,
  toggleSidebar: (val) => {
   
    set({ collapsed: val});  
  },
  
}));

export default useSidebarStore;
