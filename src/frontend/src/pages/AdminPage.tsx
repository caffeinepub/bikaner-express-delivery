import { useState, useEffect } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useGetSiteContent, useUpdateSiteContent, useAddRate, useRemoveRate, useGetRiderApplications } from '../hooks/useQueries';
import AdminGuard from '../components/AdminGuard';
import LoginButton from '../components/LoginButton';
import AdminOrdersPanel from '../components/admin/AdminOrdersPanel';
import AdminRidersPanel from '../components/admin/AdminRidersPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import type { Rate } from '../backend';

export default function AdminPage() {
  usePageMeta('Admin Panel - Bikaner Express Delivery', 'Manage site content, rates, orders, and riders.');

  const { data: content, isLoading } = useGetSiteContent();
  const { data: applications } = useGetRiderApplications();
  const updateContent = useUpdateSiteContent();
  const addRate = useAddRate();
  const removeRate = useRemoveRate();

  const [servicesList, setServicesList] = useState('');
  const [howItWorks, setHowItWorks] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsappTemplate, setWhatsappTemplate] = useState('');

  const [newRate, setNewRate] = useState({
    minDistance: '',
    maxDistance: '',
    smallParcelPrice: '',
    largeParcelPrice: '',
  });

  useEffect(() => {
    if (content) {
      setServicesList(content.servicesList);
      setHowItWorks(content.howItWorks);
      setContactNumber(content.contactNumber);
      setWhatsappTemplate(content.whatsappTemplate);
    }
  }, [content]);

  const handleUpdateContent = async () => {
    try {
      await updateContent.mutateAsync({
        servicesList,
        howItWorks,
        contactNumber,
        whatsappTemplate,
      });
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to update content');
    }
  };

  const handleAddRate = async () => {
    try {
      const rate: Rate = {
        minDistance: BigInt(newRate.minDistance),
        maxDistance: BigInt(newRate.maxDistance),
        smallParcelPrice: BigInt(newRate.smallParcelPrice),
        largeParcelPrice: BigInt(newRate.largeParcelPrice),
      };
      await addRate.mutateAsync(rate);
      setNewRate({ minDistance: '', maxDistance: '', smallParcelPrice: '', largeParcelPrice: '' });
      toast.success('Rate added successfully!');
    } catch (error) {
      toast.error('Failed to add rate');
    }
  };

  const handleRemoveRate = async (minDistance: bigint, maxDistance: bigint) => {
    try {
      await removeRate.mutateAsync([minDistance, maxDistance]);
      toast.success('Rate removed successfully!');
    } catch (error) {
      toast.error('Failed to remove rate');
    }
  };

  return (
    <AdminGuard>
      <div className="flex flex-col">
        {/* Header Section */}
        <section className="border-b bg-gradient-red py-16">
          <div className="container px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">Manage your delivery business</p>
              </div>
              <LoginButton />
            </div>
          </div>
        </section>

        {/* Content Management */}
        <section className="py-16">
          <div className="container px-4">
            <Tabs defaultValue="orders" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="riders">Riders</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="content">Content & Rates</TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <AdminOrdersPanel />
              </TabsContent>

              <TabsContent value="riders">
                <AdminRidersPanel />
              </TabsContent>

              <TabsContent value="applications">
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                  <CardHeader>
                    <CardTitle>Rider Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {applications && applications.length > 0 ? (
                      <div className="overflow-x-auto rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Mobile</TableHead>
                              <TableHead>Area</TableHead>
                              <TableHead>Has Bike</TableHead>
                              <TableHead>Applied On</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {applications.map((app) => (
                              <TableRow key={app.mobile}>
                                <TableCell className="font-medium">{app.name}</TableCell>
                                <TableCell>{app.mobile}</TableCell>
                                <TableCell>{app.area}</TableCell>
                                <TableCell>{app.hasBike ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                  {new Date(Number(app.applicationTime) / 1000000).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">No applications yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <div className="space-y-8">
                  {isLoading ? (
                    <div className="text-center">
                      <p className="text-muted-foreground">Loading content...</p>
                    </div>
                  ) : (
                    <>
                      {/* Site Content */}
                      <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                        <CardHeader>
                          <CardTitle>Site Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="servicesList">Services List</Label>
                            <Textarea
                              id="servicesList"
                              value={servicesList}
                              onChange={(e) => setServicesList(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="howItWorks">How It Works</Label>
                            <Textarea
                              id="howItWorks"
                              value={howItWorks}
                              onChange={(e) => setHowItWorks(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                              id="contactNumber"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="whatsappTemplate">WhatsApp Template</Label>
                            <Textarea
                              id="whatsappTemplate"
                              value={whatsappTemplate}
                              onChange={(e) => setWhatsappTemplate(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <Button
                            onClick={handleUpdateContent}
                            disabled={updateContent.isPending}
                            className="w-full"
                          >
                            {updateContent.isPending ? 'Updating...' : 'Update Content'}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Rate Card Management */}
                      <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                        <CardHeader>
                          <CardTitle>Rate Card Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Current Rates */}
                          <div>
                            <h3 className="mb-4 text-lg font-semibold">Current Rates</h3>
                            {content && content.rates.length > 0 ? (
                              <div className="overflow-x-auto rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Distance (km)</TableHead>
                                      <TableHead>Small Parcel</TableHead>
                                      <TableHead>Large Parcel</TableHead>
                                      <TableHead className="w-[100px]">Action</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {content.rates.map((rate) => (
                                      <TableRow key={`${rate.minDistance}-${rate.maxDistance}`}>
                                        <TableCell>
                                          {rate.minDistance.toString()} - {rate.maxDistance.toString()} km
                                        </TableCell>
                                        <TableCell>₹{(Number(rate.smallParcelPrice) / 100).toFixed(2)}</TableCell>
                                        <TableCell>₹{(Number(rate.largeParcelPrice) / 100).toFixed(2)}</TableCell>
                                        <TableCell>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveRate(rate.minDistance, rate.maxDistance)}
                                            disabled={removeRate.isPending}
                                          >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No rates available</p>
                            )}
                          </div>

                          <Separator />

                          {/* Add New Rate */}
                          <div>
                            <h3 className="mb-4 text-lg font-semibold">Add New Rate</h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="minDistance">Min Distance (km)</Label>
                                <Input
                                  id="minDistance"
                                  type="number"
                                  value={newRate.minDistance}
                                  onChange={(e) => setNewRate({ ...newRate, minDistance: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="maxDistance">Max Distance (km)</Label>
                                <Input
                                  id="maxDistance"
                                  type="number"
                                  value={newRate.maxDistance}
                                  onChange={(e) => setNewRate({ ...newRate, maxDistance: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="smallParcelPrice">Small Parcel Price (paise)</Label>
                                <Input
                                  id="smallParcelPrice"
                                  type="number"
                                  value={newRate.smallParcelPrice}
                                  onChange={(e) => setNewRate({ ...newRate, smallParcelPrice: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="largeParcelPrice">Large Parcel Price (paise)</Label>
                                <Input
                                  id="largeParcelPrice"
                                  type="number"
                                  value={newRate.largeParcelPrice}
                                  onChange={(e) => setNewRate({ ...newRate, largeParcelPrice: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={handleAddRate}
                              disabled={
                                addRate.isPending ||
                                !newRate.minDistance ||
                                !newRate.maxDistance ||
                                !newRate.smallParcelPrice ||
                                !newRate.largeParcelPrice
                              }
                              className="mt-4 w-full"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              {addRate.isPending ? 'Adding...' : 'Add Rate'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </AdminGuard>
  );
}
