import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For getting started',
    features: ['1 elderly profile', 'Basic activity monitoring', 'Email alerts', 'Medication reminders'],
    cta: 'Start Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For active caregivers',
    features: ['Up to 3 profiles', 'Advanced anomaly detection', 'Real-time push alerts', 'Medication tracking', 'Activity history (30 days)', 'Family sharing'],
    cta: 'Get Pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$39',
    period: '/month',
    description: 'For care agencies',
    features: ['Unlimited profiles', 'AI-powered predictions', 'Priority 24/7 support', 'Custom alert rules', 'Full activity history', 'API access', 'HIPAA compliance'],
    cta: 'Contact Sales',
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative transition-all duration-300 hover:-translate-y-1 ${plan.highlight ? 'border-primary shadow-xl scale-105' : 'border-border/50'}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg text-muted-foreground font-medium">{plan.name}</CardTitle>
                <div className="pt-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className={`w-full ${plan.highlight ? 'gradient-primary text-primary-foreground border-0 hover:opacity-90' : ''}`} variant={plan.highlight ? 'default' : 'outline'}>
                  <Link to="/auth">{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
