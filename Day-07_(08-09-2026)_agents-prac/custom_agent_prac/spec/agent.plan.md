# Test Case Agent

## Application Overview

Create a custom QA test case generation agent template in the repository.

## Test Scenarios

### 1. Agent creation

**Seed:** `tests/example.spec.ts`

#### 1.1. Generate agent file

**File:** `tests/agent-creation.spec.ts`

**Steps:**
  1. Create the requested .agent.md file for test case generation
    - expect: The agent file exists and contains the required frontmatter, rules, output table, and example prompt.
