# 07 Backend Codex Prompts

Use these prompts after the frontend mock UI is complete.

## Prompt B0 — Initialize backend

```text
Read 00_START_HERE.md, 01_PROJECT_CONTEXT.md, 02_CODEX_RULES.md, 06_BACKEND_STEP_BY_STEP_EXPRESS.md, 08_API_DATABASE_CONTRACT.md, 09_SECURITY_ENV_TESTING.md, and 10_BUILD_STATE_CHANGELOG.md.

Create the backend after the frontend.

Inside /backend, initialize a Node.js + Express + TypeScript project.

Create:
- src/app.ts
- src/server.ts
- src/middleware/errorMiddleware.ts
- src/utils/apiResponse.ts
- src/utils/ApiError.ts
- .env.example

Add:
- CORS for http://localhost:3000
- JSON body parser
- helmet
- /api/health endpoint
- global error handler

Add npm scripts:
- dev
- build
- start

Do not implement business modules yet.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B1 — Env config and shared utilities

```text
Create backend environment and utility structure.

Implement:
- src/config/env.ts
- src/utils/asyncHandler.ts
- src/utils/jwt.ts
- src/utils/password.ts
- src/utils/logger.ts
- src/middleware/validateRequest.ts
- src/middleware/rateLimit.ts

Use bcrypt for password hashing and jsonwebtoken for JWT.
Use zod for validation if available.

Add .env.example with all required variables.

Do not expose secrets to frontend.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B2 — Supabase config

```text
Implement Supabase backend config.

Create:
- src/config/supabase.ts

Use SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY only on backend.

Add a small helper to access Supabase client.

Do not put service role key in frontend.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B3 — Auth module

```text
Implement Auth module according to 08_API_DATABASE_CONTRACT.md.

Create:
- src/modules/auth/auth.routes.ts
- src/modules/auth/auth.controller.ts
- src/modules/auth/auth.service.ts
- src/modules/auth/auth.schemas.ts
- src/middleware/authMiddleware.ts
- src/middleware/roleMiddleware.ts

Endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/profile
- POST /api/auth/logout

Rules:
- Hash passwords.
- Validate input.
- Return JWT token.
- Never return password_hash.
- Roles: adopter, rescuer, admin.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B4 — Pets module

```text
Implement Pets module.

Create:
- src/modules/pets/pets.routes.ts
- src/modules/pets/pets.controller.ts
- src/modules/pets/pets.service.ts
- src/modules/pets/pets.schemas.ts

Endpoints:
- GET /api/pets
- GET /api/pets/:id
- POST /api/pets
- PUT /api/pets/:id
- DELETE /api/pets/:id
- PATCH /api/pets/:id/status
- PATCH /api/pets/:id/urgent
- PATCH /api/pets/:id/featured

Rules:
- Public can list and view.
- Only rescuer/admin can create.
- Rescuer can update only own pets.
- Admin can update all.
- Adopted pets are visible but must show adopted status.
- Featured only after admin confirmation.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B5 — Cloudinary upload module

```text
Implement Cloudinary image upload.

Create:
- src/config/cloudinary.ts
- src/middleware/uploadMiddleware.ts

Add endpoint:
- POST /api/pets/:id/images

Rules:
- Use multer memory storage.
- Validate jpg, jpeg, png, webp.
- Limit file size.
- Upload pet images to adopta-miauw-wau/pets.
- Save image_url and cloudinary_public_id in pet_images table.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B6 — Adoption applications module

```text
Implement adoption applications.

Create:
- src/modules/applications/applications.routes.ts
- src/modules/applications/applications.controller.ts
- src/modules/applications/applications.service.ts
- src/modules/applications/applications.schemas.ts

Endpoints:
- POST /api/applications
- GET /api/applications/my
- GET /api/pets/:id/applications
- GET /api/applications/:id
- PATCH /api/applications/:id/status
- DELETE /api/applications/:id

Rules:
- Only adopters can submit applications.
- Do not allow applications for adopted pets.
- Pet owner rescuer can review applications for their pets.
- Admin can review all.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B7 — Bank info and contributions

```text
Implement bank info and contributions modules.

Create:
- src/modules/bankInfo/*
- src/modules/contributions/*

Endpoints:
- GET /api/bank-info
- POST /api/contributions
- POST /api/contributions/:id/proof
- GET /api/contributions/my
- GET /api/admin/contributions
- PATCH /api/admin/contributions/:id/confirm
- PATCH /api/admin/contributions/:id/reject

Rules:
- Active bank info can be public.
- Contribution proof images are private business records.
- Admin confirms contribution manually.
- If contribution_type is featured_listing and confirmed, update related pet as featured with featured_until.
- Include Spanish messages.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B8 — Reports and admin

```text
Implement reports and admin modules.

Reports endpoints:
- POST /api/reports
- GET /api/admin/reports
- GET /api/admin/reports/:id
- PATCH /api/admin/reports/:id/status

Admin endpoints:
- GET /api/admin/dashboard
- GET /api/admin/users
- PATCH /api/admin/users/:id/verify
- PATCH /api/admin/users/:id/deactivate
- GET /api/admin/pets
- PATCH /api/admin/pets/:id/deactivate
- POST /api/admin/bank-info
- PUT /api/admin/bank-info/:id
- PATCH /api/admin/bank-info/:id/active

Rules:
- All admin routes require admin role.
- Return Spanish messages.
- Do not expose password hashes.

Update 10_BUILD_STATE_CHANGELOG.md.
```

## Prompt B9 — Connect frontend to backend

```text
Connect frontend to backend gradually.

Order:
1. Configure NEXT_PUBLIC_API_URL.
2. Connect pets list /mascotas.
3. Connect pet detail /mascotas/[id].
4. Connect auth register/login/me.
5. Connect create pet form.
6. Connect adoption application form.
7. Connect rescuer dashboard.
8. Connect admin dashboard.
9. Connect contributions and reports.

Keep mock fallback only if backend URL is missing.

Add loading and error states in Spanish.

Update 10_BUILD_STATE_CHANGELOG.md.
```
