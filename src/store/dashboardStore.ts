import { create } from 'zustand'

interface DashboardState {
  pieData: Array<{ id: string; label: string; value: number; color: string }>;
  barData: Array<{ country: string; value: number }>;
  fetchDashboardData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  pieData: [],
  barData: [],
  
  fetchDashboardData: async () => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({
      pieData: [
        { id: 'javascript', label: 'JavaScript', value: 40, color: 'hsl(45, 70%, 50%)' },
        { id: 'python', label: 'Python', value: 30, color: 'hsl(200, 70%, 50%)' },
        { id: 'java', label: 'Java', value: 20, color: 'hsl(340, 70%, 50%)' },
        { id: 'ruby', label: 'Ruby', value: 10, color: 'hsl(290, 70%, 50%)' },
      ],
      barData: [
        { country: 'USA', value: 245 },
        { country: 'China', value: 388 },
        { country: 'Japan', value: 198 },
        { country: 'Germany', value: 156 },
        { country: 'UK', value: 165 },
      ],
    });
  },
}));