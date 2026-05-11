"use client";

import { useEffect, useState } from "react";

import { AdminShell } from "@/components/dashboard/AdminShell";
import { ReportsTable } from "@/components/dashboard/ReportsTable";
import { Card } from "@/components/ui/Card";
import { apiClient, type AdminReportRecord } from "@/lib/api";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";

export default function AdminReportesPage() {
  const [reports, setReports] = useState<AdminReportRecord[]>([]);
  const [error, setError] = useState("");
  const [activeReportId, setActiveReportId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      try {
        const reportsData = await apiClient.admin.reports();

        if (!cancelled) {
          setReports(reportsData);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar los reportes.",
          );
        }
      }
    }

    void loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleMarkReviewed(reportId: string) {
    setError("");
    setActiveReportId(reportId);

    try {
      const updatedReport = await apiClient.admin.updateReportStatus(reportId, {
        status: "reviewed",
      });

      setReports((current) =>
        current.map((report) => (report.id === reportId ? updatedReport : report)),
      );
      await showSuccessAlert("Reporte actualizado", "El reporte se marco en revision.");
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos actualizar el reporte.";
      setError(message);
      await showErrorAlert("No pudimos actualizar el reporte", message);
    } finally {
      setActiveReportId(null);
    }
  }

  async function handleResolve(reportId: string, adminNotes: string) {
    setError("");
    setActiveReportId(reportId);

    try {
      const updatedReport = await apiClient.admin.updateReportStatus(reportId, {
        status: "resolved",
        adminNotes: adminNotes || undefined,
      });

      setReports((current) =>
        current.map((report) => (report.id === reportId ? updatedReport : report)),
      );
      await showSuccessAlert("Reporte resuelto", "El reporte se resolvio correctamente.");
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos resolver el reporte.";
      setError(message);
      await showErrorAlert("No pudimos resolver el reporte", message);
    } finally {
      setActiveReportId(null);
    }
  }

  return (
    <AdminShell
      title="Reportes pendientes"
      description="Revisa publicaciones, usuarios o casos senalados por la comunidad y prioriza las acciones de moderacion."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      <ReportsTable
        reports={reports}
        onMarkReviewed={handleMarkReviewed}
        onResolve={handleResolve}
        activeReportId={activeReportId}
      />
    </AdminShell>
  );
}
