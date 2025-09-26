"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Carousel, {
  CarouselSlideRenderControlProps,
  CarouselRenderControl
} from "nuka-carousel";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
}

interface HeroCarouselProps {
  banners: Banner[];
}

export default function HeroCarousel({ banners }: HeroCarouselProps) {
  return (
    <Carousel
      autoplay
      wrapAround
      speed={500}
      className="rounded-xl overflow-hidden shadow-md"
      renderCenterLeftControls={(
        props: CarouselSlideRenderControlProps
      ) => (
        <button
          onClick={props.previousSlide}
          className="p-2 m-2 bg-white/80 rounded-full shadow hover:bg-white"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
      )}
      renderCenterRightControls={(
        props: CarouselSlideRenderControlProps
      ) => (
        <button
          onClick={props.nextSlide}
          className="p-2 m-2 bg-white/80 rounded-full shadow hover:bg-white"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      )}
      renderBottomCenterControls={(
        props: CarouselSlideRenderControlProps
      ) => (
        <div className="flex justify-center gap-2 pb-3">
          {/*
            props.pagingDots is a ReactNode[],
            props.currentSlide, props.goToSlide are available
          */}
          {props.pagingDots.map((_, index) => (
            <button
              key={index}
              onClick={() => props.goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                props.currentSlide === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    >
      {banners.map((banner) => (
        <Link key={banner.id} href={banner.link}>
          <Image
            width={1200}
            height={500}
            src={banner.imageUrl}
            alt={banner.title}
            className="w-full h-[400px] object-cover"
          />
        </Link>
      ))}
    </Carousel>
  );
}
