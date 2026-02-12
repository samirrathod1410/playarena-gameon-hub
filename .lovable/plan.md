

# PlayArena.in — Sports Booking Platform

## Overview
A production-ready SaaS platform for discovering, comparing, and booking sports grounds in Ahmedabad, with smart pricing, online payments, and role-based dashboards.

---

## Phase 1: Foundation & Browse Experience

### Brand & Theme Setup
- Dark navy theme (#0B1C2D) with neon green (#39FF14) accents
- SVG logo: "Play" in neon green, "Arena" in white, with stadium/play icon
- Favicon and app icon
- Poppins/Montserrat headings, Inter body text
- Smooth animations, rounded cards, hover effects

### Pages
- **Homepage** — Hero with tagline, search by sport/area, featured grounds, stats
- **Browse Grounds** — Filter by sport, location, price, facilities; grid/list view
- **Compare Grounds** — Side-by-side comparison (up to 3 grounds)
- **Ground Details** — Photos, facilities, map, reviews, pricing table, slot availability calendar
- **Contact Page** — Contact form

### Navigation
- Sticky navbar with logo, sport categories, search, login/register buttons
- Responsive mobile menu
- Footer with tagline, links, social icons

---

## Phase 2: Backend & Authentication

### Database Schema (Supabase)
- **profiles** — user details linked to auth
- **user_roles** — role enum (guest, user, ground_owner, admin) with security definer function
- **grounds** — name, sport, location, facilities, images, open/close times, slot duration, base price
- **slots** — dynamically generated from ground config, with booking status
- **bookings** — user, ground, slot, pricing breakdown, payment status
- **reviews** — ratings and comments
- **payments** — Razorpay order/payment IDs, commission split

### Authentication
- Email/password signup & login
- Guest browsing allowed everywhere
- Login gate only on "Book Now" — saves current page, redirects back after auth
- Login page with tagline

### Row-Level Security
- Users manage own bookings/reviews
- Ground owners manage own grounds/slots/view bookings
- Admins access everything
- Public read for grounds and reviews

---

## Phase 3: Booking & Slot System

### Dynamic Slot Generation
- Auto-generate slots from ground's open_time, close_time, and sport-specific duration
- Box Cricket: 2hr, Football: 1.5hr, Badminton/Tennis/Basketball: 1hr, Multi-Sport: configurable
- Real-time availability check with double-booking prevention (time overlap validation)

### Smart Pricing Engine
- Peak hours (5–10 PM): 2× base price
- Weekends (Sat/Sun): 1.25× base price
- Combined: base × peak × weekend
- Dynamic price breakdown shown in booking modal

### Booking Flow
- Select date → view available slots → see pricing breakdown → Book Now (login gate) → Payment → Confirmation

---

## Phase 4: Payments & Notifications

### Razorpay Integration (via Edge Function)
- Create Razorpay order server-side
- Open checkout popup on client
- Verify payment signature server-side
- Confirm booking only after verified payment
- Store payment details with 10% platform commission split (platform_cut + owner_earning)

### WhatsApp Confirmation
- After successful payment, generate pre-filled WhatsApp message with booking details
- Redirect to wa.me link with encoded message

---

## Phase 5: Dashboards

### User Dashboard
- My bookings (upcoming & past)
- Booking history with payment receipts

### Owner Dashboard
- Add/edit grounds with pricing, slot duration, facilities
- View bookings for their grounds
- Revenue breakdown: total, peak revenue, weekend revenue
- Monthly revenue chart (Recharts)

### Admin Panel
- Total platform revenue & commission earnings
- Total bookings count
- Top 5 grounds by revenue
- Peak vs weekend revenue percentages
- Refund management interface

---

## Phase 6: Seed Data & Polish

### Mock Data
- 60 Ahmedabad venues (10 per sport category) with realistic names, pricing, facilities
- 7-day availability with 20% pre-booked slots
- Demo reviews, users, owners, and admin account

### Final Polish
- Full responsive testing
- Loading states and error handling
- Input validation (Zod) on all forms
- Performance optimization

