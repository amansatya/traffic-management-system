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
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] p-0 overflow-hidden">
                    <div className="flex flex-col h-full max-h-[90vh]">
                        <DialogHeader className="px-6 py-4 border-b shrink-0">
                            <DialogTitle className="flex items-center space-x-2">
                                <Settings className="h-5 w-5" />
                                <span>System Settings</span>
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                            <div className="space-y-6 pb-2">
                                {/* AI Settings */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-2 border-b">
                                        AI Configuration
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 mr-4">
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
                                    <h3 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-2 border-b">
                                        Display
                                    </h3>

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
                                    <h3 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-2 border-b">
                                        Notifications
                                    </h3>

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
                                    <h3 className="text-sm font-medium text-foreground sticky top-0 bg-background/95 backdrop-blur-sm py-2 border-b">
                                        Video Feeds
                                    </h3>

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
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <style dangerouslySetInnerHTML={{
                __html: `
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: hsl(var(--muted-foreground)) hsl(var(--muted));
          }
          
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: hsl(var(--muted));
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: hsl(var(--muted-foreground));
            border-radius: 4px;
            transition: background 0.2s ease;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--foreground) / 0.8);
          }
          
          .custom-scrollbar::-webkit-scrollbar-corner {
            background: hsl(var(--muted));
          }
        `
            }} />
        </>
    );
};

export default SettingsModal;