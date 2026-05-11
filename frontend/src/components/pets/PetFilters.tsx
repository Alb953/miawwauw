import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  SIZE_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/constants";

interface PetFiltersProps {
  values: {
    species: string;
    age: string;
    gender: string;
    size: string;
    location: string;
    status: string;
    urgent: boolean;
  };
}

export function PetFilters({ values }: PetFiltersProps) {
  return (
    <form className="surface-card grid gap-4 rounded-[1.75rem] p-5 lg:grid-cols-3 xl:grid-cols-4">
      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Especie
        </span>
        <Select name="species" defaultValue={values.species} options={[...SPECIES_OPTIONS]} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Edad
        </span>
        <Select name="age" defaultValue={values.age} options={[...AGE_OPTIONS]} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Género
        </span>
        <Select name="gender" defaultValue={values.gender} options={[...GENDER_OPTIONS]} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Tamaño
        </span>
        <Select name="size" defaultValue={values.size} options={[...SIZE_OPTIONS]} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Ubicación
        </span>
        <Input
          name="location"
          defaultValue={values.location}
          placeholder="Todas las ubicaciones"
        />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Estado
        </span>
        <Select name="status" defaultValue={values.status} options={[...STATUS_OPTIONS]} />
      </label>

      <label className="flex items-center gap-3 rounded-[var(--radius-md)] border bg-[var(--color-bg-soft)] px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
        <input
          type="checkbox"
          name="urgent"
          value="true"
          defaultChecked={values.urgent}
          className="h-4 w-4 accent-[var(--color-secondary)]"
        />
        Mostrar solo casos urgentes
      </label>

      <div className="flex flex-col gap-3 sm:flex-row xl:col-span-1 xl:items-end">
        <Button type="submit" className="w-full sm:w-auto">
          Aplicar filtros
        </Button>
        <Button href="/mascotas" variant="ghost" className="w-full sm:w-auto">
          Limpiar filtros
        </Button>
      </div>
    </form>
  );
}
