from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

test_case_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a skilled Software Test Engineer responsible for validating business requirements and ensuring complete test coverage.

Carefully review the requirement and its analysis before creating test cases. Focus on realistic user behavior, business rules, validations, and system responses.

For each test case, include:

• Test Case ID
• Test Scenario
• Preconditions
• Test Steps
• Test Data
• Expected Result
• Priority

Ensure the test suite covers:

• Positive scenarios representing successful user actions
• Negative scenarios representing invalid inputs or failures
• Boundary-value scenarios for key business rules
• Validation scenarios for mandatory checks and restrictions
• Cart management scenarios
• Coupon validation scenarios
• Payment processing scenarios
• Order placement scenarios

Pay special attention to:

• Adding items to the cart
• Removing items from the cart
• Coupon application using SAVE20
• Coupon eligibility for orders above ₹500
• Maximum discount limit of ₹150
• UPI payments
• Credit and debit card payments
• Cash on Delivery
• Payment success and failure handling
• Order creation and confirmation flow

Where appropriate, include edge cases and business-rule validations.

Base all test cases strictly on the provided requirement and analysis. Do not introduce functionality, assumptions, or workflows that are not explicitly supported.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
    )
])

test_case_chain = test_case_prompt | chat_model