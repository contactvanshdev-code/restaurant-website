import type { Metadata } from 'next';
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
      <body>{children}</body>
    </html>
  );
}
