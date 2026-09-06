"use client";

import CanvasScroll from "@/components/CanvasScroll";
import AboutStory from "@/components/AboutStory";
import ContactTeaser from "@/components/ContactTeaser";
import CreatorForm from "@/components/CreatorForm";
import HeroHeadlineReveal from "@/components/HeroHeadlineReveal";
import PersonalBranding from "@/components/PersonalBranding";
import ServicesIndustries from "@/components/ServicesIndustries";
import StickyPortfolio from "@/components/StickyPortfolio";
import { getAssetUrl } from "@/lib/assets";

export default function Home() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src={getAssetUrl(
              "hero.mp4",
              "/videos/144-89th-st-wolstenhome-associates.mp4",
            )}
            type="video/mp4"
          />
        </video>
      </section>

      <HeroHeadlineReveal />

      {/* Cinematic Apple Scroll Component */}
      <CanvasScroll />

      <StickyPortfolio />

      <ServicesIndustries />

      <PersonalBranding />

      <AboutStory />

      <ContactTeaser />

      <CreatorForm />
    </>
  );
}