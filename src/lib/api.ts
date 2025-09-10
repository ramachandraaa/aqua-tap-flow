import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/water';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface DashboardData {
  dailySummary: {
    totalConsumedMl: number;
    progressPercentage: number;
    hydrationStatus: string;
    remainingMl: number;
    goalMl: number;
    drinkCount: number;
  };
  recentIntakes: IntakeRecord[];
  weeklyReport: {
    dailyTotals: number[];
    weeklyAverage: number;
    bestDay: number;
    currentStreak: number;
  };
}

export interface IntakeRecord {
  id: string;
  timestamp: string;
  amountMl: number;
  rfidTag: string;
}

export interface TagInfo {
  rfidTag: string;
  name: string;
  lastUsed: string;
  dailyTotal: number;
  weeklyAverage: number;
}

// API functions
export const waterApi = {
  // Get complete dashboard data
  getDashboard: async (rfidTag: string): Promise<DashboardData> => {
    const response = await api.get(`/${rfidTag}/dashboard`);
    return response.data;
  },

  // Get daily summary
  getSummary: async (rfidTag: string) => {
    const response = await api.get(`/${rfidTag}/summary`);
    return response.data;
  },

  // Get recent intakes
  getRecentIntakes: async (rfidTag: string): Promise<IntakeRecord[]> => {
    const response = await api.get(`/${rfidTag}/recent`);
    return response.data;
  },

  // Get weekly report
  getWeeklyReport: async (rfidTag: string) => {
    const response = await api.get(`/${rfidTag}/weekly`);
    return response.data;
  },

  // Get all RFID tags
  getAllTags: async (): Promise<TagInfo[]> => {
    const response = await api.get('/tags');
    return response.data;
  },

  // Record manual water intake
  recordDrink: async (rfidTag: string, amountMl: number) => {
    const response = await api.post('/drink', {
      rfidTag,
      amountMl,
    });
    return response.data;
  },
};

// Helper functions
export const getHydrationColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'well hydrated':
      return 'hydration-excellent';
    case 'good hydration':
      return 'hydration-good';
    case 'need more water':
      return 'hydration-moderate';
    case 'dehydrated - drink more!':
      return 'hydration-critical';
    default:
      return 'hydration-low';
  }
};

export const formatAmount = (ml: number): string => {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`;
  }
  return `${ml}ml`;
};

export const getTimeAgo = (timestamp: string): string => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};