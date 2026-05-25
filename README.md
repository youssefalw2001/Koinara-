# Koinara / Al-Muraqib

A lean, legal-first **Social Radar** PWA for GCC launch testing.

Al-Muraqib lets users create a private radar link, share it on Instagram/Snapchat/WhatsApp/etc., and view opt-in interaction signals from people who click and submit a vibe check.

## MVP Features

- React + Vite + TypeScript PWA
- Mobile-first dark Cyber Gold / Midnight UI
- Public radar links: `/r/:slug`
- Opt-in vibe check and metadata disclosure
- Device/browser/timezone metadata capture from the PWA only
- Radar dashboard with activity cards, heatmap, Trust Graph, and paid reveal UI
- Supabase schema with RLS direction
- Supabase Edge Function stubs for capture and identity solve
- Stripe Payment Link placeholders

## What this MVP does not do

This app does **not** access Instagram/Snapchat/WhatsApp private APIs, scrape private viewer lists, covertly fingerprint visitors, or deanonymize people without consent. The product is designed as a consent-based social intelligence game.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment

See `.env.example` for required keys.

## Supabase

Run `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor, then deploy the functions in `supabase/functions` when ready.
