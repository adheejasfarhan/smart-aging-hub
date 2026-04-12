import { Activity, Bell, Pill } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Activity,
    title: 'Routine Monitoring',
    description: 'Track daily movement, device usage, and habits with passive smart-home sensors. See what's normal vs. what's changed.',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Bell,
    title: 'Anomaly Alerts',
    description: 'Get instant notifications when something seems off — no movement, unusual patterns, or potential emergencies.',
    color: 'text-secondary bg-secondary/10',
  },
  {
    icon: Pill,
    title: 'Medication Reminders',
    description: 'Schedule medication reminders with smart follow-ups. Know instantly when a dose is taken or missed.',
    color: 'text-accent bg-accent/10',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything You Need for{' '}
            <span className="gradient-text">Peace of Mind</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            CareSync AI combines smart monitoring, intelligent alerts, and medication management into one simple platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
              <CardContent className="p-8 space-y-4">
                <div className={`inline-flex p-3 rounded-xl ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
