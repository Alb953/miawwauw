import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { AdoptionCta } from "@/components/pets/AdoptionCta";
import { PetGallery } from "@/components/pets/PetGallery";
import { PetInfoPanel } from "@/components/pets/PetInfoPanel";
import { apiClient } from "@/lib/api";

interface MascotaDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MascotaDetailPage({
  params,
}: MascotaDetailPageProps) {
  const { id } = await params;
  const pet = await apiClient.pets.detail(id);

  if (!pet) {
    return (
      <RoutePlaceholder
        title="Mascota no encontrada"
        description="No pudimos encontrar ese perfil. Puedes volver al catálogo y seguir explorando otras adopciones disponibles."
      />
    );
  }

  return (
    <main className="bg-soft-radial flex-1 pb-16">
      <section className="page-shell section-space grid gap-8 xl:grid-cols-[1fr_0.95fr]">
        <PetGallery pet={pet} />
        <PetInfoPanel pet={pet} />
      </section>

      <section className="page-shell grid gap-8 xl:grid-cols-[1fr_0.95fr]">
        <div />
        <AdoptionCta pet={pet} />
      </section>
    </main>
  );
}
