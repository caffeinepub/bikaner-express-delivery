import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useGetAllOrders, 
  useCreateOrder, 
  useUpdateOrderStatus, 
  useAssignRider,
  useUploadDeliveryProof,
  useRemoveOrder 
} from '../../hooks/useQueries';
import { OrderStatus, ExternalBlob } from '../../backend';

export default function AdminOrdersPanel() {
  const { data: orders, isLoading } = useGetAllOrders();
  const createOrder = useCreateOrder();
  const updateStatus = useUpdateOrderStatus();
  const assignRider = useAssignRider();
  const uploadProof = useUploadDeliveryProof();
  const removeOrder = useRemoveOrder();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    contactNumber: '',
    address: '',
    pickupLocation: '',
    destinationLocation: '',
    parcelSize: 'small',
    minDistance: '',
    maxDistance: '',
    price: '',
  });

  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<bigint | null>(null);
  const [riderName, setRiderName] = useState('');
  const [riderContact, setRiderContact] = useState('');

  const [proofDialogOpen, setProofDialogOpen] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCreateOrder = async () => {
    try {
      await createOrder.mutateAsync({
        customer: {
          name: newOrder.customerName,
          contactNumber: newOrder.contactNumber,
          address: newOrder.address,
          pickupLocation: newOrder.pickupLocation,
          destinationLocation: newOrder.destinationLocation,
        },
        parcelSize: newOrder.parcelSize,
        distanceRange: [BigInt(newOrder.minDistance), BigInt(newOrder.maxDistance)],
        price: BigInt(newOrder.price),
      });
      toast.success('Order created successfully!');
      setNewOrder({
        customerName: '',
        contactNumber: '',
        address: '',
        pickupLocation: '',
        destinationLocation: '',
        parcelSize: 'small',
        minDistance: '',
        maxDistance: '',
        price: '',
      });
      setCreateDialogOpen(false);
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  const handleStatusUpdate = async (orderId: bigint, newStatus: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, newStatus });
      toast.success('Order status updated!');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAssignRider = async () => {
    if (!selectedOrderId) return;
    
    try {
      await assignRider.mutateAsync({
        orderId: selectedOrderId,
        riderName,
        riderContact,
      });
      toast.success('Rider assigned successfully!');
      setAssignDialogOpen(false);
      setRiderName('');
      setRiderContact('');
      setSelectedOrderId(null);
    } catch (error) {
      toast.error('Failed to assign rider');
    }
  };

  const handleProofUpload = async () => {
    if (!selectedOrderId || !proofFile) return;

    try {
      const arrayBuffer = await proofFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await uploadProof.mutateAsync({
        orderId: selectedOrderId,
        proofPhoto: blob,
      });
      
      toast.success('Proof photo uploaded!');
      setProofFile(null);
      setUploadProgress(0);
      setProofDialogOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      toast.error('Failed to upload proof');
      setUploadProgress(0);
    }
  };

  const handleRemoveOrder = async (orderId: bigint) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await removeOrder.mutateAsync(orderId);
      toast.success('Order deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const variants = {
      [OrderStatus.pending]: 'secondary',
      [OrderStatus.picked]: 'default',
      [OrderStatus.delivered]: 'default',
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Order Management</CardTitle>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>Enter customer and delivery details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input
                      value={newOrder.customerName}
                      onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Number</Label>
                    <Input
                      value={newOrder.contactNumber}
                      onChange={(e) => setNewOrder({ ...newOrder, contactNumber: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Pickup Location</Label>
                    <Input
                      value={newOrder.pickupLocation}
                      onChange={(e) => setNewOrder({ ...newOrder, pickupLocation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input
                      value={newOrder.destinationLocation}
                      onChange={(e) => setNewOrder({ ...newOrder, destinationLocation: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Parcel Size</Label>
                    <Select
                      value={newOrder.parcelSize}
                      onValueChange={(value) => setNewOrder({ ...newOrder, parcelSize: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Price (paise)</Label>
                    <Input
                      type="number"
                      value={newOrder.price}
                      onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Min Distance (km)</Label>
                    <Input
                      type="number"
                      value={newOrder.minDistance}
                      onChange={(e) => setNewOrder({ ...newOrder, minDistance: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Distance (km)</Label>
                    <Input
                      type="number"
                      value={newOrder.maxDistance}
                      onChange={(e) => setNewOrder({ ...newOrder, maxDistance: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateOrder} disabled={createOrder.isPending} className="w-full">
                  {createOrder.isPending ? 'Creating...' : 'Create Order'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Loading orders...</p>
        ) : orders && orders.length > 0 ? (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rider</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id.toString()}>
                    <TableCell>#{order.id.toString()}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-muted-foreground">{order.customer.contactNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.riderAssignment || 'Not assigned'}</TableCell>
                    <TableCell>₹{(Number(order.price) / 100).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={OrderStatus.pending}>Pending</SelectItem>
                            <SelectItem value={OrderStatus.picked}>Picked</SelectItem>
                            <SelectItem value={OrderStatus.delivered}>Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            setAssignDialogOpen(true);
                          }}
                        >
                          Assign
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrderId(order.id);
                            setProofDialogOpen(true);
                          }}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        {order.deliveryProof && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(order.deliveryProof!.getDirectURL(), '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOrder(order.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No orders yet</p>
        )}

        {/* Assign Rider Dialog */}
        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Rider</DialogTitle>
              <DialogDescription>Assign a rider to this order</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rider Name</Label>
                <Input
                  value={riderName}
                  onChange={(e) => setRiderName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Rider Contact</Label>
                <Input
                  value={riderContact}
                  onChange={(e) => setRiderContact(e.target.value)}
                />
              </div>
              <Button onClick={handleAssignRider} disabled={assignRider.isPending} className="w-full">
                {assignRider.isPending ? 'Assigning...' : 'Assign Rider'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upload Proof Dialog */}
        <Dialog open={proofDialogOpen} onOpenChange={setProofDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Delivery Proof</DialogTitle>
              <DialogDescription>Upload a photo as proof of delivery</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Photo</Label>
                <Input
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
              <Button onClick={handleProofUpload} disabled={!proofFile || uploadProof.isPending} className="w-full">
                {uploadProof.isPending ? 'Uploading...' : 'Upload Photo'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
