import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Foodly | Restaurant App',
  description: 'Pesan makanan favoritmu dengan mudah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body 
        className={`${nunito.variable} ${nunito.className} antialiased`} 
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}