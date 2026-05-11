# 02 Codex Rules — Keep Context Stable

This file exists so Codex does not lose context during the build.

## Session protocol

At the start of every Codex session:

1. Read `00_START_HERE.md`.
2. Read `10_BUILD_STATE_CHANGELOG.md`.
3. Read the phase-specific plan.
4. Confirm the current step.
5. Work only on the current step unless the user explicitly asks otherwise.

## Build philosophy

Build in small steps.

Each step must include:

- Goal
- Files to create/edit
- Implementation notes
- Acceptance criteria
- Test command or manual test

## Frontend-first rule

The project must start with the frontend.

Frontend phases:

1. Create Next.js project.
2. Configure Tailwind and global design tokens.
3. Build layout, header, footer, and base components.
4. Build Home page using mock data.
5. Build Mascotas listing page using mock data.
6. Build pet detail page using mock data.
7. Build adoption application UI.
8. Build auth pages UI.
9. Build rescuer dashboard UI.
10. Build admin dashboard UI.
11. Add frontend service layer that can later call backend.

Backend begins only after these are working.

## Backend-after-frontend rule

Backend phases:

1. Create Express project.
2. Configure environment variables and server structure.
3. Add health endpoint.
4. Add auth module.
5. Add pets module.
6. Add adoption applications module.
7. Add contributions and bank info module.
8. Add reports module.
9. Add admin module.
10. Add Cloudinary upload module.
11. Add Supabase database connection.
12. Connect frontend to backend.

## Spanish frontend text rule

All visible UI text must be Spanish.

Bad:

```tsx
<button>View Details</button>
```

Good:

```tsx
<button>Ver detalles</button>
```

## Next.js routing rule

Use App Router routes.

Do not install or use React Router.

Recommended frontend routes:

- `/` → Inicio
- `/mascotas` → Mascotas
- `/mascotas/[id]` → Detalle de mascota
- `/registro` → Registro
- `/login` → Iniciar sesión
- `/panel/rescatista` → Panel de rescatista
- `/panel/rescatista/mascotas/nueva` → Registrar mascota
- `/panel/rescatista/mascotas/[id]/editar` → Editar mascota
- `/panel/adoptante/solicitudes` → Mis solicitudes
- `/admin` → Panel admin
- `/admin/reportes` → Reportes
- `/admin/contribuciones` → Contribuciones
- `/apoyar` → Apoyo voluntario
- `/destacar` → Mascota destacada
- `/adopcion-responsable` → Adopción responsable
- `/contacto` → Contacto

## Quality rules

- Use TypeScript types.
- Use reusable components.
- Avoid large files.
- Keep pages thin and components organized.
- Use mock data first.
- Use API client functions later.
- Add loading, empty, and error states.
- Use accessible labels for forms.
- Do not expose private information in public components.

## Logging rule

During development, add helpful console logs only where useful:

- Form submission payloads without passwords.
- API request start/success/error.
- Auth state changes without tokens.

Remove noisy logs before production-ready cleanup.

## Definition of done per task

A task is done when:

- The app builds.
- The route/page works.
- UI text is Spanish.
- Styling follows template.
- There are no obvious TypeScript errors.
- `10_BUILD_STATE_CHANGELOG.md` is updated.
