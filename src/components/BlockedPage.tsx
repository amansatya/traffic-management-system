import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Clock, Mail } from 'lucide-react';

interface BlockedPageProps {
  onRetry: () => void;
}

const BlockedPage = ({ onRetry }: BlockedPageProps) => {
  const clearBlock = () => {
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('lastAttempt');
    onRetry();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 to-destructive/10 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <ShieldX className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">Account Blocked</CardTitle>
          <CardDescription className="text-base">
            Your account has been temporarily blocked due to multiple failed login attempts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-destructive/5 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-destructive mb-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Block Duration: 24 Hours (Testing)</span>
            </div>
            <p className="text-sm text-muted-foreground">
              In production, this would be 2 days as per security policy.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Contact administrator for immediate access</span>
            </div>
            
            <div className="bg-muted/20 p-3 rounded">
              <p className="text-sm font-medium">System Administrator</p>
              <p className="text-xs text-muted-foreground">admin@trafficcontrol.city</p>
              <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={clearBlock}
              className="text-xs"
            >
              Clear Block (Testing Only)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockedPage;