
# CareSync AI — Implementation Plan

## Summary
Build a complete frontend for CareSync AI, a smart elderly care monitoring platform with a landing page, auth pages, and a full dashboard — all using mock data, ready for Supabase integration.

## Pages & Features

### 1. Landing Page
- **Hero**: Split layout — headline + CTA on left, dashboard mockup/illustration on right
- **Problem section**: Why families need passive monitoring
- **Features section**: 3 cards with icons (Routine Monitoring, Anomaly Alerts, Medication Reminders)
- **How It Works**: 3-step visual flow
- **Pricing**: Free / Pro / Premium tiers in card layout
- **Final CTA + Footer** with privacy, contact, terms links

### 2. Login / Signup Page
- Toggle between Login and Signup modes
- Signup fields: Name, Email, Password, Role (Caregiver / Elderly)
- Login fields: Email, Password
- Clean card-based form UI, prepared for Supabase auth

### 3. Dashboard (post-login)
- **Overview panel**: Activity status (Active/Inactive), medication compliance, quick stats cards
- **Activity timeline**: Recent movement/device usage logs with "normal vs today" comparison
- **Alerts panel**: List of triggered alerts (no movement, missed meds, unusual patterns) with acknowledge button and alert history
- **Medication schedule**: List of medications with times, "Mark as Taken" buttons, missed notifications
- **Profile switcher**: Dropdown to switch between monitored family members (for caregivers managing multiple elders)

## Design System
- Soft gradient palette: blues, teals, purples (HSL-based CSS variables)
- Dark mode support via Tailwind `.dark` class
- Rounded cards with subtle shadows, smooth hover transitions
- Mobile-responsive throughout
- Lucide icons for all feature iconography

## State & Data
- Zustand store for user state, activity logs, medications, and alerts (all mock data)
- Modular data structure mirroring future Supabase tables (profiles, activity_logs, medications, alerts)
- Auth flow simulated with local state, structured for easy Supabase swap

## Component Structure
- `components/landing/` — Hero, Features, HowItWorks, Pricing, Footer
- `components/dashboard/` — ActivityPanel, AlertsPanel, MedicationSchedule, ProfileSwitcher, ActivityTimeline
- `components/auth/` — AuthForm (login/signup toggle)
- `components/layout/` — Navbar, Sidebar, DashboardLayout
- Reusable UI built on existing shadcn components
