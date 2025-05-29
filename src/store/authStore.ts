import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'hackerman',
    xp: 1500,
    rank: 'Cyber Rookie',
    points: 250,
    timePlayed: 3600,
    completedChallenges: ['crypto-1', 'sql-1'],
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.username === username);
      
      if (user && password === 'password') { // Simple password check for demo
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ error: 'Invalid username or password', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },

  register: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if username already exists
      if (mockUsers.some(u => u.username === username)) {
        set({ error: 'Username already taken', isLoading: false });
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        username,
        xp: 0,
        rank: 'Newbie',
        points: 100, // Starting points
        timePlayed: 0,
        completedChallenges: [],
      };
      
      mockUsers.push(newUser);
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: 'Registration failed', isLoading: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));