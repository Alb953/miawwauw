import type { PetSummary } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface PetCardProps {
  pet: PetSummary;
}

function isImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}

function PetArtwork({ pet }: Pick<PetCardProps, "pet">) {
  const isDog = pet.species === "dog";

  return (
    <div
      className={cn(
        "relative flex h-52 items-end justify-center overflow-hidden rounded-[1.4rem] p-0",
        isDog
          ? "bg-[linear-gradient(180deg,#fff2e3_0%,#f7d4ab_100%)]"
          : "bg-[linear-gradient(180deg,#fff3ea_0%,#ffd8c9_100%)]",
      )}
    >
      {isImageUrl(pet.image) ? (
        <img
          src={pet.image}
          alt={`Foto de ${pet.name}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-x-6 top-5 h-24 rounded-full bg-white/45 blur-2xl" />
          <div className="absolute -bottom-8 h-28 w-40 rounded-full bg-white/55 blur-xl" />
          <div className="relative text-7xl drop-shadow-sm">{isDog ? "🐶" : "🐱"}</div>
        </>
      )}
    </div>
  );
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden p-3",
        pet.featured && "ring-1 ring-[var(--color-primary)]/20",
        pet.urgent && "shadow-[0_18px_40px_rgba(255,107,61,0.14)]",
      )}
    >
      <div className="relative">
        <PetArtwork pet={pet} />
        <div className="absolute left-3 top-3 flex gap-2">
          {pet.featured ? <Badge variant="primary">Destacado</Badge> : null}
          {pet.urgent ? <Badge variant="secondary">Urgente</Badge> : null}
        </div>
      </div>

      <div className="space-y-4 px-2 pb-2 pt-5">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-[var(--color-text)]">
            {pet.name}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            {pet.speciesLabel} · {pet.age} · {pet.location}
          </p>
        </div>

        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-[var(--color-muted)]">
          {pet.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--color-bg-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
            {pet.statusLabel}
          </span>
          <Button href={`/mascotas/${pet.id}`} size="sm">
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}
