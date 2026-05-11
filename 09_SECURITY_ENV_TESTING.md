# 09 Security, Environment, and Testing Checklist

## Critical secret rule

Never expose these values in frontend code:

- `JWT_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_API_SECRET`
- Database passwords
- Any private admin keys

The frontend may only use public variables prefixed with `NEXT_PUBLIC_`.

## Frontend environment

`frontend/.env.local.example`

```text
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend environment

`backend/.env.example`

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

## Auth security

- Hash passwords with bcrypt.
- Never return `password_hash` in API responses.
- JWT token must include user id and role only.
- Protected endpoints must use auth middleware.
- Admin endpoints must use role middleware.
- Rescuer endpoints must validate ownership.

## File upload security

Allowed image types:

- jpg
- jpeg
- png
- webp

Rules:

- Set max file size.
- Reject unknown MIME types.
- Store Cloudinary public id.
- Do not publicly expose contribution proof images beyond necessary admin review.

## Rate limiting

Add rate limiting for:

- Login
- Register
- Adoption applications
- Reports
- Contact/WhatsApp tracking if added later

## Privacy rules

- Do not publicly display adopter personal data.
- Show rescuer contact info only when allowed by rescuer.
- Adoption applications visible only to adopter, related rescuer, and admin.
- Allow future account deletion request workflow.
- Store only necessary user information.
- Do not expose proof of contribution images publicly.

## CORS

Backend should allow only the frontend URL in development and production.

Development:

```text
http://localhost:3000
```

Production:

```text
https://your-production-domain.com
```

## Manual contribution disclaimer

The app must display:

> Apoyo voluntario para la administración y mantenimiento de la plataforma. Esta contribución no es deducible de impuestos.

## Common mistakes to avoid

- Do not put Supabase service role key in Next.js.
- Do not check auth only on frontend.
- Do not trust user role sent from frontend.
- Do not allow a rescuer to update another rescuer's pet.
- Do not allow applications for adopted pets.
- Do not activate featured listings without admin confirmation.
- Do not store raw passwords.

# Testing checklist

## Frontend general

- [ ] Next.js app starts with `npm run dev`.
- [ ] No React Router is installed.
- [ ] Header appears on all public pages.
- [ ] Footer appears on all public pages.
- [ ] Mobile layout works.
- [ ] All visible frontend text is Spanish.
- [ ] Colors match template style: teal, orange, cream, white.
- [ ] Cards use rounded corners and soft shadows.
- [ ] Buttons have hover states.

## Frontend routes

- [ ] `/` Inicio works.
- [ ] `/mascotas` listing works.
- [ ] `/mascotas/[id]` detail works.
- [ ] `/registro` works.
- [ ] `/login` works.
- [ ] `/panel/rescatista` works.
- [ ] `/panel/rescatista/mascotas/nueva` works.
- [ ] `/panel/rescatista/mascotas/[id]/editar` works.
- [ ] `/panel/adoptante/solicitudes` works.
- [ ] `/admin` works.
- [ ] `/admin/reportes` works.
- [ ] `/admin/contribuciones` works.
- [ ] `/apoyar` works.
- [ ] `/destacar` works.
- [ ] `/adopcion-responsable` works.
- [ ] `/contacto` works.

## Frontend forms

- [ ] Registration form validates required fields.
- [ ] Login form validates required fields.
- [ ] Pet form validates required fields.
- [ ] Adoption form validates required fields.
- [ ] Contribution form validates required fields.
- [ ] Report form validates required fields.
- [ ] Success messages are in Spanish.
- [ ] Error messages are in Spanish.

## Backend general

- [ ] Express server starts.
- [ ] `/api/health` works.
- [ ] CORS works for frontend URL.
- [ ] Error middleware returns consistent JSON.
- [ ] Environment variables are validated.
- [ ] Secrets are not committed.

## Auth

- [ ] Register works.
- [ ] Login works.
- [ ] Passwords are hashed.
- [ ] `/api/auth/me` works with token.
- [ ] Invalid token is rejected.
- [ ] User roles are enforced.

## Pets

- [ ] Public pet listing works.
- [ ] Filters work.
- [ ] Pet detail works.
- [ ] Rescuer can create pet.
- [ ] Rescuer can update own pet.
- [ ] Rescuer cannot update another rescuer's pet.
- [ ] Admin can manage all pets.
- [ ] Status update works.
- [ ] Urgent toggle works.
- [ ] Featured toggle is admin-only.

## Images

- [ ] Pet image upload works.
- [ ] Invalid file type rejected.
- [ ] Large file rejected.
- [ ] Cloudinary URL stored.
- [ ] Cloudinary public ID stored.

## Adoption applications

- [ ] Adopter can submit application.
- [ ] Cannot apply for adopted pet.
- [ ] Adopter can see own applications.
- [ ] Rescuer can see applications for own pets.
- [ ] Rescuer cannot see applications for other rescuers' pets.
- [ ] Status update works.

## Contributions

- [ ] Public bank info endpoint works.
- [ ] Contribution record can be created.
- [ ] Proof upload works.
- [ ] Admin can confirm contribution.
- [ ] Admin can reject contribution.
- [ ] Confirmed featured listing updates pet.

## Reports and admin

- [ ] User can report pet/user.
- [ ] Admin can list reports.
- [ ] Admin can update report status.
- [ ] Admin dashboard stats work.
- [ ] Admin can verify rescuer.
- [ ] Admin can deactivate suspicious user.

## Integration

- [ ] Frontend reads real pets from backend.
- [ ] Frontend login/register works with backend.
- [ ] Frontend create pet works with backend.
- [ ] Frontend adoption application works with backend.
- [ ] Frontend dashboards work with backend.
- [ ] Loading states appear.
- [ ] Error states appear.
