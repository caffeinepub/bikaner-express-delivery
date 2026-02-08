import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';

export default function PrimaryCTAs() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white">
        <a href="https://wa.me/919610685264" target="_blank" rel="noopener noreferrer">
          <SiWhatsapp className="mr-2 h-5 w-5" />
          Order on WhatsApp
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="tel:+919983685264">
          <Phone className="mr-2 h-5 w-5" />
          Call Now
        </a>
      </Button>
    </div>
  );
}
