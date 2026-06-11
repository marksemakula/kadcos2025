# KADCOS Website — Issue Triage (Amos's email, 11 Jun 2026)

## Summary

Eight issues investigated against the codebase. Root causes found for all. Six are fixed in code (commit + deploy needed). The rest need configuration (Netlify environment variables, Google Sheet sharing) or are manual actions (sharing email credentials).

The single biggest finding: `netlify.toml` had `force = true` on the SPA catch-all redirect, which made the live site serve `index.html` in place of **every real file** — videos, `/data/cms_*.json`, blog JSON. This alone explains issues 2A and most of "CMS changes don't reflect."

---

## Issue-by-issue

### 1A. Leadership candidates tab — no data, no attachments, approve/reject "do nothing"

**Data flow:** site form (`/vote`) → Google Form → Google Sheet → dashboard fetches the Sheet (`gviz` endpoint, Sheet ID `1czCxA7...`). When the fetch fails, the dashboard silently falls back to two **mock candidates** (John Kamya, Sarah Nakato) — which is what Amos was seeing.

- **No data** → CONFIG: the candidates Google Sheet must be link-shared ("Anyone with the link – Viewer") and must be the response sheet actually linked to the Google Form. Verify the Form's responses land in Sheet `1czCxA7nld7qTZdu9AnRxC0iRJuDvtXr9EG-VJ327CqA`.
- **Attachments not received** → FIXED IN CODE: the upload was posted to `/api/send-application-email`, a Next.js-style API route that **never runs** on this Vite/Netlify site (it silently returned the SPA page, so the code "thought" it succeeded). Replaced with a real Netlify function `send-application-email` (nodemailer, attachment as base64, max 4MB). **Requires env vars:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (MXroute mailbox credentials) in Netlify.
- **Approve/Reject buttons** → PARTIALLY FIXED: they only changed React state, so a refresh reset everything to "pending". Decisions are now persisted (localStorage) and survive refresh/re-import. True write-back to the Google Sheet would need a small Apps Script endpoint — future work if needed.

### 1B. "Failed to persist CMS changes" (resources, services, etc.)

CMS saves call the Netlify function `commit-json`, which commits JSON to GitHub. It **requires env vars `GITHUB_TOKEN` and `GITHUB_REPO`** (`owner/repo`), optionally `NETLIFY_BUILD_HOOK` to auto-redeploy. The exact error text in the code matches a missing-env-var 500.

- **Action (CONFIG):** in Netlify → Site settings → Environment variables, set `GITHUB_TOKEN` (a GitHub fine-grained token with contents:write on this repo), `GITHUB_REPO`, `GITHUB_BRANCH=main`, and `NETLIFY_BUILD_HOOK` (create under Build & deploy → Build hooks).
- Note: even after a successful save, changes appear on the public site only after the triggered rebuild finishes (1–3 min).
- The `force=true` redirect (now removed) was also preventing the public pages from reading the committed `/data/cms_*.json` files — so even successful commits never showed.

### 2A. Videos don't play

Two causes, both fixed:

1. `force = true` SPA redirect served `index.html` instead of the mp4 files → removed in `netlify.toml`.
2. The mp4s are tracked with **Git LFS**; Netlify deploys the 130-byte LFS pointer files, not the videos. LFS tracking removed (`public/videos/.gitattributes`). **After pulling, run:** `git add --renormalize public/videos && git commit` so the real files (12MB + 8MB, fine for GitHub) are committed.

### 2B. Where do application forms (individual/joint/group) save?

They POST to three **Google Apps Script web apps** (see `formUrl`s in `src/pages/Membership.jsx`), which write to Google Sheets owned by whoever deployed those scripts (Inzozi handover?).

- **Answer for Amos:** data goes to Google Sheets via Apps Script — not lost, but you need access to those Sheets.
- **Future work:** add a "Membership Applications" tab to the admin dashboard reading those sheets the same way Members/Candidates do. Needs the three Sheet IDs (open each Apps Script / Drive to find them) — ~1 hour of work once IDs are known.

### 2C. "Contribute to Blog" button static

FIXED: now opens a pre-filled email to admin@kadcoslubaga.co.ug (cc sacco gmail) with a contribution template. (Also fixed the static "Contact Our Team" button on Resources page → links to /contact.)

### 2D. Mail page/link

The navbar "Mail" link opened `mail.mxlogin.com` on desktop but `mail.kadcoslubaga.co.ug` on mobile (which isn't configured → dead). FIXED: both now go to `https://mail.mxlogin.com/` (MXroute webmail).

- **Manual action:** share the admin@kadcoslubaga.co.ug credentials with Amos **privately** (phone/WhatsApp — not by reply-all email).

### 2E. Resources/e-Lib not downloadable

FIXED: the Download button was decorative (no link at all). It now downloads the file when one was uploaded via the CMS (`fileUrl`/`fileData`), and shows "Coming soon" when no file is attached. Note: the current seeded resources (Annual Report 2023 etc.) have **no files attached** — they must be re-uploaded via Admin → Content Management → Resources once the 1B env vars are set (uploads also go through GitHub).

### Zukuka Tukole loan missing

Not in `public/data/cms_services.json` (loan list: Personal, School Fees, Business, Agricultural, Construction, Weekend, In-Kind, Emergency). Once 1B env vars are set, add it via Admin → Content Management → Services. (Or tell me the details and I'll add it directly to the JSON.)

---

## Deployment checklist (in order)

1. Review changed files (`git status`), then:
   `git add --renormalize public/videos && git add -A && git commit -m "Fix redirects, videos (un-LFS), downloads, mail link, application emails" && git push`
2. Netlify env vars: `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH`, `NETLIFY_BUILD_HOOK`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.
3. Google Sheets: link-share the candidates sheet (and members sheet) as "Anyone with link – Viewer"; confirm the Form feeds it.
4. Share admin email credentials with Amos privately.
5. After deploy, test: videos on home page, a CMS save, a resource upload+download, a test leadership application with a small PDF.

## Changed files

`netlify.toml`, `public/videos/.gitattributes`, `netlify/functions/send-application-email.js` (new), `src/pages/Vote.jsx`, `src/pages/AdminDashboard.jsx`, `src/pages/ResourcesELib.jsx`, `src/pages/Blog.jsx`, `src/components/Navbar.jsx`.

Dead code worth deleting later: `src/pages/api/send-application-email.js`, `src/pages/Leadership.jsx` (not routed), mock data in `src/lib/supabase.js` (unused mock client).
