import { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useGetAssignedDeliveries, useUpdateDeliveryStatus, useUploadProofOfDelivery } from '../hooks/useQueries';
import RiderGuard from '../components/RiderGuard';
import LoginButton from '../components/LoginButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Upload, CheckCircle2, Clock, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob, OrderStatus } from '../backend';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function RiderPage() {
  usePageMeta('Rider Portal - Bikaner Express Delivery', 'View and manage your assigned deliveries.');

  const { identity } = useInternetIdentity();
  const { data: deliveries, isLoading } = useGetAssignedDeliveries();
  const updateStatus = useUpdateDeliveryStatus();
  const uploadProof = useUploadProofOfDelivery();

  const [selectedOrderId, setSelectedOrderId] = useState<bigint | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>(OrderStatus.pending);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleStatusUpdate = async (orderId: bigint) => {
    if (!identity) return;
    
    try {
      await updateStatus.mutateAsync({
        orderId,
        newStatus,
      });
      toast.success('Delivery status updated successfully!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleProofUpload = async (orderId: bigint) => {
    if (!identity || !proofFile) return;

    try {
      const arrayBuffer = await proofFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await uploadProof.mutateAsync({
        orderId,
        proofPhoto: blob,
      });
      
      toast.success('Proof photo uploaded successfully!');
      setProofFile(null);
      setUploadProgress(0);
      setSelectedOrderId(null);
    } catch (error) {
      toast.error('Failed to upload proof photo');
      setUploadProgress(0);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      [OrderStatus.pending]: { variant: 'secondary' as const, icon: Clock, label: 'Pending' },
      [OrderStatus.picked]: { variant: 'default' as const, icon: Truck, label: 'Picked Up' },
      [OrderStatus.delivered]: { variant: 'default' as const, icon: CheckCircle2, label: 'Delivered' },
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <RiderGuard>
      <div className="flex flex-col">
        {/* Header Section */}
        <section className="border-b bg-gradient-red py-16">
          <div className="container px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-4xl font-bold">Rider Portal</h1>
                <p className="text-muted-foreground">Manage your assigned deliveries</p>
              </div>
              <LoginButton />
            </div>
          </div>
        </section>

        {/* Deliveries Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl space-y-8">
              {isLoading ? (
                <div className="text-center">
                  <p className="text-muted-foreground">Loading deliveries...</p>
                </div>
              ) : deliveries && deliveries.length > 0 ? (
                <div className="grid gap-6">
                  {deliveries.map((delivery) => (
                    <Card key={delivery.id.toString()} className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <Package className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle>Order #{delivery.id.toString()}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {delivery.parcelSize} parcel • ₹{(Number(delivery.price) / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(delivery.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h4 className="mb-2 text-sm font-semibold">Customer Details</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p><strong>Name:</strong> {delivery.customer.name}</p>
                              <p><strong>Contact:</strong> {delivery.customer.contactNumber}</p>
                              <p><strong>Address:</strong> {delivery.customer.address}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-2 text-sm font-semibold">Delivery Details</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <p><strong>Pickup:</strong> {delivery.customer.pickupLocation}</p>
                              <p><strong>Destination:</strong> {delivery.customer.destinationLocation}</p>
                              <p><strong>Distance:</strong> {delivery.distanceRange[0].toString()}-{delivery.distanceRange[1].toString()} km</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="flex-1">
                                Update Status
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Delivery Status</DialogTitle>
                                <DialogDescription>
                                  Change the status of order #{delivery.id.toString()}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label>New Status</Label>
                                  <Select
                                    value={newStatus}
                                    onValueChange={(value) => setNewStatus(value as OrderStatus)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                                      <SelectItem value={OrderStatus.picked}>Picked Up</SelectItem>
                                      <SelectItem value={OrderStatus.delivered}>Delivered</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button
                                  onClick={() => handleStatusUpdate(delivery.id)}
                                  disabled={updateStatus.isPending}
                                  className="w-full"
                                >
                                  {updateStatus.isPending ? 'Updating...' : 'Update Status'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={selectedOrderId === delivery.id} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="default"
                                className="flex-1"
                                onClick={() => setSelectedOrderId(delivery.id)}
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Proof
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Upload Delivery Proof</DialogTitle>
                                <DialogDescription>
                                  Upload a photo as proof of delivery for order #{delivery.id.toString()}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="proof-photo">Photo</Label>
                                  <Input
                                    id="proof-photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                                  />
                                </div>
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Uploading...</span>
                                      <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                      <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${uploadProgress}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                                <Button
                                  onClick={() => handleProofUpload(delivery.id)}
                                  disabled={!proofFile || uploadProof.isPending}
                                  className="w-full"
                                >
                                  {uploadProof.isPending ? 'Uploading...' : 'Upload Photo'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {delivery.deliveryProof && (
                          <div className="border-t pt-4">
                            <h4 className="mb-2 text-sm font-semibold">Delivery Proof</h4>
                            <img
                              src={delivery.deliveryProof.getDirectURL()}
                              alt="Delivery proof"
                              className="h-48 w-full rounded-lg object-cover"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
                  <CardContent className="py-12 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold">No Deliveries Assigned</h3>
                    <p className="text-sm text-muted-foreground">
                      You don't have any deliveries assigned yet. Check back later!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </div>
    </RiderGuard>
  );
}
