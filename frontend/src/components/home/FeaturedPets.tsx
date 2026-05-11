import Link from "next/link";
import { PetCard } from "@/components/pets/PetCard";
import type { PetSummary } from "@/lib/types";

interface FeaturedPetsProps {
  pets: PetSummary[];
}

export function FeaturedPets({ pets }: FeaturedPetsProps) {
  return (
    <section className="section-space">
      <div className="page-shell space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold text-[var(--color-text)]">
              Mascotas destacadas
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">
              Historias que merecen más visibilidad y una familia pronta.
            </p>
          </div>
          <Link
            href="/mascotas"
            className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
          >
            Ver todas
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
}
