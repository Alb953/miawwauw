import { env } from "../config/env";

type TurnstileVerificationResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  if (!env.TURNSTILE_SECRET_KEY) {
    return {
      enabled: false as const,
      success: true,
      errors: [] as string[],
    };
  }

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return {
      enabled: true as const,
      success: false,
      errors: [`http_${response.status}`],
    };
  }

  const payload = (await response.json()) as TurnstileVerificationResponse;

  return {
    enabled: true as const,
    success: payload.success,
    errors: payload["error-codes"] ?? [],
  };
}
