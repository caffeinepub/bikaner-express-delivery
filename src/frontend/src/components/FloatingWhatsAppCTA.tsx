import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { buildWhatsAppLink } from '../config/contact';

export default function FloatingWhatsAppCTA() {
  return (
    <a
      href={buildWhatsAppLink('Hi, I would like to book a delivery.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 transition-transform hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#20BA5A] hover:shadow-xl"
      >
        <SiWhatsapp className="h-7 w-7" />
      </Button>
    </a>
  );
}
