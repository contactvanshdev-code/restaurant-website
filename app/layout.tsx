import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'EMBER & OAK | Wood-Fired Kitchen',
  description: 'Sensory-first dining experience with fire-kissed cuisine and high-end hospitality.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
