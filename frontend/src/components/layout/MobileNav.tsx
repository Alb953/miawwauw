"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { apiClient, type AuthUser } from "@/lib/api";
import { PRIMARY_NAV_LINKS } from "@/lib/constants";
import { getPanelRouteByRole, ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface MobileNavProps {
  currentUser: AuthUser | null;
}

export function MobileNav({ currentUser }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await apiClient.auth.logout();
      setOpen(false);
      router.push(ROUTES.login);
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={open ? "Cerrar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-[var(--color-text)] shadow-sm"
      >
        <span className="text-lg">{open ? "×" : "☰"}</span>
      </button>

      {open ? (
        <div className="absolute right-0 top-14 w-[min(22rem,calc(100vw-2rem))] rounded-[var(--radius-lg)] border bg-white p-4 shadow-[var(--shadow-soft)]">
          <nav className="flex flex-col gap-2">
            {PRIMARY_NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-[var(--radius-md)] px-4 py-3 text-sm font-semibold",
                    active
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-bg-soft)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 grid gap-2 border-t pt-4">
            {currentUser ? (
              <>
                <div className="rounded-full bg-[var(--color-bg-soft)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-text)]">
                  {currentUser.name}
                </div>
                <Link
                  href={getPanelRouteByRole(currentUser.role)}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[var(--color-secondary)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-secondary)]"
                >
                  Volver a mi panel
                </Link>
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={() => {
                    void handleLogout();
                  }}
                  className="rounded-full bg-[var(--color-primary-soft)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-primary-dark)] disabled:opacity-60"
                >
                  {isLoggingOut ? "Cerrando..." : "Cerrar sesion"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={ROUTES.login}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[var(--color-primary-soft)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-primary-dark)]"
                >
                  Iniciar sesion
                </Link>
                <Link
                  href={ROUTES.registro}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-[var(--color-secondary)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-secondary)]"
                >
                  Registrarme
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
