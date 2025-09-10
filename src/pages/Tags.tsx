import { useState, useEffect } from 'react';
import { Nfc, Plus, MoreVertical, Activity, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/StatsCard';
import { TagInfo, waterApi, formatAmount, getTimeAgo } from '@/lib/api';

export default function Tags() {
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        // Mock data for development
        const mockTags: TagInfo[] = [
          {
            rfidTag: 'TAG001',
            name: 'My Water Bottle',
            lastUsed: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            dailyTotal: 1650,
            weeklyAverage: 1900
          },
          {
            rfidTag: 'TAG002',
            name: 'Office Bottle',
            lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            dailyTotal: 800,
            weeklyAverage: 1200
          },
          {
            rfidTag: 'TAG003',
            name: 'Gym Bottle',
            lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            dailyTotal: 0,
            weeklyAverage: 600
          }
        ];

        try {
          const data = await waterApi.getAllTags();
          setTags(data);
        } catch (error) {
          setTags(mockTags);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your RFID tags...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            RFID Tags
          </h1>
          <p className="text-muted-foreground">
            Manage your water bottles and tracking devices
          </p>
        </div>
        
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Tag
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Active Tags"
          value={tags.length.toString()}
          subtitle="Registered devices"
          icon={Nfc}
          iconColor="text-primary"
        />
        <StatsCard
          title="Today's Total"
          value={formatAmount(tags.reduce((sum, tag) => sum + tag.dailyTotal, 0))}
          subtitle="All tags combined"
          icon={Activity}
          iconColor="text-hydration-good"
        />
        <StatsCard
          title="Weekly Average"
          value={formatAmount(Math.round(tags.reduce((sum, tag) => sum + tag.weeklyAverage, 0) / tags.length || 0))}
          subtitle="Across all tags"
          icon={Calendar}
          iconColor="text-secondary"
        />
      </div>

      {/* Tags List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tags.map((tag) => (
          <div key={tag.rfidTag} className="glass-card rounded-xl p-6 hover-lift">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Nfc className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{tag.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tag.rfidTag}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Daily Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Today</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatAmount(tag.dailyTotal)}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-gradient-hydration h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((tag.dailyTotal / 2000) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Weekly Average */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Weekly Avg</span>
                <span className="font-medium text-foreground">
                  {formatAmount(tag.weeklyAverage)}
                </span>
              </div>

              {/* Last Used */}
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-sm text-muted-foreground">Last used</span>
                <span className="text-sm font-medium text-foreground">
                  {getTimeAgo(tag.lastUsed)}
                </span>
              </div>

              {/* Tag Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  new Date().getTime() - new Date(tag.lastUsed).getTime() < 60 * 60 * 1000 
                    ? 'bg-hydration-excellent' 
                    : new Date().getTime() - new Date(tag.lastUsed).getTime() < 24 * 60 * 60 * 1000
                    ? 'bg-hydration-moderate'
                    : 'bg-muted-foreground'
                }`} />
                <span className="text-xs text-muted-foreground">
                  {new Date().getTime() - new Date(tag.lastUsed).getTime() < 60 * 60 * 1000 
                    ? 'Recently active' 
                    : new Date().getTime() - new Date(tag.lastUsed).getTime() < 24 * 60 * 60 * 1000
                    ? 'Active today'
                    : 'Inactive'
                  }
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Tag Card */}
        <div className="glass-card rounded-xl p-6 border-dashed border-2 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center justify-center text-center h-full min-h-[200px]">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Add New Tag</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Register a new RFID tag to start tracking water intake
            </p>
            <Button variant="outline" className="glass-card border-0">
              <Nfc className="h-4 w-4 mr-2" />
              Scan Tag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}