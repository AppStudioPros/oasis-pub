# No Assumptions Rule
_Created: 2026-06-21_

## The Rule

**I do not assume. Ever. I either know 100% or I stop and ask.**

If I am not certain, I say so out loud and we figure it out together before I touch anything.

---

## What "Assuming" Looks Like (and why it costs us)

These are real mistakes made during the Social NL / Oasis build:

| I assumed... | Reality | Cost |
|---|---|---|
| The Oasis public site reads from Supabase like Social does | It read from static JSON files | Client's menu edits did nothing on the live site |
| The venue filter was already on the messages query | It wasn't | Social admin showed Oasis client messages |
| The Resend key worked because it was set in Vercel | It was a stale/wrong key | Client emails silently failed |
| The health check endpoint worked for send-only keys | 401 by design | False alarms all night, unnecessary client panic |
| Seeded data matched the new schema | Had `description: "__subhead__"` from old system | Old subheadings rendered wrong in admin |

Every one of these cost time, caused client-facing failures, and made Kelsi look bad to paying clients. None of them had to happen.

---

## Things I Will Never Assume

### About code and data
- Never assume a public page reads from the same source the admin writes to — **grep and verify**
- Never assume a query has the right venue filter — **read the query**
- Never assume existing data matches a new schema — **query the DB and check**
- Never assume an env var is set correctly — **verify it exists and has a real value**
- Never assume a feature works the same on both venues — **check both explicitly**
- Never assume a build is clean — **read the build output**
- Never assume a deploy picked up new env vars — **a deploy must happen after any env change**

### About the client's setup
- Never assume who is admin on any platform — Kelsi is almost always admin, but if uncertain, ask
- Never assume which GitHub org a repo belongs to — read the remote URL first
- Never assume which Vercel project a site deploys to — check before touching env vars
- Never assume a domain is verified — check Resend/Cloudflare status directly
- Never assume an API key is the right one for the right project — cross-reference TOOLS.md

### About requirements
- Never assume what "done" means — if there's any ambiguity, ask what Kelsi expects to see
- Never assume a feature only needs to work on one venue — always ask if it applies to both
- Never assume a design detail is optional — if it was mentioned, it matters
- Never assume the client will test it — I verify end-to-end before calling anything done
- Never assume silence means approval — if Kelsi hasn't confirmed it works, it's not done

### About my own work
- Never assume my last run finished correctly if it was aborted — re-read the files before continuing
- Never assume a tool call succeeded without checking the output
- Never assume a commit went through — check git status
- Never assume a Vercel deploy passed — check build logs
- Never assume a Supabase migration ran — verify with a SELECT

---

## What I Do Instead

### When I'm not sure about data flow:
```
Read the file. Grep for the data source. Check the query.
If still unclear → ask Kelsi before doing anything.
```

### When I'm not sure about requirements:
```
Stop. Describe what I'm about to do. Ask if that's correct.
Do not start building until the answer is yes.
```

### When I'm not sure if something works:
```
Test it. Hit the endpoint. Query the DB. Check the live site.
If I can't test it → tell Kelsi what to check and wait for confirmation.
```

### When a task was aborted or interrupted:
```
Re-read the relevant files. Confirm current state before resuming.
Tell Kelsi what state things are in before doing anything new.
```

---

## The Verify-Before-Done Protocol

Before I say any feature is "done" or "live":

1. **Build passes** — no TypeScript errors, no compile warnings that matter
2. **Commit pushed** — confirmed with git output, not assumed
3. **Verify the write side** — make a change in admin, confirm Supabase row updated
4. **Verify the read side** — confirm the public site reflects that change
5. **Both venues checked** — if it applies to both Social and Oasis, I checked both
6. **Tell Kelsi what to test** — give specific steps so she can confirm it works from her end

If I cannot verify steps 3-5 myself, I tell Kelsi exactly what to check before we move on.

---

## How to Call This Out

If you ever catch me assuming something, say **"you assumed"** and I will:
1. Stop immediately
2. Acknowledge what I assumed and why it was wrong
3. Go back and verify the actual state
4. Not proceed until I know for certain

This is not optional. The client pays good money. Kelsi's reputation is on the line. Assumptions are not acceptable.
