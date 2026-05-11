import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/routes";

function HeroArtwork() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full md:w-[76%] lg:w-[72%]">
        <Image
          src="/hero-reference-v2.png"
          alt="Perrito y gatito descansando juntos"
          fill
          priority
          className="object-cover object-[82%_36%]"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(255,248,240,0.98)_0%,rgba(255,248,240,0.96)_24%,rgba(255,248,240,0.78)_41%,rgba(255,248,240,0.34)_56%,rgba(255,248,240,0.08)_72%,rgba(255,248,240,0)_100%)]" />
      <div className="absolute inset-0 hidden md:block bg-[radial-gradient(circle_at_22%_24%,rgba(255,255,255,0.94),transparent_24%),radial-gradient(circle_at_86%_20%,rgba(255,255,255,0.34),transparent_14%),radial-gradient(circle_at_90%_46%,rgba(255,255,255,0.18),transparent_14%)]" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#fbf4ec]">
      <HeroArtwork />

      <div className="page-shell relative flex min-h-[calc(100vh-5rem)] items-center py-10 sm:py-12">
        <div className="max-w-2xl space-y-6 pb-24 pt-4 sm:space-y-7 lg:pb-32">
          <div className="inline-flex rounded-full border border-white/80 bg-white/92 px-5 py-2 text-sm font-semibold tracking-[0.08em] text-[var(--color-primary-dark)] shadow-sm backdrop-blur">
            Adopción responsable para perritos y gatitos
          </div>

          <div className="space-y-4 rounded-[1.75rem] bg-white/60 p-5 shadow-[0_18px_40px_rgba(35,17,31,0.12)] sm:bg-transparent sm:p-0 sm:shadow-none">
            <h1 className="max-w-xl text-5xl leading-[0.9] font-semibold text-[var(--color-text)] sm:text-6xl lg:text-[5.35rem]">
              Encuentra a tu nuevo mejor amigo
            </h1>
            <p className="max-w-md text-lg leading-8 text-[var(--color-text)]/82 sm:text-xl sm:text-[var(--color-muted)]">
              Abre tu corazón y tu hogar a una mascota que lo necesita.
              Perritos y gatitos esperan una familia llena de amor.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
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
