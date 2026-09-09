# Test Cases for phptravels.net

## Requirement Traceability

These test cases are derived from the requirements and risks captured in [docs/requirement-analysis-phptravels.md](requirement-analysis-phptravels.md) and the supporting test plan in [docs/test-plan-phptravels.md](test-plan-phptravels.md).

## Test Case Matrix

| Test ID | Scenario | Preconditions | Steps | Expected Result | Priority | Automation |
| --- | --- | --- | --- | --- | --- | --- |
| TC-PT-001 | Homepage rendering - user sees core travel content | User has access to the site and no login is required | 1. Open the homepage. 2. Review the hero section, navigation, destination blocks, and featured listings. 3. Verify page display and key elements. | The homepage loads successfully and displays featured travel content, navigation, and visible hotel/travel offers without a broken layout. | P0 | Yes |
| TC-PT-002 | Search functionality - valid destination search returns results | User is on the homepage or search page; valid destination and dates are known | 1. Enter a valid destination. 2. Choose valid check-in and check-out dates. 3. Select room and guest counts. 4. Submit the search. | Search completes and returns relevant listing results with pricing and property details visible. | P0 | Yes |
| TC-PT-003 | Search validation - blank destination is rejected | User is on the search form | 1. Leave the destination field empty. 2. Enter dates and numbers if needed. 3. Click Search. | The system shows a validation message and prevents the user from submitting an incomplete search. | P1 | Yes |
| TC-PT-004 | Search validation - invalid date range is blocked | User is on the search form | 1. Enter a valid destination. 2. Set check-out earlier than check-in. 3. Submit the search. | The form rejects the request with a clear date error and does not proceed with the search. | P0 | Yes |
| TC-PT-005 | Listing page - result cards show required property data | Search has returned hotel results | 1. Open the listing page. 2. Inspect several hotel cards. | Hotel cards show name, image, price, rating, and location information where available. | P0 | Yes |
| TC-PT-006 | Hotel detail page - detailed property information loads | User has selected a valid hotel from the results page | 1. Select a hotel. 2. Navigate to the hotel detail page. 3. Review properties, price, and room information. | The detail page loads correctly and shows complete property information without layout or data issues. | P0 | Yes |
| TC-PT-007 | Booking flow - user can start a booking in demo mode | A valid hotel result and booking option are available | 1. Select a hotel or room option. 2. Proceed to booking. 3. Examine the booking form and payment-related section. | The booking process starts correctly and clearly indicates that the environment is demo/test-based. Real payment actions are not presented as active/live. | P0 | Yes |
| TC-PT-008 | Demo messaging - test and sandbox warning is visible | User is on a public page, results page, or booking step | 1. Navigate to homepage and booking-related pages. 2. Review displayed warning or disclaimer text. | The site clearly communicates that the platform is a demo/test environment and discourages real payment usage. | P0 | Yes |
| TC-PT-009 | Navigation - support, privacy, and contact pages are accessible | User is on main public pages | 1. Select support, privacy, policy, and contact links. 2. Inspect each destination page. | Support/legal pages open successfully and each page loads with readable content and working navigation. | P1 | Yes |
| TC-PT-010 | API resilience - missing supplier data is handled gracefully | Search or listing page is loaded without required API data or with broken backend response | 1. Trigger search or listing behavior under missing or invalid data conditions. 2. Observe the page response. | The interface shows a graceful fallback or error message and remains stable without exposing technical details or crashing. | P0 | Yes |
| TC-PT-011 | Security - unauthorized admin access is denied | User does not have admin privileges | 1. Attempt to access admin or configuration URLs directly. 2. Try to use unauthorized configuration actions. | Access is blocked and the system shows an authorization error or redirect. | P0 | Yes |
| TC-PT-012 | Security - API credentials are not exposed in public pages | Admin configuration area exists and is accessible to authorized users | 1. Open configuration or integration screens. 2. Review whether sensitive fields are masked or protected. | API keys and sensitive configuration details are not exposed publicly and are masked or access-controlled. | P0 | Yes |
| TC-PT-013 | Mobile responsiveness - search and booking flows work on mobile devices | Mobile emulation or phone browser is available | 1. Open the homepage in mobile view. 2. Perform a valid search. 3. Open a hotel detail page. | The site remains readable and usable on mobile with accessible controls and no broken layout. | P1 | Yes |
| TC-PT-014 | UX validation - partial form inputs provide clear feedback | User is on the search form | 1. Submit incomplete values such as an empty destination or missing dates. 2. Observe the validation behavior. | The system displays clear, actionable form validation and keeps the user in a recoverable state. | P1 | Yes |
| TC-PT-015 | Data reset resilience - repeated resets do not break current flows | The demo environment may reset content or refresh data | 1. Refresh pages multiple times or simulate reset conditions. 2. Re-run a search and handle booking actions again. | The system recovers gracefully, does not crash, and manages stale/missing data with safe messages. | P2 | Yes |

## Coverage Summary

This set covers:
- Functional and negative validation
- Booking and UI flow validation
- Search and date boundary behavior
- Demo environment communication and security expectations
- API failure handling and admin access protection
- Mobile responsiveness and resilience to data resets

## Open Requirement Gaps

The following points should be confirmed before final release sign-off:
- Whether the platform is demo-only or intended for live transactions
- Exact booking workflow and required payment behavior
- Role model for admins, suppliers, and end users
- Cancellation/refund policy and refund handling rules
- Supplier API contract and failover expectations
