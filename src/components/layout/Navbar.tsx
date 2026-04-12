import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <Heart className="h-5 w-5 text-primary" />
          CareSync AI
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <Button asChild variant="outline" size="sm">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild size="sm" className="gradient-primary text-primary-foreground border-0">
                <Link to="/auth?mode=signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>Log Out</Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3">
          {!isAuthenticated ? (
            <>
              <a href="#features" className="block text-sm text-muted-foreground">Features</a>
              <a href="#pricing" className="block text-sm text-muted-foreground">Pricing</a>
              <Button asChild className="w-full" variant="outline" size="sm">
                <Link to="/auth">Log In</Link>
              </Button>
              <Button asChild className="w-full gradient-primary text-primary-foreground border-0" size="sm">
                <Link to="/auth?mode=signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" className="w-full" size="sm" onClick={logout}>Log Out</Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
