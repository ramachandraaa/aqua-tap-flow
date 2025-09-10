import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  className,
  iconColor = "text-primary"
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-hydration-good';
      case 'down':
        return 'text-hydration-critical';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn(
      "glass-card rounded-xl p-6 hover-lift transition-all duration-300",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className={cn("text-sm mt-1", getTrendColor())}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg bg-primary/10",
          iconColor
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}