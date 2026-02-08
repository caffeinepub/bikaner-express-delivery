import { Card, CardContent } from '@/components/ui/card';
import { Package, Bus, FileText, Clock, MapPin } from 'lucide-react';

export default function HomeServicesCategories() {
  const services = [
    {
      icon: Package,
      title: 'Local Shop Delivery',
      description: 'Fast and reliable delivery for local shops and businesses across Bikaner.',
    },
    {
      icon: Bus,
      title: 'Bus Parcel Delivery',
      description: 'Convenient parcel pickup and delivery to and from bus stations.',
    },
    {
      icon: FileText,
      title: 'Documents & Medicines',
      description: 'Urgent delivery of important documents and medical supplies.',
    },
    {
      icon: Clock,
      title: 'Same-Day Local Delivery',
      description: 'Get your parcels delivered within hours across Bikaner city.',
    },
    {
      icon: MapPin,
      title: 'Village & Dhani Delivery',
      description: 'We deliver to villages and dhanis around Bikaner with care.',
    },
  ];

  return (
    <div className="container px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Our Services</h2>
        <p className="text-muted-foreground">
          Comprehensive delivery solutions for all your needs in Bikaner
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg hover-lift">
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
