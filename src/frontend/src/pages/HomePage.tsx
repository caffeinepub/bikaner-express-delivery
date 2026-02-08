import { Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '../hooks/usePageMeta';
import { CONTACT_CONFIG, buildWhatsAppLink } from '../config/contact';
import GradientSection from '../components/GradientSection';
import FounderCard from '../components/FounderCard';
import ProofAndTrustSection from '../components/ProofAndTrustSection';
import HomeServicesCategories from '../components/HomeServicesCategories';
import RiderApplicationSection from '../components/RiderApplicationSection';

export default function HomePage() {
  usePageMeta(
    'Bikaner Express Delivery - Fast • Local • Trusted Delivery in Bikaner',
    'Fast, local, and trusted delivery service in Bikaner. Same-day delivery, transparent pricing, photo proof delivery. Serving Bikaner city, villages & dhanis.'
  );

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="absolute inset-0 bg-[url('/assets/generated/speed-gradient-bg.dim_1920x1080.png')] bg-cover bg-center opacity-10" />
        <div className="container relative px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <Zap className="h-4 w-4" />
                  <span>Bikaner's Fastest Delivery Service</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Fast • Local • Trusted
                  <br />
                  <span className="text-primary">Delivery in Bikaner</span>
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Experience lightning-fast delivery with complete transparency. Photo proof, real-time tracking, and trusted service for every parcel.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="hover-scale bg-[#25D366] hover:bg-[#20BA5A]">
                  <a href={buildWhatsAppLink('Hi, I would like to book a delivery.')} target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp className="mr-2 h-5 w-5" />
                    Book Delivery on WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="hover-scale">
                  <Link to="/rate-card">
                    Check Rates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Same-day delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Photo proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>Transparent pricing</span>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 animate-float">
                <img
                  src="/assets/generated/rider-illustration.dim_1200x900.png"
                  alt="Delivery rider"
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>
              <div className="relative mt-32 animate-bike">
                <img
                  src="/assets/generated/bike-illustration.dim_900x450.png"
                  alt="Delivery bike"
                  className="h-auto w-64 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <GradientSection variant="red">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">About Bikaner Express Delivery</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We are Bikaner's premier local delivery service, committed to speed, trust, and transparency. Under the leadership of Sarwan Singh Rathore, we've built a reputation for reliable delivery with photo proof confirmation. From small businesses to medical emergencies, we handle every delivery with care and professionalism.
            </p>
          </div>
        </div>
      </GradientSection>

      {/* Services Section */}
      <GradientSection variant="white">
        <HomeServicesCategories />
      </GradientSection>

      {/* Proof & Trust Section */}
      <GradientSection variant="orange">
        <ProofAndTrustSection />
      </GradientSection>

      {/* Founder Section */}
      <GradientSection variant="white">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Meet Our Founder</h2>
            <p className="text-muted-foreground">
              Building trust through reliable service
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <FounderCard />
          </div>
        </div>
      </GradientSection>

      {/* Rider Application Section */}
      <GradientSection variant="black">
        <RiderApplicationSection />
      </GradientSection>

      {/* CTA Section */}
      <section className="border-t bg-primary py-16 text-primary-foreground">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to deliver your parcel?</h2>
            <p className="mb-8 text-lg opacity-90">
              Experience fast, reliable delivery with complete transparency. Book now!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="hover-scale">
                <a href={buildWhatsAppLink('Hi, I would like to book a delivery.')} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="mr-2 h-5 w-5" />
                  Order on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-scale">
                <Link to="/rate-card">
                  View Rate Card
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
