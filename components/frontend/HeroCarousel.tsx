"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Carousel from "nuka-carousel/lib/carousel";
type Banner = {
  id: string | number;
  title: string;
  imageUrl: string;
  link: string;
};

type HeroCarouselProps = {
  banners: Banner[];
};

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  const config = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };

  return (
    <Carousel
      defaultControlsConfig={config}
      autoplay
      wrapAround
      className="rounded-md overflow-hidden"
    >
      {banners.map((banner) => (
        <Link key={banner.id} href={banner.link}>
          <Image
            width={712}
            height={384}
            src={banner.imageUrl}
            className="w-full object-cover"
            alt={banner.title}
          />
        </Link>
      ))}
    </Carousel>
  );
}
