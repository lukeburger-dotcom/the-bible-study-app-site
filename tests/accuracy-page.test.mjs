// The accuracy page's live record: its plural and zero paths.
// Plain Node, no dependencies: `node tests/accuracy-page.test.mjs` from the
// repo root. It runs the page's own script (the last <script> in
// accuracy.html) against a stub page and a stub fetch that serves a
// /v1/accuracy-shaped answer, then reads each line the script wrote.
// Exit 0 when every check holds, 1 otherwise.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../accuracy.html', import.meta.url), 'utf8');
const script = html.slice(html.lastIndexOf('<script>') + '<script>'.length, html.lastIndexOf('</script>'));

function c(count) { return { count, source: 'test', measuredFrom: '2026-09-05' }; }
function answer(r) {
  return {
    measuredFrom: '2026-09-05', updatedAt: '2026-10-17T12:00:00.000Z',
    studies: c(r.studies ?? 300),
    scripture: {
      passagesShown: c(r.shown ?? 500), passagesFromTheText: c(r.fromText ?? 499),
      passagesFromBundledBibles: c(r.bundled ?? 100), passagesFromPublishers: c(r.publishers ?? 399),
      aiTypedReplacedWithReference: c(r.replaced), aiTypedRemoved: c(r.removed), aiTypedMatchingTheText: c(r.matched),
      rangesCorrected: c(r.ranges ?? 2), quotesReachedReadersWrong: c(r.wrong ?? 0),
    },
    citations: {
      worksLookedUpInCatalogs: c(r.looked ?? 40), foundInCatalogs: c(r.found ?? 40), notConfirmedRungNotStored: c(r.notConfirmed),
      notConfirmedStudies: c(r.notConfirmedStudies), lookupUnfinished: c(r.unfinished), shelfWorksCosmeticYearOrSeriesLabel: c(r.cosmetic ?? 2),
    },
    doctrine: { checked: c(0), flaggedStudies: c(0) },
  };
}

async function render(r) {
  const els = {};
  const el = (id) => (els[id] ??= { innerHTML: '', textContent: '' });
  const sandbox = {
    document: { getElementById: el },
    fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve(answer(r)) }),
    Number, Math, Date, isNaN, Error,
  };
  vm.runInNewContext(script, sandbox);
  for (let i = 0; i < 10; i++) await new Promise((ok) => setImmediate(ok));
  const text = (id) => (els[id] ? (els[id].textContent || els[id].innerHTML).replace(/<[^>]+>/g, '') : '');
  return text;
}

let failed = 0;
function check(name, ok, got) {
  if (ok) console.log(`ok   ${name}`);
  else { failed += 1; console.log(`FAIL ${name}\n     got: ${got}`); }
}
const has = (s, part) => s.includes(part);

// Plurals, as the measured week reads.
{
  const t = await render({ replaced: 8, removed: 1, matched: 1, notConfirmed: 13, notConfirmedStudies: 9, unfinished: 1, cosmetic: 5 });
  check('lead: 9 of the 10 typed were replaced, the other one matched', has(t('lead'), '9 of the 10 passages the AI typed out were replaced with a link to the passage or removed before anyone read them (the other one matched the text word for word)'), t('lead'));
  check('typed line: 10 times, 8 were, 1 was, 1 was shown', has(t('r-typed'), '10 times the AI typed') && has(t('r-typed'), '8 were replaced') && has(t('r-typed'), '1, with no usable reference, was removed') && has(t('r-typed'), '1 matched a public-domain Bible in the app word for word and was shown'), t('r-typed'));
  check('unconfirmed: 13 in 9 studies, plural', has(t('r-unconfirmed'), '13, cited in 9 studies, were not found. Each could be') && has(t('r-unconfirmed'), 'those studies did not show the line saying their citations'), t('r-unconfirmed'));
  check('unfinished: 1 lookup, was', has(t('r-unfinished'), '1 lookup did not finish in time, so 1 of the 40 works was not checked.'), t('r-unfinished'));
  check('cosmetic: 5 citations of books', has(t('r-cosmetic'), '5 citations of books on the shelf'), t('r-cosmetic'));
}

// Singulars.
{
  const t = await render({ replaced: 1, removed: 0, matched: 0, notConfirmed: 1, notConfirmedStudies: 1, unfinished: 2, cosmetic: 1, ranges: 1 });
  check('lead: the one typed passage was replaced (never "all 1 passages")', has(t('lead'), 'the one passage the AI typed out was replaced with a link to the passage or removed before anyone read it,') && !has(t('lead'), 'all 1 '), t('lead'));
  check('typed line: 1 time, 1 was replaced, 0 were removed', has(t('r-typed'), '1 time the AI typed') && has(t('r-typed'), '1 was replaced') && has(t('r-typed'), '0, with no usable reference, were removed'), t('r-typed'));
  check('unconfirmed: 1 in 1 study, singular', has(t('r-unconfirmed'), '1, cited in 1 study, was not found. It could be') && has(t('r-unconfirmed'), 'that study did not show the line saying its citations'), t('r-unconfirmed'));
  check('unfinished: 2 lookups, were', has(t('r-unfinished'), '2 lookups did not finish in time, so 2 of the 40 works were not checked.'), t('r-unfinished'));
  check('ranges: 1 time', has(t('r-ranges'), '1 time the app replaced'), t('r-ranges'));
  check('cosmetic: 1 citation of a book', has(t('r-cosmetic'), '1 citation of a book on the shelf'), t('r-cosmetic'));
}
{
  const t = await render({ replaced: 1, removed: 1, matched: 2, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('lead: 2 of the 4 typed were replaced, the other 2 matched', has(t('lead'), '2 of the 4 passages the AI typed out were replaced with a link to the passage or removed before anyone read them (the other 2 matched the text word for word)'), t('lead'));
}
{
  const t = await render({ replaced: 0, removed: 1, matched: 3, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('lead: 1 of the 4 typed was replaced, read it', has(t('lead'), '1 of the 4 passages the AI typed out was replaced with a link to the passage or removed before anyone read it (the other 3 matched'), t('lead'));
}

// Zero path: nothing unconfirmed while some lookups did not finish.
{
  const t = await render({ replaced: 8, removed: 1, matched: 1, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 3 });
  check('unconfirmed 0, unfinished 3: never "Every work looked up was found."', !has(t('r-unconfirmed'), 'Every work looked up was found.') && t('r-unconfirmed') === 'Every work whose lookup finished was found.', t('r-unconfirmed'));
}
{
  const t = await render({ replaced: 8, removed: 1, matched: 1, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('unconfirmed 0, unfinished 0: every work looked up was found', t('r-unconfirmed') === 'Every work looked up was found.' && t('r-unfinished') === 'All 40 lookups finished in time.', `${t('r-unconfirmed')} | ${t('r-unfinished')}`);
}

// Zero path: the AI typed passages and none was caught (each matched the text).
{
  const t = await render({ replaced: 0, removed: 0, matched: 3, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('typed 3, caught 0: never "0 of the 3 passages ... were replaced"', !/(^|[^0-9,])0 of the/.test(t('lead')) && has(t('lead'), 'all 3 passages the AI typed out matched the text word for word'), t('lead'));
}
{
  const t = await render({ replaced: 0, removed: 0, matched: 1, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('typed 1, caught 0: the one passage matched', !/(^|[^0-9,])0 of the/.test(t('lead')) && has(t('lead'), 'the one passage the AI typed out matched the text word for word'), t('lead'));
}
{
  const t = await render({ replaced: 0, removed: 0, matched: 0, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('typed 0: the AI typed out no passage itself', has(t('lead'), 'the AI typed out no passage itself') && t('r-typed') === 'The AI typed out no passage itself instead of asking the app for it.', t('lead'));
}

// The measured week stays when the server holds fewer studies than it.
{
  const t = await render({ studies: 100, replaced: 0, removed: 0, matched: 0, notConfirmed: 0, notConfirmedStudies: 0, unfinished: 0 });
  check('fewer than 222 studies: nothing is rewritten', t('lead') === '' && t('r-typed') === '', t('lead'));
}

console.log(failed === 0 ? 'all checks hold' : `${failed} check(s) failed`);
process.exit(failed === 0 ? 0 : 1);
