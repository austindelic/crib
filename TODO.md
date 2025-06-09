# 🧱 Crib App - Super Broken Down TODO (Per-Commit Style)

## 🛠️ PHASE 1: Setup & Project Foundations

- [x] Initialise SvelteKit app with `npm create svelte@latest crib`
- [x] Select TypeScript + basic options in setup prompt
- [x] Add TailwindCSS via `postcss.config.cjs`, `tailwind.config.cjs`, and `app.css`
- [x] Confirm Tailwind works with test styles
- [x] Add Prettier config and `.prettierrc`
- [x] Add ESLint config and `.eslintrc.cjs`
- [x] Initialise Git repo and first commit
- [x] Create `.env` and `.env.example` files
- [x] Install and configure Drizzle ORM
- [x] Set up Drizzle `schema.ts` and connect Postgres
- [x] Write migration for initial empty schema
- [x] Run first `drizzle-kit push`
- [x] Test DB connection in SvelteKit server file
- [x] Deploy app to Vercel (connect GitHub repo)
- [x] Confirm Vercel env vars setup
- [ ] Create landing page with title + placeholder content

---

## 👥 PHASE 2: Authentication & User Accounts

- [x] Install `arctic` for OAuth
- [x] Add GitHub OAuth client ID/secret to `.env`
- [x] Add Google OAuth client ID/secret to `.env`
- [x] Add `/login/github` and `/login/google` endpoints
- [x] Add callback endpoints for both OAuth providers
- [x] Implement session storage (e.g. JWT or cookie sessions)
- [x] Create `users` table in Drizzle schema
- [x] Save new users to DB on login
- [x] Write session validation logic middleware
- [x] Show logged-in user name in navbar
- [x] Show avatar in navbar
- [x] Added account logout page

---

## 🏠 PHASE 3: House & Membership System

- [x] Create `houses` table in DB
- [x] Link `users` to `houses` via `house_users` table
- [x] Add form for creating a house
- [x] Save new house to DB and link current user
- [x] Generate unique house join code (UUID or slug)
- [x] Create join page with code input
- [x] Validate and link user to house via code
- [x] Fetch and display houses user is part of
- [x] Build dropdown in navbar to switch active house

---

## 📋 PHASE 4: Issues

- [ ] Create `issues` table linked to house
- [ ] Add form to submit new issue
- [ ] Store title, description, created_by, house_id
- [ ] Display issues in list view on dashboard
- [ ] Add upvote/downvote buttons
- [ ] Store votes in separate `issue_votes` table
- [ ] Calculate issue importance based on votes

---

## 🧼 PHASE 5: Chores

- [ ] Create `chores` table linked to house
- [ ] Add toggle for recurring chores (daily/weekly)
- [ ] Add form to submit chore with due date
- [ ] Add preference voting system (1, 2, 3)
- [ ] Assign chores based on weighted preferences
- [ ] Let users “request a revote” button
- [ ] Display assigned chores per user

---

## 💸 PHASE 6: Bills & Money Management

- [ ] Create `expenses` table linked to house
- [ ] Add form to input expense (amount, reason, who paid)
- [ ] Track contributions from users to shared pool
- [ ] Predict bills using 30-day average (simple logic)
- [ ] Calculate reimbursements per user
- [ ] Add vote/confirm button for reimbursements
- [ ] Optional: integrate Stripe test mode

---

## 📆 PHASE 7: Shared Calendar

- [x] Install fullcalendar or Svelte calendar lib
- [ ] Create `events` table in DB (title, date, house_id)
- [ ] Add form to create calendar event
- [ ] Display event list in month view
- [ ] Auto-generate events from chores and bills
- [ ] Add toggle between house view and personal view
- [ ] (Stretch) Google Calendar API sync

---

## 📄 PHASE 8: Custom House Page (.md)

- [x] Create markdown content column in `houses` table
- [x] Add internal markdown editor component (Monaco, SimpleMDE)
- [x] Add live preview toggle next to editor
- [x] Render custom content on House “Home” page

---

## 🧠 PHASE 9: Smart Features (Optional AI)

- [ ] Write OpenAI integration wrapper
- [ ] Feed user preferences + history to GPT to optimise chore allocation
- [ ] Use AI to tag recurring issues
- [ ] Add leaderboard for completed chores

---

## 🔐 PHASE 10: Developer Features & API

- [ ] Create `/api` routes with validation
- [ ] Add API tokens support (per user or house)
- [ ] Write docs for all API endpoints (OpenAPI optional)
- [ ] Add unit tests for core logic
- [ ] Setup GitHub Actions CI for lint + type check

---

## 🎨 PHASE 11: UI Polish

- [ ] Add responsive layout to all pages
- [ ] Add consistent spacing + typography with Tailwind
- [x] Add dark mode toggle
- [ ] Add icon set to buttons/navigation
- [ ] Add toast notifications for actions

---

## 🚀 PHASE 12: Launch & Feedback

- [x] Connect custom domain on Vercel
- [ ] Add “Report bug” and “Request feature” links
- [x] Add lightweight analytics (e.g. Plausible)
- [ ] Collect user feedback and prioritise v2 roadmap

---

## IDEAS

- [ ] Meal Prep?
- [ ] Dietry Requirements
- [ ] 3D house view?
