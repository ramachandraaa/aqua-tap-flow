import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyChartProps {
  data: number[];
  goal?: number;
}

export function WeeklyChart({ data, goal = 2000 }: WeeklyChartProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const chartData = data.map((value, index) => ({
    day: days[index],
    amount: value,
    percentage: (value / goal) * 100,
    isToday: index === new Date().getDay() - 1 || (new Date().getDay() === 0 && index === 6)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-strong rounded-lg p-3 shadow-lg border">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            {data.amount >= 1000 ? `${(data.amount / 1000).toFixed(1)}L` : `${data.amount}ml`}
          </p>
          <p className="text-sm text-muted-foreground">
            {Math.round(data.percentage)}% of goal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}L` : `${value}ml`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              radius={[4, 4, 0, 0]}
              fill="hsl(var(--primary))"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Goal line indicator */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Daily Goal: {goal >= 1000 ? `${(goal / 1000).toFixed(1)}L` : `${goal}ml`}
        </span>
        <span className="text-muted-foreground">
          Weekly Avg: {data.length > 0 ? 
            (data.reduce((a, b) => a + b, 0) / data.length / 1000).toFixed(1) + 'L' : 
            '0L'
          }
        </span>
      </div>
    </div>
  );
}