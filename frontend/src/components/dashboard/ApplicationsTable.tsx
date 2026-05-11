import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { RescuerApplicationRecord } from "@/lib/api";

interface ApplicationsTableProps {
  applications: RescuerApplicationRecord[];
  onView?: (application: RescuerApplicationRecord) => void;
}

const statusVariant = {
  nueva: "secondary",
  en_revision: "primary",
  aprobada: "neutral",
} as const;

const statusLabel = {
  nueva: "Nueva",
  en_revision: "En revisión",
  aprobada: "Aprobada",
} as const;

export function ApplicationsTable({ applications, onView }: ApplicationsTableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Solicitudes recibidas
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Revisa quién se interesó por tus mascotas y da seguimiento al proceso.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Persona interesada</th>
              <th className="px-6 py-4 font-semibold">Mascota</th>
              <th className="px-6 py-4 font-semibold">Ciudad</th>
              <th className="px-6 py-4 font-semibold">Recibida</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Accion</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t">
                <td className="px-6 py-4 font-semibold text-[var(--color-text)]">
                  {application.applicantName}
                </td>
                <td className="px-6 py-4 text-[var(--color-muted)]">
                  {application.petName}
                </td>
                <td className="px-6 py-4 text-[var(--color-muted)]">
                  {application.city}
                </td>
                <td className="px-6 py-4 text-[var(--color-muted)]">
                  {application.submittedAt}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariant[application.status]}>
                    {statusLabel[application.status]}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onView?.(application)}
                    className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                  >
                    Ver solicitud
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
