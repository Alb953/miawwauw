# 01 Project Context — Adopta Miauw Wau

## Product summary

**Adopta Miauw Wau** is a web application for responsible adoption of puppies and kittens. It helps rescuers, shelters, and independent caregivers publish pet profiles and helps adopters find pets using filters, pet detail pages, and adoption application forms.

## Main problem

Many rescuers currently publish pets on social media. Posts get lost, requests are handled manually, adopter information is scattered, and urgent cases are hard to keep visible.

## Proposed solution

Create a centralized adoption platform with:

- Public pet listings.
- Search and filters.
- Pet detail pages.
- Rescuer accounts.
- Pet registration.
- Adoption applications.
- Rescuer dashboard.
- Admin dashboard.
- Report/moderation flow.
- Voluntary support and featured listing contributions through manual bank transfer.

## Target users

### Adopters

People looking to adopt a puppy or kitten.

Main actions:

- Browse pets.
- Filter by location, species, age, size, gender, and status.
- View pet details.
- Submit adoption applications.
- Contact rescuers through WhatsApp or email.

### Rescuers

People who publish animals for adoption.

Main actions:

- Register pets.
- Upload photos.
- Manage adoption status.
- Review adoption applications.
- Promote urgent cases.
- Request featured visibility.

### Admin

Platform owner or moderation team.

Main actions:

- Verify rescuers.
- Manage users.
- Review reports.
- Manage manual contributions.
- Manage featured listings.
- View platform analytics.

## MVP scope

The MVP must include:

1. User registration and login.
2. Role selection: adopter or rescuer.
3. Pet registration form.
4. Pet listing page.
5. Pet detail page.
6. Adoption application form.
7. Rescuer dashboard.
8. Basic admin dashboard.
9. Search and filters.
10. Pet status management: available, in_process, adopted.
11. WhatsApp or email contact button.
12. Voluntary support page.
13. Featured listing manual confirmation flow.
14. Basic reports and moderation.

## Future scope

Future versions can include:

- Payment gateway integration.
- Donation campaigns.
- Location map.
- Mobile app.
- Push notifications.
- Veterinary partnerships.
- Pet food sponsorships.
- AI-generated pet descriptions.

## Business rules

- Users can register as adopters or rescuers.
- Admins manage moderation, reports, contribution confirmations, and platform control.
- Only logged-in rescuers can create pet profiles.
- A pet profile needs at least name, species, age, gender, location, health status, description, requirements, and one photo.
- Rescuers can edit only their own pet profiles.
- Admins can deactivate fake, duplicated, inappropriate, or suspicious pet posts.
- Pet status values: `available`, `in_process`, `adopted`.
- Adopted pets must not accept new adoption applications.
- Urgent pets must have a visible urgent badge.
- Featured pets must appear with priority only after admin confirmation.
- Featured visibility expires using `featured_until`.
- Contributions must be manually confirmed by admin.
- Adoption applications cannot be edited after submission; they can be cancelled or replaced.

## Voluntary support disclaimer

Spanish UI version:

> Apoyo voluntario para la administración y mantenimiento de la plataforma. Esta contribución no es deducible de impuestos.

English source version:

> Voluntary support for the administration and maintenance of the platform. This contribution is not tax-deductible.
