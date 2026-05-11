import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

interface ReportItem {
  id: string;
  subject: string;
  reason: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface ReportsTableProps {
  reports: ReportItem[];
  onMarkReviewed?: (reportId: string) => Promise<void>;
  onResolve?: (reportId: string, adminNotes: string) => Promise<void>;
  activeReportId?: string | null;
}

export function ReportsTable({
  reports,
  onMarkReviewed,
  onResolve,
  activeReportId,
}: ReportsTableProps) {
  const [resolveNotes, setResolveNotes] = useState<Record<string, string>>({});

  const showActions = Boolean(onMarkReviewed && onResolve);

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Reportes
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Casos enviados por la comunidad para revision administrativa.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Asunto</th>
              <th className="px-6 py-4 font-semibold">Motivo</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Prioridad</th>
              <th className="px-6 py-4 font-semibold">Recibido</th>
              {showActions ? <th className="px-6 py-4 font-semibold">Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => {
              const isPending = report.status === "Pendiente";
              const isReviewed = report.status.toLowerCase().includes("revision");
              const isBusy = activeReportId === report.id;

              return (
                <tr key={report.id} className="border-t align-top">
                  <td className="px-6 py-4 font-semibold text-[var(--color-text)]">
                    {report.subject}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="neutral">{report.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={report.priority === "Alta" ? "secondary" : "primary"}>
                      {report.priority}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {report.createdAt}
                  </td>
                  {showActions ? (
                    <td className="px-6 py-4">
                      {report.status === "Resuelto" ? (
                        <span className="text-[var(--color-muted)]">Caso cerrado</span>
                      ) : (
                        <div className="space-y-3">
                          <Input
                            value={resolveNotes[report.id] ?? ""}
                            onChange={(event) =>
                              setResolveNotes((current) => ({
                                ...current,
                                [report.id]: event.target.value,
                              }))
                            }
                            placeholder="Nota breve para cerrar el caso"
                          />
                          <div className="flex gap-3">
                            {isPending ? (
                              <Button
                                type="button"
                                size="sm"
                                disabled={isBusy}
                                onClick={() => void onMarkReviewed?.(report.id)}
                              >
                                {isBusy ? "Guardando..." : "Marcar en revision"}
                              </Button>
                            ) : (
                              <span className="self-center text-[var(--color-muted)]">
                                En seguimiento
                              </span>
                            )}
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              disabled={
                                isBusy ||
                                (isReviewed && !(resolveNotes[report.id] ?? "").trim())
                              }
                              onClick={() =>
                                void onResolve?.(report.id, (resolveNotes[report.id] ?? "").trim())
                              }
                            >
                              Resolver
                            </Button>
                          </div>
                        </div>
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
