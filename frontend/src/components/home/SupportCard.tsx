import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function SupportCard() {
  return (
    <Card className="bg-[linear-gradient(180deg,#fff9f2_0%,#ffe8d7_100%)]">
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/80 text-4xl shadow-sm">
            🤍
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">
              Apoya la plataforma
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              Tu apoyo voluntario nos ayuda a mantener la plataforma, dar
              visibilidad a más mascotas y conectar familias responsables.
            </p>
          </div>
        </div>

        <Button href="/apoyar" variant="secondary" className="w-full sm:w-auto">
          Apoyar ahora
        </Button>

        <p className="text-xs leading-6 text-[var(--color-muted)]">
          Esta contribución no es deducible de impuestos.
        </p>
      </div>
    </Card>
  );
}
