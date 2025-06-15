import { create } from 'zustand';

export const useNavStore = create((set) => ({
  isNav: false, 

  toggleIsNav: () =>
    set((state) => ({
      isNav: !state.isNav, 
    })),

  setNav: (value) =>
    set({
      isNav: value, 
    }),
}));
