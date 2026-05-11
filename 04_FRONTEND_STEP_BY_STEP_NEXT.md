# 04 Frontend Step-by-Step Build Plan — Next.js First

This project must start with the frontend. The frontend should be built with mock data first so the design, routes, and UX are stable before the backend is added.

## Frontend stack

- Next.js with App Router.
- TypeScript.
- Tailwind CSS.
- `next/font` for typography.
- No React Router.
- Fetch API or a small API client wrapper.
- Mock data before backend integration.

## Recommended project command

From repository root:

```bash
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

When setup asks questions, choose:

- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: optional. If it causes issues, use the normal dev command without Turbopack.
- Import alias: `@/*`

## Recommended frontend folder structure

```text
frontend/
  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      mascotas/
        page.tsx
        [id]/page.tsx
      registro/page.tsx
      login/page.tsx
      panel/
        rescatista/
          page.tsx
          mascotas/
            nueva/page.tsx
            [id]/editar/page.tsx
        adoptante/solicitudes/page.tsx
      admin/
        page.tsx
        reportes/page.tsx
        contribuciones/page.tsx
      apoyar/page.tsx
      destacar/page.tsx
      adopcion-responsable/page.tsx
      contacto/page.tsx
    components/
      layout/
      home/
      pets/
      forms/
      dashboard/
      ui/
    data/
      mockPets.ts
      mockApplications.ts
      mockDashboard.ts
    lib/
      api.ts
      constants.ts
      formatters.ts
      routes.ts
      types.ts
```

## Phase F0 — Initialize Next.js project

Goal: create project and basic structure.

Tasks:

1. Create Next app.
2. Confirm app runs.
3. Create folder structure.
4. Add base constants and TypeScript types.
5. Add mock data.

Acceptance criteria:

- `npm run dev` works.
- Home route loads.
- No React Router installed.
- Project has organized folders.

## Phase F1 — Global style system

Goal: implement the visual style from `template.png`.

Tasks:

1. Configure fonts in `layout.tsx`.
2. Add CSS variables in `globals.css`.
3. Add global body background and text color.
4. Add reusable `Button`, `Badge`, `Card`, `Input`, `Select`, `Textarea` components.
5. Create layout max-width utility patterns.

Acceptance criteria:

- UI uses teal/orange/cream palette.
- Typography matches elegant template feel.
- Buttons and cards look consistent.
- App is responsive.

## Phase F2 — Layout, header, footer

Goal: create site shell.

Tasks:

1. Create `Header.tsx`.
2. Create `Footer.tsx`.
3. Add nav links in Spanish.
4. Add responsive/mobile behavior.
5. Add active link styling.

Acceptance criteria:

- Header matches template structure.
- Logo text is visible.
- Links are Spanish.
- Buttons say `Iniciar sesión` and `Registrarme`.
- Footer has Spanish links.

## Phase F3 — Home page

Goal: recreate the template composition in Spanish.

Sections:

1. Hero.
2. Floating search panel.
3. Mascotas destacadas.
4. Casos urgentes.
5. Cómo funciona la adopción.
6. Apoya la plataforma.
7. Footer.

Acceptance criteria:

- Home visually follows template.
- All text is Spanish.
- Uses mock pets.
- Buttons route to correct pages.

## Phase F4 — Mascotas listing page

Goal: build public pet catalog.

Tasks:

1. Page `/mascotas`.
2. Search/filter panel.
3. Pet card grid.
4. Empty state.
5. Featured and urgent badges.
6. Query params optional.

Filters:

- Especie
- Edad
- Género
- Tamaño
- Ubicación
- Estado
- Urgente

Acceptance criteria:

- Filters work with mock data.
- Cards are responsive.
- Spanish labels.
- Detail button routes to `/mascotas/[id]`.

## Phase F5 — Pet detail page

Goal: build individual pet profile.

Sections:

1. Photo gallery.
2. Basic information.
3. Health information.
4. Personality.
5. Story/description.
6. Adoption requirements.
7. Rescuer information.
8. Adoption application CTA.
9. WhatsApp/email contact button.
10. Voluntary support button.

Acceptance criteria:

- Dynamic route works with mock data.
- Unknown pet shows friendly not-found state.
- Adopted pets show no new application CTA.

## Phase F6 — Adoption application UI

Goal: allow adopters to submit application UI.

Required fields:

- Nombre completo
- Correo
- Teléfono
- Ciudad
- Tipo de vivienda
- Casa propia o renta
- ¿Tienes otras mascotas?
- ¿Has adoptado antes?
- ¿Por qué quieres adoptar?
- ¿Aceptas seguimiento?
- ¿Aceptas requisitos de adopción?

Acceptance criteria:

- Form validates required fields.
- Submission shows success message in Spanish.
- No real backend call yet.

## Phase F7 — Auth pages UI

Goal: create visual login/register pages.

Pages:

- `/registro`
- `/login`

Register fields:

- Nombre
- Correo
- Contraseña
- Teléfono
- Rol: adoptante/rescatista

Acceptance criteria:

- Spanish text.
- Validations.
- Mock submit.
- Clear note that backend connection comes later.

## Phase F8 — Rescuer dashboard UI

Goal: build rescuer dashboard using mock data.

Page:

- `/panel/rescatista`
- `/panel/rescatista/mascotas/nueva`
- `/panel/rescatista/mascotas/[id]/editar`

Sections:

- Mis mascotas registradas.
- Crear nueva mascota.
- Status controls.
- Applications received.
- Featured listing option.
- Urgent case option.
- Basic stats.

Acceptance criteria:

- Mock table/cards work.
- Pet form works visually.
- Spanish dashboard labels.

## Phase F9 — Admin dashboard UI

Goal: build admin mock dashboard.

Pages:

- `/admin`
- `/admin/reportes`
- `/admin/contribuciones`

Sections:

- Total mascotas registradas.
- Total adoptadas.
- Usuarios activos.
- Rescatistas.
- Reportes pendientes.
- Mascotas destacadas.
- Contribuciones pendientes.
- Acciones rápidas.

Acceptance criteria:

- Mock admin data works.
- Spanish labels.
- Clear admin-only future note.

## Phase F10 — Frontend API client layer

Goal: prepare frontend for backend integration.

Tasks:

1. Create `lib/api.ts`.
2. Create typed methods for future backend calls.
3. Keep mock fallback if `NEXT_PUBLIC_API_URL` is missing.
4. Add loading/error states.

Acceptance criteria:

- UI can still work with mock data.
- Backend URL can be configured later.
- No secret keys in frontend.
