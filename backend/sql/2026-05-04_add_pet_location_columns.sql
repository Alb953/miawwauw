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
