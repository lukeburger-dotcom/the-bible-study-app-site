# SITE-COPY-REPORT: SITE-COPY-1

Date: 2026-08-02 · Site repo · **Nothing pushed.**

Order: `SITE-COPY-1.md`. All six sections done. Replacement copy used verbatim,
no improvisation, no em dashes introduced.

---

## ⚠️ Read this before pushing: index.html now contradicts itself

This is the one thing that needs a decision, and it is not something the order
anticipated.

The new §1 answer at `index.html:46` says four licensed translations are
available, naming NASB 2020. **The very next line, `index.html:47`, is still:**

> **Why aren't NASB, NIV, or ESV available?** Those translations require
> licenses, which we're pursuing. Version 1 ships with trustworthy
> public-domain translations; licensed ones arrive as agreements land.

So after this change the home page states that NASB is available and, in the
adjacent paragraph, that it is not. NASB, NLT, NKJV and MSG all shipped in 1.1.

**I did not touch it.** It is not a hit for any of the §4 grep terms, and fixing
it means writing new public claims copy, which §0 rules out ("do not improvise
alternatives"). It also cannot simply be deleted: NIV and ESV genuinely are
still unavailable, so the question is still worth answering, just differently.

Wanted: approved replacement copy for that FAQ answer. Until then this pair of
paragraphs should not go live.

---

## §1: `index.html:46`

The whole answer after the `<br>` replaced with the approved text. `<strong>`
question and `<br>` untouched.

Removed two false claims: that quoted verses are "the AI quoting those
translations from memory", and that "a word can occasionally slip".

## §2: `accuracy.html:34`

Layer-1 card paragraph replaced with the approved text. The
`<span class="num">1 · EXACT SCRIPTURE, ENFORCED BY CODE</span>` heading and the
card markup are untouched, as the order scoped only the paragraph.

Note for the cloud session, not acted on: that heading still says **ENFORCED BY
CODE** while the new §3 result cell says **enforced by architecture**. Both are
defensible and the order did not ask for the heading, so it stands.

## §3: `accuracy.html:49`

The "Scripture quote exactness" result cell now reads **Enforced by
architecture** (the model cannot emit verse text; the server renders every
quotation from the published source).

The retired claim ("65 drifted quotes auto-corrected in the latest full battery;
zero uncorrected") is gone. **Every other row in that table is byte-identical**,
confirmed by diff: the table shows one changed line.

## §4: The sweep

```
grep -nE "from memory|character-for-character|drift|drifted|occasionally slip|auto-corrected" *.html
```

Run across all six root pages (`accuracy.html`, `compare.html`, `demo.html`,
`index.html`, `privacy.html`, `terms.html`).

**Before: three hits. All three were already the targets of §1 to §3.**

| Hit | What it said | Done |
|---|---|---|
| `accuracy.html:34` | "checked character-for-character", "A quote that drifts ... is replaced" | Replaced by §2 |
| `accuracy.html:49` | "65 drifted quotes auto-corrected" | Replaced by §3 |
| `index.html:46` | "the AI quoting those translations from memory", "a word can occasionally slip" | Replaced by §1 |

No fourth hit anywhere. Nothing was found that needed a judgement call, and
nothing merely dated was rewritten.

**After: one hit, and it is correct.** `index.html:46` still matches "from
memory" because the approved sentence negates it: "The app never lets the AI
type Scripture from memory." Flagging it so a future sweep does not read that as
a leftover. `accuracy.html` now has zero hits.

### terms.html:24

Changed exactly the substring the order specified, and nothing else in the
paragraph:

- from: `grounded in displayed Scripture from public-domain translations bundled in the app`
- to: `grounded in displayed Scripture from the published Bible text the app displays`

Worth a look when someone next edits that page: the result reads "displayed
Scripture from the published Bible text the app **displays**", which says
displayed twice. It is the approved wording so I used it as given rather than
smoothing it, and a terms page repeating itself is harmless. The pre-existing em
dash later in that paragraph was left alone per §0.

### index.html:37

Left untouched, as instructed.

## §5: Housekeeping

**1. `accuracy-outputs/index.html` is unstaged and identical to HEAD.** Verified:
`git diff HEAD -- accuracy-outputs/index.html` is empty and the path does not
appear in `git status`.

Before unstaging I checked what the change would actually have done, and the
order's read is right. It rewrote 55 links from `.md` to `.html`, and the
directory contains **56 `.md` files and zero `.html` files** other than the index
itself. Publishing it would have 404'd every piece of evidence the accuracy page
points at.

**2. `compare.html` and `compare-card.png` are now in `.gitignore`.** Both are
still on disk, untouched, neither deleted nor committed. They no longer appear
as untracked.

## §6: This report, and the commit

Committed locally. **Not pushed.**

Following the precedent set by `b64d01f` (SITE-SWEEP-1), the commit contains the
changed pages and this report but **not** the order file. `SITE-COPY-1.md`,
`SITE-HYGIENE-1.md` and `SITE-SWEEP-1.md` remain untracked, as
`SITE-SWEEP-1.md` was after its own order shipped.

---

## Verified

- **Markup untouched.** For each edited page I compared HTML tag counts against
  `HEAD`: identical in all three. These were text-only replacements inside
  existing elements, and nothing opened or closed a tag.
- **Diff is exactly four files, nine insertions, four deletions.**
  `.gitignore`, `accuracy.html`, `index.html`, `terms.html`.
- **No em dashes in any text written for this order.** Checked each changed line
  individually. `terms.html:24` still contains one, in the pre-existing second
  half of the paragraph that §0 puts out of scope.
- **`accuracy-outputs/` is clean**, and the 55 evidence links still point at
  files that exist.

Not verified: the pages were not opened in a browser. The changes are text
inside existing paragraphs, table cells and a div, with tag counts proven
unchanged, so there is nothing to render differently.

---

## Recommended next

1. **Approve replacement copy for `index.html:47`** (the NASB/NIV/ESV FAQ). The
   home page contradicts itself until that lands, and this change is what makes
   it contradict itself.
2. Decide whether `accuracy.html:33`'s **ENFORCED BY CODE** heading should
   become "enforced by architecture" to match the table.
3. `accuracy-outputs/index.html` still links to raw `.md` files, which browsers
   download rather than display. That was the problem the abandoned staged
   change was reaching for. Solving it properly means generating the `.html`
   files, which is a separate piece of work and would need its own order.

---

# SITE-COPY-1B

Date: 2026-08-02 · **Nothing pushed.**

Order: `SITE-COPY-1B.md`. Both sections done. Copy used verbatim, no em dashes.

**The contradiction flagged at the top of this report is resolved.** Item 1 of
the "Recommended next" list above is closed by this change.

## §1: `index.html:47`

Question and answer both replaced, `<p>` / `<strong>` / `<br>` structure kept
exactly. Confirmed by inspection that the line's tag sequence is still
`<p> <strong> </strong> <br> </p>`, and that index.html's tag counts are
identical to `HEAD`.

- Question: "Why aren't NASB, NIV, or ESV available?" becomes "Why aren't NIV
  or ESV available?"
- Answer: the "Version 1 ships with trustworthy public-domain translations"
  claim is gone, replaced with the four that are live plus the two that are not.

The page no longer says NASB is unavailable one line after saying it is.

## §2: The neighbours

```
grep -nE "NIV|ESV|NASB|licensed|licenses|agreements land|Version 1 ships" *.html
```

Run across all six root pages. **Four hits, none needing a fix.**

| Hit | What it says | Done |
|---|---|---|
| `index.html:46` | Names the four licensed translations as live, with copyright shown | Correct already. This is SITE-COPY-1 §1 copy. No change |
| `index.html:47` | The new answer | This order's §1 |
| `accuracy.html:34` | NASB 2020, NLT, NKJV and The Message "are served from their publishers' authorized libraries" | Correct already. This is SITE-COPY-1 §2 copy. No change |
| `compare.html:176` | "all three ship translations we don't yet have licenses for" | **Out of scope by §2, and left alone.** Noted below |

`demo.html`, `privacy.html` and `terms.html` returned nothing. No page other
than the one fixed described a shipped translation as unavailable or coming.

### The one thing worth knowing about `compare.html:176`

The order puts `compare.html` out of scope and I have left it untouched, but
for the record its caveat paragraph says of Logos, YouVersion and Hallow that
"all three ship translations we don't yet have licenses for". Since 1.1 that is
weaker than the truth: four are licensed now. It is a fairness caveat rather
than a false claim, and the page is retired, untracked and gitignored, so
nothing published is affected. It only matters if compare is ever revived.

## §3: The commit

Committed locally. **Not pushed.** Two files: `index.html` and this report.
`SITE-COPY-1B.md` stays untracked, same as the earlier order files.
