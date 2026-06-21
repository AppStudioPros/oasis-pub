# Admin Panel Build Standards
_Created: 2026-06-21 | Based on: Social New London + Oasis admin panel build_

This document exists because we made mistakes that caused client-facing failures. Read it before building any admin panel. Follow every checklist. No exceptions.

---

## The Core Rule

**Every admin feature has three parts. ALL THREE must be built and verified before it is "done":**

1. **Admin writes to Supabase** — the editor saves data correctly to the right table with the right venue filter
2. **Public site reads from Supabase** — the live website fetches that exact same table/column
3. **End-to-end verified** — a real change made in admin appears on the live site

If you only do 1 and 2 but not 3, you will ship broken features. This happened to us. Do not let it happen again.

---

## Mistakes We Made (and the fixes that followed)

### 1. Oasis drinks menu not wired to admin
**What happened:** The Oasis menu editor saved to Supabase correctly. But the Oasis public drinks page read from 6 static JSON files in the repo — not from Supabase. So every edit in the admin did nothing on the live site.

**Root cause:** The JSON files were already in the repo from before the admin existed. When we built the Oasis menu editor we never checked what the public site was actually reading from.

**Fix:** Rewrote `oasis-pub/src/app/drinks/page.tsx` to call `getOasisMenuTabs()` from Supabase. JSON files kept as fallback.

**Rule going forward:** After building any admin data editor, grep the public site's page files for what data source they use. If it's JSON, hardcoded data, or a different API — wire it to Supabase before calling it done.

---

### 2. Social messages showing Oasis submissions (venue isolation failure)
**What happened:** The Social admin Messages page was showing messages from both venues. The Oasis contact form was saving messages without a `venue` field. The Social admin query had no `.eq("venue", "social")` filter.

**Root cause:** The `venue` column was added to the `messages` table but the existing queries and form inserts weren't updated to use it.

**Fix:**
- Social messages page: added `.eq("venue", "social")`
- Social dashboard count: added `.eq("venue", "social")`
- Social contact form API: added `venue: "social"` to every insert
- Oasis contact + hiring forms: added `venue: "oasis"` to every insert

**Rule going forward:** Every table that serves multiple venues MUST have a `venue` column. Every query MUST filter by venue. Every insert MUST set venue. Check all three when building.

---

### 3. Resend false alarms from health check
**What happened:** Health check tried to validate Resend key by hitting `GET /api.resend.com/domains`. Send-only scoped keys cannot call that endpoint — returns 401 by design. Fired false "email broken" alerts all night.

**Root cause:** Wrong endpoint used for validation. Send-only keys can ONLY call `POST /emails`.

**Fix:** Changed health check to verify key presence only. Real email monitoring = `email_sent` boolean on each message row.

**Rule going forward:** See `memory/RESEND-RULES.md` for full Resend setup rules.

---

### 4. Menu items showing as blank blocks
**What happened:** New items added in the editor showed as blank rows. Clicking them revealed the data was there but it wasn't displaying.

**Root cause:** When a new item saves, `onUpdate` is called with the real DB row (real UUID). But the match logic was `i.id === updated.id` — the temp item had a `new-123` id that never matched, so the row never swapped in.

**Fix:** Match on `section_id + position` as fallback for newly saved items.

**Rule going forward:** Any time you use optimistic UI with temp IDs, verify the swap-out logic handles the id mismatch between temp and real DB rows.

---

### 5. Old subheadings (seeded from JSON) not rendering as SubheadRow
**What happened:** We added proper `is_subhead` boolean support. New subheadings worked correctly. But existing seeded subheadings had `description: "__subhead__"` from the old system — they rendered as regular items with "--subhead--" showing as description text.

**Fix:** SQL migration: `UPDATE menu_items SET is_subhead = true, description = null WHERE description = '__subhead__'`

**Rule going forward:** Whenever you change how a data field is interpreted, audit existing data and migrate it. Don't assume seeded/legacy data matches the new schema.

---

## Supabase Schema Reference (Social NL + Oasis)

**Project:** `hwzndsbkzabfcfbnvzge`
**URL:** `https://hwzndsbkzabfcfbnvzge.supabase.co`

### Tables

#### `events`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK, auto |
| venue | text | `'social'` or `'oasis'` — ALWAYS filter by this |
| title | text | |
| slug | text | URL slug |
| start_date | timestamptz | Store as ISO, parse with `T12:00:00` to avoid TZ rollback |
| end_date | timestamptz | |
| status | text | `'draft'`, `'published'`, `'archived'` |
| image_url | text | |
| image_focal_x/y | smallint | 0-100, focal point for image cropping |
| category | text | |
| featured | boolean | |
| ticket_url / rsvp_url | text | |

#### `menu_tabs`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| venue | text | `'social'` or `'oasis'` |
| type | text | `'food'` or `'drinks'` |
| name | text | Display name e.g. "Craft Beer" |
| slug | text | URL slug |
| position | integer | Display order |

#### `menu_sections`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| tab_id | uuid | FK → menu_tabs |
| name | text | e.g. "IPAs & Pale Ales" |
| note | text | Shown at top of section |
| detail | text | Shown below section title |
| addons | text | Shown below item list |
| position | integer | Display order |

#### `menu_items`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| section_id | uuid | FK → menu_sections |
| name | text | |
| price | text | |
| price_alt | text | e.g. bottle price for wine |
| description | text | |
| note | text | e.g. sauce options, allergens |
| addons | text | |
| subcategory | text | Optional grouping label |
| is_subhead | boolean | `true` = renders as bold divider, not a regular item |
| position | integer | Display order within section |

#### `messages`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PK |
| venue | text | `'social'` or `'oasis'` — ALWAYS filter by this |
| source | text | `'contact'`, `'bakery'`, `'jobs-bartender'`, etc. |
| name / email / phone | text | |
| message | text | |
| metadata | jsonb | Full form fields |
| is_read / is_archived / starred | boolean | |
| email_sent | boolean | `true/false/null` — tracks whether Resend sent the notification |

#### `user_profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid | FK → auth.users |
| email | text | |
| role | text | `'admin'` or `'user'` |
| venues | text[] | `['social']`, `['oasis']`, or `['social','oasis']` |

#### `audit_log`
| Column | Type | Notes |
|---|---|---|
| venue | text | Which venue triggered the action |
| user_id / user_email / user_name | text | Who did it |
| action | text | e.g. `menu.item.created` |
| category | text | e.g. `menu`, `events`, `message` |
| label | text | Human-readable description |

#### `settings` (single row, id=1)
| Column | Type | Notes |
|---|---|---|
| notification_routing | jsonb | Overrides default email recipients per form type |
| hours | jsonb | Business hours |

#### `oasis_staff`
| Column | Type | Notes |
|---|---|---|
| name / role / bio / photo_url | text | |
| display_order | integer | |
| active | boolean | |

---

## Data Flow Map

```
PUBLIC SITE (read)          SUPABASE            ADMIN PANEL (write)
──────────────────          ────────            ───────────────────
social-new-london           events              admin → events CRUD
  /events page          ←── (venue=social)  ←── events editor
  /food page            ←── menu_tabs        ←── menu editor (food)
  /drinks page          ←── menu_sections    ←── menu editor (drinks)
  /api/contact          ──► messages         ──► messages inbox
                             (venue=social)

oasis-pub                   events              admin → oasis events
  /events page          ←── (venue=oasis)   ←── oasis events editor
  /drinks page          ←── menu_tabs        ←── oasis menu editor
                            (venue=oasis)
  /api/contact          ──► messages         ──► oasis messages inbox
  /api/work-with-us     ──► messages         ──► oasis messages inbox
                             (venue=oasis)

Both sites:
  /api/health           ←── Supabase + Resend health check → Slack alert
```

---

## Venue Isolation Rules (HARD RULES)

Every single query that touches a multi-venue table MUST include a venue filter. No exceptions.

**Tables that require venue filter:**
- `events` → `.eq("venue", "social")` or `.eq("venue", "oasis")`
- `messages` → `.eq("venue", "social")` or `.eq("venue", "oasis")`
- `menu_tabs` → `.eq("venue", "social")` or `.eq("venue", "oasis")`
- `audit_log` → `.eq("venue", "social")` or `.eq("venue", "oasis")`
- `pageviews` → `.eq("venue", "social")` or `.eq("venue", "oasis")`

**Every form insert MUST include venue:**
```ts
await supabase.from("messages").insert({
  venue: "social", // or "oasis" — NEVER omit this
  source: "contact",
  name, email, message,
  ...
})
```

---

## Build Checklist — New Admin Feature

Use this every single time. Do not ship until every box is checked.

### 1. Supabase Setup
- [ ] Table has `venue` column if it serves multiple venues
- [ ] RLS policies set: anon can insert (for public forms), authenticated can read/update
- [ ] All existing rows have correct `venue` value (check with SQL query)
- [ ] New columns added with `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`

### 2. Admin Panel (write side)
- [ ] Admin page queries filtered by correct venue
- [ ] Insert/update includes `venue` field
- [ ] Service role key used for auth admin operations (invite, delete user)
- [ ] Anon key used for public-facing operations
- [ ] Toast notification confirms save/add/delete to user
- [ ] Error states handled and shown to user (not swallowed silently)
- [ ] Optimistic UI: temp ID swap-out logic verified for new rows

### 3. Public Site (read side)
- [ ] Identify EXACTLY what data source the public page uses (grep for `from(`, `import.*json`, `fetch(`)
- [ ] If JSON/hardcoded: wire to Supabase function with JSON as fallback
- [ ] If already Supabase: confirm it uses the same table/columns the admin writes to
- [ ] Query includes `venue` filter
- [ ] `revalidate = 60` (or ISR) so changes appear within 60 seconds without full redeploy
- [ ] Nested data sorted by `position` (Supabase nested selects don't support ORDER BY natively)

### 4. Email / Notifications
- [ ] Resend domain verified before adding API key (see RESEND-RULES.md)
- [ ] No placeholder keys — real key or nothing
- [ ] `email_sent` boolean set on insert after send attempt
- [ ] FROM address uses verified subdomain (`noreply@mail.domain.com`)
- [ ] Correct `venue` on message insert

### 5. Live Testing (MANDATORY — do not skip)

**Kelsi: run these tests yourself after every new feature ships.**

#### Events
- [ ] Create a draft event in admin → confirm it does NOT appear on public site
- [ ] Publish the event → confirm it appears on public site within 60 seconds
- [ ] Edit the event title → confirm the change appears on the public site
- [ ] Delete the event → confirm it disappears from the public site

#### Menu
- [ ] Add a new section to a tab → hard refresh admin, confirm it appears
- [ ] Add an item to that section → confirm it appears instantly (no hard refresh needed)
- [ ] Edit the item name + price → confirm it updates instantly in admin
- [ ] Open the live public site drinks/food page → confirm the new section and item appear
- [ ] Add a subheading → confirm it renders as bold divider (not a regular item row)
- [ ] Delete the test item and section → confirm they disappear from both admin and site

#### Messages
- [ ] Submit the contact form on the Social NL public site → check Social admin Messages tab
- [ ] Confirm the message appears ONLY under Social (not Oasis)
- [ ] Submit the contact form on the Oasis public site → check Oasis admin Messages tab
- [ ] Confirm the message appears ONLY under Oasis (not Social)
- [ ] Check your email — confirm the notification email arrived from the correct sender address

#### Users / Invite Flow
- [ ] Invite a new user → confirm invite email arrives
- [ ] Click the link → confirm it goes to set-password page (not login)
- [ ] Set password → confirm redirect to dashboard
- [ ] Confirm new user only sees their venue(s) in the sidebar

#### Health Check
- [ ] Hit `/api/health` directly on both sites → confirm `{ ok: true }` response
- [ ] Confirm Slack alerts fire when something is broken (test with a bad key in staging)

---

## Key File Locations

### Admin Panel
```
social-new-london-admin/
  app/(dashboard)/
    page.tsx                    Social dashboard (filter: venue=social)
    menu/MenuClient.tsx         Menu editor (shared Social + Oasis)
    menu/page.tsx               Social menu page (filter: venue=social)
    messages/page.tsx           Social messages (filter: venue=social)
    oasis/menu/page.tsx         Oasis menu page (filter: venue=oasis)
    oasis/messages/page.tsx     Oasis messages (filter: venue=oasis)
    settings/page.tsx           Social settings + Users manager
  components/
    Toast.tsx                   Toast notification system (useToast hook)
    UsersManager.tsx            User invite/edit/delete UI
  lib/
    auth.ts                     getCurrentProfile, requireAdmin, hasVenueAccess
    audit.ts                    logAudit() helper
  lib/supabase/
    client.ts                   Browser-side Supabase client
    server.ts                   Server-side Supabase client (SSR)
    middleware.ts               Route protection by role + venue
```

### Social NL Public
```
social-new-london/src/
  lib/supabase.ts               getMenuTabs(), getUpcomingEvents() etc.
  app/food/page.tsx             Food menu → reads from Supabase via getMenuTabs("social","food")
  app/drinks/page.tsx           Drinks menu → reads from Supabase via getMenuTabs("social","drinks")
  app/api/contact/route.ts      Contact form → saves to messages (venue=social) + sends via Resend
  app/api/health/route.ts       Health check cron endpoint
```

### Oasis Public
```
oasis-pub/src/
  lib/supabase.ts               getOasisMenuTabs(), getUpcomingEvents() etc.
  app/drinks/page.tsx           Drinks menu → reads from Supabase via getOasisMenuTabs()
  app/api/contact/route.ts      Contact form → saves to messages (venue=oasis) + sends via Resend
  app/api/work-with-us/route.ts Hiring form → saves to messages (venue=oasis) + sends via Resend
  app/api/health/route.ts       Health check cron endpoint
  data/drinks/*.json            FALLBACK ONLY — public site reads Supabase first
```

---

## Date Handling

**Critical:** Never use `new Date("YYYY-MM-DD")` directly. It parses as UTC midnight, which rolls back to the previous day in Eastern time.

**Always append noon:**
```ts
const date = new Date(`${dateString}T12:00:00`);
```

**For "upcoming" filter in Eastern time:**
```ts
const nowET = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
const todayET = new Date(nowET.getFullYear(), nowET.getMonth(), nowET.getDate());
```

---

## Auth Architecture

- **Auth provider:** Supabase Auth (SSR, cookie-based sessions)
- **User roles:** stored in `user_profiles.role` (`'admin'` or `'user'`)
- **Venue access:** stored in `user_profiles.venues` (text array)
- **Route protection:** `lib/supabase/middleware.ts` blocks by role + venue at the edge
- **Admin-only paths:** `/settings`, `/oasis/settings`, `/analytics`, `/oasis/analytics`, `/messages`, `/oasis/messages`
- **Invite flow:** `auth.admin.inviteUserByEmail()` → Supabase sends email → `/auth/callback` verifies OTP → `/set-password`
- **Service role key:** required for invite + delete operations (never use anon key for these)

---

## Monitoring

- **Health check cron:** Vercel cron, every 5 hours, both sites
- **Checks:** Supabase reachable, RESEND_API_KEY set, homepage HTTP 200, `email_sent=false` rows in last 5h
- **Alert destination:** Slack webhook → Corey's DM (`D0AHN3R4BUM`)
- **Webhook URL:** saved in TOOLS.md
- **Routes:** `/api/health` on both public sites

---

## When Something Breaks

1. Check Supabase first — query the table directly with service role key to confirm data is there
2. Check the public site's page file — confirm it's reading from Supabase (not JSON/hardcoded)
3. Check venue filter — missing `.eq("venue", ...)` is the most common cause of wrong data showing
4. Check `email_sent` column — zero `false` rows = forms are working, alerts are false alarms
5. Check Vercel env vars — confirm key is set AND that a deploy happened after it was set
6. Hit `/api/health` directly — returns JSON showing exactly what's passing/failing

---

## Define Client Permissions Before You Build

Before writing a single line of code on a new admin panel, answer these questions and write them down:

**What can the client edit?**
- [ ] Events (create, publish, edit, delete)
- [ ] Food menu (tabs, sections, items)
- [ ] Drinks menu (tabs, sections, items, subheadings)
- [ ] Staff/team members
- [ ] Business hours
- [ ] Contact/notification routing
- [ ] Gallery/images
- [ ] Blog posts
- [ ] Other: _________________

**What should they NOT be able to touch?**
- [ ] Site design / CSS
- [ ] Code / integrations
- [ ] Other users' accounts
- [ ] Billing / hosting settings
- [ ] Other: _________________

**Who gets admin role vs user role?**
Admin = full access including Settings, Users, Analytics
User = Events + Menu editors only

Write this list BEFORE building. Build only what's on the list. This prevents scope creep and prevents clients from having access to things they shouldn't touch.

---

## Weekly Health Summary (Monitoring)

The Vercel cron runs every 5 hours and only alerts on failure. To give clients visibility that their site is actively monitored, set up a weekly summary.

**Every Monday morning**, a cron job fires a Slack message to Corey:
> ✅ Weekly Site Status — [date]
> Social NL: all checks passing
> Oasis: all checks passing
> Last checked: [timestamp]

This is not yet implemented — add it when the cron system is next touched. The implementation is a separate cron schedule (`0 9 * * 1` = 9am every Monday) that hits both `/api/health` endpoints and posts a summary regardless of pass/fail.

This gives Kelsi something to show clients: "your site is monitored 24/7 and we get weekly reports."
