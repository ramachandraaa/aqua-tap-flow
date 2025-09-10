import { Droplets, Clock } from 'lucide-react';
import { IntakeRecord, formatAmount, getTimeAgo } from '@/lib/api';

interface RecentActivityProps {
  intakes: IntakeRecord[];
}

export function RecentActivity({ intakes }: RecentActivityProps) {
  if (!intakes || intakes.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <Droplets className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity</p>
          <p className="text-sm">Start drinking water to see your activity here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Recent Activity
      </h3>
      
      <div className="space-y-3">
        {intakes.slice(0, 8).map((intake, index) => (
          <div 
            key={intake.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Droplets className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {formatAmount(intake.amountMl)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getTimeAgo(intake.timestamp)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Tag: {intake.rfidTag.slice(-4)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {intakes.length > 8 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary-dark transition-colors">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}