# Flaky Test Report: seed.spec.ts

## Executive Summary

The latest Playwright report shows the suite is not fully stable in the current environment. The saved JSON result captured 15 tests with 14 passed and 1 failed, which places the suite at 93.33% pass rate and 6.67% failure rate.

This is not a classic multi-failure flaky suite, but it does contain real design risks that can create intermittent instability. The current failure was caused by a selector/interaction mismatch in the search form, and the broader code patterns in the suite still leave the automation exposed to environment-dependent timing and live-site behavior.

The main reasons for risk are:
- live public site dependence on phptravels.net
- broad selectors and `first()` usage
- attempts to fill date fields using generic selectors that match a readonly date widget
- assertions against the whole page body rather than a stable result container
- absence of explicit waits for the expected post-action state

---

## Current Execution Evidence

From the most recent Playwright JSON artifact:
- Total tests: 15
- Passed: 14
- Failed: 1
- Skipped: 0
- Retried: 0
- Flaky tests: 0
- Pass %: 93.33%
- Failure %: 6.67%
- Quality status: AMBER

This means the suite is currently not green in the latest run and needs stabilization before being considered reliable for repeated CI execution.

---

## Failed Test Analysis

### Test name
TC-PT-002 valid destination search returns results

### Failure evidence
The failure occurred in `fillSearchForm()` at `tests/seed.spec.ts:37`.

Actual Playwright report message:
- `TimeoutError: locator.fill: Timeout 15000ms exceeded.`
- The script attempted to fill a date input selected by:
  `input[type="date"], input[name*="date" i], input[placeholder*="date" i]`
- The matched element was a readonly field:
  `<input readonly type="text" name="checkin_date" value="Sep 08, 2026" placeholder="Check-in Date" ... />`
- The action failed because the element is not editable.

### Why this matters
The root cause is not a random flaky timing issue alone. It is a clear automation bug caused by over-broad selector logic and an invalid assumption about the date-control implementation. The test expected a fillable date input, but the live page rendered a readonly text field tied to a date-picker component.

### Risk level
High

### Classification
Automation defect / selector mismatch

### Recommended fix
Use a stable, explicit selector that targets the actual interactive date control and wait for the control to be editable before filling it. Do not use a generic selector that can resolve to a readonly widget.

---

## Flaky Risk Review by Test

## TC-PT-001 homepage renders core travel content

### Flaky indicators
- `page.goto(..., { waitUntil: 'domcontentloaded' })` is used instead of waiting for the actual landing-page state.
- The test asserts against generic body text, which is content-sensitive.
- The target site is public and may change without notice.

### Risk
Medium

### Assessment
This test is currently passing, but it is structurally fragile because it waits for `domcontentloaded` rather than for the real page content to be visible and stable.

---

## TC-PT-002 valid destination search returns results

### Flaky indicators
- broad destination-field selector with dynamic matching
- `first()` locator usage on dynamic inputs
- generic date selector that matches readonly elements
- no post-submit wait for a result list or confirmation state
- full-body text checks for result validation

### Risk
High

### Assessment
This is the test that failed in the latest run and the strongest evidence of a real interaction problem. The logic is not resilient to site UI variations and is highly susceptible to both selector drift and dynamic date-widget behavior.

---

## TC-PT-003 blank destination is rejected

### Flaky indicators
- validation inferred from generic body text
- assertion can pass without an actual validation state being proven
- no precise form error locator

### Risk
Medium

### Assessment
This test may appear green but is weak because it can pass on generic page content and not on a real validation message.

---

## TC-PT-006 hotel detail page loads complete information

### Flaky indicators
- broad `a, button` selector with `filter({ hasText: /book|view|details|hotel/i })`
- picks the first visible result without verifying it is the intended hotel detail link
- assertion based on generic body content, not a detail-page component

### Risk
High

### Assessment
This test is vulnerable to false positives and false negatives when the live site changes layout or offers.

---

## TC-PT-009 support and legal pages are accessible

### Flaky indicators
- multiple external routes in one loop
- generic keywords used for page validation
- no explicit wait for a legal page heading or title

### Risk
Medium

### Assessment
This test relies heavily on site wording and may break if legal content changes even though the page remains valid.

---

## TC-PT-015 data reset resilience does not break flows

### Flaky indicators
- immediate assertion after page reload
- no wait for a stable hero or banner after reload
- public site may re-render asynchronously

### Risk
Medium

### Assessment
This is a classic reload timing risk and may become flaky under slower network conditions or dynamic page updates.

---

## Cross-Cutting Flakiness Patterns

### 1. Live-site dependency
The entire suite targets `https://phptravels.net/`, which is a public site subject to updates, regional differences, and dynamic content changes. This makes tests harder to stabilize purely from code-level changes.

### 2. Weak selector strategy
Many helpers select from broad patterns and use `first()`. That works in basic scenarios but is brittle in pages that render multiple similar controls.

### 3. Broad body assertions
The suite frequently asserts on `page.locator('body').innerText()` or generic body text matching. This produces low-signal tests and can pass without verifying the intended state.

### 4. Missing state-based synchronization
The code often proceeds to click or assert immediately after a navigation or form action without waiting for the relevant UI state to appear.

### 5. Date input assumptions
The failed test demonstrates the main issue clearly: a generic selector assumed a standard HTML date input, while the page exposed a readonly text-based date picker.

---

## Root Cause Summary

The direct root cause of the recent failure is a selector mismatch and interaction assumption in the search form:
- `fillSearchForm()` targeted `input[type="date"], input[name*="date" i], input[placeholder*="date" i]`
- the app rendered a readonly date widget with `name="checkin_date"`
- the script attempted to call `.fill()`, which fails on non-editable inputs

This is an automation defect rather than a product defect, because the failure was caused by the test code assuming a form implementation that does not match the live UI.

---

## High Risk Areas

The highest-risk areas in the suite are:
- search flow and date-entry workflow
- result validation through body text rather than a dedicated result container
- any test that relies on a public page layout or marketing copy
- generic selector logic that targets the first visible match

These are the areas most likely to produce instability when the UI or site behavior changes.

---

## Application Defects

No confirmed application defects were observed in the current Playwright artifact.

The main issue is the automation layer assuming the wrong UI control behavior. The site did not necessarily have a functional business bug; the test was built against an incorrect interaction model.

---

## Automation Problems

The current automation problems are:
- selector mismatch in the calendar/date field
- broad CSS selectors that match multiple elements
- reliance on `first()` and generic text filters
- weak validation against the page body
- no explicit wait for the date control to become editable or for the search results to render
- dependence on external site behavior and marketing text

---

## Recommendations

1. Replace the generic date selector with a locator that targets the actual interactive control on the page.
2. Wait for the date field to be visible and editable before calling `.fill()`.
3. Replace body-level assertions with specific result containers, error messages, or headings.
4. Stop relying on broad `first()` matching for important test actions.
5. Use semantic locators such as `getByRole`, `getByPlaceholder`, and `getByLabel` wherever possible.
6. Move the suite to a controlled staging or mock environment to reduce live-site volatility.
7. Keep the report status as AMBER until at least the main search flow and high-risk selectors are stabilized.

---

## Overall Quality Status

AMBER

Reason:
- pass rate is healthy at 93.33%
- but there is a real failing test in the latest run
- the suite contains multiple design patterns that can turn into flaky failures under live-site variability

## Evaluation Dimensions

- Pass rate trend: Good but not fully stable — 93.33% in latest run
- Failure rate trend: Moderate — 6.67% failure rate
- Flaky-test risk: Low in this run, but structural risk remains high for future runs
- Repeated module issues: Search flow is the main repeated risk area
- Severity of failed tests: Moderate; one live workflow failure was confirmed
- Defect trend across recent runs: Mixed; earlier green run indicates non-deterministic behavior or live-site variance
- Distinction between application defects and automation issues: Current failure is primarily an automation issue caused by selector and control mismatch

---

## Final Assessment

The latest Playwright report shows that the suite is not fully reliable yet. One real defect in the search flow was confirmed, and the code patterns in the seed file still create a meaningful risk of future flaky failures. The most important issue is not just flakiness by itself; it is the combination of broad selectors, weak assertions, and live-site dependency that makes automation brittle.

The suite should be treated as AMBER until the date-picker logic and selector strategy are hardened and the assertion patterns are made more deterministic.
