import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { CreateComplaintInput, UpdateComplaintStatusInput } from "./complaints.schemas";

export type ComplaintRecord = {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "pending" | "reviewed" | "resolved";
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const complaintSelectFields =
  "id, user_id, full_name, email, phone, subject, message, status, admin_notes, created_at, updated_at";

const getComplaintByIdInternal = async (complaintId: string) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("complaints")
    .select(complaintSelectFields)
    .eq("id", complaintId)
    .maybeSingle<ComplaintRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible consultar la queja", [error.message]);
  }

  return data;
};

export const createComplaint = async (input: CreateComplaintInput, userId?: string) => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("complaints")
    .insert({
      user_id: userId ?? null,
      full_name: input.full_name,
      email: input.email,
      phone: input.phone?.trim() || null,
      subject: input.subject,
      message: input.message,
      status: "pending",
      admin_notes: null,
      created_at: now,
      updated_at: now,
    })
    .select(complaintSelectFields)
    .single<ComplaintRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible registrar la queja", [error.message]);
  }

  return data;
};

export const listComplaints = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("complaints")
    .select(complaintSelectFields)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "No fue posible listar las quejas", [error.message]);
  }

  return (data ?? []) as ComplaintRecord[];
};

export const getComplaintDetail = async (complaintId: string) => {
  const complaint = await getComplaintByIdInternal(complaintId);

  if (!complaint) {
    throw new ApiError(404, "No se encontro la queja");
  }

  return complaint;
};

export const updateComplaintStatus = async (
  complaintId: string,
  input: UpdateComplaintStatusInput,
) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("complaints")
    .update({
      status: input.status,
      admin_notes: input.admin_notes ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", complaintId)
    .select(complaintSelectFields)
    .maybeSingle<ComplaintRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar la queja", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la queja");
  }

  return data;
};
