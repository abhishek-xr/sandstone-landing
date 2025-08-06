import type { Metadata } from 'next';
import { Crimson_Pro } from 'next/font/google';
import './globals.css';

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson-pro'
});

export const metadata: Metadata = {
  title: 'Sandstone - Coming Soon',
  description: 'Artisans of digital sand, shifting grains to lasting form.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.className} font-serif bg-black text-white`}>
        {children}
      </body>
    </html>
  );
} 