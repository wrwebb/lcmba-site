import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://lcmba.org'),
  title: 'Larkspur Corte Madera Bicycle Alliance',
  description: 'A volunteer group of parents, riders and neighbors working to make Larkspur and Corte Madera better places to ride.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://lcmba.org',
    siteName: 'Larkspur Corte Madera Bicycle Alliance',
    title: 'Larkspur Corte Madera Bicycle Alliance',
    description: 'A volunteer group of parents, riders and neighbors working to make Larkspur and Corte Madera better places to ride.',
    images: [{ url: '/hero-larkspur-path.jpg', alt: 'The Larkspur bike path leading toward Mount Tamalpais' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Larkspur Corte Madera Bicycle Alliance',
    description: 'A volunteer group of parents, riders and neighbors working to make Larkspur and Corte Madera better places to ride.',
    images: ['/hero-larkspur-path.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Larkspur Corte Madera Bicycle Alliance',
    url: 'https://lcmba.org',
    areaServed: ['Larkspur, California', 'Corte Madera, California'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
