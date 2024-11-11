import { create } from 'zustand';
import { PbUser } from '@/app/lib/definitions-pb';

export interface AuthState {
  user: PbUser | null;
  setUser: (user: PbUser | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: PbUser | null) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;