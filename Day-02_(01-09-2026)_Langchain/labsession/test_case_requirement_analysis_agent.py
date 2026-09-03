from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

requirement_analysis_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a Senior Business Analyst and Requirement Analysis Expert.

Analyze the provided requirement and produce:

1. Functional Requirements
2. Non-Functional Requirements (if applicable)
3. Missing or Ambiguous Requirements
4. Required Business Validations
5. Possible Edge Cases
6. Assumptions

Provide the analysis in a structured format.

Do not invent functionality beyond the stated requirement.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}
"""
    )
])

requirement_analysis_chain = requirement_analysis_prompt | chat_model