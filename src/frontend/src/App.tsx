import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import RateCardPage from './pages/RateCardPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import RiderPage from './pages/RiderPage';
import SiteLayout from './components/SiteLayout';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorksPage,
});

const rateCardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rate-card',
  component: RateCardPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

const riderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rider',
  component: RiderPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  howItWorksRoute,
  rateCardRoute,
  contactRoute,
  adminRoute,
  riderRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
