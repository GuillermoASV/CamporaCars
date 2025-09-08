import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';

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

export default function Layout({ children }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
