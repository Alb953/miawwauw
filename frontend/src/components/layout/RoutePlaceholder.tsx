import { EmptyState } from "@/components/ui/EmptyState";

interface RoutePlaceholderProps {
  title: string;
  description: string;
}

export function RoutePlaceholder({
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <main className="bg-soft-radial flex-1">
      <section className="page-shell section-space flex min-h-[60vh] items-center">
        <EmptyState
          title={title}
          description={description}
          actionLabel="Volver al inicio"
          actionHref="/"
        />
      </section>
    </main>
  );
}
