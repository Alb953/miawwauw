interface LoadingStateProps {
  label?: string;
}

export function LoadingState({
  label = "Cargando contenido...",
}: LoadingStateProps) {
  return (
    <div className="surface-card flex min-h-48 flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-primary-soft)] border-t-[var(--color-primary)]" />
      <p className="text-sm font-medium text-[var(--color-muted)]">{label}</p>
    </div>
  );
}
