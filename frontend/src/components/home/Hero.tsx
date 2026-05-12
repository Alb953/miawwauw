import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

function HeroArtwork() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/hero-reference-v2.png"
          alt="Perrito y gatito descansando juntos"
          fill
          priority
          className="object-cover object-[54%_42%]"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-y-0 right-0 hidden w-full md:block md:w-[76%] lg:w-[72%]">
        <Image
          src="/hero-reference-v2.png"
          alt="Perrito y gatito descansando juntos"
          fill
          priority
          className="object-cover object-[82%_36%]"
          sizes="100vw"
        />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-[linear-gradient(90deg,rgba(24,12,18,0.8)_0%,rgba(24,12,18,0.58)_40%,rgba(24,12,18,0.22)_76%,rgba(24,12,18,0)_100%)] md:hidden" />
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(255,248,240,0.98)_0%,rgba(255,248,240,0.96)_24%,rgba(255,248,240,0.78)_41%,rgba(255,248,240,0.34)_56%,rgba(255,248,240,0.08)_72%,rgba(255,248,240,0)_100%)]" />
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.94),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.34),transparent_14%),radial-gradient(circle_at_90%_46%,rgba(255,255,255,0.18),transparent_14%)]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[32rem] overflow-hidden bg-[#fbf4ec] sm:min-h-[calc(100vh-5rem)]">
      <HeroArtwork />

      <div className="page-shell relative flex min-h-[32rem] items-start py-6 sm:min-h-[calc(100vh-5rem)] sm:items-center sm:py-12">
        <div className="max-w-xl space-y-5 pb-6 pt-2 sm:max-w-2xl sm:space-y-7 sm:pb-16 sm:pt-4 lg:pb-32">
          <div className="hidden sm:inline-flex rounded-full border border-white/80 bg-white/92 px-5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--color-primary-dark)] shadow-sm backdrop-blur">
            Adopcion responsable para perritos y gatitos
          </div>

          <div className="p-1 text-white sm:hidden">
            <div className="mt-5 max-w-[17rem] space-y-3">
              <h1 className="text-[3.08rem] leading-[0.93] font-semibold text-white drop-shadow-[0_12px_28px_rgba(0,0,0,0.42)]">
                Adopta amor, cambia una vida
              </h1>
              <p className="max-w-[16.5rem] text-[1.32rem] leading-8 text-white/92 drop-shadow-[0_6px_18px_rgba(0,0,0,0.26)]">
                Encuentra perritos y gatitos que buscan un hogar responsable.
              </p>
            </div>

            <div className="mt-6 mb-5 grid gap-3">
              <Button
                href={ROUTES.mascotas}
                size="lg"
                className="min-h-[3.9rem] justify-between rounded-[1.65rem] px-5 text-[1rem] shadow-[0_16px_30px_rgba(0,143,140,0.3)]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/22 bg-white/10 text-[1.45rem] leading-none">
                    ♡
                  </span>
                  <span>Adoptar una mascota</span>
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/12 text-[1.7rem] leading-none">
                  ›
                </span>
              </Button>
              <Button
                href="/panel/rescatista/mascotas/nueva"
                variant="secondary"
                size="lg"
                className="min-h-[3.9rem] justify-between rounded-[1.65rem] border-white/90 bg-white px-5 text-[1rem] text-[var(--color-secondary)] shadow-[0_14px_26px_rgba(35,17,31,0.14)]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-secondary-soft)] text-[1.35rem] leading-none">
                    ⌂
                  </span>
                  <span>Registrar mascota en adopcion</span>
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-secondary-soft)] text-[1.7rem] leading-none">
                  ›
                </span>
              </Button>
            </div>
          </div>

          <div className="hidden space-y-4 rounded-[1.75rem] bg-white/54 p-5 shadow-[0_18px_40px_rgba(35,17,31,0.12)] backdrop-blur-[2px] sm:block sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
            <h1 className="max-w-lg text-[3.35rem] leading-[0.9] font-semibold text-[var(--color-text)] sm:max-w-xl sm:text-6xl lg:text-[5.35rem]">
              Encuentra a tu nuevo mejor amigo
            </h1>
            <p className="max-w-sm text-lg leading-8 text-[var(--color-text)]/82 sm:max-w-md sm:text-xl sm:text-[var(--color-muted)]">
              Abre tu corazon y tu hogar a una mascota que lo necesita.
              Perritos y gatitos esperan una familia llena de amor.
            </p>
          </div>

          <div className="hidden sm:flex sm:flex-row gap-3">
            <Button
              href="/panel/rescatista/mascotas/nueva"
              variant="secondary"
              size="lg"
              className="bg-white/90"
            >
              Registrar una mascota
            </Button>
            <Button href={ROUTES.mascotas} size="lg">
              Adoptar una mascota
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
