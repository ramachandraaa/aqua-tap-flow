import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Nfc, BarChart3, Settings, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tags', href: '/tags', icon: Nfc },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:left-0 md:bottom-auto md:w-64 md:h-screen z-50">
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden glass-strong border-t border-border/50 px-4 py-2">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:h-full glass-strong border-r border-border/50">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">AquaTrack</h1>
              <p className="text-xs text-muted-foreground">RFID Water Tracker</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'text-primary bg-primary/10 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )
              }
            >
              <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white text-sm font-bold">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">User</p>
              <p className="text-xs text-muted-foreground">Active tracker</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}