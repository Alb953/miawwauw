import Link from "next/link";

import { FOOTER_GROUPS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="page-shell grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-2xl font-semibold tracking-tight">
              <span className="text-[var(--color-primary)]">Adopta</span>{" "}
              <span className="text-[var(--color-secondary)]">Miauw</span>{" "}
              <span className="text-[var(--color-primary)]">Wau</span>
            </p>
            <p className="max-w-sm text-sm leading-7 text-[var(--color-muted)]">
              Conectamos familias responsables con perritos y gatitos que
              necesitan una nueva oportunidad.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[var(--color-text)]">
              Apoyo voluntario
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Esta contribucion ayuda al mantenimiento de la plataforma y no es
              deducible de impuestos.
            </p>
          </div>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title} className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              {group.title}
            </h2>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-border)] bg-white">
        <div className="page-shell py-5 text-sm text-[var(--color-muted)]">
          <p>{SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
