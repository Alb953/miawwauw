import { getSupabaseAdminClient } from "../../config/supabase";
import { ApiError } from "../../utils/ApiError";
import type { CreateBankInfoInput, UpdateBankInfoInput } from "./bankInfo.schemas";

export type BankInfoRecord = {
  id: string;
  bank_name: string;
  account_holder_name: string;
  clabe: string | null;
  card_number: string | null;
  instructions: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const bankInfoSelectFields =
  "id, bank_name, account_holder_name, clabe, card_number, instructions, is_active, created_at, updated_at";

export const getActiveBankInfo = async () => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("bank_info")
    .select(bankInfoSelectFields)
    .eq("is_active", true)
    .order("updated_at", { ascending: false })
    .maybeSingle<BankInfoRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible obtener la informacion bancaria", [error.message]);
  }

  return data;
};

export const createBankInfo = async (input: CreateBankInfoInput) => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("bank_info")
    .insert({
      ...input,
      is_active: false,
      created_at: now,
      updated_at: now,
    })
    .select(bankInfoSelectFields)
    .single<BankInfoRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible crear la informacion bancaria", [error.message]);
  }

  return data;
};

export const updateBankInfo = async (bankInfoId: string, input: UpdateBankInfoInput) => {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("bank_info")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", bankInfoId)
    .select(bankInfoSelectFields)
    .maybeSingle<BankInfoRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible actualizar la informacion bancaria", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la informacion bancaria");
  }

  return data;
};

export const activateBankInfo = async (bankInfoId: string) => {
  const supabase = getSupabaseAdminClient();
  const now = new Date().toISOString();

  const { error: deactivateError } = await supabase
    .from("bank_info")
    .update({ is_active: false, updated_at: now })
    .eq("is_active", true);

  if (deactivateError) {
    throw new ApiError(500, "No fue posible desactivar la informacion bancaria anterior", [
      deactivateError.message,
    ]);
  }

  const { data, error } = await supabase
    .from("bank_info")
    .update({ is_active: true, updated_at: now })
    .eq("id", bankInfoId)
    .select(bankInfoSelectFields)
    .maybeSingle<BankInfoRecord>();

  if (error) {
    throw new ApiError(500, "No fue posible activar la informacion bancaria", [error.message]);
  }

  if (!data) {
    throw new ApiError(404, "No se encontro la informacion bancaria");
  }

  return data;
};
