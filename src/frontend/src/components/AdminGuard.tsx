import { type ReactNode } from 'react';
import { useGetCallerUserRole } from '../hooks/useQueries';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { data: role, isLoading } = useGetCallerUserRole();

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center px-4 py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (role !== 'admin') {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div className="max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access this page. Only administrators can manage site content.
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center">
            <Button asChild>
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
