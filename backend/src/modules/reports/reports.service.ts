import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { CreateReportInput, UpdateReportStatusInput } from "./reports.schemas";

export type ReportRecord = {
  id: string;
  reporter_id: string | null;
  pet_id: string | null;
  reported_user_id: string | null;
  reason: string;
  status: "pending" | "reviewed" | "resolved";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const reportSelectFields =
  "id, reporter_id, pet_id, reported_user_id, reason, status, admin_notes, created_at, updated_at";

const getReportByIdInternal = async (reportId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reports")
    .select(reportSelectFields)
    .eq("id", reportId)
    .maybeSingle<ReportRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar el reporte", [error.message]);
  }

  return data;
};

export const createReport = async (input: CreateReportInput, reporterId: string) => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("reports")
    .insert({
      reporter_id: reporterId,
      pet_id: input.pet_id ?? null,
      reported_user_id: input.reported_user_id ?? null,
      reason: input.reason,
      status: "pending",
      admin_notes: null,
      created_at: now,
      updated_at: now,
    })
    .select(reportSelectFields)
    .single<ReportRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible registrar el reporte", [error.message]);
  }

  return data;
};

export const listReports = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reports")
    .select(reportSelectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar los reportes", [error.message]);
  }

  return (data ?? []) as ReportRecord[];
};

export const getReportDetail = async (reportId: string) => {
  const report = await getReportByIdInternal(reportId);

  if (!report) {
    throw new ApiError(404, "No se encontro el reporte");
  }

  return report;
};

export const updateReportStatus = async (reportId: string, input: UpdateReportStatusInput) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("reports")
    .update({
      status: input.status,
      admin_notes: input.admin_notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reportId)
    .select(reportSelectFields)
    .maybeSingle<ReportRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar el reporte", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro el reporte");
  }

  return data;
};
