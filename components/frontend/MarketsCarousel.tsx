"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HeroCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // full hero slide
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        keyBoardControl
        showDots
        transitionDuration={800}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="p-2"
      >
        {/* Example slides */}
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="/images/hero1.jpg"
            alt="Hero Slide 1"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="relative h-[400px] md:h-[600px]">
          <Image
            src="/images/hero2.jpg"
            alt="Hero Slide 2"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </Carousel>
    </div>
  );
}
