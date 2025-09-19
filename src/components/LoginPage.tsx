import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBlock: () => void;
}

const HARDCODED_USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'controller', password: 'control456' },
  { username: 'operator', password: 'operate789' }
];

const LoginPage = ({ onLogin, onBlock }: LoginPageProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getAttempts = () => {
    const attempts = localStorage.getItem('loginAttempts');
    const timestamp = localStorage.getItem('lastAttempt');
    
    if (timestamp) {
      const lastAttempt = new Date(timestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastAttempt.getTime()) / (1000 * 60 * 60);
      
      // Reset attempts after 24 hours for testing (normally would be 2 days)
      if (hoursDiff > 24) {
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lastAttempt');
        return 0;
      }
    }
    
    return attempts ? parseInt(attempts) : 0;
  };

  const setAttempts = (count: number) => {
    localStorage.setItem('loginAttempts', count.toString());
    localStorage.setItem('lastAttempt', new Date().toISOString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentAttempts = getAttempts();
    if (currentAttempts >= 3) {
      onBlock();
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validUser = HARDCODED_USERS.find(
      user => user.username === username && user.password === password
    );

    if (validUser) {
      // Reset attempts on successful login
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lastAttempt');
      // Store auth state
      localStorage.setItem('isAuthenticated', 'true');
      onLogin();
    } else {
      const newAttempts = currentAttempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        onBlock();
      } else {
        setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
      }
    }

    setIsLoading(false);
  };

  const remainingAttempts = 3 - getAttempts();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Traffic Control System</CardTitle>
          <CardDescription>
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {remainingAttempts < 3 && remainingAttempts > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Warning: {remainingAttempts} attempts remaining before account lockout.
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Test Credentials:</p>
            <p>admin/admin123 | controller/control456 | operator/operate789</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;