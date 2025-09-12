"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { CarouselProps } from "nuka-carousel";

// ✅ Dynamic import with types
const Carousel = dynamic(
  () => import("nuka-carousel").then((mod) => mod.default),
  { ssr: false }
) as React.FC<CarouselProps>;

export type Banner = {
  id: string | number;
  title: string;
  image: string;
  link: string;
};

type HeroCarouselProps = {
  banners: Banner[];
};

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        autoplay
        wrapAround
        pauseOnHover
        defaultControlsConfig={{
          nextButtonText: "›",
          prevButtonText: "‹",
          pagingDotsStyle: { fill: "white" },
        }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority
              className="object-cover"
            />
            <Link
              href={banner.link}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-2xl md:text-4xl font-bold"
            >
              {banner.title}
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
