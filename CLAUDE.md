# The Bible Study App — marketing site

## What this is
The public marketing site for The Bible Study App, served by **GitHub Pages** at
**trythebiblestudy.app**. Static HTML, no build step, no framework, no bundler.
Every page is a single self-contained file.

**This repo is public.** Anything committed here is world-readable the moment it
is pushed, and permanently readable afterward via git history.

**Push = publish.** There is no staging environment. A push to `main` is live on
the public internet within about a minute.

---

## HARD STOP — founders redemption codes never enter this repo

The Founders Lifetime gift codes are **live $149.99 licenses**, 500 of them, good
until Jan 2027. This repo is public, so a code committed here is not merely
leaked — it is published.

- They live **only** in `~/Documents/` on Luke's Mac. Never here, never in the
  app repo, never in a commit message, never in an HTML comment, never in a
  "just for testing" line.
- Git history is permanent. Deleting a code in the next commit does not unpublish
  it. The only fix is invalidating 500 codes and minting new ones.
- `.git/hooks/pre-commit` blocks a commit whose staged diff contains an Apple
  redemption link, an offer-code query parameter, or an 18-character uppercase
  alphanumeric string. **Hooks are not version-controlled** — a fresh clone has
  no guard until it is reinstalled.
- If the hook fires on something harmless, unstage the file rather than reaching
  for `--no-verify`.

---

## Layout
- `index.html` — home. `demo.html` — demo.
- `accuracy.html` — the accuracy/receipts page.
- `accuracy-outputs/` — **published raw outputs from the audit battery.**
- `compare.html` + `compare-card.png` — the comparison page and its share card.
- `privacy.html`, `terms.html` — linked from the App Store listing. These are
  live legal pages a reviewer may open; do not break them.
- `og-card.png` — Open Graph share image, referenced by meta tags.
- `CNAME` — **do not delete or rename.** Removing it drops the custom domain in
  GitHub Pages settings and takes the site down until it is re-added by hand.

## Rules for what goes on this site

1. **Published battery outputs are verbatim.** Files under `accuracy-outputs/`
   are evidence. Never edit one to read better, never quietly drop a failing
   run, never regenerate one to replace a worse result. The whole value of the
   page is that the failures are in it. Fix formatting only, and only the
   wrapper — never the recorded text.
2. **Every claim on the site must be checkable by a stranger.** If a line states
   a number, a date, or a capability, the source for it must exist and be named.
   If you cannot verify a claim against a source, do not write it — write
   nothing, or write the smaller claim you can support.
3. **The comparison page has a narrow licence.** A mark is allowed only if it is
   a checkable fact. `✗` means *"not found in that app's public documentation on
   this date"* — not *"doesn't do this"*. The page carries its date and a
   correction address, and it credits what the other apps do better. **A
   subjective row — taste, depth, tradition, reverence — is banned.** That is
   the row that turns a fact sheet into a defamation exposure.
4. **Never a competitor swipe in prose.** The argument is about a behavior
   (treating a general-purpose chatbot as a research tool), never about a named
   company. Named-competitor copy also cannot appear in App Store metadata —
   Guideline 1.1.3 — so it must not be drafted here and copied over.
5. **No absolute accuracy claims.** "Verified against the bundled text" is a
   machine-checkable statement and is fine. "Never wrong", "always accurate",
   "no hallucinations" are not, and they are the claims that get an app pulled.
6. **Nothing that dates itself silently.** If a page states a fact that will
   expire — a price, a version, a translation list, a count — put the date on
   the page.

## Work orders
The cloud Claude session hands work over as a markdown file committed to this
repo root (e.g. `COMPARE-PAGE.md`), sectioned `§0`, `§1`, … Do them in order.
Each section names its acceptance criterion. If a section turns out bigger than
described, stop and report rather than expanding scope.

Report back the way the app repo does: what changed, what you verified, commit
hashes, anything blocked.

## Environment
- Repo home: `~/Developer/the-bible-study-app-site`. Keep it out of
  `~/Documents` and `~/Desktop` — iCloud sync corrupts git objects.
- Sibling repo: `~/Developer/the-bible-study-app` — the iOS app and backend.
  **Not public.** Different repo, different rules; see its own `CLAUDE.md`.
