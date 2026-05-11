# 00 START HERE — Adopta Miauw Wau

Use this file at the beginning of every Codex session.

## Project goal

Build **Adopta Miauw Wau**, a web app for responsible adoption of puppies and kittens.

The app must help:

- Adopters find pets.
- Rescuers publish pets.
- Rescuers review adoption applications.
- Admins moderate pets, users, reports, and manual contributions.
- Visitors support the platform through voluntary support / manual bank transfer.

## Mandatory technology decision

- Frontend: **Next.js**, TypeScript, App Router, Tailwind CSS.
- Backend: **Node.js + Express.js** REST API.
- Database: **Supabase PostgreSQL**.
- Image storage: **Cloudinary**.
- Authentication: JWT in the backend.
- Payments/contributions: manual bank transfer information, not automatic payment gateway for the MVP.

## Mandatory build order

1. Build the frontend first with mock data and Spanish UI text.
2. Build the backend after the frontend structure is approved.
3. Connect frontend to backend after both sides work independently.
4. Add Supabase and Cloudinary integration after the API contracts are stable.
5. Add admin/moderation/contribution workflows after the adoption flow is working.

## Mandatory language rule

All visible frontend text must be in **Spanish**.

Examples:

- Home → Inicio
- Pets → Mascotas
- How It Works → Cómo funciona
- Support → Apoyar
- Login → Iniciar sesión
- Register → Registrarme
- Adopt a Pet → Adoptar una mascota
- Register a Pet → Registrar una mascota
- Find your new best friend → Encuentra a tu nuevo mejor amigo

## Mandatory style reference

Use `assets/template.png` as the visual source of truth.

The design must feel:

- Warm
- Friendly
- Clean
- Trustworthy
- Pet-focused
- Soft and modern

## Files Codex must read before coding

Read these files before starting any task:

1. `00_START_HERE.md`
2. `01_PROJECT_CONTEXT.md`
3. `02_CODEX_RULES.md`
4. `03_UI_STYLE_GUIDE_TEMPLATE.md`
5. `10_BUILD_STATE_CHANGELOG.md`

When backend work begins, also read:

6. `06_BACKEND_STEP_BY_STEP_EXPRESS.md`
7. `08_API_DATABASE_CONTRACT.md`
8. `09_SECURITY_ENV_TESTING.md`

## Codex operating instruction

Before making code changes, Codex must answer internally:

- Which phase am I in?
- Which file tells me the style?
- Which files will I edit?
- Which route/page/module am I building?
- What is the acceptance checklist?

After each completed step, update:

- `10_BUILD_STATE_CHANGELOG.md`

## Do not do this

- Do not use React Router. Next.js App Router handles routing.
- Do not leave frontend copy in English.
- Do not start backend before frontend skeleton, UI system, routes, and mock pages exist.
- Do not connect to real Supabase/Cloudinary until mock frontend and backend contracts are stable.
- Do not expose secret keys in frontend.
- Do not put JWT secrets, Cloudinary secrets, or Supabase service keys in client code.
