import { usePageMeta } from '../hooks/usePageMeta';
import GradientSection from '../components/GradientSection';
import HomeServicesCategories from '../components/HomeServicesCategories';

export default function ServicesPage() {
  usePageMeta(
    'Our Services - Bikaner Express Delivery',
    'Comprehensive delivery solutions in Bikaner: local shop delivery, bus parcel delivery, documents & medicines, same-day delivery, village & dhani delivery.',
    'Bikaner delivery service, local delivery, parcel delivery, courier service'
  );

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="border-b bg-gradient-red py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive delivery solutions for all your needs in Bikaner
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <GradientSection variant="white">
        <HomeServicesCategories />
      </GradientSection>
    </div>
  );
}
