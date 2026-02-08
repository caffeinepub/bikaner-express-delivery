import { Card, CardContent } from '@/components/ui/card';
import { Camera, MessageCircle, MapPin } from 'lucide-react';

export default function ProofAndTrustSection() {
  const features = [
    {
      icon: Camera,
      title: 'Photo Proof Delivery',
      description: 'Every delivery is documented with photo proof, ensuring complete transparency and peace of mind.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Confirmation',
      description: 'Instant delivery updates and confirmations sent directly to your WhatsApp for real-time tracking.',
    },
    {
      icon: MapPin,
      title: 'Real-Time Coordination',
      description: 'Stay connected with our riders throughout the delivery process for seamless coordination.',
    },
  ];

  return (
    <div className="container px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Trust & Transparency</h2>
        <p className="text-muted-foreground">
          We believe in complete transparency. Here's how we ensure your peace of mind.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover-lift">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
