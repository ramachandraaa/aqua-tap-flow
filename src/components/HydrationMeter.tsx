import { useEffect, useState } from 'react';

interface HydrationMeterProps {
  percentage: number;
  current: number;
  goal: number;
  status: string;
}

export function HydrationMeter({ percentage, current, goal, status }: HydrationMeterProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = 120;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  const getStatusColor = () => {
    if (percentage >= 100) return 'text-hydration-excellent';
    if (percentage >= 75) return 'text-hydration-good';
    if (percentage >= 50) return 'text-hydration-moderate';
    if (percentage >= 25) return 'text-hydration-low';
    return 'text-hydration-critical';
  };

  const getStrokeColor = () => {
    if (percentage >= 100) return '#10b981'; // emerald-500
    if (percentage >= 75) return '#3b82f6';  // blue-500
    if (percentage >= 50) return '#f59e0b';  // amber-500
    if (percentage >= 25) return '#f97316';  // orange-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="hsl(var(--border))"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            opacity={0.3}
          />
          {/* Progress circle */}
          <circle
            stroke={getStrokeColor()}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="progress-ring"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl font-bold ${getStatusColor()}`}>
            {Math.round(animatedPercentage)}%
          </div>
          <div className="text-sm text-muted-foreground text-center mt-1">
            {current}ml of {goal}ml
          </div>
        </div>
      </div>
      
      {/* Status badge */}
      <div className={`mt-4 px-4 py-2 rounded-full text-sm font-medium ${
        percentage >= 100 ? 'hydration-excellent' :
        percentage >= 75 ? 'hydration-good' :
        percentage >= 50 ? 'hydration-moderate' :
        percentage >= 25 ? 'hydration-low' : 'hydration-critical'
      }`}>
        {status}
      </div>
    </div>
  );
}