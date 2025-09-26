// components/frontend/Hero.tsx
import React from "react";
import HeroCarousel from "./HeroCarousel";

interface Banner {
  image: string;
  alt: string;
}

interface HeroProps {
  banners: Banner[];
}

const Hero: React.FC<HeroProps> = ({ banners }) => {
  return (
    <section className="relative w-full">
      <HeroCarousel banners={banners} />
      {/* Add any additional hero content */}
    </section>
  );
};

export default Hero;
