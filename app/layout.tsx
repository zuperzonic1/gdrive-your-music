import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDrive Your Music - Upload Music to Google Drive & Get Shareable Links",
  description: "Upload your music collection to Google Drive and get direct download links. Support for MP3, FLAC, WAV, M4A and more. Organize playlists, export XML, and access your music anywhere.",
  keywords: [
    "music upload",
    "Google Drive music",
    "cloud music storage",
    "shareable music links",
    "playlist management",
    "audio file upload",
  ],
  authors: [{ name: "GDrive Your Music" }],
  creator: "GDrive Your Music",
  metadataBase: new URL('https://gdriveyourmusic.com'),
  openGraph: {
    title: "GDrive Your Music - Upload Music to Google Drive",
    description: "Upload your music collection to Google Drive and get direct download links. Support for 9+ audio formats.",
    url: 'https://gdriveyourmusic.com',
    siteName: 'GDrive Your Music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDrive Your Music',
    description: 'Upload your music to Google Drive and get shareable direct download links.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "ZyddP3wDRIak7nFyL0MHsTflRZ0AQN6RjOZl_fczbic",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GDrive Your Music',
    applicationCategory: 'MultimediaApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Upload your music collection to Google Drive and get direct download links. Support for MP3, FLAC, WAV, M4A and more.',
    operatingSystem: 'Any',
    url: 'https://gdriveyourmusic.com',
    softwareVersion: '1.0',
    author: {
      '@type': 'Organization',
      name: 'GDrive Your Music',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
