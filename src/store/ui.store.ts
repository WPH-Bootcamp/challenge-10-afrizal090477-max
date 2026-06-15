import { create } from "zustand";

interface UIState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Filter sidebar
  isFilterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

  isFilterOpen: false,
  setFilterOpen: (open) => set({ isFilterOpen: open }),
}));