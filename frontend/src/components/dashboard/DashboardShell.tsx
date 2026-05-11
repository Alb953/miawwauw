import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

const sections = [
  { href: ROUTES.panelRescatista, label: "Resumen" },
  { href: "/panel/rescatista/mascotas/nueva", label: "Registrar mascota" },
];

export function DashboardShell({
  title,
  description,
  children,
}: DashboardShellProps) {
  return (
    <main className="bg-soft-radial flex-1 pb-16 pt-8">
      <section className="page-shell">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit rounded-[1.8rem] p-5">
            <div className="space-y-2 border-b pb-5">
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                {SITE_NAME}
              </p>
              <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                Panel de rescatista
              </h2>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Gestiona mascotas, revisa solicitudes y da seguimiento a tus casos.
              </p>
            </div>

            <nav className="mt-5 space-y-2">
              {sections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={cn(
                    "block rounded-[1rem] px-4 py-3 text-sm font-semibold text-[var(--color-text)]",
                    "hover:bg-[var(--color-bg-soft)]",
                  )}
                >
                  {section.label}
                </Link>
              ))}
            </nav>

            <Button href="/" variant="ghost" className="mt-5 w-full">
              Volver al inicio
            </Button>
          </aside>

          <div className="space-y-6">
            <header className="rounded-[1.8rem] bg-white p-6 shadow-[0_20px_70px_rgba(35,17,31,0.08)]">
              <h1 className="text-4xl font-semibold text-[var(--color-text)]">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
                {description}
              </p>
            </header>

            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
