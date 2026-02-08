import { usePageMeta } from '../hooks/usePageMeta';
import { useGetRates } from '../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Fuel } from 'lucide-react';
import GradientSection from '../components/GradientSection';

export default function RateCardPage() {
  usePageMeta(
    'Rate Card - Bikaner Express Delivery',
    'Transparent pricing for delivery services in Bikaner. Distance-based rates for small and large parcels. Fuel-efficient bike delivery with 40 km average.',
    'Bikaner delivery service, delivery rates, pricing, courier charges'
  );

  const { data: rates, isLoading } = useGetRates();

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="border-b bg-gradient-black py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold">Rate Card</h1>
            <p className="text-lg text-muted-foreground">
              Transparent pricing with no hidden charges
            </p>
          </div>
        </div>
      </section>

      {/* Fuel Efficiency Note */}
      <GradientSection variant="orange">
        <div className="container px-4">
          <Card className="mx-auto max-w-2xl border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Fuel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Fuel-Efficient Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Our bikes average <strong>40 km per liter</strong>, allowing us to offer competitive rates while maintaining fast delivery times.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </GradientSection>

      {/* Rates Table */}
      <GradientSection variant="white">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-lg">
              <CardContent className="pt-6">
                {isLoading ? (
                  <p className="text-center text-muted-foreground">Loading rates...</p>
                ) : rates && rates.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Distance (km)</TableHead>
                          <TableHead>Small Parcel</TableHead>
                          <TableHead>Large Parcel</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rates.map((rate) => (
                          <TableRow key={`${rate.minDistance}-${rate.maxDistance}`}>
                            <TableCell className="font-medium">
                              {rate.minDistance.toString()} - {rate.maxDistance.toString()} km
                            </TableCell>
                            <TableCell>₹{(Number(rate.smallParcelPrice) / 100).toFixed(2)}</TableCell>
                            <TableCell>₹{(Number(rate.largeParcelPrice) / 100).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">No rates available</p>
                )}
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Note:</strong> All prices are inclusive of fuel and service charges.</p>
                  <p>For deliveries beyond 20 km or special requirements, please contact us for a custom quote.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </GradientSection>
    </div>
  );
}
