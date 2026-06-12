import RoyalHeroReveal from "../../components/RoyalHeroReveal";
import MorphSequence from "../../components/MorphSequence";
import MountainTerrainDivider from "../../components/MountainTerrainDivider";
import PremiumStickySlides from "../../components/PremiumStickySlides";
import CapturedServices from "../../components/CapturedServices";
import CinematicDifference from "../../components/CinematicDifference";
import InfiniteColumnGallery from "../../components/InfiniteColumnGallery";
import SelectedWorks from "../../components/SelectedWorks";
import CinematicSlideshow from "../../components/CinematicSlideshow";
import Footer from "../../components/Footer";
import ModernTradition from "../../components/ModernTradition";
import IndianWeddingBorder from "../../components/IndianWeddingBorder";
import CinematicStorytelling from "../../components/CinematicStorytelling";
import CinematicAperture from "../../components/CinematicAperture";
import MotionScrollGrid from "../../components/MotionScrollGrid";
import Testimonials from "../../components/Testimonials";
import EditorialJournal from "../../components/EditorialJournal";

import { client } from "@/sanity/lib/client";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  noStore();
  const query = `{
    "homePage": *[_type == "homePage"][0] {
      ...,
      "morphSequence": morphSequence[].asset->url,
      mountainDivider
    },
    "heroSection": *[_type == "heroSection"][0],
    "portfolioGalleries": *[_type == "portfolioGallery"] | order(featured desc, _createdAt desc),
    "cinematicStory": *[_type == "cinematicStorytelling"][0],
    "testimonialsList": *[_type == "testimonial"],
    "footerSettings": *[_type == "footerSettings"][0],
    "globalSettings": *[_type == "globalSettings"][0],
    "blogPosts": *[_type == "blogPost"] | order(publishedAt desc)[0...3]
  }`;

  let data: any = {};
  try {
    const rawData = await client.fetch(query) || {};
    const homePage = rawData.homePage || {};

    // Merge standalone collections with homePage fields
    data = {
      ...homePage,
      hero: rawData.heroSection?.title ? rawData.heroSection : homePage.hero,
      // Prefer the homepage-managed cinematicStorytelling block (contains heroHeading/heroImage/etc).
      // Fallback to standalone document only if homepage block is missing.
      cinematicStorytelling: homePage.cinematicStorytelling || rawData.cinematicStory,
      testimonials: (rawData.testimonialsList?.length) ? rawData.testimonialsList : homePage.testimonials,
      footer: rawData.footerSettings?.email ? rawData.footerSettings : homePage.footer,
      globalSettings: rawData.globalSettings || {},
      portfolioGalleries: rawData.portfolioGalleries || [],
      blogPosts: rawData.blogPosts || []
    };
  } catch (error) {
    console.warn("Sanity fetch failed (likely not configured yet), falling back to hardcoded data:", error);
  }

  return (
    <main className="relative w-full bg-lumus-beige min-h-screen text-lumus-dark">

      <div id="morph-wrapper" className="bg-lumus-beige">
        <MorphSequence frames={data.morphSequence} />
      </div>

      {/* Hero Bottom Separator */}
      <div className="w-full bg-[#E8E1D3] -mt-1 relative z-20">
        <IndianWeddingBorder type="zari" color="both" parallax={true} opacity={0.9} />
      </div>

      <div id="modern-tradition-wrapper" className="bg-[#E8E1D3]">
        <ModernTradition data={data.aboutSection || data.modernTradition} />
      </div>

      {/* Mid-Page Royal Reveal Section */}
      <div id="royal-hero-reveal-wrapper" className="bg-[#F5EBDD]">
        <RoyalHeroReveal data={data.hero} />
      </div>

      <div id="selected-works-wrapper" className="bg-white">
        <SelectedWorks
          works={data.selectedWorks}
          title={data.selectedWorksTitle}
          description={data.selectedWorksDescription}
        />
      </div>



      {/* SelectedWorks Bottom Divider (leads into Dark Section) */}
      <div className="w-full bg-[#E8E1D3] -mt-1 relative z-20">
        <IndianWeddingBorder type="temple" color="both" flip={true} parallax={true} opacity={0.9} />
      </div>

      <div id="premium-slides-wrapper" className="bg-black">
        <PremiumStickySlides slides={data.premiumSlides} />
      </div>

      {/* Divider between dark sticky slides and captured services */}
      <div className="w-full bg-black relative z-20">
        <IndianWeddingBorder type="mandala" color="gold" parallax={true} opacity={0.5} />
      </div>

      <div id="services-wrapper" className="bg-[#050505]">
        <CapturedServices data={data.capturedServices} />
      </div>

      {/* Divider between captured services and cinematic difference */}
      <div className="w-full bg-[#050505] relative z-20">
        <IndianWeddingBorder type="paisley" color="gold" flip={true} parallax={true} opacity={0.5} />
      </div>

      <div id="cinematic-difference-wrapper" className="bg-[#FAF8F5]">
        <CinematicDifference data={data.cinematicDifference} />
      </div>

      <div id="motion-scroll-grid-wrapper" className="bg-[#FAF8F5]">
        <MotionScrollGrid data={data.visualPoetry} />
      </div>

      {/* Divider leading out of dark cinematic difference to beige storytelling section */}
      <div className="w-full bg-[#E7DFC8] relative z-20">
        <IndianWeddingBorder type="zari" color="both" parallax={true} opacity={0.7} />
      </div>

      <div id="cinematic-storytelling-wrapper" className="bg-[#E7DFC8]">
        <CinematicStorytelling data={data.cinematicStorytelling} />
      </div>

      <div id="testimonials-wrapper">
        <Testimonials testimonials={data.testimonials} />
      </div>

      <div id="cinematic-aperture-wrapper" className="bg-[#F5EBDD]">
        <CinematicAperture data={data.cinematicAperture} />
      </div>

      {/* Divider leading out of warm ivory/beige aperture section */}
      <div className="w-full bg-lumus-beige relative z-20">
        <IndianWeddingBorder type="paisley" color="both" flip={true} parallax={true} opacity={0.7} />
      </div>

      <div id="divider-wrapper" className="my-20 md:my-40 bg-lumus-beige">
        <MountainTerrainDivider
          height="600px"
          showFlowers={data.mountainDivider?.showFlowers ?? true}
          showText={data.mountainDivider?.showText ?? true}
          opacity={0.8}
          data={data.mountainDivider}
        />
      </div>

      <div id="infinite-column-gallery-wrapper" className="bg-black">
        <InfiniteColumnGallery images={data.infiniteGalleryImages} />
      </div>

      <div id="editorial-journal-wrapper">
        <EditorialJournal data={data.blogSettings} posts={data.blogPosts} />
      </div>

      <div id="cinematic-slideshow-wrapper" className="bg-black">
        <CinematicSlideshow slides={data.cinematicSlideshow} />
      </div>

      <Footer data={data.footer} />
    </main>
  );
}
