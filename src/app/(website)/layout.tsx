import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import "../globals.css";
import LenisProvider from "../../components/LenisProvider";
import CustomCursor from "../../components/CustomCursor";
import FilmGrain from "../../components/FilmGrain";
import PremiumNav from "../../components/PremiumNav";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import GlobalScrollAnimations from "@/components/GlobalScrollAnimations";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";

const playfair = Bodoni_Moda({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "500", "600", "700", "800", "900"], style: ["normal", "italic"] });

export async function generateMetadata(): Promise<Metadata> {
  let globalSettings: any = null;
  try {
    globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`, {}, { cache: "no-store" });
  } catch (e) {
    console.warn("Metadata fetch failed:", e);
  }

  const faviconUrl = globalSettings?.favicon?.asset
    ? urlForImage(globalSettings.favicon).width(64).url()
    : "/favicon.png";

  return {
    title: globalSettings?.seoTitle || "MANA VIVAHAM | Premium Wedding Photography",
    description: globalSettings?.seoDescription || "A cinematic wedding photography experience.",
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let globalSettings: any = null;
  let footerSettings: any = null;
  try {
    globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`, {}, { cache: "no-store" });
    footerSettings = await client.fetch(`*[_type == "footerSettings"][0]`, {}, { cache: "no-store" });
  } catch (e) {
    console.warn("Layout fetch failed:", e);
  }

  return (
    <html lang="en">
      <body className={`${playfair.variable} antialiased`}>
        <PremiumNav data={globalSettings} footerData={footerSettings} />
        <FloatingWhatsApp data={footerSettings} />
        <FilmGrain />
        <CustomCursor />
        <LenisProvider>
          {children}
          <GlobalScrollAnimations />
        </LenisProvider>
      </body>
    </html>
  );
}
