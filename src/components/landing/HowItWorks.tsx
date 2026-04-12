import { Wifi, Brain, BellRing } from 'lucide-react';

const steps = [
  {
    icon: Wifi,
    step: '01',
    title: 'Connect Devices',
    description: 'Link smart home devices, wearables, and sensors to CareSync AI in minutes.',
  },
  {
    icon: Brain,
    step: '02',
    title: 'AI Learns Routines',
    description: 'Our AI builds a baseline of normal daily activity patterns over a few days.',
  },
  {
    icon: BellRing,
    step: '03',
    title: 'Get Smart Alerts',
    description: 'Receive real-time notifications when something deviates from the norm.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Set up in minutes, get peace of mind for years.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" />
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-4 relative">
              <div className="mx-auto w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg">
                <s.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold text-primary tracking-widest">STEP {s.step}</span>
              <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
