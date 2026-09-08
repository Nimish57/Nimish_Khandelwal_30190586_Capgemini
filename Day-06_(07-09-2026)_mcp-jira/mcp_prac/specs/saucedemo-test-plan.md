# SauceDemo Comprehensive Test Plan

## Application Overview

# SauceDemo Application - Comprehensive Test Plan

## 1. Test Plan Identifier
TP-SD-WEB-REG-E2E-2026-09-07-v1.0

## 2. Project Overview
- Project Name: SauceDemo Web Application Quality Validation
- Application Under Test (AUT): SauceDemo
- URL: https://www.saucedemo.com
- Test Cycle: 2 Weeks (10 working days)
- Document Type: Formal QA Test Plan for client and stakeholder review
- Prepared Date: 07-Sep-2026

SauceDemo is an e-commerce style web application used to validate core digital commerce behaviors. This plan governs functional and non-functional quality checks across authentication, product selection, cart, checkout, and order completion workflows.

## 3. Objectives
- Validate all critical business flows from login through order completion.
- Ensure functional correctness, data continuity, and expected error handling.
- Verify consistent user interface behavior across target browsers.
- Detect and prevent regressions through structured manual and automated execution.
- Provide measurable release-readiness indicators and quality recommendations.

## 4. Scope
### In Scope
- Functional workflows for all identified modules.
- Field-level validations and user-facing error messages.
- Browser compatibility checks (Chrome, Edge, Firefox).
- End-to-end purchase journey validation.
- Smoke and regression test cycles.
- Integration consistency between UI modules.

### Out of Scope
- Full-scale performance/load/stress testing.
- Security penetration testing and vulnerability scanning.
- Formal accessibility compliance audit (WCAG certification).
- Mobile native app validation.
- Back-end database and API contract deep validation.

## 5. Application Modules
The following modules are included in this test plan:
1. Login
2. Products Page
3. Product Details
4. Add to Cart
5. Shopping Cart
6. Checkout Information
7. Checkout Overview
8. Order Completion
9. Logout

## 6. Test Strategy
### Functional Testing
Validate business rules, workflow transitions, and expected outputs for each module.

### UI Testing
Validate labels, buttons, navigation, visual consistency, layout behavior, and state changes.

### Regression Testing
Execute repeated baseline suite to ensure new changes do not break existing functionality.

### Smoke Testing
Run high-priority checks on each deploy/build for quick stability assessment.

### Integration Testing
Validate data continuity and flow coupling across modules (Login -> Products -> Cart -> Checkout -> Complete).

### End-to-End Testing
Validate complete customer journey and final confirmation outcomes.

### Negative Testing
Validate system response for invalid credentials, missing mandatory fields, and interrupted user paths.

## 7. Test Environment
- URL: https://www.saucedemo.com
- Browser Coverage:
  - Google Chrome (latest stable)
  - Microsoft Edge (latest stable)
  - Mozilla Firefox (latest stable)
- Operating Systems:
  - Windows 11
  - Windows 10
  - macOS (Sonoma or later)
  - Ubuntu 22.04 LTS
- Network: Stable internet with unrestricted HTTPS access.

## 8. Test Data Requirements
- Valid Credentials: standard_user / secret_sauce
- Negative Credentials: invalid username/password combinations, blanks, whitespace-only values
- Additional User Types (for broader behavior checks): locked_out_user, problem_user, performance_glitch_user
- Checkout Data: valid names, numeric/alphanumeric postal codes, boundary-length inputs
- Product Data Sets:
  - Single product
  - Multiple products
  - Mixed-price combinations
  - Empty cart checkout attempt

## 9. Entry Criteria
- Test plan approved by QA Manager and Product Owner.
- Test environment accessible and stable.
- Build deployed and testable.
- Test data and credentials available.
- Test cases reviewed and baselined.
- Defect tracking workflow active.

## 10. Exit Criteria
- 100% execution of smoke and critical-path test cases.
- Minimum 95% execution of planned full-cycle test cases.
- No open Severity 1 or Severity 2 defects.
- Regression pass rate >= 95%.
- Final test summary report issued and reviewed.

## 11. Assumptions
- Application environment remains available during cycle.
- No major scope changes without change control.
- Required test users remain active.
- Engineering support available for timely defect resolution.
- CI infrastructure available for automation runs.

## 12. Dependencies
- Timely build delivery from development team.
- Stable environment/network from operations support.
- Requirement clarifications from Product Owner/Business Analyst.
- Access to test credentials and browser infrastructure.

## 13. Roles and Responsibilities
| Role | Count | Responsibilities |
| --- | --- | --- |
| QA Test Manager | 1 | Strategy, governance, reporting, sign-off recommendation |
| Senior QA Engineer | 1 | Test design oversight, execution leadership, defect triage support |
| QA Engineer | 2 | Manual execution, evidence capture, retest/regression |
| Automation Engineer | 1 | Script development, framework upkeep, CI integration |
| Developer Support (shared) | 2 | Defect fixes, impact analysis, turnaround support |
| Product Owner/BA (shared) | 1 | Requirement clarifications, acceptance alignment |

## 14. Risks and Mitigation Plan
| Risk ID | Risk Description | Probability | Impact | Severity | Mitigation Plan | Contingency Plan | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Environment instability or downtime | Medium | High | High | Daily environment readiness checks | Shift execution to reserved buffer slots and rerun blocked tests | QA Manager / Ops |
| R2 | Late build delivery compresses testing window | High | High | Critical | Enforce build cut-off and entry criteria | Switch to risk-based reduced suite and extend regression buffer | QA Manager / Eng Lead |
| R3 | Cross-browser inconsistency | Medium | Medium | Medium | Daily cross-browser smoke and version pinning | Isolate affected browser, raise blocker, proceed on unaffected browsers | Automation Engineer |
| R4 | Test data/account issues | Medium | Medium | Medium | Pre-cycle account validation and backup credentials | Rotate to backup data sets and alternate users | QA Engineer |
| R5 | High defect volume overwhelms triage | Medium | High | High | Daily triage cadence with strict severity model | Add temporary triage support from dev leads | QA Manager |
| R6 | Flaky automation causing false negatives | Medium | Medium | Medium | Improve selectors, retries, trace analysis | Quarantine unstable tests and validate coverage manually | Automation Engineer |
| R7 | Requirement ambiguity | Low | High | Medium | Early walkthrough and sign-off of acceptance criteria | Clarification workshop and impacted test update | Product Owner |
| R8 | Resource unavailability | Medium | Medium | Medium | Cross-training and workload balancing | Rebaseline schedule by criticality | QA Manager |

## 15. Defect Management Process
- Defect Lifecycle: New -> Assigned -> In Progress -> Fixed -> Retest -> Closed/Reopen/Deferred
- Severity Classification:
  - Sev-1: Critical (system blocking/business stop)
  - Sev-2: High (major function failure)
  - Sev-3: Medium (partial functional issue)
  - Sev-4: Low (minor UI/cosmetic)
- SLA Targets:
  - Sev-1: same day triage and resolution plan
  - Sev-2: triage within 24 hours
  - Sev-3: triage within 2 business days
  - Sev-4: resolution as per backlog priority
- Mandatory Defect Fields: module, environment, steps, expected result, actual result, evidence, build/version, severity, priority

## 16. Test Deliverables
- Approved Test Plan
- Detailed test scenarios and test cases
- Requirement Traceability Matrix (RTM)
- Daily execution and defect dashboards
- Automation execution reports and artifacts
- Final Test Summary and closure recommendation

## 17. Test Schedule (2-Week Cycle)
| Week | Day | Planned Activity | Owner | Deliverable |
| --- | --- | --- | --- | --- |
| Week 1 | Day 1 | Kickoff, scope confirmation, environment checks | QA Manager + Team | Execution baseline |
| Week 1 | Day 2 | Test case review and smoke readiness | QA Team | Reviewed test pack |
| Week 1 | Day 3 | Smoke execution and initial defect triage | QA Team | Smoke report |
| Week 1 | Day 4 | Functional execution (Login, Products, Cart) | QA Team | Execution evidence |
| Week 1 | Day 5 | Functional execution (Checkout, Completion, Logout) + mini regression | QA Team | Mid-cycle status |
| Week 2 | Day 6 | Cross-browser cycle and automation updates | QA + Automation | Compatibility report |
| Week 2 | Day 7 | Defect retest and integration validation | QA Team | Retest report |
| Week 2 | Day 8 | Full regression run | QA Team | Regression report |
| Week 2 | Day 9 | Contingency window and final triage | QA + Dev | Closure candidate list |
| Week 2 | Day 10 | Final metrics, stakeholder review, closure recommendation | QA Manager | Final summary report |

## 18. Resource Allocation
- Dedicated QA Team: 5
- Shared Support Resources: 3
- Total Effective Team: 8
- Estimated Effort: 50 person-days

Estimated Volumetrics:
- Estimated test scenarios: 75
- Estimated detailed test cases: 210
- Estimated automated scripts in cycle: 45
- Estimated defects: 28
- Estimated defect split:
  - Sev-1: 1
  - Sev-2: 5
  - Sev-3: 14
  - Sev-4: 8

## 19. Automation Approach
### Playwright with TypeScript
- Use Playwright Test for reliable cross-browser execution.
- Use robust selectors (prefer data-test attributes).
- Store traces, videos, and HTML reports for diagnostics.

### Page Object Model (POM)
- Implement modular page classes for Login, Products, Product Detail, Cart, Checkout, and Menu.
- Centralize selectors and reusable actions to reduce duplication.

### Data-Driven Framework
- Externalize credentials and form datasets using fixtures.
- Parameterize positive and negative paths.

### CI/CD Integration
- Integrate suite in CI pipeline (GitHub Actions/Azure DevOps/Jenkins).
- Run smoke on pull requests; run full regression nightly.
- Publish execution artifacts and quality gates per build.

## 20. Test Metrics
Track the following key quality indicators:
- Test Case Execution Status (Planned, Executed, Passed, Failed, Blocked, Not Run)
- Pass Percentage = (Passed / Executed) x 100
- Fail Percentage = (Failed / Executed) x 100
- Defect Density = Total Defects / Executed Test Cases
- Defect Leakage = Escaped Defects / Total Closed Defects x 100

Target Benchmarks:
- Pass Percentage >= 95%
- Fail Percentage <= 5%
- Defect Leakage <= 3%
- Blocked Cases <= 2%

## 21. Sample Test Scenarios
### Scenario 1: Valid Login
- Precondition: User is on login page in a fresh session.
- Steps:
  1. Enter username: standard_user
  2. Enter password: secret_sauce
  3. Click Login
- Expected Result: User navigates to Products page with no error message.

### Scenario 2: Invalid Login
- Precondition: User is on login page.
- Steps:
  1. Enter invalid username and password
  2. Click Login
- Expected Result: Display error message "Epic sadface: Username and password do not match any user in this service".

### Scenario 3: Product Sorting
- Precondition: Logged-in user on Products page.
- Steps:
  1. Select Name (A to Z)
  2. Select Name (Z to A)
  3. Select Price (low to high)
  4. Select Price (high to low)
- Expected Result: Product ordering matches selected sort criteria.

### Scenario 4: Add Multiple Products to Cart
- Precondition: User on Products page.
- Steps:
  1. Add at least two products
  2. Open Shopping Cart
- Expected Result: Cart badge count and cart line items match selections.

### Scenario 5: Remove Product from Cart
- Precondition: Cart has one or more items.
- Steps:
  1. Open cart
  2. Remove one product
- Expected Result: Selected item is removed; remaining cart data stays intact.

### Scenario 6: Checkout Process
- Precondition: Cart contains products.
- Steps:
  1. Click Checkout
  2. Submit empty form to validate mandatory field behavior
  3. Enter valid First Name, Last Name, Postal Code
  4. Click Continue
- Expected Result: Correct inline validation appears for empty submit; valid data proceeds to Checkout Overview.

### Scenario 7: Order Confirmation
- Precondition: User on Checkout Overview page.
- Steps:
  1. Verify item total, tax, and final total
  2. Click Finish
- Expected Result: Checkout Complete page displays order success confirmation.

## 22. Approval Section
| Name | Role | Signature | Date | Decision |
| --- | --- | --- | --- | --- |
|  | QA Test Manager |  |  |  |
|  | Engineering Lead |  |  |  |
|  | Product Owner |  |  |  |
|  | Client Stakeholder |  |  |  |

Approval Condition: Test cycle can be recommended for closure when all exit criteria are met and residual risks are formally accepted.

# 23. Detailed Test Scenarios

| Scenario ID | Module | Scenario Description | Priority | Type |
|-------------|----------|---------------------|----------|------|
| TS_001 | Login | Verify successful login using valid standard_user credentials and redirection to Products page. | High | Positive |
| TS_002 | Login | Verify login failure with invalid username and invalid password combination. | High | Negative |
| TS_003 | Login | Verify login validation when Username is empty and Password is provided. | High | Boundary |
| TS_004 | Login | Verify login validation when Password is empty and Username is provided. | High | Boundary |
| TS_005 | Login | Verify login validation when both Username and Password are empty. | High | Boundary |
| TS_006 | Login | Verify locked_out_user cannot log in and correct lockout error message is displayed. | High | Negative |
| TS_007 | Login | Verify problem_user can log in and access Products page without authentication failure. | Medium | Positive |
| TS_008 | Login | Verify performance_glitch_user can log in successfully and session starts correctly. | Medium | Integration |
| TS_009 | Login | Verify login error message text, format, and visibility for invalid login attempts. | Medium | UI |
| TS_010 | Login | Verify authenticated session persistence for logged-in user during page refresh and navigation. | High | Integration |
| TS_011 | Products Page | Verify Products page displays full product list after successful login. | High | Positive |
| TS_012 | Products Page | Verify each product name is displayed correctly in product inventory listing. | Medium | UI |
| TS_013 | Products Page | Verify each product price is displayed correctly and aligned with corresponding product. | Medium | UI |
| TS_014 | Products Page | Verify product sorting by Name (A to Z) orders products alphabetically ascending. | High | Positive |
| TS_015 | Products Page | Verify product sorting by Name (Z to A) orders products alphabetically descending. | High | Positive |
| TS_016 | Products Page | Verify product sorting by Price (Low to High) orders products by increasing price. | High | Positive |
| TS_017 | Products Page | Verify product sorting by Price (High to Low) orders products by decreasing price. | High | Positive |
| TS_018 | Products Page | Verify product inventory display contains product image, name, description, price, and action button. | Medium | UI |
| TS_019 | Product Details | Verify user can open Product Detail page from Products page by selecting a product. | High | Positive |
| TS_020 | Product Details | Verify Product Detail page shows accurate product name, description, price, and image. | Medium | UI |
| TS_021 | Product Details | Verify Back to Products navigation returns user to Products page successfully. | Medium | Integration |
| TS_022 | Add to Cart | Verify user can add a single product to cart from Products page. | High | Positive |
| TS_023 | Add to Cart | Verify user can add multiple products to cart in one session. | High | Positive |
| TS_024 | Add to Cart | Verify cart badge count updates correctly after each add-to-cart action. | High | Integration |
| TS_025 | Add to Cart | Verify user can remove a product directly from Products page and cart count is updated. | High | Integration |
| TS_026 | Shopping Cart | Verify all added products are displayed correctly in Shopping Cart. | High | Positive |
| TS_027 | Shopping Cart | Verify removing a product from Shopping Cart updates cart contents correctly. | High | Positive |
| TS_028 | Shopping Cart | Verify Continue Shopping button navigates user back to Products page. | Medium | Integration |
| TS_029 | Shopping Cart | Verify cart persistence retains selected items when navigating away and returning to cart. | Medium | Integration |
| TS_030 | Checkout Information | Verify checkout proceeds successfully with valid First Name, Last Name, and Postal Code. | High | Positive |
| TS_031 | Checkout Information | Verify error handling when First Name is empty during checkout information submission. | High | Negative |
| TS_032 | Checkout Information | Verify error handling when Last Name is empty during checkout information submission. | High | Negative |
| TS_033 | Checkout Information | Verify error handling when Postal Code is empty during checkout information submission. | High | Negative |
| TS_034 | Checkout Information | Verify mandatory field error messages are displayed correctly for invalid checkout submissions. | Medium | UI |
| TS_035 | Checkout Overview | Verify Checkout Overview displays correct product summary including item names, quantity, and prices. | High | Positive |
| TS_036 | Checkout Overview | Verify tax calculation is displayed correctly based on item total. | High | Boundary |
| TS_037 | Checkout Overview | Verify total amount equals item total plus tax on Checkout Overview page. | High | Boundary |
| TS_038 | Order Completion | Verify user can complete purchase successfully from Checkout Overview page. | High | E2E |
| TS_039 | Order Completion | Verify order confirmation message is displayed correctly after successful purchase completion. | Medium | UI |
| TS_040 | Logout | Verify user can log out successfully from application menu and return to Login page. | High | Positive |
| TS_041 | Logout | Verify access restriction after logout when user attempts to access protected URLs. | High | Negative |

# 24. Test Scenario Coverage Summary

- Total Scenarios: 41
- Scenario ID Range: TS_001 to TS_041
- Module Coverage:
  - Login: 10
  - Products Page: 8
  - Product Details: 3
  - Add to Cart: 4
  - Shopping Cart: 4
  - Checkout Information: 5
  - Checkout Overview: 3
  - Order Completion: 2
  - Logout: 2
- Priority Coverage:
  - High: 27
  - Medium: 14
  - Low: 0
- Type Coverage:
  - Positive: 13
  - Negative: 8
  - Boundary: 5
  - UI: 7
  - Integration: 7
  - E2E: 1
- User Coverage Included:
  - standard_user
  - locked_out_user
  - problem_user
  - performance_glitch_user

## Test Scenarios
