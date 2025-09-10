import { useState } from 'react';
import { Save, Bell, Target, Droplets, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [settings, setSettings] = useState({
    dailyGoal: 2000,
    defaultDrinkAmount: 250,
    notifications: true,
    reminderInterval: 60,
    timezone: 'UTC',
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Customize your hydration tracking experience
          </p>
        </div>
        
        <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hydration Goals */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Hydration Goals
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="dailyGoal" className="text-sm font-medium">
                Daily Water Goal (ml)
              </Label>
              <Input
                id="dailyGoal"
                type="number"
                value={settings.dailyGoal}
                onChange={(e) => setSettings({
                  ...settings,
                  dailyGoal: parseInt(e.target.value) || 2000
                })}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: 2000ml (2L) per day
              </p>
            </div>

            <div>
              <Label htmlFor="drinkAmount" className="text-sm font-medium">
                Default Drink Amount (ml)
              </Label>
              <Input
                id="drinkAmount"
                type="number"
                value={settings.defaultDrinkAmount}
                onChange={(e) => setSettings({
                  ...settings,
                  defaultDrinkAmount: parseInt(e.target.value) || 250
                })}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Amount recorded per RFID tag scan
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Enable Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Get notifications to drink water
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: checked
                })}
              />
            </div>

            {settings.notifications && (
              <div>
                <Label htmlFor="reminderInterval" className="text-sm font-medium">
                  Reminder Interval (minutes)
                </Label>
                <Input
                  id="reminderInterval"
                  type="number"
                  value={settings.reminderInterval}
                  onChange={(e) => setSettings({
                    ...settings,
                    reminderInterval: parseInt(e.target.value) || 60
                  })}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* System Settings */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            System Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="timezone" className="text-sm font-medium">
                Timezone
              </Label>
              <Input
                id="timezone"
                value={settings.timezone}
                onChange={(e) => setSettings({
                  ...settings,
                  timezone: e.target.value
                })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download your hydration data in different formats
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="glass-card border-0">
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" className="glass-card border-0">
                  Export PDF
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <h4 className="font-medium text-foreground mb-2">Data Reset</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Clear all hydration data and start fresh
              </p>
              <Button variant="destructive" size="sm">
                Reset All Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Droplets className="h-5 w-5 text-primary" />
          About AquaTrack
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="font-medium text-foreground">Version</p>
            <p className="text-sm text-muted-foreground">1.0.0</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Backend Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-hydration-excellent"></div>
              <p className="text-sm text-muted-foreground">Connected</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground">Last Sync</p>
            <p className="text-sm text-muted-foreground">Just now</p>
          </div>
        </div>
      </div>
    </div>
  );
}