from test_case_requirement_analysis_agent import requirement_analysis_chain
from test_case_generation_agent import test_case_chain
from bug_analysis_agent import bug_analysis_chain
from bug_failure_report_agent import bug_failure_report_chain


requirement = """
A customer should be able to log in to a food delivery application,
search for a restaurant, add food items to the cart, apply a coupon,
select a delivery address, make payment, and place the order.

The application supports UPI, credit/debit cards, and Cash on Delivery.

A coupon SAVE20 gives 20% off on orders above ₹500,
with a maximum discount of ₹150.

If payment fails, the order should not be created.
If payment succeeds, the customer should receive an order confirmation
with an order ID.
"""

bug_report = """
A customer adds food worth ₹600 to the cart and applies SAVE20.
Instead of giving ₹120 discount, the system gives ₹200 discount.
"""


# ==========================================================
# AGENT 1 - REQUIREMENT ANALYSIS
# ==========================================================

print("\n" + "=" * 70)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 70)

analysis_response = requirement_analysis_chain.invoke({
    "requirement": requirement
})

analysis = analysis_response.content

print(analysis)


# ==========================================================
# AGENT 2 - TEST CASE GENERATION
# ==========================================================

print("\n" + "=" * 70)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 70)

test_case_response = test_case_chain.invoke({
    "requirement": requirement,
    "analysis": analysis
})

test_cases = test_case_response.content

print(test_cases)

print("\nFULL RESPONSE:")
print(test_case_response)

print("\nCONTENT:")
print(test_case_response.content)


# ==========================================================
# AGENT 3 - BUG ANALYSIS
# ==========================================================

print("\n" + "=" * 70)
print("AGENT 3 - BUG ANALYSIS")
print("=" * 70)

bug_analysis_response = bug_analysis_chain.invoke({
    "requirement": requirement,
    "bug_report": bug_report
})

bug_analysis = bug_analysis_response.content

print(bug_analysis)

print("\nFULL RESPONSE:")
print(bug_analysis_response)

print("\nCONTENT:")
print(bug_analysis_response.content)


# ==========================================================
# AGENT 4 - BUG FAILURE REPORT
# ==========================================================

print("\n" + "=" * 70)
print("AGENT 4 - BUG FAILURE REPORT")
print("=" * 70)

defect_report_response = bug_failure_report_chain.invoke({
    "requirement": requirement,
    "bug_report": bug_report
})

defect_report = defect_report_response.content

print(defect_report)

print("\nFULL RESPONSE:")
print(defect_report_response)

print("\nCONTENT:")
print(defect_report_response.content)