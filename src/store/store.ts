import generalConstants from '@constants/general';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  _id: number;
  username: string;
  role: string[];
};

interface StoreState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore: any = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ ...useStore.getState(), user }),

      logout: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem(generalConstants.localStorage.user_data);
        localStorage.removeItem(generalConstants.localStorage.access_token);
        localStorage.removeItem(generalConstants.localStorage.refresh_token);
      },
    }),
    {
      name: 'food-storage',
    },
  ),
);
