# 06 Backend Step-by-Step Build Plan — Express After Frontend

Backend starts after frontend mock UI is stable.

## Backend stack

- Node.js
- Express.js
- TypeScript recommended
- Supabase PostgreSQL
- Cloudinary
- JWT
- bcrypt
- zod or express-validator
- multer for file uploads
- helmet, cors, express-rate-limit

## Recommended backend folder structure

```text
backend/
  src/
    app.ts
    server.ts
    config/
      env.ts
      supabase.ts
      cloudinary.ts
    middleware/
      authMiddleware.ts
      roleMiddleware.ts
      errorMiddleware.ts
      validateRequest.ts
      uploadMiddleware.ts
      rateLimit.ts
    modules/
      auth/
        auth.routes.ts
        auth.controller.ts
        auth.service.ts
        auth.schemas.ts
      pets/
        pets.routes.ts
        pets.controller.ts
        pets.service.ts
        pets.schemas.ts
      applications/
        applications.routes.ts
        applications.controller.ts
        applications.service.ts
        applications.schemas.ts
      contributions/
        contributions.routes.ts
        contributions.controller.ts
        contributions.service.ts
        contributions.schemas.ts
      bankInfo/
        bankInfo.routes.ts
        bankInfo.controller.ts
        bankInfo.service.ts
        bankInfo.schemas.ts
      reports/
        reports.routes.ts
        reports.controller.ts
        reports.service.ts
        reports.schemas.ts
      admin/
        admin.routes.ts
        admin.controller.ts
        admin.service.ts
    utils/
      asyncHandler.ts
      ApiError.ts
      apiResponse.ts
      jwt.ts
      password.ts
      logger.ts
    types/
      express.d.ts
  .env.example
  package.json
  tsconfig.json
```

## Phase B0 — Initialize backend

Goal: create Express backend skeleton.

Tasks:

1. Create `/backend` folder.
2. Initialize Node project.
3. Add TypeScript.
4. Add Express.
5. Add `src/app.ts` and `src/server.ts`.
6. Add `/api/health` endpoint.
7. Add error middleware.
8. Add `.env.example`.

Acceptance criteria:

- `npm run dev` starts server.
- `GET /api/health` returns success.
- CORS configured for frontend.

## Phase B1 — Environment and config

Goal: centralize config.

Required env vars:

```text
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=change_this_in_real_project
JWT_EXPIRES_IN=7d
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Acceptance criteria:

- Missing env vars fail with clear error.
- Secrets are never committed.

## Phase B2 — Auth module

Goal: register/login/me.

Tasks:

1. Create users table in Supabase.
2. Add password hashing.
3. Add JWT token generation.
4. Add auth middleware.
5. Add role middleware.
6. Add validation.

Acceptance criteria:

- User can register.
- User can login.
- `/auth/me` returns current user.
- Password hash stored, never raw password.

## Phase B3 — Pets module

Goal: CRUD pets.

Tasks:

1. Create pets table.
2. Create pet_images table.
3. Add public list filters.
4. Add detail endpoint.
5. Add create/update/deactivate.
6. Add status, urgent, featured update.

Acceptance criteria:

- Public can list pets.
- Rescuer can create pets.
- Rescuer edits only own pets.
- Admin can manage all pets.

## Phase B4 — Cloudinary upload

Goal: image upload for pet photos and contribution proof.

Tasks:

1. Configure Cloudinary.
2. Add multer memory upload.
3. Validate file type and size.
4. Upload to Cloudinary folder `adopta-miauw-wau/pets`.
5. Store image URL and public id.

Acceptance criteria:

- Pet images upload.
- Invalid file types rejected.
- Public IDs stored for future management.

## Phase B5 — Adoption applications module

Goal: adopter applies to adopt pet.

Tasks:

1. Create adoption_applications table.
2. Add submit endpoint.
3. Prevent applications for adopted pets.
4. Add adopter list.
5. Add rescuer applications by pet.
6. Add status update.

Acceptance criteria:

- Adopter can submit application.
- Rescuer sees applications for own pets.
- Admin can see all if needed.

## Phase B6 — Contributions and bank info

Goal: manual support and featured listing workflow.

Tasks:

1. Create bank_info table.
2. Create contributions table.
3. Public active bank info endpoint.
4. Contribution registration endpoint.
5. Proof upload endpoint.
6. Admin confirm/reject.
7. On confirmed featured listing, update pet `is_featured` and `featured_until`.

Acceptance criteria:

- Users see bank info.
- Contributions can be pending/confirmed/rejected.
- Admin confirmation activates featured listing.

## Phase B7 — Reports and moderation

Goal: allow suspicious posts/users to be reported.

Tasks:

1. Create reports table.
2. Add report endpoint.
3. Add admin reports list/detail/update.

Acceptance criteria:

- Logged users can report.
- Admin can review and resolve.

## Phase B8 — Admin dashboard

Goal: statistics and admin controls.

Tasks:

1. Dashboard stats endpoint.
2. Users endpoint.
3. Verify rescuer endpoint.
4. Deactivate user endpoint.
5. Admin pets endpoint.

Acceptance criteria:

- Admin endpoints require admin role.
- Stats match database counts.

## Phase B9 — Frontend/backend integration

Goal: connect Next.js UI to Express API.

Tasks:

1. Set `NEXT_PUBLIC_API_URL`.
2. Replace mock API calls gradually.
3. Add login token storage strategy.
4. Add protected routes or client guards.
5. Connect pets list/detail first.
6. Connect auth second.
7. Connect applications third.
8. Connect dashboards last.

Acceptance criteria:

- Frontend displays real pets.
- Register/login works.
- Rescuer can create pet.
- Adopter can apply.
- Admin can view dashboard.
