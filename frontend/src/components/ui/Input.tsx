import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-[var(--radius-md)] border bg-white px-4 py-3 text-sm text-[var(--color-text)] shadow-sm outline-none",
        "placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-primary)_12%,white)]",
        className,
      )}
      {...props}
    />
  );
}
