import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="relative rounded-3xl gradient-primary p-12 md:p-20 text-center overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Start Caring Smarter Today
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg">
            Join thousands of families who trust CareSync AI to keep their loved ones safe and independent.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link to="/auth">Get Started — It's Free</Link>
          </Button>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
      </div>
    </div>
  </section>
);

export default CTASection;
