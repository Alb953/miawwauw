"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onExpired: () => void;
  onError: () => void;
}

export function TurnstileWidget({
  onSuccess,
  onExpired,
  onError,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const instanceId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!turnstileSiteKey || !containerRef.current || typeof window === "undefined") {
      return;
    }

    let cancelled = false;

    const tryRender = () => {
      if (
        cancelled ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => onSuccess(token),
        "expired-callback": onExpired,
        "error-callback": onError,
      });
    };

    tryRender();

    const intervalId = window.setInterval(tryRender, 250);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);

      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = null;
    };
  }, [instanceId, onError, onExpired, onSuccess]);

  if (!turnstileSiteKey) {
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} id={`turnstile-${instanceId}`} />
    </>
  );
}
