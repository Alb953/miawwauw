"use client";

import { useEffect, useState } from "react";

import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { PetManagementTable } from "@/components/dashboard/PetManagementTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import {
  apiClient,
  type RescuerApplicationDetail,
  type RescuerApplicationRecord,
  type RescuerDashboardData,
} from "@/lib/api";
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import type { PetDetail } from "@/lib/types";

export default function PanelRescatistaPage() {
  const [dashboard, setDashboard] = useState<RescuerDashboardData | null>(null);
  const [pets, setPets] = useState<PetDetail[]>([]);
  const [applications, setApplications] = useState<RescuerApplicationRecord[]>([]);
  const [error, setError] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [removingPetId, setRemovingPetId] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<RescuerApplicationRecord | null>(null);
  const [selectedApplicationDetail, setSelectedApplicationDetail] =
    useState<RescuerApplicationDetail | null>(null);
  const [isLoadingApplicationDetail, setIsLoadingApplicationDetail] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const payload = await apiClient.rescuer.dashboard();

        if (cancelled) {
          return;
        }

        setDashboard(payload.dashboard);
        setPets(payload.pets);
        setApplications(payload.applications);
        setFeedbackMessage("");
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No pudimos cargar tu panel de rescatista.",
        );
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRemovePet(pet: PetDetail) {
    const confirmation = await showConfirmAlert({
      title: "Eliminar mascota",
      text: `Se desactivara a ${pet.name} y dejara de aparecer en la plataforma. Deseas continuar?`,
      confirmButtonText: "Si, eliminar",
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    setRemovingPetId(pet.id);
    setError("");
    setFeedbackMessage("");

    try {
      const response = await apiClient.pets.remove(pet.id);

      setPets((currentPets) => currentPets.filter((currentPet) => currentPet.id !== pet.id));
      setDashboard((currentDashboard) => {
        if (!currentDashboard) {
          return currentDashboard;
        }

        return {
          ...currentDashboard,
          stats: currentDashboard.stats.map((stat) => {
            if (stat.id === "pets") {
              return {
                ...stat,
                value: String(Math.max(0, Number(stat.value) - 1)),
              };
            }

            if (stat.id === "urgent" && pet.urgent) {
              return {
                ...stat,
                value: String(Math.max(0, Number(stat.value) - 1)),
              };
            }

            if (stat.id === "featured" && pet.featured) {
              return {
                ...stat,
                value: String(Math.max(0, Number(stat.value) - 1)),
              };
            }

            return stat;
          }),
        };
      });
      setFeedbackMessage(response.message);
      await showSuccessAlert("Mascota eliminada", response.message);
    } catch (removeError) {
      const message =
        removeError instanceof Error
          ? removeError.message
          : "No pudimos eliminar la mascota en este momento.";
      setError(message);
      await showErrorAlert("No pudimos eliminar la mascota", message);
    } finally {
      setRemovingPetId(null);
    }
  }

  async function handleViewApplication(application: RescuerApplicationRecord) {
    setSelectedApplication(application);
    setSelectedApplicationDetail(null);
    setIsLoadingApplicationDetail(true);
    setError("");

    try {
      const detail = await apiClient.applications.detail(application.id);
      setSelectedApplicationDetail(detail);
    } catch (detailError) {
      setError(
        detailError instanceof Error
          ? detailError.message
          : "No pudimos cargar la solicitud seleccionada.",
      );
    } finally {
      setIsLoadingApplicationDetail(false);
    }
  }

  function closeApplicationDetail() {
    setSelectedApplication(null);
    setSelectedApplicationDetail(null);
    setIsLoadingApplicationDetail(false);
  }

  return (
    <DashboardShell
      title={`Hola, ${dashboard?.rescuerName ?? "rescatista"}`}
      description="Aqui puedes revisar el estado general de tus mascotas, dar seguimiento a solicitudes y preparar nuevas publicaciones."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      {feedbackMessage ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-primary-soft)] text-sm leading-7 text-[var(--color-primary-dark)]">
          {feedbackMessage}
        </Card>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {(dashboard?.stats ?? []).map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            note={stat.note}
          />
        ))}
      </section>

      <Card className="space-y-4">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Acciones rapidas
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(dashboard?.quickNotes ?? []).map((note) => (
            <div
              key={note}
              className="rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4 text-sm leading-7 text-[var(--color-muted)]"
            >
              {note}
            </div>
          ))}
        </div>
      </Card>

      <PetManagementTable
        pets={pets}
        onRemove={handleRemovePet}
        removingPetId={removingPetId}
      />
      <ApplicationsTable applications={applications} onView={handleViewApplication} />

      {selectedApplication ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,17,31,0.62)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Detalle de solicitud"
          onClick={closeApplicationDetail}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.9rem] bg-white p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                  Solicitud de {selectedApplication.applicantName}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Mascota: {selectedApplication.petName}
                </p>
              </div>
              <button
                type="button"
                onClick={closeApplicationDetail}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl text-[var(--color-text)] shadow-sm"
                aria-label="Cerrar detalle de solicitud"
              >
                X
              </button>
            </div>

            {isLoadingApplicationDetail ? (
              <Card className="text-sm leading-7 text-[var(--color-muted)]">
                Cargando informacion completa de la solicitud...
              </Card>
            ) : selectedApplicationDetail ? (
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Card className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                      Datos de contacto
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Nombre:</span>{" "}
                      {selectedApplicationDetail.applicantName}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Correo:</span>{" "}
                      {selectedApplicationDetail.email}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Telefono:</span>{" "}
                      {selectedApplicationDetail.phone}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Ciudad:</span>{" "}
                      {selectedApplicationDetail.city}
                    </p>
                  </Card>

                  <Card className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                      Resumen de la solicitud
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Mascota:</span>{" "}
                      {selectedApplication.petName}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Estado:</span>{" "}
                      {selectedApplicationDetail.statusLabel}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">Recibida:</span>{" "}
                      {selectedApplicationDetail.submittedAt}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">
                        Tipo de vivienda:
                      </span>{" "}
                      {selectedApplicationDetail.housingTypeLabel}
                    </p>
                  </Card>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Card className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                      Contexto del hogar
                    </h3>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">
                        Otras mascotas:
                      </span>{" "}
                      {selectedApplicationDetail.otherPetsLabel}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">
                        Ha adoptado antes:
                      </span>{" "}
                      {selectedApplicationDetail.adoptedBeforeLabel}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">
                        Seguimiento aceptado:
                      </span>{" "}
                      {selectedApplicationDetail.followUpAccepted ? "Si" : "No"}
                    </p>
                    <p className="text-sm text-[var(--color-muted)]">
                      <span className="font-semibold text-[var(--color-text)]">
                        Requisitos aceptados:
                      </span>{" "}
                      {selectedApplicationDetail.requirementsAccepted ? "Si" : "No"}
                    </p>
                  </Card>

                  <Card className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[var(--color-text)]">
                      Motivo para adoptar
                    </h3>
                    <p className="text-sm leading-7 text-[var(--color-muted)]">
                      {selectedApplicationDetail.reason}
                    </p>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="text-sm leading-7 text-[var(--color-muted)]">
                No pudimos cargar el detalle completo de esta solicitud.
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </DashboardShell>
  );
}
