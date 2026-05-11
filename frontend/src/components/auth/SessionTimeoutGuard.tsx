"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { apiClient } from "@/lib/api";
import { ROUTES } from "@/lib/routes";

const SESSION_TIMEOUT_MS = 5 * 60 * 1000;
const AUTH_TOKEN_KEY = "amw_auth_token";

const activityEvents: Array<keyof WindowEventMap> = [
  "click",
  "keydown",
  "mousemove",
  "scroll",
  "touchstart",
];

export function SessionTimeoutGuard() {
  const pathname = usePathname();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasActiveSession = () => Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY));

    const clearExistingTimer = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleSessionTimeout = async () => {
      clearExistingTimer();

      if (!hasActiveSession()) {
        return;
      }

      try {
        await apiClient.auth.logout();
      } catch {
        window.localStorage.removeItem(AUTH_TOKEN_KEY);
      }

      if (window.location.pathname !== ROUTES.login) {
        window.location.href = `${ROUTES.login}?reason=session-expired`;
      }
    };

    const resetTimer = () => {
      clearExistingTimer();

      if (!hasActiveSession()) {
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        void handleSessionTimeout();
      }, SESSION_TIMEOUT_MS);
    };

    resetTimer();

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_TOKEN_KEY) {
        resetTimer();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      clearExistingTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
      window.removeEventListener("storage", handleStorage);
    };
  }, [pathname]);

  return null;
}
