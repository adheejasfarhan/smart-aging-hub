import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Activity, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Heart className="h-4 w-4" />
              Smarter homes, safer aging
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Keep Your Loved Ones{' '}
              <span className="gradient-text">Safe & Connected</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              CareSync AI passively monitors daily routines, detects anomalies, and sends smart alerts — so you always know your elderly loved ones are safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 hover:opacity-90 transition-opacity">
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#features">See How It Works</a>
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-primary" /> HIPAA Ready</span>
              <span className="flex items-center gap-1"><Activity className="h-4 w-4 text-secondary" /> Real-time Monitoring</span>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative hidden md:block">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Activity Dashboard</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">● Active</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Steps Today', value: '2,340', color: 'bg-primary/10 text-primary' },
                  { label: 'Meds Taken', value: '2/3', color: 'bg-secondary/10 text-secondary' },
                  { label: 'Active Hours', value: '5.2h', color: 'bg-accent/10 text-accent' },
                  { label: 'Alerts', value: '1', color: 'bg-destructive/10 text-destructive' },
                ].map((stat) => (
                  <div key={stat.label} className={`rounded-xl p-3 ${stat.color}`}>
                    <p className="text-xs opacity-70">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {['Walked to kitchen — 8:30 AM', 'Breakfast prepared — 8:45 AM', 'TV turned on — 9:00 AM'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -z-10 top-4 left-4 right-4 bottom-4 gradient-primary rounded-2xl opacity-20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
