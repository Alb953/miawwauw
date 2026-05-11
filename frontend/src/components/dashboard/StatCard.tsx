import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  note: string;
}

export function StatCard({ label, value, note }: StatCardProps) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold text-[var(--color-muted)]">{label}</p>
      <p className="text-4xl font-semibold text-[var(--color-text)]">{value}</p>
      <p className="text-sm leading-7 text-[var(--color-muted)]">{note}</p>
    </Card>
  );
}
