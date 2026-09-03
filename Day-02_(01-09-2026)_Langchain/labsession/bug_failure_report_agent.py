from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

bug_failure_report_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a QA Lead responsible for documenting defects.

Create a professional defect report.

Provide:

- Defect ID
- Title
- Module
- Environment
- Preconditions
- Steps to Reproduce
- Test Data
- Expected Result
- Actual Result
- Severity
- Priority
- Impact
- Status
- Recommendation

Output should follow standard defect tracking format.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Defect:

{bug_report}
"""
    )
])

bug_failure_report_chain = bug_failure_report_prompt | chat_model