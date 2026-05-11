"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { apiClient, type AuthUser } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PRIMARY_NAV_LINKS } from "@/lib/constants";
import { getPanelRouteByRole, ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      const user = await apiClient.auth.me();

      if (!cancelled) {
        setCurrentUser(user);
      }
    }

    void loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await apiClient.auth.logout();
      setCurrentUser(null);
      router.push(ROUTES.login);
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/92 backdrop-blur">
      <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-4">
        <Link href={ROUTES.inicio} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-xl shadow-sm">
            🐾
          </span>
          <span className="text-xl font-semibold tracking-tight sm:text-2xl">
            <span className="text-[var(--color-primary)]">Adopta</span>{" "}
            <span className="text-[var(--color-secondary)]">Miauw</span>{" "}
            <span className="text-[var(--color-primary)]">Wau</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold text-[var(--color-text)]",
                  "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-[var(--color-primary)] after:transition-transform",
                  active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {currentUser ? (
            <>
              <div className="rounded-full bg-[var(--color-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-text)]">
                {currentUser.name}
              </div>
              <Button href={getPanelRouteByRole(currentUser.role)} variant="secondary" size="sm">
                Volver a mi panel
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isLoggingOut}
                onClick={() => {
                  void handleLogout();
                }}
              >
                {isLoggingOut ? "Cerrando..." : "Cerrar sesion"}
              </Button>
            </>
          ) : (
            <>
              <Button href={ROUTES.login} variant="ghost" size="sm">
                Iniciar sesion
              </Button>
              <Button href={ROUTES.registro} variant="secondary" size="sm">
                Registrarme
              </Button>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <MobileNav currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
}
