import { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/StatsCard';
import { WeeklyChart } from '@/components/WeeklyChart';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data for charts and analytics
  const weeklyData = [1800, 2200, 1600, 2400, 1900, 1650, 1750];
  const monthlyData = Array.from({ length: 30 }, (_, i) => 
    Math.floor(Math.random() * 1000) + 1500
  );

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights into your hydration patterns
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex rounded-lg bg-accent/30 p-1">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="outline" className="glass-card border-0">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Average Daily"
          value="1.9L"
          subtitle="↗ +8% vs last period"
          icon={TrendingUp}
          trend="up"
          iconColor="text-hydration-good"
        />
        <StatsCard
          title="Best Streak"
          value="12 days"
          subtitle="Personal record"
          icon={Calendar}
          iconColor="text-hydration-excellent"
        />
        <StatsCard
          title="Goal Achievement"
          value="85%"
          subtitle="Days above target"
          icon={BarChart3}
          iconColor="text-primary"
        />
        <StatsCard
          title="Total Intake"
          value="13.3L"
          subtitle="This week"
          icon={TrendingUp}
          iconColor="text-secondary"
        />
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyChart data={weeklyData} goal={2000} />
        </div>
        
        {/* Hydration Insights */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-hydration-good/10 border border-hydration-good/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-hydration-good"></div>
                <span className="font-medium text-foreground">Great Progress!</span>
              </div>
              <p className="text-sm text-muted-foreground">
                You're 15% above your weekly average. Keep it up!
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-hydration-moderate/10 border border-hydration-moderate/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-hydration-moderate"></div>
                <span className="font-medium text-foreground">Peak Hours</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Most active between 10-11 AM and 3-4 PM
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="font-medium text-foreground">Recommendation</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Try to maintain consistent intake throughout the day
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Pattern */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Pattern</h3>
          <div className="space-y-3">
            {[
              { time: '6-9 AM', amount: 300, percentage: 20 },
              { time: '9-12 PM', amount: 500, percentage: 35 },
              { time: '12-3 PM', amount: 400, percentage: 28 },
              { time: '3-6 PM', amount: 350, percentage: 24 },
              { time: '6-9 PM', amount: 200, percentage: 14 },
            ].map((period) => (
              <div key={period.time} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {period.time}
                </span>
                <div className="flex items-center gap-3 flex-1 ml-4">
                  <div className="flex-1 h-2 bg-border rounded-full">
                    <div 
                      className="h-2 bg-gradient-hydration rounded-full"
                      style={{ width: `${period.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground min-w-[40px]">
                    {period.amount}ml
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tag Performance */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Tag Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'My Water Bottle', usage: 70, amount: '1.2L' },
              { name: 'Office Bottle', usage: 25, amount: '0.5L' },
              { name: 'Gym Bottle', usage: 15, amount: '0.2L' },
            ].map((tag) => (
              <div key={tag.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{tag.name}</span>
                  <span className="text-sm text-muted-foreground">{tag.amount}</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full">
                  <div 
                    className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${tag.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}