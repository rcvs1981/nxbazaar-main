// app/page.tsx
import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";

interface Category {
  id: string;
  title: string;
  products?: any[];
  [key: string]: any;
}

interface Banner {
  image: string;
  alt: string;
}

export default async function Home() {
  // Fetch categories
  const categoriesResponse = await getData("categories");
  const categoriesData: Category[] = Array.isArray(categoriesResponse)
    ? categoriesResponse
    : categoriesResponse?.data || [];

  // Filter categories with more than 3 products safely
  const categories = categoriesData.filter(
    (category) => Array.isArray(category.products) && category.products.length > 3
  );

  // Fetch banners safely
  const bannersResponse = await getData("banners");
  const banners: Banner[] = Array.isArray(bannersResponse)
    ? bannersResponse
    : bannersResponse?.data || [];

  // Fetch trainings safely
  const trainingsResponse = await getData("trainings");
  const trainings = Array.isArray(trainingsResponse)
    ? trainingsResponse
    : trainingsResponse?.data || [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero banners={banners} />

      {/* Market List */}
      <MarketList />

      {/* Category List */}
      {categories.map((category, i) => (
        <section className="py-8" key={category.id || i}>
          <CategoryList isMarketPage={false} category={category} />
        </section>
      ))}

      {/* Community Trainings */}
      <CommunityTrainings
        title="Featured Trainings"
        trainings={trainings.slice(0, 3)}
      />
    </main>
  );
}
