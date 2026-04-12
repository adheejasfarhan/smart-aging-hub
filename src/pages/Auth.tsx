import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'caregiver' | 'elderly'>('caregiver');
  const { login, signup } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      signup(name, email, password, role);
    } else {
      login(email, password);
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
            <Heart className="h-7 w-7 text-primary" />
            CareSync AI
          </div>
          <p className="text-muted-foreground">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex rounded-lg bg-muted p-1">
              <button
                onClick={() => setIsSignup(false)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${!isSignup ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Log In
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${isSignup ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Sign Up
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Sarah Thompson" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {isSignup && (
                <div className="space-y-2">
                  <Label>I am a...</Label>
                  <div className="flex gap-3">
                    {(['caregiver', 'elderly'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all ${role === r ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                      >
                        {r === 'caregiver' ? '🤝 Caregiver' : '👤 Elderly'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 hover:opacity-90">
                {isSignup ? 'Create Account' : 'Log In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
