import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Settings</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* AI Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">AI Configuration</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-foreground">Auto AI Recommendations</label>
                <p className="text-xs text-muted-foreground">Automatically apply AI timing suggestions</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-foreground">AI Sensitivity</label>
              <Slider
                defaultValue={[75]}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Display</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Dark Mode</label>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-foreground">Update Frequency</label>
              <Select defaultValue="1min">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30sec">30 seconds</SelectItem>
                  <SelectItem value="1min">1 minute</SelectItem>
                  <SelectItem value="2min">2 minutes</SelectItem>
                  <SelectItem value="5min">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Notifications</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Emergency Alerts</label>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">System Status Updates</label>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Traffic Volume Warnings</label>
              <Switch />
            </div>
          </div>

          {/* Video Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Video Feeds</h3>
            
            <div className="space-y-2">
              <label className="text-sm text-foreground">Video Quality</label>
              <Select defaultValue="hd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sd">Standard (480p)</SelectItem>
                  <SelectItem value="hd">High Definition (720p)</SelectItem>
                  <SelectItem value="fhd">Full HD (1080p)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Show Detection Overlays</label>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;