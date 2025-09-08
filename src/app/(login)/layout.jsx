import { Toaster } from '@/components/ui/sonner.tsx';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'CamporaCars',
  description: 'Taller de Latoneria y Pintura',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          {children} <Toaster richColors />
        </main>
      </body>
    </html>
  );
}
