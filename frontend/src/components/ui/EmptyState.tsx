import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-xl text-center">
      <div className="space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-xl text-[var(--color-primary-dark)]">
          {icon ?? "🐾"}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-[var(--color-text)]">{title}</h2>
          <p className="text-[var(--color-muted)]">{description}</p>
        </div>
        {actionLabel && actionHref ? (
          <Button href={actionHref} variant="secondary">
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
