"use client";

import React from "react";
import dynamic from "next/dynamic";

// Proper dynamic import
const Carousel = dynamic(
  () => import("nuka-carousel").then((mod) => mod.default),
  { ssr: false }
);

interface Banner {
  image: string;
  alt: string;
}

interface HeroCarouselProps {
  banners: Banner[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <Carousel
        autoplay
        wrapAround
        autoplayInterval={3000}
        slidesToShow={1}
      >
        {banners.map((banner, idx) => (
          <img
            key={idx}
            src={banner.image}
            alt={banner.alt}
            className="w-full h-auto object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
