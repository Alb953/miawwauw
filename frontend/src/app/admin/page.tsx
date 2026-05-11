"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/dashboard/AdminShell";
import { ContributionsTable } from "@/components/dashboard/ContributionsTable";
import { ReportsTable } from "@/components/dashboard/ReportsTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card } from "@/components/ui/Card";
import {
  apiClient,
  type AdminApplicationDetailRecord,
  type AdminContributionRecord,
  type AdminDashboardData,
  type AdminPetDetailRecord,
  type AdminReportRecord,
  type AdminUserDetailRecord,
} from "@/lib/api";

type ReportCardKey = "pets" | "users" | "applications";

type ReportDetailState = {
  key: ReportCardKey;
  title: string;
  description: string;
};

const reportDescriptions: Record<ReportCardKey, string> = {
  pets: "Consulta las mascotas registradas, su estado actual y la fecha en que fueron publicadas.",
  users: "Revisa quienes se han registrado, su rol dentro de la plataforma y si ya fueron verificados.",
  applications:
    "Visualiza las solicitudes registradas con su mascota relacionada, ciudad y estado de seguimiento.",
};

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [reports, setReports] = useState<AdminReportRecord[]>([]);
  const [contributions, setContributions] = useState<AdminContributionRecord[]>([]);
  const [reportDetail, setReportDetail] = useState<ReportDetailState | null>(null);
  const [detailRows, setDetailRows] = useState<
    AdminUserDetailRecord[] | AdminPetDetailRecord[] | AdminApplicationDetailRecord[]
  >([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [error, setError] = useState("");

  const highlightedReports = (dashboard?.stats ?? []).filter((stat) =>
    ["pets", "users", "applications"].includes(stat.id),
  );

  async function handleOpenDetail(key: ReportCardKey, title: string) {
    setReportDetail({
      key,
      title,
      description: reportDescriptions[key],
    });
    setIsLoadingDetail(true);
    setDetailError("");
    setDetailRows([]);

    try {
      if (key === "pets") {
        const pets = await apiClient.admin.pets();
        setDetailRows(pets);
        return;
      }

      if (key === "users") {
        const users = await apiClient.admin.users();
        setDetailRows(users);
        return;
      }

      const applications = await apiClient.admin.applications();
      setDetailRows(applications);
    } catch (loadError) {
      setDetailError(
        loadError instanceof Error
          ? loadError.message
          : "No pudimos cargar el detalle de este reporte.",
      );
    } finally {
      setIsLoadingDetail(false);
    }
  }

  function closeDetailModal() {
    setReportDetail(null);
    setDetailRows([]);
    setDetailError("");
    setIsLoadingDetail(false);
  }

  useEffect(() => {
    let cancelled = false;

    async function loadAdminData() {
      try {
        const [dashboardData, reportsData, contributionsData] = await Promise.all([
          apiClient.admin.dashboard(),
          apiClient.admin.reports(),
          apiClient.admin.contributions(),
        ]);

        if (cancelled) {
          return;
        }

        setDashboard(dashboardData);
        setReports(reportsData);
        setContributions(contributionsData);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "No pudimos cargar el panel administrativo.",
        );
      }
    }

    void loadAdminData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminShell
      title="Resumen administrativo"
      description="Visualiza el estado general de la plataforma, los casos con prioridad y las contribuciones manuales pendientes."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {(dashboard?.stats ?? []).map((stat) => (
          <StatCard key={stat.id} label={stat.label} value={stat.value} note={stat.note} />
        ))}
      </section>

      <Card className="space-y-4">
        <h2 className="text-3xl font-semibold text-[var(--color-text)]">
          Acciones rapidas
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(dashboard?.quickActions ?? []).map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] bg-[var(--color-bg-soft)] p-4 text-sm leading-7 text-[var(--color-muted)]"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <div>
          <h2 className="text-3xl font-semibold text-[var(--color-text)]">
            Reportes clave
          </h2>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            Resumen rapido de total de mascotas registradas, usuarios registrados y solicitudes registradas.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlightedReports.map((report) => (
            <button
              key={report.id}
              type="button"
              onClick={() => handleOpenDetail(report.id as ReportCardKey, report.label)}
              className="rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5 text-left transition hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
            >
              <p className="text-sm font-semibold text-[var(--color-muted)]">{report.label}</p>
              <p className="mt-3 text-4xl font-semibold text-[var(--color-text)]">
                {report.value}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{report.note}</p>
              <p className="mt-4 text-sm font-semibold text-[var(--color-primary)]">
                Ver detalle
              </p>
            </button>
          ))}
        </div>
      </Card>

      <ReportsTable reports={reports.slice(0, 2)} />
      <ContributionsTable contributions={contributions.slice(0, 2)} />

      {reportDetail ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,17,31,0.62)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label={reportDetail.title}
          onClick={closeDetailModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[1.9rem] bg-white p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-[var(--color-text)]">
                  {reportDetail.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  {reportDetail.description}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDetailModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl text-[var(--color-text)] shadow-sm"
                aria-label="Cerrar detalle del reporte"
              >
                X
              </button>
            </div>

            {isLoadingDetail ? (
              <Card className="text-sm leading-7 text-[var(--color-muted)]">
                Cargando informacion detallada...
              </Card>
            ) : detailError ? (
              <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
                {detailError}
              </Card>
            ) : reportDetail.key === "pets" ? (
              <div className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)]">
                <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
                  <thead className="bg-[var(--color-bg-soft)] text-left text-[var(--color-muted)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Mascota</th>
                      <th className="px-4 py-3 font-semibold">Especie</th>
                      <th className="px-4 py-3 font-semibold">Ubicacion</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Visibilidad</th>
                      <th className="px-4 py-3 font-semibold">Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)] bg-white">
                    {(detailRows as AdminPetDetailRecord[]).map((pet) => (
                      <tr key={pet.id}>
                        <td className="px-4 py-3 text-[var(--color-text)]">{pet.name}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{pet.speciesLabel}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{pet.location}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{pet.statusLabel}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{pet.activeLabel}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{pet.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : reportDetail.key === "users" ? (
              <div className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)]">
                <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
                  <thead className="bg-[var(--color-bg-soft)] text-left text-[var(--color-muted)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Nombre</th>
                      <th className="px-4 py-3 font-semibold">Correo</th>
                      <th className="px-4 py-3 font-semibold">Rol</th>
                      <th className="px-4 py-3 font-semibold">Verificacion</th>
                      <th className="px-4 py-3 font-semibold">Estado</th>
                      <th className="px-4 py-3 font-semibold">Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)] bg-white">
                    {(detailRows as AdminUserDetailRecord[]).map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3 text-[var(--color-text)]">{user.name}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{user.email}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{user.role}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{user.verifiedLabel}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{user.activeLabel}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">{user.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="rounded-[1.4rem] bg-[var(--color-primary-soft)] text-sm leading-7 text-[var(--color-primary-dark)]">
                  Solicitudes totales: {(detailRows as AdminApplicationDetailRecord[]).length}.{" "}
                  Pendientes o en revision:{" "}
                  {
                    (detailRows as AdminApplicationDetailRecord[]).filter((application) =>
                      ["Nueva", "En revision"].includes(application.statusLabel),
                    ).length
                  }
                  .
                </Card>
                <div className="overflow-hidden rounded-[1.6rem] border border-[var(--color-border)]">
                  <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
                    <thead className="bg-[var(--color-bg-soft)] text-left text-[var(--color-muted)]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Mascota</th>
                        <th className="px-4 py-3 font-semibold">Solicitante</th>
                        <th className="px-4 py-3 font-semibold">Correo</th>
                        <th className="px-4 py-3 font-semibold">Ciudad</th>
                        <th className="px-4 py-3 font-semibold">Estado</th>
                        <th className="px-4 py-3 font-semibold">Registro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)] bg-white">
                      {(detailRows as AdminApplicationDetailRecord[]).map((application) => (
                        <tr key={application.id}>
                          <td className="px-4 py-3 text-[var(--color-text)]">{application.petName}</td>
                          <td className="px-4 py-3 text-[var(--color-muted)]">{application.applicantName}</td>
                          <td className="px-4 py-3 text-[var(--color-muted)]">{application.email}</td>
                          <td className="px-4 py-3 text-[var(--color-muted)]">{application.city}</td>
                          <td className="px-4 py-3 text-[var(--color-muted)]">{application.statusLabel}</td>
                          <td className="px-4 py-3 text-[var(--color-muted)]">{application.submittedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </AdminShell>
  );
}
