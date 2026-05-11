# 08 API and Database Contract

The backend is built after the frontend. Use this file to connect both sides without losing context.

## Base URL

Development:

```text
http://localhost:5000/api
```

Frontend env variable:

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Response shape

Recommended success response:

```json
{
  "success": true,
  "data": {},
  "message": "Operación completada correctamente"
}
```

Recommended error response:

```json
{
  "success": false,
  "message": "Mensaje de error en español",
  "errors": []
}
```

## API endpoints

### Auth

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/register` | Public | Register user |
| POST | `/auth/login` | Public | Login user |
| GET | `/auth/me` | JWT | Current user |
| PUT | `/auth/profile` | JWT | Update profile |
| POST | `/auth/logout` | JWT | Logout placeholder/client token cleanup |

### Pets

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/pets` | Public | List pets with filters |
| GET | `/pets/:id` | Public | Pet details |
| POST | `/pets` | Rescuer/Admin | Create pet |
| PUT | `/pets/:id` | Owner/Admin | Update pet |
| DELETE | `/pets/:id` | Owner/Admin | Deactivate/delete pet |
| POST | `/pets/:id/images` | Owner/Admin | Upload images |
| PATCH | `/pets/:id/status` | Owner/Admin | Update adoption status |
| PATCH | `/pets/:id/urgent` | Owner/Admin | Toggle urgent |
| PATCH | `/pets/:id/featured` | Admin | Toggle featured after confirmation |

GET `/pets` optional query params:

- `species=dog|cat`
- `age=string`
- `gender=male|female`
- `size=small|medium|large`
- `location=string`
- `country=string`
- `state=string`
- `city=string`
- `status=available|in_process|adopted`
- `urgent=true|false`
- `featured=true|false`
- `search=string`

### Adoption applications

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/applications` | Adopter | Submit application |
| GET | `/applications/my` | Adopter | My applications |
| GET | `/pets/:id/applications` | Pet owner/Admin | Applications for pet |
| GET | `/applications/:id` | Owner applicant/Pet owner/Admin | Application detail |
| PATCH | `/applications/:id/status` | Pet owner/Admin | Update status |
| DELETE | `/applications/:id` | Applicant/Admin | Cancel application |

### Bank info and contributions

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/bank-info` | Public | Active bank info |
| POST | `/contributions` | JWT/Public optional | Register contribution intent |
| POST | `/contributions/:id/proof` | JWT | Upload proof |
| GET | `/contributions/my` | JWT | My contributions |
| GET | `/admin/contributions` | Admin | List all contributions |
| PATCH | `/admin/contributions/:id/confirm` | Admin | Confirm contribution |
| PATCH | `/admin/contributions/:id/reject` | Admin | Reject contribution |

### Reports

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/reports` | JWT | Report pet/user |
| GET | `/admin/reports` | Admin | List reports |
| GET | `/admin/reports/:id` | Admin | Report detail |
| PATCH | `/admin/reports/:id/status` | Admin | Update report status |

### Complaints / Quejas

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/complaints` | Public/JWT optional | Submit complaint |
| GET | `/admin/complaints` | Admin | List complaints |
| GET | `/admin/complaints/:id` | Admin | Complaint detail |
| PATCH | `/admin/complaints/:id/status` | Admin | Update complaint status |

### Admin

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/admin/dashboard` | Admin | Stats |
| GET | `/admin/users` | Admin | Users |
| PATCH | `/admin/users/:id/verify` | Admin | Verify rescuer |
| PATCH | `/admin/users/:id/deactivate` | Admin | Deactivate user |
| GET | `/admin/pets` | Admin | All pets |
| PATCH | `/admin/pets/:id/deactivate` | Admin | Deactivate pet |
| POST | `/admin/bank-info` | Admin | Create bank info |
| PUT | `/admin/bank-info/:id` | Admin | Update bank info |
| PATCH | `/admin/bank-info/:id/active` | Admin | Set active bank info |

## Auth header

Use:

```http
Authorization: Bearer <token>
```

## Database schema

Use Supabase PostgreSQL.

### Extensions

```sql
create extension if not exists "pgcrypto";
```

### Users table

```sql
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  phone text,
  role text not null check (role in ('adopter', 'rescuer', 'admin')),
  is_verified boolean not null default false,
  is_active boolean not null default true,
  accepted_terms_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Pets table

```sql
create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  species text not null check (species in ('dog', 'cat')),
  age text not null,
  gender text not null check (gender in ('male', 'female')),
  size text,
  location text not null,
  country text,
  state text,
  city text,
  health_status text not null,
  sterilized boolean not null default false,
  personality text not null,
  description text not null,
  requirements text not null,
  status text not null default 'available' check (status in ('available', 'in_process', 'adopted')),
  is_urgent boolean not null default false,
  is_featured boolean not null default false,
  featured_until timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Pet images table

```sql
create table if not exists public.pet_images (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  image_url text not null,
  cloudinary_public_id text,
  is_main boolean not null default false,
  created_at timestamptz not null default now()
);
```

### Adoption applications table

```sql
create table if not exists public.adoption_applications (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  adopter_id uuid references public.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  home_type text not null check (home_type in ('house', 'apartment')),
  owns_or_rents text check (owns_or_rents in ('owns', 'rents')),
  has_other_pets boolean not null default false,
  adopted_before boolean not null default false,
  reason text not null,
  accepts_followup boolean not null default false,
  accepts_requirements boolean not null default false,
  accepted_terms_at timestamptz,
  status text not null default 'new' check (status in ('new', 'under_review', 'approved', 'rejected', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Bank info table

```sql
create table if not exists public.bank_info (
  id uuid primary key default gen_random_uuid(),
  bank_name text not null,
  account_holder_name text not null,
  clabe text,
  card_number text,
  instructions text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Contributions table

```sql
create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  pet_id uuid references public.pets(id) on delete set null,
  contribution_type text not null check (contribution_type in ('donation', 'featured_listing', 'veterinary_partner', 'sponsorship')),
  amount numeric(10, 2) not null check (amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected')),
  bank_name text,
  account_holder_name text,
  reference_note text,
  proof_image_url text,
  proof_cloudinary_public_id text,
  admin_notes text,
  featured_days integer,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz
);
```

### Reports table

```sql
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.users(id) on delete set null,
  pet_id uuid references public.pets(id) on delete set null,
  reported_user_id uuid references public.users(id) on delete set null,
  reason text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'resolved')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Complaints table

```sql
create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'resolved')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## Useful indexes

```sql
create index if not exists idx_pets_owner_id on public.pets(owner_id);
create index if not exists idx_pets_species on public.pets(species);
create index if not exists idx_pets_status on public.pets(status);
create index if not exists idx_pets_location on public.pets(location);
create index if not exists idx_pets_country on public.pets(country);
create index if not exists idx_pets_state on public.pets(state);
create index if not exists idx_pets_city on public.pets(city);
create index if not exists idx_pets_featured_until on public.pets(featured_until);
create index if not exists idx_pet_images_pet_id on public.pet_images(pet_id);
create index if not exists idx_applications_pet_id on public.adoption_applications(pet_id);
create index if not exists idx_applications_adopter_id on public.adoption_applications(adopter_id);
create index if not exists idx_contributions_status on public.contributions(status);
create index if not exists idx_complaints_status on public.complaints(status);
create index if not exists idx_reports_status on public.reports(status);
```

## RLS note

Because this project uses an Express backend with the Supabase service role key, the backend controls authorization. The frontend must not access tables directly with a service role key.

## Pet location migration

If you already created the `pets` table before adding structured location fields, run:

```sql
alter table public.pets
  add column if not exists country text,
  add column if not exists state text,
  add column if not exists city text;

update public.pets
set
  city = trim(split_part(location, ',', 1)),
  state = nullif(trim(split_part(location, ',', 2)), ''),
  country = nullif(trim(split_part(location, ',', 3)), '')
where location is not null
  and (country is null or state is null or city is null);

create index if not exists idx_pets_country on public.pets(country);
create index if not exists idx_pets_state on public.pets(state);
create index if not exists idx_pets_city on public.pets(city);
```

The same SQL is also saved in [backend/sql/2026-05-04_add_pet_location_columns.sql](/c:/Users/Alberto/Documents/Adopta_Miauw_wau/backend/sql/2026-05-04_add_pet_location_columns.sql:1).

If you want to remove the adoption form field "La vivienda es propia o rentada?", run this too:

```sql
alter table public.adoption_applications
  alter column owns_or_rents drop not null;
```

The same SQL is also saved in [backend/sql/2026-05-04_make_application_ownership_optional.sql](/c:/Users/Alberto/Documents/Adopta_Miauw_wau/backend/sql/2026-05-04_make_application_ownership_optional.sql:1).

If you want anonymous visitors to submit adoption applications without logging in, run this too:

```sql
alter table public.adoption_applications
  alter column adopter_id drop not null;
```

The same SQL is also saved in [backend/sql/2026-05-04_make_application_adopter_optional.sql](/c:/Users/Alberto/Documents/Adopta_Miauw_wau/backend/sql/2026-05-04_make_application_adopter_optional.sql:1).

If you want to add the complaints/quejas module, run this too:

```sql
create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'resolved')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_complaints_status on public.complaints(status);
create index if not exists idx_complaints_created_at on public.complaints(created_at);
create index if not exists idx_complaints_user_id on public.complaints(user_id);
```

The same SQL is also saved in [backend/sql/2026-05-07_add_complaints_module.sql](/c:/Users/Alberto/Documents/Adopta_Miauw_wau/backend/sql/2026-05-07_add_complaints_module.sql:1).

If you want to track acceptance of terms and policies in registration and adoption forms, run this too:

```sql
alter table public.users
  add column if not exists accepted_terms_at timestamptz;

alter table public.adoption_applications
  add column if not exists accepted_terms_at timestamptz;
```

The same SQL is also saved in [backend/sql/2026-05-11_add_terms_acceptance_tracking.sql](/c:/Users/Alberto/Documents/Adopta_Miauw_wau/backend/sql/2026-05-11_add_terms_acceptance_tracking.sql:1).
