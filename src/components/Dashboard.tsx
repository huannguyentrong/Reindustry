import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { useAuthStore } from '../store/authStore';
import { useDashboardStore } from '../store/dashboardStore';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { pieData, barData, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, navigate, fetchDashboardData]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const commonPieProps = {
    margin: { top: 40, right: 80, bottom: 80, left: 80 },
    innerRadius: 0.5,
    padAngle: 0.7,
    cornerRadius: 3,
    activeOuterRadiusOffset: 8,
    borderWidth: 1,
    borderColor: { from: 'color', modifiers: [['darker', 0.2]] },
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#333333",
    arcLinkLabelsThickness: 2,
    arcLinkLabelsColor: { from: 'color' },
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: { from: 'color', modifiers: [['darker', 2]] },
    enableArcLinkLabels: true,
    enableArcLabels: true,
  };

  const commonBarProps = {
    keys: ['value'],
    indexBy: "country",
    margin: { top: 50, right: 60, bottom: 50, left: 60 },
    padding: 0.3,
    valueScale: { type: 'linear' } as const,
    indexScale: { type: 'band', round: true } as const,
    colors: { scheme: 'nivo' } as const,
    borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    },
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: { from: 'color', modifiers: [['darker', 1.6]] },
    animate: true,
    motionConfig: 'gentle',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Technology Distribution</h2>
            <div className="h-80">
              <ResponsivePie
                data={pieData}
                {...commonPieProps}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Regional Performance</h2>
            <div className="h-80">
              <ResponsiveBar
                data={barData}
                {...commonBarProps}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}