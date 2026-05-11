# 11 QA Checklist

Use this checklist after:

- Supabase is configured
- `backend/.env` has real values
- `frontend/.env.local` points to the backend
- backend and frontend both start correctly

Recommended local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Before testing

- [ ] Backend runs with `npm run dev` in `backend/`
- [ ] Frontend runs with `npm run dev` in `frontend/`
- [ ] `GET /api/health` returns success
- [ ] Supabase tables exist and are reachable
- [ ] At least one active `bank_info` record exists for support and featured flows

## Test accounts

Create and keep these accounts ready:

- [ ] 1 adopter account
- [ ] 1 rescuer account
- [ ] 1 admin account

Suggested labels:

- Adopter: `qa.adopter@...`
- Rescuer: `qa.rescuer@...`
- Admin: `qa.admin@...`

## Flow 1: Auth

- [ ] Register a new adopter from `/registro`
- [ ] Register a new rescuer from `/registro`
- [ ] Log in successfully from `/login`
- [ ] Refresh the page and confirm the session still works
- [ ] Open a protected rescuer page while logged out and confirm access is blocked
- [ ] Open an admin page with a non-admin user and confirm access is blocked

Expected result:

- Role-based access works correctly
- Errors and success messages appear in Spanish

## Flow 2: Public pets

- [ ] Open `/`
- [ ] Confirm featured pets render correctly
- [ ] Confirm urgent pets render correctly
- [ ] Open `/mascotas`
- [ ] Use filters for species, status, urgent, and location
- [ ] Open one pet detail page

Expected result:

- Home and catalog use real backend pet data
- Filters change results correctly
- Pet detail loads without fallback errors

## Flow 3: Rescuer creates a pet

- [ ] Log in as rescuer
- [ ] Open `/panel/rescatista/mascotas/nueva`
- [ ] Create a new pet with valid data
- [ ] Confirm redirect to `/mascotas/[id]`
- [ ] Confirm the new pet appears in `/mascotas`
- [ ] Confirm the new pet appears in `/panel/rescatista`

Expected result:

- Pet is saved in Supabase
- Public listing and rescuer dashboard both reflect the new record

## Flow 4: Rescuer edits a pet

- [ ] Open `/panel/rescatista/mascotas/[id]/editar`
- [ ] Change description
- [ ] Change status
- [ ] Change urgent flag
- [ ] Save changes
- [ ] Reopen the public pet page and confirm the changes are visible

Expected result:

- Edit form loads the real pet
- Updates persist in Supabase

## Flow 5: Adoption application

- [ ] Log in as adopter
- [ ] Open a pet detail page that is not adopted
- [ ] Submit the adoption application form
- [ ] Confirm success message
- [ ] Check Supabase `adoption_applications`

Then verify rescuer visibility:

- [ ] Log in as rescuer owner of that pet
- [ ] Open `/panel/rescatista`
- [ ] Confirm the application appears in the dashboard table

Expected result:

- Adopter can submit
- Rescuer can see received applications

## Flow 6: Support contribution

- [ ] Open `/apoyar`
- [ ] Confirm bank info loads from backend
- [ ] Submit a support contribution
- [ ] Confirm success message with contribution id
- [ ] Check Supabase `contributions`

Expected result:

- Contribution is stored with `pending` status

## Flow 7: Featured listing request

- [ ] Log in as rescuer
- [ ] Open `/destacar`
- [ ] Confirm rescuer pets load into the selector
- [ ] Submit a featured request for one real pet
- [ ] Confirm success message
- [ ] Check Supabase `contributions`

Expected result:

- Featured request is stored with `contribution_type = featured_listing`
- Related `pet_id` is correct

## Flow 8: Admin contribution moderation

- [ ] Log in as admin
- [ ] Open `/admin/contribuciones`
- [ ] Confirm pending contributions are listed
- [ ] Confirm a normal support contribution
- [ ] Confirm a featured-listing contribution
- [ ] Reject one contribution with admin notes

Expected result:

- Confirmed contributions change to verified status in UI
- Rejected contributions change to rejected status in UI
- Confirmed featured listing updates the related pet to featured in Supabase

## Flow 9: Reports

- [ ] Create a report from the user side if the UI path is available
- [ ] Or insert a QA report manually in Supabase if needed
- [ ] Log in as admin
- [ ] Open `/admin/reportes`
- [ ] Mark one report as in review
- [ ] Resolve one report

Expected result:

- Report status updates immediately in UI
- Report status persists in Supabase

## Flow 10: Rescuer dashboard

- [ ] Log in as rescuer
- [ ] Open `/panel/rescatista`
- [ ] Confirm stats render correctly
- [ ] Confirm owned pets render correctly
- [ ] Confirm received applications render correctly

Expected result:

- Dashboard reflects real backend data, not mock rows

## Flow 11: Admin dashboard

- [ ] Log in as admin
- [ ] Open `/admin`
- [ ] Confirm summary cards load
- [ ] Confirm reports preview loads
- [ ] Confirm contributions preview loads

Expected result:

- Dashboard counts match current database state closely enough for QA

## Negative checks

- [ ] Adopter cannot create pets
- [ ] Rescuer cannot moderate admin pages
- [ ] Admin-only routes reject non-admin users
- [ ] Logged-out users cannot submit protected flows
- [ ] Invalid form inputs show friendly Spanish errors

## Browser checks

- [ ] Test desktop width
- [ ] Test mobile width
- [ ] Test page refresh on protected screens
- [ ] Test navigation between public and protected routes

## Database spot checks

After the main pass, verify these tables manually:

- [ ] `users`
- [ ] `pets`
- [ ] `adoption_applications`
- [ ] `contributions`
- [ ] `reports`
- [ ] `bank_info`

## Exit criteria

You can consider MVP QA passed when:

- [ ] All main flows above work without blocking errors
- [ ] Data persists correctly in Supabase
- [ ] Role permissions behave correctly
- [ ] Admin moderation works
- [ ] No major page still depends on fake visible demo content

## Optional bug log template

Use this format while testing:

```text
ID:
Page:
Role:
Steps:
Expected:
Actual:
Severity:
Notes:
```
