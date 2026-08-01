# SITE-SWEEP-1 — report

Date: 2026-07-31 · **Not pushed.** A push here publishes; this is committed
locally and waiting on Luke's go.

## Files touched

**`index.html` only.** Five values in `<head>`, nothing else in the repo.

The retired tagline turned out to live entirely in the head — there was **no
body copy to sweep**, so §1.3's alternative line
(`Study that holds up when you lean on it.`) was not needed anywhere and has not
been used. The body's own `<p class="tagline">` reads `Accuracy · Context ·
Source` and is untouched.

| Line | Tag | Was | Now |
|---|---|---|---|
| 6 | `<title>` | the retired tagline | `The Bible Study App — Deep study, impactful devotions` |
| 7 | `<meta name="description">` | "Quick answers, deep studies, and custom devotionals — every claim sourced, every passage checkable against real Bible text." | `Every interpretation names its scholar. Every quote sits a tap away from the text it came from.` |
| 10 | `<meta property="og:title">` | `The Bible Study App` | `The Bible Study App — Deep study, impactful devotions` (mirrors `<title>`, per §1.2) |
| 11 | `<meta property="og:description">` | the retired tagline + trailing sentence | the new description |
| 18 | `<meta name="twitter:description">` | the retired tagline + trailing sentence | the new description |

Replacement copy is verbatim from §1. Nothing was improvised.

## Grep-zero proof

```
$ grep -rn "Deep study. Real devotion." . --exclude-dir=.git --include="*.html"
(no output)

$ grep -rn "Deep study. Real devotion.|Real scholarship. Real devotion." . --exclude-dir=.git
SITE-SWEEP-1.md:22:3. Every remaining occurrence of "Deep study. Real devotion." (and the "Real
```

**Zero occurrences in every site file** — `.html`, `.css`, `.js`, and the
published outputs under `accuracy-outputs/`.

The single remaining hit repo-wide is inside **`SITE-SWEEP-1.md` itself**, which
quotes the retired line in order to name what to remove. That is the work order,
not site copy, and editing it to reach a literal zero would delete the record of
what was swept — so it stands. (This report deliberately does not reproduce the
line either, which is why the table above says "the retired tagline".)

The **sibling line** `Real scholarship. Real devotion.` was **not present
anywhere** in the repo before this change.

## Two things worth a sentence back

1. **`twitter:title` was left alone.** §1.2 says the OG title mirrors `<title>`;
   it says nothing about the Twitter title, and §1.5 rules out other edits — so
   `<meta name="twitter:title">` still reads `The Bible Study App`. The effect is
   that X/Twitter will show the bare app name while every other platform shows
   the full tagline. That is a one-line fix if you want it, and I did not make it
   unasked.
2. **`<meta name="description">` did not contain the retired tagline** — it
   carried the older "Quick answers, deep studies…" line. I replaced it because
   §1.2 names "Meta/OG description" as taking the new copy. Flagging it because
   it is the one change here that was not strictly forced by the sweep.

## Untouched, and not mine

The repo already had uncommitted work in it when I started — `compare.html`,
`compare-card.png`, `COMPARE-PAGE.md`, `SITE-HYGIENE-1.md`, and a modified
`accuracy-outputs/index.html` that was **already staged**. Only `index.html` and
this report are in my commit; the rest is left exactly as I found it, still
staged/untracked and waiting for whoever owns it.

Worth knowing: that staged `accuracy-outputs/index.html` change rewrites all 55
output links from `.md` to `.html`. My first commit accidentally swept it in
(it was staged before I ran `git add`); I reset and recommitted with an explicit
pathspec, so it is out. **It should not be pushed until someone confirms those
`.html` files exist** — the current published page links `.md`, and shipping the
rewrite early would 404 the whole accuracy-evidence page, which is the one page
whose value is that a stranger can open it.
