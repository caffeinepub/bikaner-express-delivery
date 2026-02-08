import { Link } from '@tanstack/react-router';
import { Phone, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BrandLogo from './BrandLogo';
import { CONTACT_CONFIG, buildWhatsAppLink } from '../config/contact';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card/60 backdrop-blur-sm">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="text-sm text-muted-foreground">
              Fast, local, and trusted delivery service in Bikaner. Your parcels, our responsibility.
            </p>
            <p className="text-sm font-medium text-foreground">
              {CONTACT_CONFIG.serviceArea}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link to="/rate-card" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Rate Card
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${CONTACT_CONFIG.phone}`} className="hover:text-foreground transition-colors">
                  {CONTACT_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <SiWhatsapp className="h-4 w-4" />
                <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  {CONTACT_CONFIG.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{CONTACT_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Order Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Book now and experience fast, reliable delivery!
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A]">
                <a href={buildWhatsAppLink('Hi, I would like to book a delivery.')} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="mr-2 h-4 w-4" />
                  Order on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={`tel:${CONTACT_CONFIG.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} {CONTACT_CONFIG.companyName}. All rights reserved.
          </p>
          <p>
            Built with ❤️ using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
