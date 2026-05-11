"use client";

import { useEffect, useState } from "react";

import { ComplaintsTable } from "@/components/dashboard/ComplaintsTable";
import { AdminShell } from "@/components/dashboard/AdminShell";
import { Card } from "@/components/ui/Card";
import { showErrorAlert, showSuccessAlert } from "@/lib/alerts";
import { apiClient, type AdminComplaintRecord } from "@/lib/api";

export default function AdminQuejasPage() {
  const [complaints, setComplaints] = useState<AdminComplaintRecord[]>([]);
  const [error, setError] = useState("");
  const [activeComplaintId, setActiveComplaintId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadComplaints() {
      try {
        const complaintsData = await apiClient.admin.complaints();

        if (!cancelled) {
          setComplaints(complaintsData);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No pudimos cargar las quejas.",
          );
        }
      }
    }

    void loadComplaints();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleMarkReviewed(complaintId: string) {
    setError("");
    setActiveComplaintId(complaintId);

    try {
      const updatedComplaint = await apiClient.admin.updateComplaintStatus(complaintId, {
        status: "reviewed",
      });

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.id === complaintId ? updatedComplaint : complaint,
        ),
      );
      await showSuccessAlert("Queja actualizada", "La queja se marco en revision.");
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos actualizar la queja.";
      setError(message);
      await showErrorAlert("No pudimos actualizar la queja", message);
    } finally {
      setActiveComplaintId(null);
    }
  }

  async function handleResolve(complaintId: string, adminNotes: string) {
    setError("");
    setActiveComplaintId(complaintId);

    try {
      const updatedComplaint = await apiClient.admin.updateComplaintStatus(complaintId, {
        status: "resolved",
        adminNotes: adminNotes || undefined,
      });

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.id === complaintId ? updatedComplaint : complaint,
        ),
      );
      await showSuccessAlert("Queja resuelta", "La queja se resolvio correctamente.");
    } catch (actionError) {
      const message =
        actionError instanceof Error
          ? actionError.message
          : "No pudimos resolver la queja.";
      setError(message);
      await showErrorAlert("No pudimos resolver la queja", message);
    } finally {
      setActiveComplaintId(null);
    }
  }

  return (
    <AdminShell
      title="Quejas recibidas"
      description="Consulta los mensajes de inconformidad enviados por la comunidad y da seguimiento administrativo."
    >
      {error ? (
        <Card className="rounded-[1.4rem] bg-[var(--color-secondary)]/10 text-sm leading-7 text-[var(--color-secondary)]">
          {error}
        </Card>
      ) : null}

      <ComplaintsTable
        complaints={complaints}
        onMarkReviewed={handleMarkReviewed}
        onResolve={handleResolve}
        activeComplaintId={activeComplaintId}
      />
    </AdminShell>
  );
}
