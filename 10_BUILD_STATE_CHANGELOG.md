# 10 Build State and Changelog

This file must be updated by Codex after each completed step.

## Current phase

`B9_COMPLETED`

## Current build order

1. Frontend first.
2. Backend second.
3. Integration third.

## Completed documentation

- [x] Project context created.
- [x] Codex workflow rules created.
- [x] UI style guide based on template created.
- [x] Frontend build plan created.
- [x] Frontend Codex prompts created.
- [x] API and database contract created.
- [x] Backend build plan created.
- [x] Backend Codex prompts created.
- [x] Security/env/testing guide created.
- [x] QA checklist created.

## Next step

Frontend/backend integration phase `B9` is complete. Next recommended step: run the end-to-end QA pass from `11_QA_CHECKLIST.md`, verify the main user journeys, and document any final MVP gaps before deployment.

## Active constraints

- Frontend text must be Spanish.
- Use Next.js, not plain React + React Router.
- Follow `assets/template.png` visual style.
- Do not start backend until frontend mock UI structure is complete.
- Use mock data before backend integration.

## Blockers

None.

## Decisions made

| Decision | Status |
|---|---|
| Frontend framework | Next.js App Router |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase PostgreSQL |
| Images | Cloudinary |
| Auth | JWT from backend |
| Contributions | Manual bank transfer confirmation |
| Frontend language | Spanish |

## Expected repository structure after F0

```text
frontend/
backend/        # added later
docs/context md files at repo root
```

# Changelog

## 2026-04-26 - Documentation package created

Created project context documentation for **Adopta Miauw Wau**.

Included:

- Start-here guide.
- Project context.
- Codex workflow rules.
- UI style guide based on template.
- Frontend build plan for Next.js.
- Frontend prompt sequence.
- API and database contract.
- Backend build plan for Express.
- Backend prompt sequence.
- Security, environment, and testing guide.
- Build state tracker.

Next action:

- Run Prompt F0 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F0 completed

Completed the initial Next.js frontend setup for **Adopta Miauw Wau** inside `frontend/`.

Included:

- Next.js App Router project with TypeScript, Tailwind CSS, and ESLint.
- Base folder structure for app routes, components, data, and lib modules.
- Initial Spanish home page with project branding and mock pet preview.
- Base typography and color tokens aligned with the template direction.
- Core frontend helpers: `routes.ts`, `constants.ts`, `types.ts`.
- Initial mock datasets: `mockPets.ts`, `mockApplications.ts`, `mockDashboard.ts`.
- Next config adjusted to keep Turbopack rooted in `frontend/`.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- Build succeeds, but `Next.js 16.2.4` still prints a lockfile/SWC patch warning during build.
- `npm install` reports an engine warning because the local Node version is `20.17.0` and one transitive ESLint package prefers `^20.19.0`.

Next action:

- Run Prompt F1 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F1 completed

Implemented the global visual system for **Adopta Miauw Wau** in the Next.js frontend.

Included:

- Global design tokens for color, radius, shadow, section spacing, and surface styles in `src/app/globals.css`.
- Typography setup with `Playfair Display` for headings and `Nunito Sans` for body text.
- Reusable UI components: `Button`, `Badge`, `Card`, `Input`, `Select`, `Textarea`, `EmptyState`, and `LoadingState`.
- Small class utility helper in `src/lib/utils.ts`.
- Home page updated to use the shared UI primitives and a softer template-aligned visual direction.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- Frontend visible text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F2 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F2 completed

Built the shared site shell for **Adopta Miauw Wau**.

Included:

- Global `Header` with brand treatment, centered navigation, active link highlight, and auth buttons.
- Responsive `MobileNav` for smaller screens.
- Multi-column `Footer` with brand block, explore/resources/support links, and social placeholders.
- Shared `RoutePlaceholder` component for early frontend routes that are not fully designed yet.
- Layout integration so header and footer render across the app.
- Placeholder pages in Spanish for visible navigation routes to avoid broken navigation during the frontend build.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible shell text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F3 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F3 completed

Built the home page composition based on the visual direction from `assets/template.png`.

Included:

- New home sections: `Hero`, `SearchPanel`, `FeaturedPets`, `UrgentCases`, `HowItWorks`, and `SupportCard`.
- Reusable `PetCard` component for featured pet previews.
- Expanded mock pet data to support highlighted and urgent content states.
- CTA routes wired to valid pages, including a placeholder route for `/panel/rescatista/mascotas/nueva`.
- Temporary dynamic pet detail placeholder route for `/mascotas/[id]` so the home cards navigate correctly.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F4 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F4 completed

Built the public `Mascotas` listing page with working mock filters.

Included:

- Real catalog page at `/mascotas` with filter controls for species, age, gender, size, location, status, and urgent cases.
- Reusable `PetFilters` component using query string parameters.
- Updated `PetCard` styling to better prioritize featured and urgent pets visually.
- Filtered results grid with responsive layout and Spanish empty state.
- Catalog hero summary showing visible pets, urgent cases, and featured counts.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F5 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F5 completed

Built the individual pet detail page at `/mascotas/[id]` using enriched mock data.

Included:

- Real detail layout with `PetGallery`, `PetInfoPanel`, and `AdoptionCta` components.
- Expanded mock pet model with story, personality, requirements, health data, support message, and rescuer contact information.
- Friendly Spanish fallback state when a pet id is not found.
- Conditional CTA behavior so adopted pets do not show a new adoption application prompt.
- WhatsApp, email, and support actions in the detail sidebar.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F6 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F6 completed

Built the adoption application form UI and integrated it into the pet detail flow.

Included:

- New client-side `AdoptionApplicationForm` component with Spanish validation messages.
- Required fields for applicant identity, housing, previous adoption experience, motivation, and adoption agreement checkboxes.
- Mock submit handler with a Spanish success message and safe development console logging.
- Detail page integration so available and in-process pets show the form.
- Adopted pets continue without a new application form, preserving the business rule.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F7 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F7 completed

Built the frontend authentication UI for `/login` and `/registro`.

Included:

- Shared `AuthForm` component for login and registration flows.
- Spanish validation messages and mock submit handlers for both forms.
- Register UI with fields for name, email, password, phone, and role selection.
- Login UI with email and password fields.
- Friendly demo success states and links between access and registration pages.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F8 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F8 completed

Built the rescuer dashboard UI with mock data across the main panel, create pet, and edit pet flows.

Included:

- Shared dashboard layout with `DashboardShell`.
- Summary stats cards, pet management table, and applications table.
- Mock rescuer dashboard data and mock applications data.
- `PetForm` component for both new pet registration and edit flows.
- Working routes for `/panel/rescatista`, `/panel/rescatista/mascotas/nueva`, and `/panel/rescatista/mascotas/[id]/editar`.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F9 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F9 completed

Built the admin dashboard UI using mock data across summary, reports, and contributions views.

Included:

- New admin routes for `/admin`, `/admin/reportes`, and `/admin/contribuciones`.
- Shared `AdminShell` layout for administrative navigation and context.
- Mock admin stats, report records, and contribution records.
- Summary cards plus dedicated tables for reports and manual contributions.
- Spanish administrative copy aligned with the rest of the frontend.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- Backend work has not started.

Next action:

- Run Prompt F10 from `05_FRONTEND_PROMPTS.md`.

## 2026-04-26 - F10 completed

Prepared the frontend API client layer for future backend integration.

Included:

- New `src/lib/api.ts` with typed methods for auth, pets, applications, bank info, contributions, reports, and admin endpoints.
- Automatic mock fallback whenever `NEXT_PUBLIC_API_URL` is missing.
- Shared API state helpers for idle, loading, success, and error flows.
- Normalized mock content in `mockApplications.ts` and `mockAdmin.ts` so future data usage stays clean in Spanish.

Validation:

- `npm run lint` passed.
- `npm run build` passed.

Notes:

- All visible frontend text remains in Spanish.
- The planned frontend phases are complete.
- Backend work has still not started.

Next action:

- Review the frontend in browser and then begin backend setup using `06_BACKEND_STEP_BY_STEP_EXPRESS.md` when approved.

## 2026-04-28 - B0 completed

Initialized the Express backend scaffold for **Adopta Miauw Wau** inside `backend/`.

Included:

- New backend package with Express, TypeScript, CORS, Helmet, and dotenv.
- Base server files: `src/app.ts` and `src/server.ts`.
- Shared API helpers: `src/utils/apiResponse.ts` and `src/utils/ApiError.ts`.
- Global not-found and error middleware in `src/middleware/errorMiddleware.ts`.
- `GET /api/health` endpoint with consistent JSON success response.
- `backend/.env.example` with the planned backend environment variables.

Validation:

- `npm run build` passed in `backend/`.
- `GET /api/health` returned success from the running backend server.

Notes:

- CORS is configured for `FRONTEND_URL`, defaulting to `http://localhost:3000`.
- Environment validation has not been added yet; that belongs to phase `B1`.
- Business modules have not been implemented yet.

Next action:

- Run Prompt B1 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B1 completed

Implemented the shared backend configuration and utility layer for **Adopta Miauw Wau**.

Included:

- Centralized environment validation in `backend/src/config/env.ts` using `zod`.
- Shared async route wrapper in `backend/src/utils/asyncHandler.ts`.
- JWT helpers in `backend/src/utils/jwt.ts`.
- Password hashing and comparison helpers in `backend/src/utils/password.ts`.
- Minimal timestamped backend logger in `backend/src/utils/logger.ts`.
- Reusable request validation middleware in `backend/src/middleware/validateRequest.ts`.
- Reusable rate limiter factory and presets in `backend/src/middleware/rateLimit.ts`.
- App and server wiring updated to use validated env values and shared logger output.

Validation:

- `npm run build` passed in `backend/`.
- `GET /api/health` returned success while booting the backend with validated environment variables.

Notes:

- Backend startup now fails clearly when required environment variables are missing or invalid.
- Shared auth and validation helpers are ready for the next modules.
- Supabase and Cloudinary are validated as required config but not integrated yet.

Next action:

- Run Prompt B2 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B2 completed

Implemented the backend Supabase configuration layer for **Adopta Miauw Wau**.

Included:

- Installed `@supabase/supabase-js` in `backend/`.
- Added `backend/src/config/supabase.ts` with a backend-only admin client.
- Centralized Supabase client creation behind `getSupabaseAdminClient()`.
- Disabled session persistence and token refresh for the server-side client.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- The Supabase service role key remains backend-only through the shared config layer.
- No business modules use Supabase yet; this file is ready for auth and later modules.

Next action:

- Run Prompt B3 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B3 completed

Implemented the auth module for **Adopta Miauw Wau**.

Included:

- New auth module files in `backend/src/modules/auth/` for routes, controller, service, and schemas.
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/auth/profile`, and `POST /api/auth/logout`.
- Password hashing with `bcrypt` and JWT generation with `jsonwebtoken`.
- `authMiddleware` to validate bearer tokens and attach the authenticated user to the request.
- `roleMiddleware` for future admin and rescuer authorization checks.
- Express request type augmentation in `backend/src/types/express.d.ts`.
- Supabase-backed user creation, lookup, and profile update logic with password hashes never returned in API responses.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- Public registration accepts adopter/rescuer roles and also normalizes the existing Spanish frontend values `adoptante` and `rescatista`.
- End-to-end auth endpoint testing still requires a real Supabase project with the `users` table available.
- The backend response format remains the shared `{ success, data, message }` structure.

Next action:

- Run Prompt B4 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B4 completed

Implemented the pets module for **Adopta Miauw Wau**.

Included:

- New pets module files in `backend/src/modules/pets/` for routes, controller, service, and schemas.
- `GET /api/pets` and `GET /api/pets/:id` public endpoints with filter support for species, age, gender, size, location, status, urgent, featured, and search.
- Protected pet management endpoints for create, update, deactivate, status, urgent, and featured changes.
- Ownership enforcement so rescuers can manage only their own pets while admins can manage all pets.
- Soft delete behavior through `is_active = false` instead of hard deletion.
- Featured toggling restricted to admins only.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- Public pet queries return only active pets, while adopted pets remain visible through their `status`.
- The pets module is wired into `backend/src/app.ts` at `/api/pets`.
- End-to-end CRUD testing still requires a real Supabase project with the `pets` table available.

Next action:

- Run Prompt B5 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B5 completed

Implemented the Cloudinary upload module for pet images in **Adopta Miauw Wau**.

Included:

- New `backend/src/config/cloudinary.ts` for backend-only Cloudinary configuration.
- New `backend/src/middleware/uploadMiddleware.ts` using multer memory storage.
- File type validation for JPG, JPEG, PNG, and WEBP uploads.
- File size limit and multi-file support for pet image uploads.
- New `POST /api/pets/:id/images` endpoint protected by auth, role checks, and ownership rules.
- Cloudinary upload flow to `adopta-miauw-wau/pets` plus persistence in the `pet_images` table with `image_url` and `cloudinary_public_id`.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- End-to-end image upload testing still requires real Cloudinary credentials and a real Supabase project with the `pet_images` table available.
- Uploaded files are handled in memory and not written to local disk.

Next action:

- Run Prompt B6 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B6 completed

Implemented the adoption applications module for **Adopta Miauw Wau**.

Included:

- New applications module files in `backend/src/modules/applications/` for routes, controller, service, and schemas.
- `POST /api/applications`, `GET /api/applications/my`, `GET /api/applications/:id`, `PATCH /api/applications/:id/status`, and `DELETE /api/applications/:id`.
- Nested `GET /api/pets/:id/applications` route for rescuers and admins reviewing applications by pet.
- Access rules so adopters can submit and manage their own applications, rescuers can review applications for their own pets, and admins can review all.
- Validation and normalization for application payloads and status updates, including compatibility with the current Spanish frontend status values.
- Protection against submitting applications for pets that are already adopted.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- Deleting an application currently performs a status change to `cancelled` instead of hard deletion.
- End-to-end application testing still requires a real Supabase project with the `adoption_applications` table available.

Next action:

- Run Prompt B7 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B7 completed

Implemented the bank info and contributions modules for **Adopta Miauw Wau**.

Included:

- New `bankInfo` module with public `GET /api/bank-info` plus admin create, update, and activate endpoints under `/api/admin/bank-info`.
- New `contributions` module with `POST /api/contributions`, `POST /api/contributions/:id/proof`, `GET /api/contributions/my`, and admin contribution review endpoints under `/api/admin/contributions`.
- Optional auth support for contribution creation so public users can register contribution intent while signed-in users can link records to their account.
- Contribution proof upload flow using Cloudinary with private-business-record handling on the backend.
- Featured listing confirmation logic so confirming a `featured_listing` contribution updates the related pet with `is_featured` and `featured_until`.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- End-to-end bank info and contribution testing still requires a real Supabase project plus real Cloudinary credentials.
- Admin bank info endpoints were included here because they are directly tied to the public bank-info workflow.

Next action:

- Run Prompt B8 from `07_BACKEND_PROMPTS.md`.

## 2026-04-29 - B8 completed

Implemented the reports and admin modules for **Adopta Miauw Wau**.

Included:

- New `reports` module with `POST /api/reports` plus admin list, detail, and status update endpoints under `/api/admin/reports`.
- New `admin` module with dashboard stats, user listing, user verification, user deactivation, admin pet listing, and admin pet deactivation endpoints.
- Shared admin route protection so all general admin endpoints require the admin role.
- Dashboard aggregate counts for users, pets, applications, reports, contributions, featured pets, pending reports, and pending contributions.
- Safe user listing that never exposes password hashes.

Validation:

- `npm run build` passed in `backend/`.

Notes:

- End-to-end admin and reports testing still requires a real Supabase project with the corresponding tables populated.
- Admin bank info and contributions endpoints from the previous phase remain active alongside the new general admin routes.

Next action:

- Start Prompt B9 from `07_BACKEND_PROMPTS.md` to connect the frontend to the backend gradually.

## 2026-04-30 - B9 started (public pets connected)

Started the gradual frontend-to-backend integration for **Adopta Miauw Wau**.

Included:

- Added `frontend/.env.local.example` with `NEXT_PUBLIC_API_URL=http://localhost:5000/api`.
- Updated `frontend/src/lib/api.ts` to understand the backend `{ success, data, message }` response envelope.
- Added a pet-mapping layer so backend pet records can feed the existing frontend UI shape while preserving mock fallback behavior.
- Connected `/mascotas` to `apiClient.pets.list(...)`.
- Connected `/mascotas/[id]` to `apiClient.pets.detail(...)`.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- Mock fallback still works whenever `NEXT_PUBLIC_API_URL` is missing.
- The current pet mapper fills frontend-only presentation fields from existing mock data or safe defaults until richer backend pet detail fields are available.
- Auth, dashboards, applications, contributions, and reports still need frontend integration in later `B9` steps.

Next action:

- Connect auth register/login/me flows in the frontend.

## 2026-04-30 - B9 continued (auth connected)

Connected the frontend auth flows for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` so auth requests can store and reuse the backend JWT token.
- Added automatic authorization headers for frontend API requests when a token is available.
- Connected `register` and `login` in `frontend/src/components/forms/AuthForm.tsx` to the backend auth endpoints.
- Connected `me` usage in the frontend auth flow so the UI can validate the active session after login or registration.
- Added role-based redirects after successful auth to `/mascotas`, `/panel/rescatista`, or `/admin`.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- Mock fallback still works when `NEXT_PUBLIC_API_URL` is missing.
- Auth token persistence currently uses browser local storage for the frontend integration phase.
- Rescuer dashboard forms and adoption application submission still need backend connection in later `B9` steps.

Next action:

- Connect the rescuer pet creation flow and the adoption application form to the backend.

## 2026-04-30 - B9 continued (rescuer create pet connected)

Connected the frontend rescuer create-pet flow for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` so pet creation payloads match the backend pet schema.
- Connected the create form in `frontend/src/components/dashboard/PetForm.tsx` to `apiClient.pets.create(...)`.
- Added Spanish validation, loading, success, and error handling for real pet creation.
- Redirected successful pet creation to the new public pet detail page.
- Kept edit mode clearly marked as pending integration so the UI does not pretend it is already live.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- This flow now depends on a real logged-in rescuer or admin session because the backend route is protected.
- The image upload and edit flows still need separate frontend integration.

Next action:

- Connect the adoption application form to the backend.

## 2026-05-01 - B9 continued (adoption application connected)

Connected the frontend adoption application flow for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` so adoption application payloads match the backend contract.
- Connected `frontend/src/components/forms/AdoptionApplicationForm.tsx` to `apiClient.applications.submit(...)`.
- Replaced demo-only free-text fields with backend-compatible values for housing type, ownership, and yes/no questions.
- Added Spanish validation, loading, success, and error handling for real application submission.
- Passed the real `petId` from `frontend/src/components/pets/AdoptionCta.tsx` into the application form.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- This flow now depends on a real logged-in adopter session because the backend route is protected for adopters.
- Dashboard screens still use mock data and are the next frontend integration target.

Next action:

- Connect rescuer and admin dashboard data to the backend.

## 2026-05-01 - B9 continued (admin dashboard connected)

Connected the frontend admin dashboard screens for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` to normalize backend admin dashboard, reports, and contributions responses into the frontend table/card shapes.
- Connected `/admin`, `/admin/reportes`, and `/admin/contribuciones` to real backend endpoints.
- Switched the admin pages to client-side fetching so they can use the stored frontend auth token for protected admin routes.
- Fixed the frontend applications-by-pet API path to match the backend route shape.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- The rescuer dashboard main page still depends on mock data because the backend does not yet expose a dedicated "my pets / my applications / my stats" endpoint for rescuers.
- General admin summaries, reports, and contribution review screens can now read real backend data when an admin session is active.

Next action:

- Add or connect the remaining rescuer dashboard data flow, then finish any leftover admin actions still using mock UI behavior.

## 2026-05-01 - B9 continued (rescuer dashboard connected)

Connected the frontend rescuer dashboard to the real backend for **Adopta Miauw Wau**.

Included:

- Added a new backend rescuer module with `GET /api/rescuer/dashboard`.
- Queried real rescuer-owned pets, received adoption applications, and summary stats from Supabase.
- Updated `frontend/src/lib/api.ts` to normalize the rescuer dashboard payload into the existing dashboard card and table shapes.
- Connected `/panel/rescatista` to real backend data using the authenticated browser token.
- Refreshed the rescuer dashboard shell copy to reflect that this panel is now connected.

Validation:

- `npm run build` passed in `backend/`.
- `npm run build` passed in `frontend/`.

Notes:

- The rescuer summary page no longer depends on mock data when `NEXT_PUBLIC_API_URL` is configured.
- Pet editing/status management still needs frontend connection in the remaining `B9` work.

Next action:

- Finish the remaining `B9` flows, starting with pet editing/status management and any remaining admin actions.

## 2026-05-01 - B9 continued (rescuer pet editing connected)

Connected the rescuer pet editing flow to the real backend for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` so pet updates call the real backend `PUT /pets/:id` route and return the normalized pet detail shape.
- Connected `frontend/src/components/dashboard/PetForm.tsx` edit mode to submit real updates instead of showing a pending-integration notice.
- Replaced the mock-backed edit page in `frontend/src/app/panel/rescatista/mascotas/[id]/editar/page.tsx` with real pet loading through the frontend API client.
- Kept the same form-driven status management by saving the selected adoption status as part of the real update payload.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- The edit page now loads the current pet profile from the real API before saving changes.
- Image upload and richer rescuer moderation actions can still be expanded in later integration slices.

Next action:

- Finish the remaining `B9` admin or rescuer actions still using placeholder behavior, then review the overall integration pass for any remaining mock screens.

## 2026-05-01 - B9 continued (support and featured contribution pages connected)

Connected the public support flow and the rescuer featured-listing request flow to the real backend for **Adopta Miauw Wau**.

Included:

- Updated `frontend/src/lib/api.ts` to map real backend bank info records and send contribution payloads that match the backend contract.
- Replaced the placeholder `/apoyar` page with a real contribution registration form backed by `GET /bank-info` and `POST /contributions`.
- Replaced the mock `/destacar` page with a real featured-listing request form that loads the active bank info and the logged-in rescuer's pets.
- Kept the highlighted-pet flow aligned with the manual admin confirmation process already implemented in the backend.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- `/destacar` now requires a logged-in rescuer to choose one of their real pets before registering the request.
- Proof upload and admin-side confirm/reject UI actions can still be expanded in a later slice.

Next action:

- Finish the remaining `B9` moderation and contribution-management actions still missing UI controls, then do a final pass for any remaining mock-only screens.

## 2026-05-01 - B9 continued (admin contribution moderation connected)

Connected real admin moderation actions for contributions in **Adopta Miauw Wau**.

Included:

- Expanded `frontend/src/lib/api.ts` with real admin contribution confirm and reject methods.
- Updated `frontend/src/components/dashboard/ContributionsTable.tsx` to show inline moderation controls for pending contributions.
- Connected `/admin/contribuciones` so admins can confirm or reject requests and see the table update immediately.
- Refreshed `frontend/src/components/dashboard/AdminShell.tsx` copy so it no longer claims the admin panel is mock-only.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- Rejecting a contribution now requires a short admin note from the UI before sending the backend request.
- Report moderation still lacks equivalent action controls in the frontend and is the next remaining admin gap.

Next action:

- Connect admin report moderation actions and then do a final pass for any remaining mock-only screens in `B9`.

## 2026-05-01 - B9 continued (admin report moderation connected)

Connected real admin moderation actions for reports in **Adopta Miauw Wau**.

Included:

- Expanded `frontend/src/lib/api.ts` with a real admin report status update method.
- Updated `frontend/src/components/dashboard/ReportsTable.tsx` to show moderation actions for pending and in-review reports.
- Connected `/admin/reportes` so admins can mark reports as in review or resolved and see the table update immediately.
- Preserved the existing admin layout while making the report queue actionable instead of read-only.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- Resolving a report can include an optional admin note from the UI.
- The major admin and rescuer integration flows are now connected; the remaining `B9` work is mainly a cleanup sweep for any mock-only surfaces that still remain.

Next action:

- Do a final `B9` sweep for remaining mock-only screens and either connect them or clearly mark them as intentionally out of scope for this MVP pass.

## 2026-05-01 - B9 completed (final integration sweep)

Completed the frontend/backend integration phase for **Adopta Miauw Wau**.

Included:

- Replaced the home page mock pet feed with real pet data from the frontend API client.
- Cleaned the remaining public-facing demo/mock copy in the adoption and catalog experience.
- Kept the app fallback behavior for local mock mode when `NEXT_PUBLIC_API_URL` is not configured.
- Verified that the connected frontend still builds after the final sweep.

Validation:

- `npm run build` passed in `frontend/`.

Notes:

- The main MVP journeys are now connected across auth, pets, applications, rescuer tools, support flows, and admin moderation.
- Any remaining mock usage is limited to intentional local fallback behavior inside the API client when backend env configuration is absent.

Next action:

- Run an end-to-end QA pass with real Supabase data, verify the key user journeys, and document any final MVP issues before deployment.

## 2026-05-01 - Post-B9 improvement (automatic session timeout)

Added an automatic frontend logout rule after 5 minutes of inactivity.

Included:

- New global session timeout guard mounted from the frontend root layout.
- Automatic timer reset on common user activity events.
- Automatic logout and token cleanup when the inactivity window expires.
- Redirect back to `/login` after timeout.

Validation:

- `npm run build` passed in `frontend/`.

## 2026-05-04 - Post-B9 improvement (structured pet location fields prepared)

Prepared the pet location model for structured backend/database support.

Included:

- Added backend support for `country`, `state`, and `city` alongside the existing `location` string in the pets module.
- Updated the rescuer dashboard pet query so it reads the new location columns too.
- Updated the frontend pet API mapping and pet form to send and consume structured location fields directly.
- Added a Supabase migration script at `backend/sql/2026-05-04_add_pet_location_columns.sql`.
- Updated `08_API_DATABASE_CONTRACT.md` with the new pet columns, filters, indexes, and migration SQL.

Validation:

- `npm run build` passed in `backend/`.
- `npm run build` passed in `frontend/`.

Notes:

- This change requires running the new SQL migration in Supabase before the updated backend talks to the `pets` table.
- The app still keeps the combined `location` string for backward compatibility and existing UI usage.

## 2026-05-05 - Post-B9 improvement (admin report detail drilldown)

Expanded the admin dashboard report cards with real detail views.

Included:

- Added clickable detail cards for `Total de mascotas registradas`, `Usuarios registrados`, and `Solicitudes registradas` in the admin dashboard.
- Added a frontend modal on `/admin` that loads the corresponding detailed records for each report.
- Added frontend admin API methods for user, pet, and application detail lists.
- Added a new backend endpoint `GET /api/admin/applications` so the applications report can show real submissions instead of only the aggregate count.
- Kept the report detail copy in Spanish and aligned the modal style with the existing dashboard surfaces.

Validation:

- `npm run build` passed in `backend/`.
- `npm run build` passed in `frontend/`.

## 2026-05-07 - Post-B9 improvement (complaints / quejas module)

Added a dedicated complaints module named `Quejas` across the backend and frontend.

Included:

- New backend complaints module with public `POST /api/complaints` and admin list/detail/status endpoints under `/api/admin/complaints`.
- Optional-auth support so guests or logged-in users can submit a complaint.
- New public frontend page at `/quejas` with a Spanish complaint form.
- New admin page at `/admin/quejas` with moderation actions to mark complaints in review or resolved.
- Admin dashboard stats now include pending complaint counts.
- New Supabase migration script at `backend/sql/2026-05-07_add_complaints_module.sql`.
- Updated `08_API_DATABASE_CONTRACT.md` with the new API and table contract.

Validation:

- `npm run build` passed in `backend/`.
- `npm run build` passed in `frontend/`.

Notes:

- Run the new complaints SQL migration in Supabase before using the module against the real database.
- The admin panel now exposes complaints through its own dedicated `Quejas` section.

## 2026-05-11 - Post-B9 improvement (terms acceptance in registro and adopcion)

Added required acceptance of terms, privacy notice, and platform policies to the public registration and adoption application flows.

Included:

- New required acceptance checkbox in `frontend/src/components/forms/AuthForm.tsx`.
- New required acceptance checkbox in `frontend/src/components/forms/AdoptionApplicationForm.tsx`.
- Backend validation for both flows in the auth and applications modules.
- Persistence of acceptance timestamps in `users.accepted_terms_at` and `adoption_applications.accepted_terms_at`.
- New Supabase migration script at `backend/sql/2026-05-11_add_terms_acceptance_tracking.sql`.
- Updated `08_API_DATABASE_CONTRACT.md` with the new columns and migration SQL.

Validation:

- `npm run build` passed in `backend/`.
- `npm run build` passed in `frontend/`.
