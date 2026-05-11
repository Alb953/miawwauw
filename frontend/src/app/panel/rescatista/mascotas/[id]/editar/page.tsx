"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PetForm } from "@/components/dashboard/PetForm";
import { Card } from "@/components/ui/Card";
import { RoutePlaceholder } from "@/components/layout/RoutePlaceholder";
import { apiClient } from "@/lib/api";
import type { PetDetail } from "@/lib/types";

export default function EditarMascotaPage() {
  const params = useParams<{ id: string }>();
  const petId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [pet, setPet] = useState<PetDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPet() {
      if (!petId) {
        setError("No recibimos un identificador de mascota valido.");
        setIsLoading(false);
        return;
      }

      try {
        const petDetail = await apiClient.pets.detail(petId);

        if (cancelled) {
          return;
        }

        setPet(petDetail);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No pudimos cargar la mascota para editarla.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadPet();

    return () => {
      cancelled = true;
    };
  }, [petId]);

  if (isLoading) {
    return (
      <DashboardShell
        title="Cargando perfil"
        description="Estamos preparando la informacion de la mascota para editarla."
      >
        <Card className="rounded-[1.4rem] bg-[var(--color-bg-soft)] text-sm leading-7 text-[var(--color-muted)]">
          Cargando informacion de la mascota...
        </Card>
      </DashboardShell>
    );
  }

  if (!pet) {
    return (
      <RoutePlaceholder
        title="Mascota no encontrada"
        description={
          error ||
          "No pudimos localizar ese perfil para editarlo. Vuelve al panel y selecciona una mascota valida."
        }
      />
    );
  }

  return (
    <DashboardShell
      title={`Editar perfil de ${pet.name}`}
      description="Actualiza el estado, la descripcion o la prioridad de difusion de esta mascota."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      <PetForm mode="edit" pet={pet} />
    </DashboardShell>
  );
}
