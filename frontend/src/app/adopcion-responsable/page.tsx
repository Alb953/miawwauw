import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const adoptionSteps = [
  "Explora mascotas",
  "Lee el perfil completo",
  "Llena la solicitud",
  "Espera revision del rescatista",
  "Entrevista o seguimiento",
  "Entrega responsable",
];

const requirements = [
  "Ser mayor de edad",
  "Tener tiempo, espacio y compromiso",
];

export default function AdopcionResponsablePage() {
  return (
    <main className="bg-soft-radial flex-1 py-10">
      <section className="page-shell space-y-8">
        <Card className="overflow-hidden bg-[linear-gradient(135deg,#fff8f1_0%,#f7ede5_52%,#fffdf9_100%)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary-dark)] shadow-sm">
                Adopcion responsable
              </span>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-5xl leading-none font-semibold text-[var(--color-text)]">
                  Conoce el proceso antes de dar este gran paso.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
                  Aqui puedes ver de forma simple como funciona la adopcion y cuales son
                  los requisitos basicos para comenzar.
                </p>
              </div>
              <Button href="/mascotas" size="lg">
                Ver mascotas disponibles
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] bg-white/85 p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">
                  Paso a paso
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Un camino claro para adoptar con responsabilidad.
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-white/85 p-5 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                  Requisitos basicos
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Lo esencial para brindar estabilidad y cuidado.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                Paso a paso
              </h2>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Este es el recorrido recomendado dentro de la plataforma.
              </p>
            </div>

            <div className="space-y-4">
              {adoptionSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-[var(--color-primary-dark)] shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex items-center text-base font-semibold text-[var(--color-text)]">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                Requisitos basicos
              </h2>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Antes de enviar una solicitud, revisa estos puntos.
              </p>
            </div>

            <div className="space-y-4">
              {requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="rounded-[1.4rem] border border-[var(--color-border)] bg-white p-5"
                >
                  <p className="text-base font-semibold text-[var(--color-text)]">
                    {requirement}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </section>
    </main>
  );
}
