import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "secondary" | "warning" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)]",
  secondary: "bg-[var(--color-secondary-soft)] text-[var(--color-secondary)]",
  warning: "bg-[#fff4d9] text-[#b66a00]",
  neutral: "bg-[#f6f1ec] text-[var(--color-muted)]",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
