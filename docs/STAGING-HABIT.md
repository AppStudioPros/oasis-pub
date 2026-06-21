# Staging & Testing Habit
_Created: 2026-06-21_

## The Rule

**Never verify work on the live production site. Always use Vercel preview deploys first.**

Every push to GitHub triggers a Vercel preview deploy automatically. That preview is a full working version of the site with all env vars — identical to production. Check the preview first. Only when it looks right do we consider the work done.

---

## The Correct Workflow

```
Code change
    ↓
Push to GitHub (main or feature branch)
    ↓
Vercel builds preview deploy automatically
    ↓
Check the Vercel preview URL ← THIS IS THE TEST STEP
    ↓
If it looks right → it's done, production will match
If it doesn't → fix and push again (repeat)
    ↓
Never touch production directly to verify
```

---

## How to Get the Vercel Preview URL

**Option 1 — Vercel dashboard:**
1. Go to vercel.com → your project
2. Click "Deployments"
3. Find the latest deployment → click "Visit"

**Option 2 — From the commit:**
After pushing, Vercel posts a comment on the GitHub commit with the preview URL. Check GitHub.

**Option 3 — I can fetch it:**
Ask me "what's the preview URL for [project]?" and I'll pull it from the Vercel API.

---

## What to Test on the Preview

Don't just look at the homepage. Test the thing you actually changed:

| Changed | Test this |
|---|---|
| Menu item/section | Go to the drinks or food page, confirm the change appears |
| Event | Go to the events page, confirm publish/draft status is correct |
| Contact form | Submit the form, check the admin messages inbox |
| CSS/layout change | Check on mobile (use Chrome devtools → toggle device toolbar) |
| Admin panel feature | Log in, perform the action, confirm result in admin AND on public site |
| Health check route | Hit `/api/health` directly — should return `{ ok: true }` |

---

## Branches vs Main

Right now we push everything to `main` which deploys to production immediately. This is acceptable for small changes but risky for large features.

**For small changes (text edits, color fixes, minor UI):** push directly to `main`, check preview immediately after.

**For large features (new pages, schema changes, new admin sections):** consider using a feature branch:
```bash
git checkout -b feature/new-menu-editor
# make changes
git push origin feature/new-menu-editor
# test preview URL
# when ready: merge to main
```

---

## Environment Variables After Changes

This is the most common missed step:

1. You add or update an env var in Vercel dashboard
2. **A new deploy must happen** for the running site to pick it up
3. The previous deploy is still running with the old env vars until redeployed

**Always trigger a redeploy after changing env vars:**
- Either push a commit (even an empty one)
- Or go to Vercel → Deployments → Redeploy

---

## Vercel Project Reference

| Site | Vercel Project ID | Live URL |
|---|---|---|
| Social NL public | `prj_XDsvgpEaBPJY4Z09fLBITmxzbM8O` | socialnewlondon.com |
| Oasis public | `prj_LCRI8OwKp9a8zwWI3kVcshsKrwwk` | oasisnewlondon.com |
| Social NL admin | (AppStudioPro org) | admin.socialnewlondon.com |
| VN365 | `prj_PYF9NFIToQ4heJaHlsRo2gIjPIQ0` | virtual-notary-365.vercel.app |
