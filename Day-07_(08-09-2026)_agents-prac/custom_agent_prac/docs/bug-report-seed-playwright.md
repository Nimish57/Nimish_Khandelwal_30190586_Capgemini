## Bug Title
Search flow test fails because the automation targets a readonly date field instead of the editable booking date control

## Module
Search / Booking form interaction

## Environment
- Browser: Chromium
- OS: Windows
- Test framework: Playwright v1.63.0
- Target URL: https://phptravels.net/
- Test file: tests/seed.spec.ts
- Run artifact: test-results/results.json

## Preconditions
- The PHPTravels homepage is available.
- The test navigates to the homepage and attempts to populate the hotel search form.
- The open page includes a date picker rendered as a readonly text field for the check-in entry.

## Steps To Reproduce
1. Open the PHPTravels homepage.
2. Locate the destination field and fill a valid destination.
3. The automation then attempts to locate the date fields using the generic selector:
   `input[type="date"], input[name*="date" i], input[placeholder*="date" i]`
4. The page resolves a readonly input such as `input readonly type="text" name="checkin_date" placeholder="Check-in Date"`.
5. The test calls `.fill("2026-10-10")` on that readonly element.
6. Playwright waits for the element to become editable and times out after 15 seconds.

## Expected Result
The search form should allow the date inputs to be filled with the expected values, and the test should proceed to submit the hotel search.

## Actual Result
The automation fails because it selects a readonly date field instead of an editable input. Playwright throws a timeout error:
`TimeoutError: locator.fill: Timeout 15000ms exceeded.`

## Severity
Medium

## Priority
P2

## Reproducibility
Intermittent / environment-sensitive. The failure depends on the live page rendering a readonly date control and the selector matching a non-editable element.

## Evidence
- Playwright JSON report recorded: 15 total tests, 14 passed, 1 failed.
- Failed test: `TC-PT-002 valid destination search returns results`
- Error message from report: `TimeoutError: locator.fill: Timeout 15000ms exceeded.`
- Matched element from execution logs: `input readonly type="text" name="checkin_date" value="Sep 08, 2026" placeholder="Check-in Date"`
- Source location: `tests/seed.spec.ts:37`

## Related Automation Test
- `tests/seed.spec.ts` - `TC-PT-002 valid destination search returns results`

## Additional Notes
This is a confirmed automation defect caused by overly broad selector logic and an incorrect assumption that the date widget is an editable HTML date input. The broader suite also contains weak assertions and generic body-text checks that make it prone to future flaky behavior. The defect should be fixed by targeting the actual interactive control and by waiting for it to be editable before filling it.
