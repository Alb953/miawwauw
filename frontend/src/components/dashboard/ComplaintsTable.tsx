"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import type { AdminComplaintRecord } from "@/lib/api";

interface ComplaintsTableProps {
  complaints: AdminComplaintRecord[];
  onMarkReviewed?: (complaintId: string) => Promise<void>;
  onResolve?: (complaintId: string, adminNotes: string) => Promise<void>;
  activeComplaintId?: string | null;
}

export function ComplaintsTable({
  complaints,
  onMarkReviewed,
  onResolve,
  activeComplaintId,
}: ComplaintsTableProps) {
  const [resolveNotes, setResolveNotes] = useState<Record<string, string>>({});
  const showActions = Boolean(onMarkReviewed && onResolve);

  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">Quejas</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Mensajes enviados por la comunidad para seguimiento administrativo.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Persona</th>
              <th className="px-6 py-4 font-semibold">Asunto</th>
              <th className="px-6 py-4 font-semibold">Mensaje</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Recibido</th>
              {showActions ? <th className="px-6 py-4 font-semibold">Acciones</th> : null}
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => {
              const isPending = complaint.status === "Pendiente";
              const isReviewed = complaint.status === "En revision";
              const isBusy = activeComplaintId === complaint.id;

              return (
                <tr key={complaint.id} className="border-t align-top">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[var(--color-text)]">
                      {complaint.fullName}
                    </div>
                    <div className="text-[var(--color-muted)]">{complaint.email}</div>
                    <div className="text-[var(--color-muted)]">{complaint.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[var(--color-text)]">
                    {complaint.subject}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    <p className="max-w-xl whitespace-pre-line">{complaint.message}</p>
                    {complaint.adminNotes ? (
                      <p className="mt-3 rounded-[1rem] bg-[var(--color-bg-soft)] px-3 py-2 text-xs leading-6 text-[var(--color-text)]">
                        Nota admin: {complaint.adminNotes}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="neutral">{complaint.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)]">
                    {complaint.createdAt}
                  </td>
                  {showActions ? (
                    <td className="px-6 py-4">
                      {complaint.status === "Resuelta" ? (
                        <span className="text-[var(--color-muted)]">Caso cerrado</span>
                      ) : (
                        <div className="space-y-3">
                          <Input
                            value={resolveNotes[complaint.id] ?? ""}
                            onChange={(event) =>
                              setResolveNotes((current) => ({
                                ...current,
                                [complaint.id]: event.target.value,
                              }))
                            }
                            placeholder="Nota breve para cerrar la queja"
                          />
                          <div className="flex gap-3">
                            {isPending ? (
                              <Button
                                type="button"
                                size="sm"
                                disabled={isBusy}
                                onClick={() => void onMarkReviewed?.(complaint.id)}
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
                              disabled={isBusy || (isReviewed && !(resolveNotes[complaint.id] ?? "").trim())}
                              onClick={() =>
                                void onResolve?.(
                                  complaint.id,
                                  (resolveNotes[complaint.id] ?? "").trim(),
                                )
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
