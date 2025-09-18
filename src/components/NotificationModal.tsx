import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal = ({ isOpen, onClose }: NotificationModalProps) => {
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'High Traffic Volume',
      message: 'Junction Main St. & Park Ave. experiencing heavy congestion',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'System Update Complete',
      message: 'AI optimization algorithms updated successfully',
      time: '15 minutes ago',
      read: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Camera maintenance scheduled for Junction 2nd St. & Elm Ave.',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Emergency Vehicle Alert',
      message: 'Ambulance detected on 1st Ave. approaching junction',
      time: '2 hours ago',
      read: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-status-warning" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-status-online" />;
      case 'info': return <Info className="h-4 w-4 text-chart-primary" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (type) {
      case 'warning': return 'secondary';
      case 'success': return 'secondary';
      case 'info': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            <Badge variant="secondary" className="ml-auto">
              {notifications.filter(n => !n.read).length} new
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border ${
                !notification.read 
                  ? 'bg-muted/50 border-primary/20' 
                  : 'bg-background border-border'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">
                      {notification.title}
                    </h4>
                    <Badge 
                      variant={getBadgeVariant(notification.type)} 
                      className="text-xs"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;