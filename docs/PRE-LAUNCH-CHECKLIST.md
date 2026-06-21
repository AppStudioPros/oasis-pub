# Pre-Launch Checklist
_Created: 2026-06-21_

Run this before EVERY site or admin panel goes live to a client. Every box must be checked. No exceptions. If something can't be checked, document why and get Kelsi's sign-off before launching.

---

## 1. Forms & Email
- [ ] Every contact form submitted with real test data
- [ ] Confirmation email received at the correct destination address
- [ ] Email came FROM the correct sender address (not `onboarding@resend.dev`)
- [ ] `email_sent = true` confirmed in Supabase messages table after test
- [ ] Form submission appears in admin panel Messages tab under the correct venue
- [ ] Hiring/application forms tested separately from contact forms
- [ ] No form submits silently — user sees a success or error message

## 2. Admin Panel
- [ ] Login works for all invited users
- [ ] Each user only sees their assigned venue(s)
- [ ] Admin-only sections hidden from `user` role accounts
- [ ] Events: create, publish, edit, delete — all verified working
- [ ] Menu: add section, add item, add subheading, edit, reorder, delete — all verified
- [ ] Changes made in admin appear on public site within 60 seconds (no redeploy needed)
- [ ] Toast confirmations fire on every save/add/delete action
- [ ] Messages inbox shows correct venue's submissions only
- [ ] Audit log records actions correctly

## 3. Public Site
- [ ] Homepage loads on mobile and desktop
- [ ] All navigation links work
- [ ] Events page shows correct upcoming events
- [ ] Menu pages show correct content (matches what's in admin)
- [ ] Contact form visible and functional on mobile
- [ ] Images load correctly (no broken image placeholders)
- [ ] No console errors in browser dev tools
- [ ] Site loads in under 3 seconds on mobile (check with slow 3G in Chrome devtools)

## 4. Venue Isolation (multi-venue projects only)
- [ ] Social admin shows ONLY Social data
- [ ] Oasis admin shows ONLY Oasis data
- [ ] Submitting Social contact form does NOT appear in Oasis messages
- [ ] Submitting Oasis contact form does NOT appear in Social messages
- [ ] Events for each venue only show on their respective public sites

## 5. SEO & Metadata
- [ ] Page titles correct on all main pages
- [ ] Meta descriptions set
- [ ] Canonical URLs set
- [ ] No pages returning 404 that should exist
- [ ] Old URLs redirected if domain was migrated

## 6. Monitoring
- [ ] `/api/health` returns `{ ok: true }` on all sites
- [ ] Slack webhook connected and tested (send a test alert)
- [ ] Vercel cron configured and visible in Vercel dashboard
- [ ] Health check alert destination correct (Corey's DM)

## 7. Hosting & Deployment
- [ ] Production domain pointing to correct Vercel project
- [ ] SSL certificate active (HTTPS, no browser warnings)
- [ ] All environment variables set in Vercel production (not just preview)
- [ ] A deploy was triggered AFTER setting env vars
- [ ] Vercel build log shows green (no errors)

## 8. Client Handoff
- [ ] Client handoff doc written and sent (see CLIENT-HANDOFF-TEMPLATE.md)
- [ ] Client login credentials sent securely
- [ ] Client confirmed they can log in
- [ ] Client confirmed they received a test email

---

## Sign-Off

Before going live, confirm:
- **Kelsi tested:** _________________ (date)
- **Client confirmed working:** _________________ (date)
- **Known issues at launch (if any):** _________________
