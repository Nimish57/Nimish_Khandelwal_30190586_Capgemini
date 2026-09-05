Feature: Student Registration

Scenario Outline: Verify student registration

Given User opens the registration application
When User enters registration details "<name>" "<email>" "<mobile>" "<dob>" "<subject>" "<address>" "<state>" "<city>"
Then Registration should be completed successfully

Examples:
| name  | email            | mobile     | dob        | subject | address   | state      | city    |
| Hemlo | hemlo@gmail.com  | 9999999999 | 2026-01-01 | testing | Bangalore | Rajasthan  | Lucknow |
| John  | john@gmail.com   | 8888888888 | 2026-02-10 | Java    | Mumbai    | Rajasthan  | Lucknow |