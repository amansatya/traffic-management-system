import { useState } from 'react';
import { Bell, Settings, User, Activity, TrendingUp, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import JunctionControl from '@/components/JunctionControl';
import SystemAnalytics from '@/components/SystemAnalytics';
import EmergencyAlert from '@/components/EmergencyAlert';

const Index = () => {
  const [activeView, setActiveView] = useState<'junction' | 'analytics'>('junction');
  const [selectedJunction, setSelectedJunction] = useState('main-park');
  const [emergencyActive, setEmergencyActive] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-secondary">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Smart Traffic Control</h1>
          </div>

          {/* Junction Selector */}
          <div className="flex items-center space-x-4">
            <Select value={selectedJunction} onValueChange={setSelectedJunction}>
              <SelectTrigger className="w-64 bg-muted/50">
                <SelectValue placeholder="Select Junction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main-park">Junction: Main St. & Park Ave.</SelectItem>
                <SelectItem value="first-broadway">Junction: 1st Ave. & Broadway</SelectItem>
                <SelectItem value="second-elm">Junction: 2nd St. & Elm Ave.</SelectItem>
                <SelectItem value="third-oak">Junction: 3rd St. & Oak Ave.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status and Controls */}
          <div className="flex items-center space-x-4">
            <Badge className="status-green border-2">
              <div className="mr-2 h-2 w-2 rounded-full bg-status-online" />
              System Online
            </Badge>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-status-warning animate-pulse" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-6 pb-4">
          <div className="flex space-x-1">
            <Button
              variant={activeView === 'junction' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('junction')}
              className="flex items-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>Junction Control</span>
            </Button>
            <Button
              variant={activeView === 'analytics' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('analytics')}
              className="flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>System Analytics</span>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {activeView === 'junction' && (
          <JunctionControl 
            junctionId={selectedJunction} 
            onEmergencyTrigger={() => setEmergencyActive(true)}
          />
        )}
        {activeView === 'analytics' && (
          <SystemAnalytics />
        )}
      </main>

      {/* Emergency Alert Modal */}
      <EmergencyAlert
        isOpen={emergencyActive}
        onClose={() => setEmergencyActive(false)}
        vehicleType="ambulance"
        approach="Northbound"
        junction="Main St. & Park Ave."
      />

      {/* Simulate Emergency for Demo */}
      <Button
        onClick={() => setEmergencyActive(true)}
        className="fixed bottom-6 right-6 bg-status-critical hover:bg-status-critical/80 text-white"
        size="sm"
      >
        Simulate Emergency
      </Button>
    </div>
  );
};

export default Index;