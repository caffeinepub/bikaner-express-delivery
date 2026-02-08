# Specification

## Summary
**Goal:** Refresh Bikaner Express Delivery’s marketing site into a modern, vibrant delivery-brand experience and add Admin/Rider portals to manage orders with delivery-proof photo uploads, plus a rider application workflow.

**Planned changes:**
- Update the marketing website UI to a colorful, energetic theme using red/orange/black/white-inspired gradients, with smooth animations, hover effects, and colorful/gradient backgrounds behind all text sections (avoid plain white content slabs).
- Revise the Home hero to show the exact tagline “Fast • Local • Trusted Delivery in Bikaner”, add a rider illustration + simple bike animation, and add CTAs: “Book Delivery on WhatsApp” (opens WhatsApp) and “Check Rates” (routes to /rate-card).
- Ensure a WhatsApp floating button is always visible across all routes and that every WhatsApp link uses the same configured WhatsApp number (header, hero, contact, floating button).
- Update all public-facing copy to English across the marketing pages, aligned to fast/local/trustworthy positioning and photo-proof delivery.
- Add/adjust homepage sections: About Company, Services (with the 5 specified service categories), Rate Card preview/link, Founder section (name “Sarwan Singh Rathore” + founder photo using uploaded asset with fallback), and Proof & Trust section (photo proof, WhatsApp confirmation, real-time coordination).
- Add a “Join as a Rider” section with “Apply as Rider” form (Name, Mobile, Bike available Yes/No, Area); persist submissions in backend and list them in the Admin dashboard.
- Update the Rate Card page with a clear pricing table and a note mentioning “40 km average” fuel-efficient bike delivery.
- Add an Admin dashboard (admin-only) for order management: create/view/edit orders, store customer contact details, assign riders, update status (Pending / Picked / Delivered), upload and view/download delivery proof photos.
- Add a Rider portal using Internet Identity (rider-only) to view assigned orders, update status, and upload proof photos only for assigned orders (backend enforcement).
- Extend backend (single Motoko actor) data model and APIs to support orders, rider roles/profiles, rider applications, assignments, statuses, and proof photo storage/retrieval, while keeping existing site content/rates/contact/WhatsApp endpoints working.
- Add Google Maps embed on Contact page and update SEO metadata to target the exact phrase “Bikaner delivery service” (global + per-page where applicable).
- Update footer to include: “Bikaner Express Delivery”, phone & WhatsApp, website link, and “Serving Bikaner city, villages & dhanis”.

**User-visible outcome:** Visitors see a vibrant, mobile-first marketing site with consistent WhatsApp CTAs, updated English content, clear rate card and contact info (with map), and a founder section using the provided photo. Admins can manage orders, assign riders, and handle delivery-proof photos; riders can log in to manage their assigned deliveries and upload proof. Applicants can apply to join as a rider and admins can review applications.
