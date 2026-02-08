import { type ReactNode } from 'react';
import HeaderNav from './HeaderNav';
import SiteFooter from './SiteFooter';
import FloatingWhatsAppCTA from './FloatingWhatsAppCTA';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="colorful-bg flex min-h-screen flex-col">
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingWhatsAppCTA />
    </div>
  );
}
