import { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useGetWhatsAppTemplate } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Clock } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import MapEmbed from '../components/MapEmbed';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function ContactPage() {
  usePageMeta(
    'Contact Us - Bikaner Express Delivery',
    'Contact Bikaner Express Delivery for fast local delivery service. Call us, WhatsApp us, or fill our contact form to get started.'
  );

  const { data: template } = useGetWhatsAppTemplate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    delivery: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `${template || 'Hi, I would like to request a delivery.'}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nPickup Location: ${formData.pickup}\nDelivery Location: ${formData.delivery}\nMessage: ${formData.message}`;
    const whatsappLink = buildWhatsAppLink('919610685264', message);
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="border-b bg-card/40 backdrop-blur-sm py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Humse contact karna bahut easy hai. Call karein, WhatsApp karein, ya form fill karein - hum turant respond karenge!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
                <div className="space-y-4">
                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Phone className="h-5 w-5 text-primary" />
                        Call Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">Direct call ke liye</p>
                      <Button asChild variant="outline" className="w-full">
                        <a href="tel:+919983685264">
                          <Phone className="mr-2 h-4 w-4" />
                          +91 99836 85264
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <SiWhatsapp className="h-5 w-5 text-[#25D366]" />
                        WhatsApp
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">Quick response ke liye WhatsApp karein</p>
                      <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                        <a href="https://wa.me/919610685264" target="_blank" rel="noopener noreferrer">
                          <SiWhatsapp className="mr-2 h-4 w-4" />
                          +91 96106 85264
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                        Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Bikaner, Rajasthan, India</p>
                      <p className="mt-2 text-sm text-muted-foreground">Serving all areas within Bikaner city</p>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        Working Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                      <p className="mt-2 text-sm text-muted-foreground">Emergency deliveries available on request</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                <CardHeader>
                  <CardTitle>Request a Delivery Quote</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Form fill karein aur hum WhatsApp par aapko contact karenge
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="Aapka naam"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <Input
                        id="pickup"
                        placeholder="Pickup address"
                        value={formData.pickup}
                        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery">Delivery Location</Label>
                      <Input
                        id="delivery"
                        placeholder="Delivery address"
                        value={formData.delivery}
                        onChange={(e) => setFormData({ ...formData, delivery: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        placeholder="Parcel size, special instructions, etc."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                      <SiWhatsapp className="mr-2 h-4 w-4" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t bg-card/40 backdrop-blur-sm py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-2xl font-bold">Our Service Area</h2>
            <MapEmbed />
          </div>
        </div>
      </section>
    </div>
  );
}
