import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../store/authStore';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useStore();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });
      setUser(response.data.user);
      setToken(response.data.token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const checkAuth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<AuthResponse>('/api/auth/me');
      setUser(response.data.user);
      setToken(response.data.token);
    } catch (err) {
      setError('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { loading, error, login, logout };
};

export default useAuth;