"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import type { PetDetail } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

interface PetManagementTableProps {
  pets: PetDetail[];
  onRemove?: (pet: PetDetail) => Promise<void>;
  removingPetId?: string | null;
}

export function PetManagementTable({
  pets,
  onRemove,
  removingPetId,
}: PetManagementTableProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b px-6 py-5">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Mis mascotas registradas
        </h2>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Actualiza el estado de adopción, revisa prioridad y edita cada perfil.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--color-bg-soft)] text-[var(--color-muted)]">
            <tr>
              <th className="px-6 py-4 font-semibold">Mascota</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Visibilidad</th>
              <th className="px-6 py-4 font-semibold">Ubicación</th>
              <th className="px-6 py-4 font-semibold">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id} className="border-t">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">{pet.name}</p>
                    <p className="text-[var(--color-muted)]">
                      {pet.speciesLabel} · {pet.age}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="neutral">{pet.statusLabel}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {pet.urgent ? <Badge variant="secondary">Urgente</Badge> : null}
                    {pet.featured ? <Badge variant="primary">Destacado</Badge> : null}
                    {pet.featured && pet.featuredDaysRemaining ? (
                      <Badge variant="neutral">
                        {pet.featuredDaysRemaining} dia
                        {pet.featuredDaysRemaining === 1 ? "" : "s"} activo
                      </Badge>
                    ) : null}
                  </div>
                </td>
                <td className="px-6 py-4 text-[var(--color-muted)]">{pet.location}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/panel/rescatista/mascotas/${pet.id}/editar`}
                      className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                    >
                      Editar perfil
                    </Link>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      disabled={!onRemove || removingPetId === pet.id}
                      onClick={() => {
                        if (!onRemove) {
                          return;
                        }

                        void onRemove(pet);
                      }}
                      className="min-h-0 rounded-full px-3 py-2"
                    >
                      {removingPetId === pet.id ? "Eliminando..." : "Eliminar"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
