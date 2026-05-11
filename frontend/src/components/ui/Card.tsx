import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "surface-card rounded-[var(--radius-lg)] p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
