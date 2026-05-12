import { EmptyState } from "@/components/ui/EmptyState";
import { PetCard } from "@/components/pets/PetCard";
import { PetFilters } from "@/components/pets/PetFilters";
import { apiClient } from "@/lib/api";
import type { PetSummary } from "@/lib/types";

interface MascotasPageProps {
  searchParams?: Promise<{
    species?: string;
    age?: string;
    gender?: string;
    size?: string;
    location?: string;
    status?: string;
    urgent?: string;
  }>;
}

function scorePet(pet: PetSummary) {
  return Number(pet.featured) * 2 + Number(pet.urgent);
}

export default async function MascotasPage({
  searchParams,
}: MascotasPageProps) {
  const params = (await searchParams) ?? {};

  const filters = {
    species: params.species ?? "all",
    age: params.age ?? "all",
    gender: params.gender ?? "all",
    size: params.size ?? "all",
    location: params.location ?? "",
    status: params.status ?? "all",
    urgent: params.urgent === "true",
  };

  let filteredPets: PetSummary[] = [];

  try {
    filteredPets = (
      await apiClient.pets.list({
        species: filters.species === "all" ? undefined : filters.species,
        age: filters.age === "all" ? undefined : filters.age,
        gender: filters.gender === "all" ? undefined : filters.gender,
        size: filters.size === "all" ? undefined : filters.size,
        location: filters.location || undefined,
        status: filters.status === "all" ? undefined : filters.status,
        urgent: filters.urgent || undefined,
      })
    ).sort((a, b) => scorePet(b) - scorePet(a));
  } catch (error) {
    console.error("No pudimos cargar el catalogo publico de mascotas.", error);
  }

  return (
    <main className="bg-soft-radial flex-1 pb-16">
      <section className="page-shell pt-10">
        <div className="grid gap-8 rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(35,17,31,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]">
              Catalogo publico
            </span>
            <h1 className="text-5xl leading-none font-semibold text-[var(--color-text)]">
              Mascotas en adopcion
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[var(--color-muted)]">
              Explora perritos y gatitos disponibles, filtra por tus preferencias y encuentra una
              companera ideal para tu hogar.
            </p>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] bg-[var(--color-bg-soft)] p-5 sm:grid-cols-3">
            <div className="rounded-[1.4rem] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Mascotas visibles
              </p>
              <p className="mt-2 text-4xl font-semibold text-[var(--color-text)]">
                {filteredPets.length}
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Casos urgentes
              </p>
              <p className="mt-2 text-4xl font-semibold text-[var(--color-text)]">
                {filteredPets.filter((pet) => pet.urgent).length}
              </p>
            </div>
            <div className="rounded-[1.4rem] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-[var(--color-muted)]">
                Destacados
              </p>
              <p className="mt-2 text-4xl font-semibold text-[var(--color-text)]">
                {filteredPets.filter((pet) => pet.featured).length}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell section-space space-y-8">
        <PetFilters values={filters} />

        {filteredPets.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No encontramos mascotas con esos filtros"
            description="Prueba con otra ubicacion, cambia el estado o limpia los filtros para ver mas opciones."
            actionLabel="Ver todas las mascotas"
            actionHref="/mascotas"
          />
        )}
      </section>
    </main>
  );
}
