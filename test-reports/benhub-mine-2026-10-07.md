# Test Report: BenHub Mine — Landing Page

**Date:** 2026-10-07 14:39
**Branch:** add_mine (HEAD `eebf809`)
**Commits tested:** `ed10329` + `eebf809` (range `2138395..eebf809`)
**Tester:** Claude (automated)
**Status:** ✅ PASSED after fixes (initial run: ⚠️ PASSED WITH WARNINGS). See *Fixes & Re-test* below.

---

## Summary

| Category | Result |
|----------|--------|
| TypeScript (`tsc --noEmit`) | ✅ PASS |
| ESLint (25 changed TS files) | ✅ PASS |
| Production build (`pnpm build`) | ✅ PASS |
| Unit / spec tests | ❗ None exist for frontend (see Phase 1) |
| Code Review | Needs fixes — 0 Critical, 3 Important (confirmed), 1 Important not reproduced, 7 Minor |
| E2E page audit | ✅ 28/28 page-loads passed (14 routes × desktop + mobile) |
| E2E interaction scenarios | ✅ 12/12 passed |
| **Overall** | ⚠️ PASSED WITH WARNINGS |

---

## Phase 0: TypeScript & Build

- `npx tsc --noEmit -p .` (src/frontend): **PASS**, 0 errors
- `eslint` on all 25 `.ts/.tsx` files changed in `2138395..eebf809`: **PASS**, 0 errors / 0 warnings
- `pnpm build`: **PASS**. `/[locale]/benhub-mine` prerendered for `vi` + `en`; `/sitemap.xml`, `/robots.txt` static.
- Pre-existing lint issues outside the changed files (not caused by this feature): `app/(marketing)/dang-ky-tai-xe/page.tsx` (2 warnings), `app/cms/dashboard/page.tsx:194` (2 errors, `<a>` for `/cms/posts/new/`).

## Phase 1: Unit Tests

**Result:** ❗ **CRITICAL GAP: no tests exist.** `src/frontend` has no test runner config (no Playwright/Jest/Vitest config, no `test` script) and no `*.spec`/`*.test` files. The backend is unaffected by this change (no backend files in the range).

Recommendation: add a Playwright spec (e.g. `tests/e2e/benhub-mine.spec.ts`) that encodes the E2E scenarios below so they can run in CI.

---

## Phase 2: Code Review

Reviewed by an independent subagent, then each finding was checked against code and E2E output.

### Strengths
- `vi.json` and `en.json` keys match exactly (checked by script); no `materials_*` keys left.
- The proxy `SKIP_INTL` entries are needed for `/sitemap.xml` and `/robots.txt`. The sitemap's vi/en alternates match the `as-needed` locale prefix.
- The Mine page follows `docs/mine.md` closely. Canonical and hreflang are correct. Image alt and size are correct.
- The `PLACEHOLDER` constant groups the page's temporary data in one place.
- The `FadeUp` rewrite is sound: IntersectionObserver fires on `observe()`, and `motion-reduce:` overrides the base classes.

### Issues

**Critical:** None

**Important (confirmed):**
1. **A temporary stat sits outside `PLACEHOLDER`.** `messages/{vi,en}.json` `Hero.proof_4` ("20+ mỏ kết nối") is shown on the home hero but is not tracked with the other placeholders, so it is easy to miss when real data arrives.
2. **"Free trial" wording is unverified and the two languages disagree.**
   - EN `PartnerForm.mine_heading` / `mine_submit` and the EN CTAs on `benhub-mine/page.tsx` say "free trial". VI says "dùng thử", without "miễn phí".
   - `page.tsx` form bullet: "Dùng thử miễn phí, tư vấn miễn phí".
   - `docs/mine.md` leaves pricing blank; the only "free" it mentions is the consultation.
3. **The How It Works step contradicts `docs/mine.md` §4.7.** `HowItWorks.sm_desc` says receivables "cập nhật ngay khi phiếu hoàn thành" (update as soon as the ticket is completed). The doc (line 98) says receivable documents are generated **periodically** (định kỳ) from completed tickets.

**Important (not reproduced):**
- The reviewer reported that `href="/#solution"` becomes `/en/#solution` on EN. E2E observed the rendered hrefs `/en#products`, `/en#solution`, `/en#ecosystem`, and clicking "Products" on `/en/benhub-mine` landed on `/en#products` with the section scrolled into view. **Not an issue in the installed next-intl version.**

**Minor:**
- `benhub-mine/page.tsx` renders `<main>` inside the layout's `<main>` (nested landmark). `doi-tac` and `dang-ky-tai-xe` already do the same.
- The FAQ `<summary>` on the Mine page lacks `[&::-webkit-details-marker]:hidden`, so Safari may show a double marker.
- The page title gets the layout template appended, giving "BenHub Mine | … — BenHub" (brand repeated, long).
- `HelpCenter.faq_mine_3_a` tells drivers and workers to install the app, while the store badges say "Sắp ra mắt".
- `sitemap.ts` uses `lastModified: new Date()` on every request, and has no `x-default` alternate.
- Pre-existing: `<html lang="vi">` is hard-coded, so `/en` pages declare the wrong language.
- Pre-existing: `/#register` links (news pages) point to an anchor not rendered on the home page.

**Assessment:** No blockers. Fix Important 1–3 (copy accuracy) before public launch.

---

## Phase 3: E2E Tests

**Base URL:** http://localhost:3001 (dev), backend http://localhost:4000
**Browser:** Chromium (Playwright MCP)
**Data:** local DB `benhub_local`, 0 news posts

### 3a. Page audit — 14 routes × 2 viewports (1440×900, 390×844)

Routes: `/`, `/en`, `/benhub-mine`, `/en/benhub-mine`, `/doi-tac`, `/en/doi-tac`, `/ve-chung-toi`, `/en/ve-chung-toi`, `/trung-tam-tro-giup`, `/en/trung-tam-tro-giup`, `/tin-tuc`, `/en/tin-tuc`, `/dang-ky-tai-xe`, `/en/dang-ky-tai-xe`

| Check | Result |
|-------|--------|
| HTTP 200 | ✅ 28/28 |
| `<h1>` present | ✅ 28/28 |
| No horizontal overflow | ✅ 28/28 |
| No console errors / page errors | ✅ 28/28 |
| No missing i18n keys rendered | ✅ 28/28 |
| No broken images | ✅ 28/28 |
| EN pages: internal links keep `/en` | ✅ 27/28. ⚠️ `/en/tin-tuc` has `/#register` (pre-existing, `components/news/*`, not changed in this feature) |
| Internal links resolve (33 unique) | ⚠️ 29/33. 404s: `/doi-tac/chu-doi-xe`, `/doi-tac/chu-dau-tu` (+ `/en/...`), from `about/JoinUsSection.tsx`; pre-existing, target pages never existed |
| FadeUp content visible after realistic scroll | ✅ `/`, `/ve-chung-toi`, `/trung-tam-tro-giup`: 0 hidden. Also verified with `prefers-reduced-motion: reduce` |

### 3b. Interaction scenarios

| # | Scenario | Type | Status | Evidence |
|---|----------|------|--------|----------|
| S1 | Home navbar "BenHub Mine" → `/benhub-mine` | Happy path | ✅ PASS | URL `/benhub-mine` |
| S2 | Home ecosystem tab "Doanh Nghiệp Mỏ" → CTA → `/benhub-mine` | Happy path | ✅ PASS | [screenshot](../test-artifacts/benhub-mine-home-ecosystem-mine-tab-2026-10-07.png) |
| S3 | Home content: HowItWorks step 04, Products card, Materials removed, Solution row, Roadmap item, Hero proof, Footer → `/benhub-mine` | Happy path | ✅ PASS | All present; "BenHub Materials" not found |
| S4 | Mine page: "Xem demo" → `#dashboard` (image loaded), "Đăng ký dùng thử" → `#dang-ky`, form heading "Đăng ký dùng thử BenHub Mine.", FAQ opens | Happy path | ✅ PASS | [screenshot](../test-artifacts/benhub-mine-mine-dashboard-2026-10-07.png) |
| S5 | Submit empty trial form | Validation | ✅ PASS | 7 field errors; [screenshot](../test-artifacts/benhub-mine-mine-form-validation-empty-2026-10-07.png) |
| S6 | Invalid tax code / phone / email / username | Edge case | ✅ PASS | Format errors shown; **0 requests to api-mine** (no real account created); [screenshot](../test-artifacts/benhub-mine-mine-form-validation-invalid-2026-10-07.png) |
| S7 | Language switch on `/benhub-mine` → `/en/benhub-mine` | Happy path | ✅ PASS | H1 "Run your entire quarry on a single platform.", form "Start your BenHub Mine free trial." |
| S8 | `/en/doi-tac` Mine segment → `/en/benhub-mine`; `/doi-tac` form heading unchanged | Happy path / regression | ✅ PASS | Partner heading still "Đăng ký trở thành đối tác của BenHub." |
| S9 | Help center "BenHub Mine" FAQ category opens | Happy path | ✅ PASS | [screenshot](../test-artifacts/benhub-mine-help-center-mine-faq-2026-10-07.png) |
| S10 | Mobile (390px) menu on `/en` → "BenHub Mine" → `/en/benhub-mine` | Happy path | ✅ PASS | [screenshot](../test-artifacts/benhub-mine-mobile-menu-en-2026-10-07.png) |
| S11 | Tablet (1024px) navbar collapses to hamburger (no line wrap) | Edge case | ✅ PASS | desktop `<nav>` `display:none` |
| S12 | `/tin-tuc/khong-ton-tai` (empty DB, unknown slug) | Empty state | ✅ PASS | HTTP 404, not-found page. Console: expected 404 plus a pre-existing React "script tag" warning on the 404 page |

### 3c. SEO endpoints

| Check | Result |
|-------|--------|
| `/sitemap.xml` | ✅ 200 `application/xml`, 8 URLs with vi/en `hreflang` alternates |
| `/robots.txt` | ✅ 200 `text/plain`; disallows `/cms`, `/api/`, `/login`, `/register`; points to sitemap |
| `/en/benhub-mine` meta | ✅ canonical, hreflang vi/en, `og:url`, `og:image` = `https://benhub.vn/mine/dashboard.png`, `og:locale` en_US |

### Not covered
- Real trial submission (would create a real account on `api-mine.benhub.vn`).
- `/tin-tuc/[slug]` with a real post: local DB has no posts; only the 404 path was tested.
- Browsers other than Chromium (e.g. the Safari `<summary>` marker).

---

## Recommendations

1. **Copy accuracy (Important 2–3):** make VI and EN agree on "dùng thử" vs "free trial". Either drop "miễn phí/free" or move it into `PLACEHOLDER` until pricing is confirmed. Reword `HowItWorks.sm_desc` to "công nợ sinh định kỳ từ phiếu cân hoàn thành".
2. **Placeholder tracking (Important 1):** add `Hero.proof_4` to the list of placeholders to replace (or derive it from `PLACEHOLDER`).
3. **Tests:** add a frontend Playwright spec covering S1–S12 so they can run in CI.
4. **Minor polish:** use a `<div>` instead of the nested `<main>` on the Mine page, hide the webkit details marker, use an absolute title, and set the locale-aware `<html lang>`.
5. **Pre-existing broken links:** `JoinUsSection` → `/doi-tac/chu-doi-xe`, `/doi-tac/chu-dau-tu` (404), and `/#register` from the news pages.

---

## Artifacts

- Screenshots (34): `test-artifacts/benhub-mine-*-2026-10-07.png`
- This report: `test-reports/benhub-mine-2026-10-07.md`

---

## Fixes & Re-test (2026-10-07, after the initial run)

### Fixes applied (uncommitted)

| Finding | Fix |
|---------|-----|
| Important 1: `Hero.proof_4` outside placeholders | Moved `PLACEHOLDER` to `src/lib/mine-placeholders.ts` (`MINE_PLACEHOLDER`). One `QUARRIES_CONNECTED` value feeds both the Mine stats strip and the home hero via ICU `{quarries}`. |
| Important 2: unverified "free trial" wording, VI/EN mismatch | EN copy is now "Request a trial" / "Request your BenHub Mine trial." to match VI "dùng thử". The form bullet now only promises a free consultation (as in docs/mine.md). The "30-day free trial" remains only inside `MINE_PLACEHOLDER.faqs`. |
| Important 3: `sm_desc` contradicts docs §4.7 | VI and EN `HowItWorks.sm_desc` and `sm_h3` now say receivable documents are generated **periodically** from completed tickets. |
| Minor: nested `<main>` | `benhub-mine`, `doi-tac` and `dang-ky-tai-xe` pages now render a fragment; 1 `<main>` per page. |
| Minor: Safari details marker | Added `[&::-webkit-details-marker]:hidden` to the Mine FAQ `<summary>`. |
| Minor: duplicated brand in title | `title.absolute`: "BenHub Mine — …". |
| Minor: app FAQ vs "Sắp ra mắt" badges | Without a store URL, the badges now read "Nhận link cài đặt" / "Get install link" and link to `#dang-ky`. The FAQ says install links are sent on trial sign-up. |
| Minor: sitemap | Removed per-request `lastModified`; added `x-default` hreflang. |
| Pre-existing: `<html lang="vi">` on /en | New `components/shared/HtmlLang.tsx` in `[locale]/layout.tsx` syncs `lang` after hydration. The server HTML still says `vi`; a full fix needs `<html>` moved into the `[locale]` layout (root-layout restructure). |
| Pre-existing: 404 role links | `JoinUsSection` cards now point to `/doi-tac#hinh-thuc`. |
| Pre-existing: `/#register` dead anchor | News CTAs (`NewsListingContent`, `ArticleSidebar`, `tin-tuc/[slug]`) now point to `/doi-tac#partner-form` and use the locale-aware `Link`. |

### Re-test results

- `tsc --noEmit`: PASS · `eslint` (src/app/[locale], components, lib, sitemap): PASS · `pnpm build`: PASS (34/34 static pages)
- Page audit, 14 routes × 2 viewports: **28/28 PASS**. Status 200, `lang` matches locale, exactly one `<main>`, no overflow, no missing messages, no console errors, EN links keep `/en`.
- Internal links: **30/30 resolve** (previously 4 × 404).
- Targeted: hero shows "20+ mỏ kết nối" / "20+ quarries connected" from the shared constant; How It Works step mentions "định kỳ"; EN Mine page has 0 "free trial" mentions; titles are "BenHub Mine — …"; store badges link to `#dang-ky`; About role cards navigate to `/doi-tac#hinh-thuc`; `/en/tin-tuc` CTAs use `/en/doi-tac#partner-form`.
- Regression: navbar → Mine ✅; empty form → 7 errors, 0 api-mine requests ✅; language switch VI↔EN updates `lang` ✅; mobile menu (EN) → `/en/benhub-mine` ✅.
- Sitemap: 8 URLs, vi/en/x-default alternates, no `lastmod`.
- New screenshots: `test-artifacts/benhub-mine-mobile-en-after-fixes-2026-10-07.png`, `test-artifacts/benhub-mine-form-en-after-fixes-2026-10-07.png`

### Still open
- No automated frontend test suite (Playwright spec) yet.
- `<html lang>` is correct only after hydration (see above).
- `JoinUsSection` "Xem cơ hội việc làm" button still uses `href="#"` (there is no careers page), and "Chọn vai trò của bạn" is hard-coded Vietnamese.
- Safari not tested.
