import Link from "next/link";

import type { PetSummary } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface UrgentCasesProps {
  pets: PetSummary[];
}

function isImageUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
}

function UrgentCaseItem({ pet }: { pet: PetSummary }) {
  return (
    <Card className="grid gap-0 overflow-hidden p-0 md:grid-cols-[220px_1fr]">
      <div className="flex min-h-56 items-end justify-center bg-[linear-gradient(180deg,#fff4ea_0%,#ffd8c6_100%)] p-0">
        {isImageUrl(pet.image) ? (
          <img
            src={pet.image}
            alt={`Foto de ${pet.name}`}
            className="h-full min-h-56 w-full object-cover"
          />
        ) : (
          <div className="flex min-h-56 w-full items-end justify-center p-5">
            <div className="text-8xl">{pet.species === "dog" ? "🐶" : "🐱"}</div>
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Urgente</Badge>
          <Badge variant="neutral">{pet.statusLabel}</Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-semibold text-[var(--color-text)]">
            {pet.name}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            {pet.speciesLabel} · {pet.age} · {pet.genderLabel} · {pet.location}
          </p>
        </div>

        <p className="text-sm leading-7 text-[var(--color-muted)]">
          {pet.description}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-[var(--color-secondary)]">
            Necesita hogar pronto
          </p>
          <Button href={`/mascotas/${pet.id}`} size="sm">
            Ver detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function UrgentCases({ pets }: UrgentCasesProps) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-semibold text-[var(--color-text)]">
            Casos urgentes
          </h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Mascotas que necesitan visibilidad inmediata y un hogar pronto.
          </p>
        </div>
        <Link
          href="/mascotas"
          className="text-sm font-semibold text-[var(--color-secondary)] hover:text-[var(--color-secondary-dark)]"
        >
          Ver casos urgentes
        </Link>
      </div>

      <div className="space-y-6">
        {pets.map((pet) => (
          <UrgentCaseItem key={pet.id} pet={pet} />
        ))}
      </div>
    </section>
  );
}
