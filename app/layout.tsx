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
  metadataBase: new URL('https://pricelist-neo-brutalism.vercel.app'),
  title: "מחירון פיתוח דיגיטלי | בניית אתרים ומערכות",
  description: "מחירון שירותי פיתוח אתרים, דפי נחיתה, מערכות WEB ואפליקציות. מחירים שקופים, עיצוב מודרני ומקצועיות ללא פשרות.",
  openGraph: {
    title: "מחירון פיתוח דיגיטלי | בניית אתרים ומערכות",
    description: "מחירון שירותי פיתוח אתרים, דפי נחיתה, מערכות WEB ואפליקציות. מחירים שקופים, עיצוב מודרני ומקצועיות ללא פשרות.",
    type: "website",
    locale: "he_IL",
    siteName: "מחירון פיתוח דיגיטלי",
    images: [
      {
        url: '/opengraph-image.png', // We need to create this or use an existing image
        width: 1200,
        height: 630,
        alt: 'מחירון פיתוח דיגיטלי',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "מחירון פיתוח דיגיטלי | בניית אתרים ומערכות",
    description: "מחירון שירותי פיתוח אתרים, דפי נחיתה, מערכות WEB ואפליקציות.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
