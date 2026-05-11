import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const ageOptions = [
  { value: "all", label: "Todas las edades" },
  { value: "cachorro", label: "Cachorro" },
  { value: "joven", label: "Joven" },
  { value: "adulto", label: "Adulto" },
];

const speciesOptions = [
  { value: "all", label: "Todas las especies" },
  { value: "dog", label: "Perrito" },
  { value: "cat", label: "Gatito" },
];

export function SearchPanel() {
  return (
    <div className="surface-card relative z-20 mx-auto grid w-full max-w-5xl gap-4 rounded-[1.6rem] p-4 shadow-[0_24px_70px_rgba(35,17,31,0.12)] sm:p-5 lg:grid-cols-[1fr_1fr_1fr_auto]">
      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Especie
        </span>
        <Select aria-label="Especie" defaultValue="all" options={speciesOptions} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Edad
        </span>
        <Select aria-label="Edad" defaultValue="all" options={ageOptions} />
      </label>

      <label className="space-y-2">
        <span className="block text-sm font-semibold text-[var(--color-text)]">
          Ubicación
        </span>
        <Input aria-label="Ubicación" placeholder="Todas las ubicaciones" />
      </label>

      <div className="flex items-end">
        <Button href="/mascotas" size="lg" className="w-full">
          Buscar
        </Button>
      </div>
    </div>
  );
}
