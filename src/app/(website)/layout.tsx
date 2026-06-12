import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "../globals.css";
import LenisProvider from "../../components/LenisProvider";

import PremiumNav from "../../components/PremiumNav";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import GlobalScrollAnimations from "@/components/GlobalScrollAnimations";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

const playfair = Bodoni_Moda({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700", "800", "900"], style: ["normal", "italic"] });
const modernSans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600", "700", "800", "900"], style: ["normal", "italic"] });

export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);
  return {
    title: globalSettings?.seoTitle || "MANA VIVAHAM | Premium Wedding Photography",
    description: globalSettings?.seoDescription || "A cinematic wedding photography experience.",
    icons: [
      { 
        rel: 'icon', 
        type: 'image/png', 
        url: globalSettings?.browserFavicon?.asset 
          ? `${urlForImage(globalSettings.browserFavicon).url()}?v=${Date.now()}` 
          : 'https://mana-vivaham.vercel.app/logo.png' 
      },
      { 
        rel: 'apple-touch-icon', 
        type: 'image/png', 
        url: globalSettings?.browserFavicon?.asset 
          ? `${urlForImage(globalSettings.browserFavicon).url()}?v=${Date.now()}` 
          : 'https://mana-vivaham.vercel.app/logo.png' 
      }
    ]
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${modernSans.variable} antialiased`}>
        <div style={{ fontFamily: 'var(--font-playfair), serif' }}>
          <PremiumNav data={globalSettings} />
          <FloatingWhatsApp />
          <LenisProvider>
            {children}
            <GlobalScrollAnimations />
          </LenisProvider>
        </div>
      </body>
    </html>
  );
}
