// types/nuka-carousel.d.ts
declare module "nuka-carousel" {
  import * as React from "react";

  export interface CarouselControlsConfig {
    nextButtonText?: string;
    prevButtonText?: string;
    pagingDotsStyle?: React.CSSProperties;
    [key: string]: any;
  }

  export interface CarouselProps {
    autoplay?: boolean;
    wrapAround?: boolean;
    pauseOnHover?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    defaultControlsConfig?: CarouselControlsConfig;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
  }

  const Carousel: React.FC<CarouselProps>;
  export default Carousel;
}
