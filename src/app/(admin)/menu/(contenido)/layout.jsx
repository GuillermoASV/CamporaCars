import AppSidebar from '@/app/hooks/useSideNav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner.tsx';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import '@/app/globals.css';

export const metadata = {
  title: 'CamporaCars',
  description: 'Taller de Latoneria y Pintura',
};

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="not-first: flex w-full">
        <div className="relative flex-grow">
          <NuqsAdapter>{children}</NuqsAdapter> <Toaster richColors />
          <SidebarTrigger
            variant="ghost"
            className={
              'absolute top-0 left-0 cursor-pointer rounded-none rounded-tr-full rounded-br-full bg-white/50 pr-1 backdrop-blur-2xl'
            }
          />
        </div>{' '}
      </main>
    </SidebarProvider>
  );
}
