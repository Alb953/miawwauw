import type { PetDetail } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PetInfoPanelProps {
  pet: PetDetail;
}

function HealthChip({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div className="rounded-[1.2rem] bg-[var(--color-bg-soft)] px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">
        {value ? "Sí" : "No"}
      </p>
    </div>
  );
}

export function PetInfoPanel({ pet }: PetInfoPanelProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {pet.featured ? <Badge variant="primary">Destacado</Badge> : null}
          {pet.urgent ? <Badge variant="secondary">Urgente</Badge> : null}
          <Badge variant="neutral">{pet.statusLabel}</Badge>
        </div>

        <div>
          <h1 className="text-5xl leading-none font-semibold text-[var(--color-text)]">
            {pet.name}
          </h1>
          <p className="mt-3 text-lg text-[var(--color-muted)]">
            {pet.speciesLabel} · {pet.age} · {pet.genderLabel} · {pet.sizeLabel} ·{" "}
            {pet.location}
          </p>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          {pet.description}
        </p>
      </div>

      <Card className="space-y-5">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Información de salud
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            Datos importantes para adoptar con claridad y confianza.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <HealthChip label="Vacunado" value={pet.health.vaccinated} />
          <HealthChip label="Esterilizado" value={pet.health.sterilized} />
          <HealthChip label="Desparasitado" value={pet.health.dewormed} />
        </div>

        <div className="rounded-[1.2rem] border bg-[var(--color-bg-soft)] px-4 py-4">
          <p className="text-sm leading-7 text-[var(--color-muted)]">
            {pet.health.medicalNotes}
          </p>
        </div>
      </Card>

      <Card className="space-y-5">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Personalidad
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {pet.personality.map((trait) => (
            <span
              key={trait}
              className="rounded-full bg-[var(--color-primary-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)]"
            >
              {trait}
            </span>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Su historia
        </h2>
        <p className="text-sm leading-8 text-[var(--color-muted)]">{pet.story}</p>
      </Card>

      <Card className="space-y-4">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Requisitos de adopción
        </h2>
        <ul className="space-y-3 text-sm leading-7 text-[var(--color-muted)]">
          {pet.requirements.map((requirement) => (
            <li key={requirement} className="flex gap-3">
              <span className="mt-1 text-[var(--color-primary)]">•</span>
              <span>{requirement}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
