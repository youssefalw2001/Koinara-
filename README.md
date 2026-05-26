# Daira / Koinara Circle Teams

**Daira** is the new product direction for the existing Koinara repo.

Daira is a GCC-first, mobile-first social gifting and ranking PWA where creators start a **Circle**, supporters join the Circle, send gifts, and compete to become **Top 3 Crown Holders**. Creators set custom rewards for their Top 3, and later earn a share of gift revenue.

The product should feel like:

- TikTok Live gifts, but for story links instead of live streams
- Locket-style private closeness, but with ranking, gifts, and competition
- A premium GCC/MENA social status game
- A creator-controlled Circle economy

The simple pitch:

> Create your Circle. Let them prove their spot.

Arabic positioning:

> سوّي دائرتك وخليهم يثبتون مكانهم.

---

## Core Concept

Each creator, usually a female creator or social personality, creates a Circle page.

Supporters can:

- Join her Circle
- Pick an entry type
- Send gifts / points
- Climb the leaderboard
- Compete for Top 3
- Become a Crown Holder
- Unlock creator-defined rewards if they finish in the Top 3

Creators can:

- Create a Circle link
- Upload a profile photo / cover photo
- Set rewards for #1, #2, and #3
- View their Golden Inbox
- See Top Supporters
- Share Circle Pulse cards
- Earn 30% of gift revenue later

The app does **not** sell private contact info, phone numbers, WhatsApp, Snapchat, or guaranteed off-platform access. The reward system must stay creator-controlled, safe, and inside the app.

---

## Main Money Loop

```text
Creator creates Circle
↓
Creator sets Top 3 rewards
↓
Creator posts Circle link on Snapchat / Instagram / WhatsApp / TikTok
↓
Supporters join
↓
Supporters send gifts to climb rank
↓
Leaderboard changes live
↓
Supporters fight for Top 3 Crown Holder spots
↓
Top 3 unlock creator-defined rewards
↓
Creator earns 30% of gifts later
↓
Creator reposts Circle Pulse and repeats
```

The business works only if creators post their Circle links and supporters care about rank.

---

## MVP Goal

The first MVP should prove one thing:

> Will supporters compete for Top 3 in a creator's Circle?

Build this before adding complex payments or payouts.

### MVP Features

- Mobile-first PWA
- Creator Circle creation
- Public Circle page: `/c/:slug` or `/r/:slug`
- Creator profile photo and cover photo support
- Creator reward setup for #1, #2, and #3
- Supporter entry form
- Gift / fake coin buttons for MVP testing
- Points-based leaderboard
- Top 3 Crown Holder display
- Golden Inbox / top entries section
- Circle Pulse share card concept
- Viewer CTA: “Create your own Circle”

### MVP Gift Types

Start with fake points before real payments:

- Rose Entry: 10 points
- Golden Entry: 50 points
- Diamond Entry: 150 points
- Crown Entry: 400 points
- Royal Shield: 1,000 points

If users compete with fake points, then add real Stripe payments.

---

## Reward System

Creators set rewards for the Top 3.

Allowed reward examples:

- Pinned Crown Holder spot for 24h
- Highlighted message inside Golden Inbox
- Creator reaction inside the app
- One reply request inside the app
- Custom thank-you text or voice note inside the app
- Top 3 badge
- Mention on Circle Pulse share card
- Custom Circle title
- Choose the creator's next Circle prompt

Disallowed reward examples:

- Phone number
- WhatsApp number
- Private Snapchat
- Private Instagram access
- Guaranteed DM or relationship promise
- Sexual/adult content
- Meetups
- Anything involving minors
- Anything that pressures the creator off-platform

Daira should be positioned as **18+ social gifting and Circle ranking**, not dating access and not adult content.

---

## Creator Revenue Model

Planned later-stage split:

- Creator: 30%
- Daira/Koinara platform: 70% before payment processing, infrastructure, refunds, taxes, and fraud costs

For MVP, use fake coins first.

Do not enable cash payouts until:

- Creator identity verification exists
- 18+ verification exists
- Minimum payout threshold exists
- Manual review / moderation exists
- Stripe Connect or equivalent payout infrastructure is ready

---

## Product Language

Use these terms:

- Circle
- Crown Holder
- Golden Entry
- Diamond Entry
- Top 3
- Circle Rank
- Golden Inbox
- Circle Pulse
- Supporters
- Creator rewards
- Team Battle

Avoid these terms:

- Simp
- Stalker
- Spy
- Hack
- Expose
- Pay for number
- Pay for private Snap
- Adult content
- Dating access

---

## Target Market

Launch focus:

1. Kuwait beta test
2. Saudi Arabia scale push
3. UAE payment / creator polish
4. Wider GCC
5. Wider MENA
6. Global version later

Primary users:

- Female micro-creators
- Lifestyle creators
- Beauty / fashion / cafe / university creators
- Snapchat / TikTok / Instagram active creators
- Supporters who want visibility, rank, and creator recognition

---

## Tech Direction

Current repo can be reused.

Recommended real app stack:

- React + Vite + TypeScript
- Tailwind CSS
- Supabase Auth / Postgres / Storage
- Vercel deployment
- Stripe Checkout / Stripe Connect later
- Mobile-first PWA first, native app later if traction appears

Current GitHub Pages static demo is only a prototype. The real product should become a proper React/Vite app deployed to Vercel.

---

## Proposed Data Model

### users

- id
- email
- username
- display_name
- country
- city
- role: creator/supporter/admin
- age_confirmed
- created_at

### creator_profiles

- id
- user_id
- display_name
- bio
- profile_photo_url
- cover_photo_url
- country
- city
- is_verified
- created_at

### circles

- id
- creator_id
- slug
- title
- status: active/paused/ended
- round_ends_at
- created_at

### circle_rewards

- id
- circle_id
- rank: 1/2/3
- reward_title
- reward_description
- reward_type
- created_at

### entries

- id
- circle_id
- supporter_handle
- platform
- message
- points
- rank
- created_at

### gifts

- id
- circle_id
- entry_id
- gift_type
- points
- amount_cents
- is_fake_mvp
- created_at

### payments_later

- id
- user_id
- circle_id
- gift_id
- stripe_session_id
- amount_cents
- currency
- status
- created_at

---

## Build Order

1. Rename product UI to Daira while keeping repo name for now
2. Build mobile-first React/Vite app shell
3. Build creator Circle setup flow
4. Build public Circle page
5. Build supporter entry + fake gifts
6. Build leaderboard and Top 3 Crown Holders
7. Build creator dashboard / Golden Inbox
8. Build shareable Circle Pulse card
9. Add Supabase persistence
10. Test with real creators using fake coins
11. Add Stripe only after fake-gift competition is proven

---

## Success Metrics

Track:

- Circles created
- Active Circles posted publicly
- Entries per Circle
- Gifts per Circle
- Repeat supporters
- Top 3 rank changes
- Creator repost rate
- Revenue per active Circle once payments launch

The first real milestone:

> One creator generates 20+ entries and supporters compete for Top 3.

The first money milestone:

> One creator generates $20+ from one Circle campaign.
