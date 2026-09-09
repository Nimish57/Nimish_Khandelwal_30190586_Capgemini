# Video Game Database API Scenarios

## Application Overview

API scenario coverage for the Video Game Database API, including listing, creation, retrieval, updates, deletions, lifecycle validation, and validation failure coverage for invalid identifiers and invalid reviewScore input.

## Test Scenarios

### 1. Video Game Database API Scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. SCN-01 - Get all video games

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Issue a GET request to /api/v2/videogame
    - expect: The API returns HTTP 200 OK and a valid list or empty array
  2. Review the payload structure
    - expect: Each returned record contains the expected video game fields

#### 1.2. SCN-02 - Create video game with valid payload

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Submit a valid payload with category, name, rating, releaseDate, and reviewScore
    - expect: The API returns HTTP 201 Created and stores the new game
  2. Validate the created payload matches the request
    - expect: The response includes the created data and generated identifier

#### 1.3. SCN-03 - Retrieve created video game

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. GET the created game using the returned id
    - expect: The API returns HTTP 200 OK
  2. Compare the record against the original payload
    - expect: The retrieved payload matches the created values

#### 1.4. SCN-04 - Update an existing video game

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Submit a valid PUT request to update an existing record
    - expect: The API returns HTTP 200 OK and the modified object
  2. Validate persisted values
    - expect: The updated values are reflected in subsequent reads

#### 1.5. SCN-05 - Delete an existing video game

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Send DELETE for a valid id
    - expect: The API returns a success delete status and removes the resource
  2. Verify removal
    - expect: A subsequent GET for the same id returns not found

#### 1.6. SCN-06 - CRUD lifecycle validation

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Create, retrieve, update, and delete a single test record
    - expect: The full lifecycle succeeds with valid status transitions
  2. Ensure data consistency
    - expect: The resource is present after create, updated after PUT, and absent after delete

#### 1.7. SCN-07 - Create video game without name

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST the payload without name
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: No new game is created and the error mentions missing name

#### 1.8. SCN-08 - Create video game without category

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST the payload without category
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: No new game is created and the error mentions missing category

#### 1.9. SCN-09 - Create video game without rating

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST the payload without rating
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: No new game is created and the error mentions missing rating

#### 1.10. SCN-10 - Create video game without release date

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST the payload without releaseDate
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: No new game is created and the error mentions missing releaseDate

#### 1.11. SCN-11 - Create video game without review score

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST the payload without reviewScore
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: No new game is created and the error mentions missing reviewScore

#### 1.12. SCN-12 - Get invalid id

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Perform GET on a non-existent or invalid id
    - expect: The API returns HTTP 404 Not Found or equivalent not-found validation response
  2. Confirm no data leakage
    - expect: No video game object is returned for the invalid id

#### 1.13. SCN-13 - Update invalid id

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Send PUT to a non-existent id
    - expect: The API returns HTTP 404 Not Found or equivalent not-found validation response
  2. Confirm the data remains unchanged
    - expect: The record count and content do not change

#### 1.14. SCN-14 - Delete invalid id

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. Send DELETE to a non-existent id
    - expect: The API returns HTTP 404 Not Found or equivalent not-found validation response
  2. Confirm no record is removed
    - expect: No delete side-effect occurs and the resource remains absent

#### 1.15. SCN-15 - Invalid review score

**File:** `docs/api-test-scenarios.md`

**Steps:**
  1. POST a payload with an invalid reviewScore such as 150 or non-numeric input
    - expect: The API rejects the request with HTTP 400
  2. Confirm validation result
    - expect: The error message identifies the invalid reviewScore value or input type
