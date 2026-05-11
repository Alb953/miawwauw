import type { OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption extends OptionHTMLAttributes<HTMLOptionElement> {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export function Select({ className, options, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full appearance-none rounded-[var(--radius-md)] border bg-white px-4 py-3 text-sm text-[var(--color-text)] shadow-sm outline-none",
        "focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--color-primary)_12%,white)]",
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
