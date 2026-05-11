import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { env } from "./env";

let supabaseAdminClient: SupabaseClient | null = null;

const createSupabaseAdminClient = () => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

export const getSupabaseAdminClient = () => {
  if (!supabaseAdminClient) {
    supabaseAdminClient = createSupabaseAdminClient();
  }

  return supabaseAdminClient;
};

export const supabaseAdmin = getSupabaseAdminClient();
