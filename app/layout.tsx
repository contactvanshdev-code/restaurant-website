import type { Metadata } from 'next';
import { Bebas_Neue, Bodoni_Moda, Sora } from 'next/font/google';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display'
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-body'
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: '400'
});

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
      <body className={`${bodoni.variable} ${sora.variable} ${bebas.variable}`}>{children}</body>
    </html>
  );
}
