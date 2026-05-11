import { FeaturedPets } from "@/components/home/FeaturedPets";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SearchPanel } from "@/components/home/SearchPanel";
import { SupportCard } from "@/components/home/SupportCard";
import { UrgentCases } from "@/components/home/UrgentCases";
import { apiClient } from "@/lib/api";

export default async function Home() {
  const allPets = await apiClient.pets.list();
  const mascotasDestacadas = allPets.filter((pet) => pet.featured).slice(0, 4);
  const casosUrgentes = allPets.filter((pet) => pet.urgent).slice(0, 2);

  return (
    <main className="flex-1 bg-white pb-16">
      <Hero />
      <div className="page-shell relative z-20 -mt-18 sm:-mt-20 lg:-mt-22">
        <SearchPanel />
      </div>
      <FeaturedPets pets={mascotasDestacadas} />
      <section className="pb-16">
        <div className="page-shell grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
          <UrgentCases pets={casosUrgentes} />
          <aside className="space-y-8 xl:pt-24">
            <HowItWorks />
            <SupportCard />
          </aside>
        </div>
      </section>
    </main>
  );
}
