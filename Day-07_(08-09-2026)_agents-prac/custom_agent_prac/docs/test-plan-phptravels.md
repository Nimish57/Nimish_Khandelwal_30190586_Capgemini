# Test Plan for phptravels.net

## 1. Purpose

This test plan is derived from the requirements captured in [docs/requirement-analysis-phptravels.md](requirement-analysis-phptravels.md). It defines the QA scope for validating the public travel booking demo experience, search and booking flows, navigation, configuration behaviors, and risk-heavy demo/API scenarios.

## 2. Scope

### In Scope
- Homepage rendering and navigation
- Search for hotels by destination and date
- Hotel listing and detail page validation
- Booking-related user journeys in demo/test mode
- Support, legal, privacy, and contact pages
- Error handling for invalid or missing inputs
- Admin/configuration flows related to API credentials and demo integrations
- Security and data-display safeguards for demo mode

### Out of Scope
- Full production payment processing validation
- Live supplier API contract certification
- Real account and payment system integration testing beyond demo mode
- Detailed refund/cancellation policy validation until business rules are clarified

## 3. Test Objectives

1. Validate that the homepage and travel-search experience are usable and responsive.
2. Confirm that hotel search criteria are validated correctly.
3. Verify that listings and pricing information are visible and understandable in demo mode.
4. Ensure booking entry points do not mislead users into thinking live payments are active.
5. Validate graceful handling of missing supplier data, invalid dates, and config errors.
6. Check that privacy, legal, and support pages are accessible and functional.
7. Verify admin/configuration screens do not expose sensitive information.

## 4. Assumptions and Constraints

- The site is a travel booking demo environment rather than a live production booking platform.
- Some flows are inferred rather than explicitly documented, especially flights, account management, and supplier integration.
- Price, availability, and listing data may depend on configured external APIs.
- Demo data may reset periodically and should be treated as non-persistent test data.
- Booking and payment actions may be intentionally limited or sandboxed.

## 5. Test Environment

### Functional Environment
- Desktop browsers: Chrome, Edge, Firefox
- Mobile viewport sizes: iPhone, Pixel, tablet widths
- Internet connectivity: normal and degraded network states

### Data Conditions
- Valid destination names
- Empty or invalid destination values
- Check-in and check-out date combinations including invalid ranges
- Single and multi-room / multi-guest scenarios
- Missing API configuration and partial supplier payloads

## 6. Test Strategy

### Functional Testing
Validate that each critical user flow works as expected with valid and invalid input.

### Negative Testing
Cover empty fields, invalid dates, incomplete API responses, missing credentials, and unauthorized access attempts.

### Boundary Testing
Check same-day check-in/out, minimal and maximum room/guest counts, and large search strings.

### UI/UX Testing
Ensure responsiveness, readability, page hierarchy, and clear demo-mode warnings across devices.

### Security Testing
Check for exposure of internal configuration, improper access to admin flows, and unsafe handling of credentials.

## 7. Test Matrix

| ID | Priority | Area | Scenario |
| --- | --- | --- | --- |
| TP-01 | High | Homepage | Homepage loads with featured listings and navigation |
| TP-02 | High | Search | User searches with valid destination/date combination |
| TP-03 | High | Search | User searches with empty destination |
| TP-04 | High | Search | User searches with invalid date order |
| TP-05 | High | Listing | Hotel results show name, image, price, and location |
| TP-06 | High | Details | Hotel detail page loads correct property information |
| TP-07 | High | Booking | User can start booking flow in demo mode |
| TP-08 | High | Demo labeling | Demo/test warnings are clearly visible |
| TP-09 | Medium | Navigation | Support, legal, and contact links open correctly |
| TP-10 | High | Error Handling | Missing API data shows graceful fallback state |
| TP-11 | High | Admin | Unauthorized access to admin/configuration is blocked |
| TP-12 | Medium | Security | API credentials/configuration are not exposed publicly |
| TP-13 | Medium | Mobile | Core flows work on mobile viewport |
| TP-14 | Medium | Accessibility | Buttons, links, and form fields are usable and labeled |
| TP-15 | Medium | Data Reset | Repeated demo resets do not result in broken UI states |

## 8. Detailed Test Cases

### TP-01: Homepage renders core travel content
- Priority: High
- Preconditions: Application is available and reachable.
- Steps:
  1. Open the homepage.
  2. Review the hero section, featured destinations, and hotel cards.
  3. Observe top navigation and CTA elements.
- Expected Results:
  - Homepage loads successfully without broken layout.
  - Featured travel content is visible.
  - Navigation links are actionable.
  - Demo/test disclaimer is visible if applicable.

### TP-02: Valid hotel search completes successfully
- Priority: High
- Preconditions: Valid destination and date values are known.
- Steps:
  1. Enter a valid destination value.
  2. Select valid check-in and check-out dates.
  3. Choose room and guest counts.
  4. Submit the search.
- Expected Results:
  - Search results load.
  - Results match the selected destination and date range.
  - Property cards display pricing and metadata correctly.

### TP-03: Empty destination search is rejected
- Priority: High
- Preconditions: Search form is visible.
- Steps:
  1. Leave destination empty.
  2. Submit the form.
- Expected Results:
  - Validation message appears.
  - User is not allowed to continue without required input.
  - Form remains usable.

### TP-04: Invalid date order is blocked
- Priority: High
- Preconditions: Search form is visible.
- Steps:
  1. Select a check-out date earlier than the check-in date.
  2. Submit the form.
- Expected Results:
  - Error is displayed clearly.
  - Search is not submitted.
  - User can correct the values.

### TP-05: Hotel listing shows essential data
- Priority: High
- Preconditions: Search returns results.
- Steps:
  1. Open the hotel listing page.
  2. Inspect listing cards.
- Expected Results:
  - Each hotel displays name, image, price, rating, and city/location.
  - Listing order and formatting are consistent.
  - Missing data is handled gracefully.

### TP-06: Hotel detail page shows complete property information
- Priority: High
- Preconditions: A hotel listing entry is available.
- Steps:
  1. Open a hotel detail page.
  2. Check details such as location, room/price information, images, and summary text.
- Expected Results:
  - Detail content loads correctly.
  - Price and room availability are visible and understandable.
  - User can navigate back to search results without errors.

### TP-07: Booking flow opens in demo/test mode without real payment confusion
- Priority: High
- Preconditions: Valid property selection exists.
- Steps:
  1. Select a hotel and proceed to booking.
  2. Review booking form and payment-related sections.
- Expected Results:
  - Booking flow proceeds only with required fields.
  - Demo/test warnings are visible.
  - Real payment actions are clearly restricted or unavailable.
  - Users are informed if booking is a simulated environment.

### TP-08: Demo/test warning is clearly visible for users
- Priority: High
- Preconditions: User is on public-facing pages.
- Steps:
  1. Navigate to homepage, search results, and booking screens.
- Expected Results:
  - The platform clearly indicates demo/sandbox mode.
  - Warnings discourage real payments or production use.
  - Messaging is visible and not buried in fine print.

### TP-09: Support and legal navigation is functional
- Priority: Medium
- Preconditions: Site navigation is accessible.
- Steps:
  1. Open support, privacy, terms, and contact pages.
  2. Check their content and links.
- Expected Results:
  - Destination pages load successfully.
  - Content is readable and coherent.
  - Navigation back to home or main pages works correctly.

### TP-10: Missing supplier/API data is handled gracefully
- Priority: High
- Preconditions: API configuration is absent or broken.
- Steps:
  1. Load the search or listing page without required credentials/data.
  2. Observe behavior for empty results or failed fetches.
- Expected Results:
  - Graceful error state or fallback message appears.
  - UI remains stable and usable.
  - No sensitive technical errors are exposed to end users.

### TP-11: Unauthorized admin/configuration access is blocked
- Priority: High
- Preconditions: Admin area exists or is expected to exist.
- Steps:
  1. Attempt to access admin or configuration pages without required authentication.
  2. Try to manipulate configuration values without permission.
- Expected Results:
  - Access is denied.
  - Unauthorized users are redirected or shown a proper denial message.
  - Credentials and config details remain protected.

### TP-12: API credential exposure is prevented
- Priority: High
- Preconditions: Admin configuration page is accessible to authorized users.
- Steps:
  1. Open configuration screens.
  2. Review whether keys, tokens, and configuration details are visible in the UI.
- Expected Results:
  - Sensitive values are masked or access-controlled.
  - No internal credentials are exposed to customer-facing pages.

### TP-13: Mobile responsiveness is acceptable
- Priority: Medium
- Preconditions: Browser mobile emulation is available.
- Steps:
  1. Open homepage and search flow in mobile viewport.
  2. Try listing and detail page navigation.
- Expected Results:
  - Layout remains readable and usable.
  - Search controls are accessible without overlap or clipping.
  - Primary booking and navigation actions remain visible.

### TP-14: Accessibility checks for forms and actions
- Priority: Medium
- Preconditions: Pages are open in browser.
- Steps:
  1. Inspect form labels and button text.
  2. Navigate by keyboard where possible.
- Expected Results:
  - Form fields have labels and clear purpose.
  - Buttons and links are identifiable.
  - Focus states and keyboard usability are acceptable.

### TP-15: Data reset or stale content does not break flows
- Priority: Medium
- Preconditions: Demo environment is reset or refreshed.
- Steps:
  1. Reload pages after a data reset or repeated usage.
  2. Re-run a search and booking attempt.
- Expected Results:
  - System recovers without page crash or broken navigation.
  - Data inconsistency is visible but handled gracefully.
  - Users are informed of any reset-related caveat when needed.

## 9. Negative Scenarios to Cover

- Blank or malformed destination values
- Invalid date combinations
- Same-day check-in/check-out flows
- Search with oversized strings
- Multi-room and multi-guest edge cases
- Missing supplier data
- Unauthorized admin access
- Real payment attempts in demo mode
- Duplicate or stale data after reset

## 10. Risks and Their Impact

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Supplier/API misconfiguration | Wrong or missing listings | Validate fallback message and config error handling |
| Demo mode confusion | Users may think payments are real | Clear disclaimer and sandbox labeling |
| Data reset behavior | Inconsistent user experience | Verify recovered state and error messaging |
| Sensitive configuration exposure | Security issue | Enforce authorization and mask secrets |
| Missing business rules | Incorrect booking flow | Clarify cancellation/refund and roles before release |

## 11. Automation Candidates

The strongest candidates for automation are:
- Homepage rendering checks
- Search form validation and date logic
- Hotel listing display validation
- Booking flow verification in demo mode
- Admin config access validation
- Error state checks for missing API data
- Mobile viewport responsiveness checks

## 12. Exit Criteria

The release candidate may be considered ready for sign-off only when:
- High-priority search and booking scenarios pass consistently.
- Demo warnings are clearly visible and not misleading.
- Invalid input and missing API conditions are handled gracefully.
- Unauthorized access is blocked.
- Critical legal, policy, and support pages remain accessible.
- Known risks are documented and accepted by the product team.

## 13. Open Questions

Before final production sign-off, the following items should be clarified:
1. Is this site truly demo-only or intended to support live transactions?
2. Which modules are in scope: hotels only, flights, tours, or all travel products?
3. What are the exact user roles and permissions for customers and admins?
4. What is the expected booking and checkout flow?
5. What are the payment and refund requirements?
6. Which supplier APIs are required and how are failures handled?
7. What are the performance and reliability acceptance criteria?

## 14. Summary

This plan validates the product as a travel commerce demo platform with search, hotel listing, and booking behaviors that are user-facing, risk-sensitive, and dependent on external configuration. The most critical QA focus is on search validation, demo-mode clarity, graceful handling of API failure, and prevention of security or configuration leaks.
