import HeroCarousel, { Banner } from "./HeroCarousel";
import { getData } from "@/lib/getData";

export default async function Hero() {
  const banners: Banner[] = await getData("banners");

  return (
    <div className="grid grid-cols-12 gap-8 mb-6 ">
      {/* ... */}
      <div className="col-span-full sm:col-span-7 bg-blue-600 rounded-md">
        <HeroCarousel banners={banners} />
      </div>
      {/* ... */}
    </div>
  );
}
