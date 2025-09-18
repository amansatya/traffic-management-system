import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApproachLane from './ApproachLane';

interface JunctionControlProps {
  junctionId: string;
  onEmergencyTrigger: () => void;
}

const JunctionControl = ({ junctionId, onEmergencyTrigger }: JunctionControlProps) => {
  const [approachData, setApproachData] = useState({
    north: {
      direction: 'North',
      lightStatus: 'green' as 'red' | 'yellow' | 'green',
      vehicles: { total: 8, cars: 6, trucks: 1, buses: 1, motorcycles: 0 },
      aiRecommendation: 28,
      manualOverride: false
    },
    south: {
      direction: 'South',
      lightStatus: 'red' as 'red' | 'yellow' | 'green',
      vehicles: { total: 15, cars: 11, trucks: 2, buses: 1, motorcycles: 1 },
      aiRecommendation: 45,
      manualOverride: false
    },
    east: {
      direction: 'East',
      lightStatus: 'green' as 'red' | 'yellow' | 'green',
      vehicles: { total: 4, cars: 3, trucks: 0, buses: 0, motorcycles: 1 },
      aiRecommendation: 18,
      manualOverride: false
    },
    west: {
      direction: 'West',
      lightStatus: 'red' as 'red' | 'yellow' | 'green',
      vehicles: { total: 12, cars: 9, trucks: 2, buses: 0, motorcycles: 1 },
      aiRecommendation: 38,
      manualOverride: false
    }
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setApproachData(prev => ({
        ...prev,
        north: {
          ...prev.north,
          vehicles: {
            total: Math.floor(Math.random() * 20) + 5,
            cars: Math.floor(Math.random() * 15) + 3,
            trucks: Math.floor(Math.random() * 3),
            buses: Math.floor(Math.random() * 2),
            motorcycles: Math.floor(Math.random() * 3)
          },
          aiRecommendation: Math.floor(Math.random() * 40) + 15
        },
        south: {
          ...prev.south,
          vehicles: {
            total: Math.floor(Math.random() * 25) + 8,
            cars: Math.floor(Math.random() * 18) + 5,
            trucks: Math.floor(Math.random() * 4),
            buses: Math.floor(Math.random() * 2),
            motorcycles: Math.floor(Math.random() * 3)
          },
          aiRecommendation: Math.floor(Math.random() * 50) + 20
        },
        east: {
          ...prev.east,
          vehicles: {
            total: Math.floor(Math.random() * 15) + 2,
            cars: Math.floor(Math.random() * 12) + 1,
            trucks: Math.floor(Math.random() * 2),
            buses: Math.floor(Math.random() * 1),
            motorcycles: Math.floor(Math.random() * 2)
          },
          aiRecommendation: Math.floor(Math.random() * 30) + 10
        },
        west: {
          ...prev.west,
          vehicles: {
            total: Math.floor(Math.random() * 20) + 6,
            cars: Math.floor(Math.random() * 15) + 4,
            trucks: Math.floor(Math.random() * 3),
            buses: Math.floor(Math.random() * 1),
            motorcycles: Math.floor(Math.random() * 2)
          },
          aiRecommendation: Math.floor(Math.random() * 45) + 15
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleManualOverride = (direction: string, override: boolean) => {
    setApproachData(prev => ({
      ...prev,
      [direction.toLowerCase()]: {
        ...prev[direction.toLowerCase() as keyof typeof prev],
        manualOverride: override
      }
    }));
  };

  const handleForceLight = (direction: string, status: 'red' | 'green') => {
    setApproachData(prev => ({
      ...prev,
      [direction.toLowerCase()]: {
        ...prev[direction.toLowerCase() as keyof typeof prev],
        lightStatus: status
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Junction Info */}
      <Card className="bg-gradient-surface">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Junction Control - {junctionId.replace('-', ' & ').toUpperCase()}</span>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-status-online animate-pulse" />
              <span>Live Monitoring Active</span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Northwest - North Approach */}
        <ApproachLane
          {...approachData.north}
          onManualOverride={(override) => handleManualOverride('north', override)}
          onForceLight={(status) => handleForceLight('north', status)}
        />

        {/* Northeast - East Approach */}
        <ApproachLane
          {...approachData.east}
          onManualOverride={(override) => handleManualOverride('east', override)}
          onForceLight={(status) => handleForceLight('east', status)}
        />

        {/* Southwest - South Approach */}
        <ApproachLane
          {...approachData.south}
          onManualOverride={(override) => handleManualOverride('south', override)}
          onForceLight={(status) => handleForceLight('south', status)}
        />

        {/* Southeast - West Approach */}
        <ApproachLane
          {...approachData.west}
          onManualOverride={(override) => handleManualOverride('west', override)}
          onForceLight={(status) => handleForceLight('west', status)}
        />
      </div>
    </div>
  );
};

export default JunctionControl;