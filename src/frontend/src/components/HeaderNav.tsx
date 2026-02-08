import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import BrandLogo from './BrandLogo';
import { CONTACT_CONFIG, buildWhatsAppLink } from '../config/contact';

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/rate-card', label: 'Rate Card' },
    { path: '/contact', label: 'Contact' },
    { path: '/rider', label: 'Rider' },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BrandLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path) ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="sm">
            <a href={`tel:${CONTACT_CONFIG.phone}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#20BA5A]">
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <div className="flex flex-col gap-6 py-6">
              <div className="flex items-center justify-between">
                <BrandLogo />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.path}>
                    <Link
                      to={link.path}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                        isActive(link.path) ? 'bg-accent text-accent-foreground' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="flex flex-col gap-2 border-t pt-4">
                <Button asChild variant="outline" className="w-full">
                  <a href={`tel:${CONTACT_CONFIG.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
                <Button asChild className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                  <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
