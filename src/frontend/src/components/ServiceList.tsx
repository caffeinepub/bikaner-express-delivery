import { Package, Pill, Bus, Clock, Box } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Package,
    title: 'Shop-to-Customer Delivery',
    description: 'Dukaan se seedha customer tak. Har parcel safe aur secure delivery.',
  },
  {
    icon: Pill,
    title: 'Medical Delivery',
    description: 'Dawai aur medical supplies ki urgent delivery. Health first!',
  },
  {
    icon: Bus,
    title: 'Bus Parcel Delivery',
    description: 'Bus stand se pickup aur delivery. Aapke parcels ka khayal.',
  },
  {
    icon: Clock,
    title: 'Same-Day Delivery',
    description: 'Aaj order, aaj delivery. Fast aur reliable service.',
  },
  {
    icon: Box,
    title: 'Small & Large Parcels',
    description: 'Chhote se bade parcels tak. Har size ki delivery available.',
  },
];

export default function ServiceList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
