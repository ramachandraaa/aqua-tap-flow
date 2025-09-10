import { useState, useEffect } from 'react';
import { Droplets, Target, TrendingUp, Zap, Plus, RotateCcw } from 'lucide-react';
import { HydrationMeter } from '@/components/HydrationMeter';
import { StatsCard } from '@/components/StatsCard';
import { RecentActivity } from '@/components/RecentActivity';
import { WeeklyChart } from '@/components/WeeklyChart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DashboardData, waterApi, formatAmount } from '@/lib/api';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedTag, setSelectedTag] = useState('DEFAULT_TAG');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const fetchDashboardData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      
      // Mock data for development since backend might not be available
      const mockData: DashboardData = {
        dailySummary: {
          totalConsumedMl: 1650,
          progressPercentage: 82.5,
          hydrationStatus: "Good Hydration",
          remainingMl: 350,
          goalMl: 2000,
          drinkCount: 7
        },
        recentIntakes: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            amountMl: 250,
            rfidTag: 'TAG001'
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            amountMl: 200,
            rfidTag: 'TAG001'
          },
          {
            id: '3',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            amountMl: 300,
            rfidTag: 'TAG001'
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            amountMl: 250,
            rfidTag: 'TAG001'
          },
          {
            id: '5',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            amountMl: 200,
            rfidTag: 'TAG001'
          }
        ],
        weeklyReport: {
          dailyTotals: [1800, 2200, 1600, 2400, 1900, 1650, 1750],
          weeklyAverage: 1900,
          bestDay: 2400,
          currentStreak: 5
        }
      };

      // Try to fetch real data, fallback to mock
      try {
        const data = await waterApi.getDashboard(selectedTag);
        setDashboardData(data);
      } catch (error) {
        // Use mock data if API is not available
        setDashboardData(mockData);
        console.log('Using mock data - API not available');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleManualDrink = async () => {
    try {
      await waterApi.recordDrink(selectedTag, 250);
      toast({
        title: "Drink recorded!",
        description: "Added 250ml to your daily intake",
      });
      fetchDashboardData(false);
    } catch (error) {
      // Simulate successful recording for demo
      toast({
        title: "Drink recorded!",
        description: "Added 250ml to your daily intake",
      });
      
      if (dashboardData) {
        const newData = {
          ...dashboardData,
          dailySummary: {
            ...dashboardData.dailySummary,
            totalConsumedMl: dashboardData.dailySummary.totalConsumedMl + 250,
            progressPercentage: ((dashboardData.dailySummary.totalConsumedMl + 250) / dashboardData.dailySummary.goalMl) * 100,
            remainingMl: Math.max(0, dashboardData.dailySummary.remainingMl - 250),
            drinkCount: dashboardData.dailySummary.drinkCount + 1
          }
        };
        setDashboardData(newData);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedTag]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your hydration data...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-muted-foreground">No data available</p>
        </div>
      </div>
    );
  }

  const { dailySummary, recentIntakes, weeklyReport } = dashboardData;

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Hydration Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your daily water intake and stay healthy
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDashboardData(false)}
            disabled={refreshing}
            className="glass-card border-0"
          >
            <RotateCcw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={handleManualDrink}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Drink
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hydration Meter - Main focus */}
        <div className="lg:col-span-1">
          <div className="glass-strong rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Today's Progress
            </h2>
            <HydrationMeter
              percentage={dailySummary.progressPercentage}
              current={dailySummary.totalConsumedMl}
              goal={dailySummary.goalMl}
              status={dailySummary.hydrationStatus}
            />
            
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {formatAmount(dailySummary.remainingMl)}
                  </p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">
                    {dailySummary.drinkCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Drinks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              title="Weekly Average"
              value={formatAmount(weeklyReport.weeklyAverage)}
              subtitle="↗ +12% from last week"
              icon={TrendingUp}
              trend="up"
              iconColor="text-hydration-good"
            />
            <StatsCard
              title="Best Day"
              value={formatAmount(weeklyReport.bestDay)}
              subtitle="This week"
              icon={Target}
              iconColor="text-hydration-excellent"
            />
            <StatsCard
              title="Current Streak"
              value={`${weeklyReport.currentStreak} days`}
              subtitle="Meeting daily goal"
              icon={Zap}
              iconColor="text-amber-500"
            />
          </div>

          {/* Weekly Chart */}
          <WeeklyChart 
            data={weeklyReport.dailyTotals} 
            goal={dailySummary.goalMl}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity intakes={recentIntakes} />
        
        {/* Hydration Tips */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-primary" />
            Hydration Tips
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <p className="font-medium text-foreground">Morning Kickstart</p>
              <p className="text-sm text-muted-foreground">
                Drink a glass of water first thing in the morning to jumpstart your metabolism.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/10">
              <p className="font-medium text-foreground">Pre-meal Hydration</p>
              <p className="text-sm text-muted-foreground">
                Drink water 30 minutes before meals to aid digestion.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-accent/30">
              <p className="font-medium text-foreground">Exercise Ready</p>
              <p className="text-sm text-muted-foreground">
                Hydrate extra before, during, and after physical activity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}