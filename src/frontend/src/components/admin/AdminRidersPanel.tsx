import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetAllRiderProfiles } from '../../hooks/useQueries';
import { Bike } from 'lucide-react';

export default function AdminRidersPanel() {
  const { data: riders, isLoading } = useGetAllRiderProfiles();

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
      <CardHeader>
        <CardTitle>Rider Profiles</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading riders...</p>
        ) : riders && riders.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Has Bike</TableHead>
                  <TableHead>Assigned Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riders.map((rider) => (
                  <TableRow key={rider.mobile}>
                    <TableCell className="font-medium">{rider.name}</TableCell>
                    <TableCell>{rider.mobile}</TableCell>
                    <TableCell>{rider.area}</TableCell>
                    <TableCell>
                      {rider.hasBike ? (
                        <Badge variant="default" className="flex w-fit items-center gap-1">
                          <Bike className="h-3 w-3" />
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="secondary">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>{rider.assignedOrders.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No rider profiles yet</p>
        )}
      </CardContent>
    </Card>
  );
}
