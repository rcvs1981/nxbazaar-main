// declarations.d.ts
declare module "nuka-carousel/lib/carousel" {
  import * as React from "react";

  export interface CarouselProps {
    autoplay?: boolean;
    wrapAround?: boolean;
    defaultControlsConfig?: Record<string, any>;
    className?: string;
    children?: React.ReactNode;
  }

  export default class Carousel extends React.Component<CarouselProps> {}
}
