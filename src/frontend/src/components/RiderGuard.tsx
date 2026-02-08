import { type ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginButton from './LoginButton';

interface RiderGuardProps {
  children: ReactNode;
}

export default function RiderGuard({ children }: RiderGuardProps) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center px-4 py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="max-w-md space-y-6 text-center">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Required</AlertTitle>
            <AlertDescription>
              Please login to access the Rider Portal and view your assigned deliveries.
            </AlertDescription>
          </Alert>
          <LoginButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
