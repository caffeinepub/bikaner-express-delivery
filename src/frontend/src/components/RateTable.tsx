import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Rate } from '../backend';

interface RateTableProps {
  rates: Rate[];
}

export default function RateTable({ rates }: RateTableProps) {
  const formatPrice = (price: bigint) => {
    const priceNum = Number(price);
    return `₹${(priceNum / 100).toFixed(2)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distance-Based Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Distance (km)</TableHead>
                <TableHead className="text-right">Small Parcel</TableHead>
                <TableHead className="text-right">Large Parcel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rates.map((rate, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {Number(rate.minDistance)} - {Number(rate.maxDistance)} km
                  </TableCell>
                  <TableCell className="text-right">{formatPrice(rate.smallParcelPrice)}</TableCell>
                  <TableCell className="text-right">{formatPrice(rate.largeParcelPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 rounded-md bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Prices are transparent aur distance ke hisaab se. No hidden charges!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
