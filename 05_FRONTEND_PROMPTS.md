# 05 Frontend Codex Prompts

Use these prompts one by one in Codex. Do not ask Codex to build everything at once.

## Prompt F0 — Initialize Next.js frontend

```text
Read these files first: 00_START_HERE.md, 01_PROJECT_CONTEXT.md, 02_CODEX_RULES.md, 03_UI_STYLE_GUIDE_TEMPLATE.md, 04_FRONTEND_STEP_BY_STEP_NEXT.md, 10_BUILD_STATE_CHANGELOG.md.

We are building Adopta Miauw Wau. Start with the frontend only.

Create a Next.js project inside /frontend using TypeScript, Tailwind, ESLint, App Router, src directory, and alias @/*.

Do not use React Router.

After creating the project, create the recommended folder structure from 04_FRONTEND_STEP_BY_STEP_NEXT.md. Add placeholder files only where necessary. Add /src/lib/types.ts, /src/lib/routes.ts, /src/lib/constants.ts, and /src/data/mockPets.ts.

All frontend visible text must be in Spanish.

When done, update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F1 — Add global style system

```text
Read 03_UI_STYLE_GUIDE_TEMPLATE.md and 04_FRONTEND_STEP_BY_STEP_NEXT.md.

Implement the global visual system for the Next.js frontend based on assets/template.png.

Tasks:
- Add CSS variables in src/app/globals.css.
- Configure heading and body fonts using next/font/google.
- Set body background, text color, smooth font rendering.
- Create reusable UI components: Button, Badge, Card, Input, Select, Textarea, EmptyState, LoadingState.
- Use TypeScript props and Tailwind classes.
- Keep the visual style white, cream, teal, orange, rounded, soft shadow.

All visible component text or placeholders must be Spanish.

Run lint/build checks if available.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F2 — Header and footer

```text
Build the layout shell.

Read 03_UI_STYLE_GUIDE_TEMPLATE.md.

Create:
- src/components/layout/Header.tsx
- src/components/layout/Footer.tsx
- src/components/layout/MobileNav.tsx if useful

Update src/app/layout.tsx to render Header and Footer.

Header must match the template style:
- Logo left: Adopta Miauw Wau
- Nav center: Inicio, Mascotas, Cómo funciona, Apoyar
- Right buttons: Iniciar sesión, Registrarme
- Active link underline/accent in teal
- Mobile responsive menu

Footer must include:
- Brand block
- Explorar links
- Recursos links
- Apoyo links
- Social placeholders

All visible text must be Spanish.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F3 — Home page

```text
Build the Home page based on assets/template.png.

Create components:
- Hero
- SearchPanel
- FeaturedPets
- UrgentCases
- HowItWorks
- SupportCard

Use mock data from src/data/mockPets.ts.

Spanish copy:
- Encuentra a tu nuevo mejor amigo
- Adoptar una mascota
- Registrar una mascota
- Mascotas destacadas
- Casos urgentes
- ¿Cómo funciona la adopción?
- Apoya la plataforma

Design requirements:
- White/cream background
- Teal primary button
- Orange outlined secondary button
- Floating search panel
- Rounded pet cards
- Featured and urgent badges
- Responsive layout

Do not connect backend yet.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F4 — Mascotas listing page

```text
Build /mascotas public listing page with mock data.

Create:
- src/app/mascotas/page.tsx
- src/components/pets/PetCard.tsx
- src/components/pets/PetFilters.tsx

Requirements:
- Search and filter by species, age, gender, size, location, status, urgent.
- Responsive grid.
- Empty state in Spanish.
- Card button: Ver detalles.
- Cards route to /mascotas/[id].
- Featured and urgent pets appear visually prioritized.

All UI text must be Spanish.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F5 — Pet detail page

```text
Build /mascotas/[id] detail page using mock data.

Create:
- src/app/mascotas/[id]/page.tsx
- src/components/pets/PetGallery.tsx
- src/components/pets/PetInfoPanel.tsx
- src/components/pets/AdoptionCta.tsx

Sections:
- Photo gallery
- Basic info
- Health status
- Personality
- Story/description
- Adoption requirements
- Rescuer info
- Adoption application CTA
- WhatsApp/email contact button
- Voluntary support button

Rules:
- If pet status is adopted, do not show adoption application CTA.
- If pet not found, show friendly Spanish not-found state.
- All visible text Spanish.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F6 — Adoption application form

```text
Build the adoption application form UI.

Create:
- src/components/forms/AdoptionApplicationForm.tsx

Add it to the pet detail page or a clear section under the adoption CTA.

Fields:
- Nombre completo
- Correo electrónico
- Teléfono
- Ciudad
- Tipo de vivienda
- ¿La vivienda es propia o rentada?
- ¿Tienes otras mascotas?
- ¿Has adoptado antes?
- ¿Por qué quieres adoptar esta mascota?
- ¿Aceptas seguimiento después de la adopción?
- ¿Aceptas los requisitos de adopción?

Use frontend validation. For now, submit to a mock handler and show a Spanish success message.

Do not send real backend requests yet.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F7 — Auth pages UI

```text
Build /registro and /login UI pages.

Create:
- src/app/registro/page.tsx
- src/app/login/page.tsx
- src/components/forms/AuthForm.tsx if useful

Register fields:
- Nombre
- Correo electrónico
- Contraseña
- Teléfono
- Rol: Adoptante or Rescatista

Login fields:
- Correo electrónico
- Contraseña

Use mock submit handlers for now.

All copy must be Spanish and friendly.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F8 — Rescuer dashboard UI

```text
Build the rescuer dashboard UI using mock data.

Routes:
- /panel/rescatista
- /panel/rescatista/mascotas/nueva
- /panel/rescatista/mascotas/[id]/editar

Create:
- DashboardShell
- StatCard
- PetManagementTable
- ApplicationsTable
- PetForm

Dashboard sections:
- Mis mascotas registradas
- Crear nueva mascota
- Solicitudes recibidas
- Estado de adopción
- Caso urgente
- Solicitar mascota destacada

PetForm fields must match project context.

No backend yet.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F9 — Admin dashboard UI

```text
Build admin dashboard UI using mock data.

Routes:
- /admin
- /admin/reportes
- /admin/contribuciones

Sections:
- Total de mascotas registradas
- Mascotas adoptadas
- Usuarios registrados
- Rescatistas activos
- Reportes pendientes
- Mascotas destacadas
- Contribuciones pendientes
- Acciones rápidas

Include tables for reports and contributions with mock statuses.

All text Spanish.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt F10 — Frontend API client preparation

```text
Prepare the frontend to connect to the backend later.

Create src/lib/api.ts with typed wrapper functions for:
- auth register/login/me/logout
- pets list/detail/create/update/status/images
- applications submit/my/by pet/status
- bank info
- contributions
- reports
- admin dashboard/users/pets/reports/contributions

Use NEXT_PUBLIC_API_URL for backend URL.

If NEXT_PUBLIC_API_URL is missing, keep mock data behavior.

Do not expose secrets.

Update 10_BUILD_STATE_CHANGELOG.md.
```
