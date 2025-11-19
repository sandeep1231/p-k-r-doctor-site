# Shree Radha Clinic Website (Angular + Bootstrap)

Professional single-page site for **Dr. Pragyan Kumar Routray** – Internal Medicine & Critical Care Physician.

## Features
* Hero section with clear headline & CTAs
* Detailed About, Services, Conditions Managed & Clinical Experience
* Clinic details, fees & preparation instructions
* Appointment booking reactive form (client-side validation)
* Appointment service mock storing requests in-memory (extendable)
* Tele-consultation guidance panel
* FAQ accordion (Bootstrap) & Policies section
* Optional Blog / Health Insights cards placeholder
* Responsive, mobile-first design with Bootstrap 5

## Tech Stack
* Angular 17 (standalone components)
* Bootstrap 5.3 (CDN for quick start)
* SCSS custom theme (in `src/styles.scss`)

## Getting Started
### Prerequisites
* Node.js (18+ recommended) & npm

### Install Dependencies
```powershell
npm install
```

### Development Server
```powershell
npm start
```
Open http://localhost:4200/ in your browser.

### Production Build
```powershell
npm run build
```
Outputs to `dist/doctor-site`.

## Customization Placeholders
Update these before deployment:
* Phone number: replace `+91-[Your Number]` in `contact-section.component.ts` & WhatsApp link.
* Email: set real address in `contact-section.component.ts`.
* Address & landmark: edit in `clinic-details-section.component.ts`.
* Fees: replace `[amount]` in `fees-prep-section.component.ts`.
* Map: embed Google Map iframe inside the placeholder div. Current embed uses generic Bhubaneswar coordinates—replace with clinic location.
* Favicon & hero image: place files in `src/assets/` and adjust `index.html` / `styles.scss`.

## Form Handling / Backend
The appointment form currently opens a pre-filled WhatsApp chat using the number from `environment.whatsappNumber` (set in `src/environments/environment.ts` and overridden by `environment.prod.ts` on production builds). Filenames of uploaded reports are included in the message; actual files must be attached manually in WhatsApp (limitation of WhatsApp URL API). Previously, a mock `AppointmentService` stored data in-memory; the admin section has been hidden.

### Extending to a Real Backend
1. Replace the `submit` method in the service to call `HttpClient.post('/api/appointments', payload)`.
2. Support file uploads via pre-signed URLs or multipart/form-data.
3. Persist in a database (e.g., PostgreSQL) and send email/SMS confirmations.
4. Add authentication/authorization for an admin dashboard.
5. Add server-side validation and rate limiting.

## Accessibility & SEO Notes
* Add alt text to images once provided.
* Consider structured data (JSON-LD) for medical professional.
* Add Open Graph meta tags in `index.html`.

## Security Suggestions
* Sanitize any backend form inputs.
* Rate limit appointment submissions.
* Enforce HTTPS in production.

## Next Enhancements (Optional)
* Add authentication for managing blog posts.
* Store appointments in a database (e.g., PostgreSQL / MongoDB).
* Integrate payment gateway for tele-consults.
* Add loading skeletons or spinners.
* Admin view listing appointments (consume `AppointmentService.list()`).
 
## Optional Admin Appointments View (Hidden)
## Environment Configuration
Set the clinic WhatsApp number once in:
* `src/environments/environment.ts` (development)
* `src/environments/environment.prod.ts` (production override)

Format: country code + number (no plus sign), e.g., `91XXXXXXXXXX`.

Changing the number only requires rebuilding; the appointment component reads from the environment at runtime.

## SEO & Accessibility
Added meta tags (description, keywords, Open Graph, Twitter) and JSON-LD structured data for the clinic and physician in `index.html`. A skip link (`Skip to main content`) improves keyboard navigation. Navigation links expose `aria-current="page"` when their section is active to help assistive technologies convey location context.

To customize:
* Replace `https://www.example.com/` with your real domain.
* Update `og:image` and structured data images with an actual hosted graphic.
* Adjust keywords list to match real service scope.
Component `admin-appointments-section.component.ts` remains available but is not imported. Re-add it if you later need internal tracking.

Features (when enabled): status changes, notes, CSV export, filtering.

Enabling Steps:
1. Re-import component in `app.component.ts`.
2. Add its tag (`<app-admin-appointments-section></app-admin-appointments-section>`).
3. Optionally guard with an environment flag or routing + authentication.

Security Hardening (if enabled): add backend persistence, authentication (JWT/session), audit logs, rate limiting.

## License & Disclaimer
Informational medical site. Not a substitute for emergency care. No license file included; internal clinic use.

---
Made with Angular & Bootstrap for a clean, professional clinical presence.
