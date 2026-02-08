import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bike } from 'lucide-react';
import { useApplyAsRider } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function RiderApplicationSection() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    hasBike: 'yes',
    area: '',
  });

  const applyMutation = useApplyAsRider();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.area) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      await applyMutation.mutateAsync({
        name: formData.name,
        mobile: formData.mobile,
        hasBike: formData.hasBike === 'yes',
        area: formData.area,
      });
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({ name: '', mobile: '', hasBike: 'yes', area: '' });
      setOpen(false);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="container px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Bike className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-4 text-3xl font-bold">Join as a Rider</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Become part of Bikaner's fastest delivery network. Flexible hours, good earnings, and be your own boss.
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="hover-scale">
              Apply as Rider
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Rider Application</DialogTitle>
              <DialogDescription>
                Fill in your details to apply as a delivery rider. We'll contact you soon.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Your area in Bikaner"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Do you have a bike? *</Label>
                <RadioGroup
                  value={formData.hasBike}
                  onValueChange={(value) => setFormData({ ...formData, hasBike: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-normal">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={applyMutation.isPending}>
                {applyMutation.isPending ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
