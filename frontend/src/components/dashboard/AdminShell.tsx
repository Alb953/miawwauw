import type { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

interface AdminShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

const adminSections = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/reportes", label: "Reportes" },
  { href: "/admin/quejas", label: "Quejas" },
  { href: "/admin/contribuciones", label: "Contribuciones" },
];

export function AdminShell({ title, description, children }: AdminShellProps) {
  return (
    <main className="bg-soft-radial flex-1 pb-16 pt-8">
      <section className="page-shell">
        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <aside className="surface-card h-fit rounded-[1.8rem] p-5">
            <div className="space-y-2 border-b pb-5">
              <p className="text-sm font-semibold text-[var(--color-secondary)]">
                Panel admin
              </p>
              <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                Moderacion y control
              </h2>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                Revisa reportes, quejas, contribuciones y visibilidad destacada
                desde un solo espacio.
              </p>
            </div>

            <nav className="mt-5 space-y-2">
              {adminSections.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="block rounded-[1rem] px-4 py-3 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg-soft)]"
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
