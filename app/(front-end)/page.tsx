// app/page.tsx
import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";
//import { authOptions } from "@/lib/authOptions";
//import { getServerSession } from "next-auth";

export default async function Home() {
  // Fetch categories
const categoriesData = await getData("categories");
 const{banners} = await getData("banners");
const categories = categoriesData.filter(
(category: any) => category.products?.length > 3
);
  // Fetch trainings
  const trainings = await getData("trainings");

  // If you need session data (uncomment if required)
  // const session = await getServerSession(authOptions);
  // console.log(session?.user);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero banners={banners} />

      {/* Market List */}
      <MarketList />

      {/* Category List */}
      {categories.map((category: any, i: number) => (
        <section className="py-8" key={i}>
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
