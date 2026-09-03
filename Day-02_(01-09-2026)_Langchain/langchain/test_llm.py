from llm_config import chat_model

response = chat_model.invoke(
    "Hi"
)

print(response.content)