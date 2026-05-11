alter table public.users
  add column if not exists accepted_terms_at timestamptz;

alter table public.adoption_applications
  add column if not exists accepted_terms_at timestamptz;
