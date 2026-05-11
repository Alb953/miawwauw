import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface ContributionItem {
  id: string;
  contributor: string;
  concept: string;
  amount: string;
  status: "Pendiente" | "Verificada" | "Rechazada";
  createdAt: string;
}

interface ContributionsTableProps {
  contributions: ContributionItem[];
  onConfirm?: (contributionId: string) => Promise<void>;
  onReject?: (contributionId: string, adminNotes: string) => Promise<void>;
  activeContributionId?: string | null;
}

export function ContributionsTable({
  contributions,
  onConfirm,
  onReject,
  activeContributionId,
}: ContributionsTableProps) {
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});

  const showActions = Boolean(onConfirm && onReject);

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Contribuciones
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Revisa apoyos voluntarios y solicitudes de visibilidad destacada antes de
          aprobarlas dentro de la plataforma.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Persona</th>
              <th className="px-6 py-4 font-semibold">Concepto</th>
              <th className="px-6 py-4 font-semibold">Monto</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Fecha</th>
              {showActions ? <th className="px-6 py-4 font-semibold">Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => {
              const isPending = contribution.status === "Pendiente";
              const isBusy = activeContributionId === contribution.id;
              const isFeaturedRequest = contribution.concept === "Mascota destacada";
              const rejectPlaceholder = isFeaturedRequest
                ? "Motivo si vas a rechazar el destacado"
                : "Nota breve si necesitas rechazar";
              const confirmLabel = isFeaturedRequest ? "Aprobar destacado" : "Confirmar";
              const rejectLabel = isFeaturedRequest ? "Rechazar destacado" : "Rechazar";
              const noActionsLabel = isFeaturedRequest
                ? "Solicitud de destacado ya revisada"
                : "Sin acciones pendientes";

              return (
                <tr key={contribution.id} className="border-t align-top">
                  <td className="px-6 py-4 font-semibold text-[var(--color-text)]">
                    {contribution.contributor}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {contribution.concept}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {contribution.amount}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        contribution.status === "Pendiente"
                          ? "secondary"
                          : contribution.status === "Verificada"
                            ? "primary"
                            : "neutral"
                      }
                    >
                      {contribution.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {contribution.createdAt}
                  </td>
                  {showActions ? (
                    <td className="px-6 py-4">
                      {isPending ? (
                        <div className="space-y-3">
                          <Input
                            value={rejectNotes[contribution.id] ?? ""}
                            onChange={(event) =>
                              setRejectNotes((current) => ({
                                ...current,
                                [contribution.id]: event.target.value,
                              }))
                            }
                            placeholder={rejectPlaceholder}
                          />
                          <div className="flex gap-3">
                            <Button
                              type="button"
                              size="sm"
                              disabled={isBusy}
                              onClick={() => void onConfirm?.(contribution.id)}
                            >
                              {isBusy ? "Guardando..." : confirmLabel}
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              disabled={isBusy || !(rejectNotes[contribution.id] ?? "").trim()}
                              onClick={() =>
                                void onReject?.(
                                  contribution.id,
                                  (rejectNotes[contribution.id] ?? "").trim(),
                                )
                              }
                            >
                              {rejectLabel}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[var(--color-muted)]">{noActionsLabel}</span>
                      )}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
