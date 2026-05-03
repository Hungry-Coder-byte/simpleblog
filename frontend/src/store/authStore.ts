import create from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: null | { id: string; name: string };
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          set({ user: response.data.user, token: response.data.token, loading: false });
        } catch (error) {
          set({ loading: false, error: error.response?.data?.message || 'Login failed' });
        }
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // unique name for the storage
    }
  )
);

export default useAuthStore;