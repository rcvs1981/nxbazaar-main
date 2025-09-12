"use client";

import React from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product"; // ✅ added back

export type ProductType = {
  id: string | number;
  title: string;
  slug: string;
  imageUrl: string;
  salePrice: number;
  [key: string]: any;
};

type CategoryCarouselProps = {
  products: ProductType[];
  isMarketPage?: boolean;
};

export default function CategoryCarousel({
  products,
  isMarketPage = false,
}: CategoryCarouselProps) {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isMarketPage ? 3 : 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: isMarketPage ? 2 : 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      swipeable
      draggable
      showDots
      responsive={responsive}
      ssr
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {products.map((product, i) => (
        <Product product={product} key={product.id ?? i} />
      ))}
    </Carousel>
  );
}
