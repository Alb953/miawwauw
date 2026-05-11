"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/dashboard/AdminShell";
import { ContributionsTable } from "@/components/dashboard/ContributionsTable";
import { Card } from "@/components/ui/Card";
import { apiClient, type AdminContributionRecord } from "@/lib/api";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";

export default function AdminContribucionesPage() {
  const [contributions, setContributions] = useState<AdminContributionRecord[]>([]);
  const [error, setError] = useState("");
  const [activeContributionId, setActiveContributionId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      try {
        const contributionsData = await apiClient.admin.contributions();

        if (!cancelled) {
          setContributions(contributionsData);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar las contribuciones.",
          );
        }
      }
    }

    void loadContributions();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleConfirm(contributionId: string) {
    setError("");
    setActiveContributionId(contributionId);

    try {
      const updatedContribution = await apiClient.admin.confirmContribution(contributionId);
      const isFeaturedRequest = updatedContribution.concept === "Mascota destacada";

      setContributions((current) =>
        current.map((contribution) =>
          contribution.id === contributionId ? updatedContribution : contribution,
        ),
      );
      await showSuccessAlert(
        isFeaturedRequest ? "Destacado aprobado" : "Contribucion confirmada",
        isFeaturedRequest
          ? "La visibilidad destacada se aprobo correctamente."
          : "La contribucion se confirmo correctamente.",
      );
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos confirmar la contribucion.";
      setError(message);
      await showErrorAlert("No pudimos confirmar la contribucion", message);
    } finally {
      setActiveContributionId(null);
    }
  }

  async function handleReject(contributionId: string, adminNotes: string) {
    setError("");
    setActiveContributionId(contributionId);

    try {
      const updatedContribution = await apiClient.admin.rejectContribution(contributionId, {
        adminNotes,
      });
      const isFeaturedRequest = updatedContribution.concept === "Mascota destacada";

      setContributions((current) =>
        current.map((contribution) =>
          contribution.id === contributionId ? updatedContribution : contribution,
        ),
      );
      await showSuccessAlert(
        isFeaturedRequest ? "Destacado rechazado" : "Contribucion rechazada",
        isFeaturedRequest
          ? "La solicitud de destacado se rechazo correctamente."
          : "La contribucion se rechazo correctamente.",
      );
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos rechazar la contribucion.";
      setError(message);
      await showErrorAlert("No pudimos rechazar la contribucion", message);
    } finally {
      setActiveContributionId(null);
    }
  }

  return (
    <AdminShell
      title="Contribuciones manuales"
      description="Confirma apoyos voluntarios y solicitudes de visibilidad destacada antes de activar cambios dentro de la plataforma."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      <ContributionsTable
        contributions={contributions}
        onConfirm={handleConfirm}
        onReject={handleReject}
        activeContributionId={activeContributionId}
      />
    </AdminShell>
  );
}
