import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, MapPin, Bike, CheckCircle2 } from 'lucide-react';
import GradientSection from '../components/GradientSection';

export default function HowItWorksPage() {
  usePageMeta(
    'How It Works - Bikaner Express Delivery',
    'Simple 4-step process: Book on WhatsApp, we pick up, fast delivery, photo proof confirmation. Bikaner delivery service made easy.',
    'Bikaner delivery service, how to book delivery, delivery process'
  );

  const steps = [
    {
      icon: MessageCircle,
      title: 'Book on WhatsApp',
      description: 'Send us your delivery details via WhatsApp. Quick and easy booking process.',
    },
    {
      icon: MapPin,
      title: 'We Pick Up',
      description: 'Our rider arrives at the pickup location to collect your parcel safely.',
    },
    {
      icon: Bike,
      title: 'Fast Delivery',
      description: 'Your parcel is delivered quickly and safely to the destination.',
    },
    {
      icon: CheckCircle2,
      title: 'Photo Proof',
      description: 'Receive photo proof of delivery via WhatsApp for complete peace of mind.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="border-b bg-gradient-orange py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold">How It Works</h1>
            <p className="text-lg text-muted-foreground">
              Simple, fast, and transparent delivery process
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <GradientSection variant="white">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover-lift">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </GradientSection>

      {/* Details Section */}
      <GradientSection variant="red">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold">Why Choose Our Process?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong>WhatsApp Booking:</strong> No need for complicated apps or forms. Simply send us a message on WhatsApp with your delivery details, and we'll take care of the rest.
              </p>
              <p>
                <strong>Real-Time Updates:</strong> Stay informed throughout the delivery process with real-time updates via WhatsApp. Know exactly when your parcel is picked up and delivered.
              </p>
              <p>
                <strong>Photo Proof Delivery:</strong> Every delivery is documented with a photo, sent directly to you via WhatsApp. This ensures complete transparency and accountability.
              </p>
              <p>
                <strong>Fuel-Efficient Service:</strong> Our bikes average 40 km per liter, allowing us to offer competitive rates while maintaining fast delivery times.
              </p>
            </div>
          </div>
        </div>
      </GradientSection>
    </div>
  );
}
