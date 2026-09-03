import os

from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

if not groq_api_key:
    raise ValueError("groq api key not found")

chat_model = ChatGroq(
    groq_api_key=groq_api_key,
    model_name="openai/gpt-oss-120b",
    temprature=0.2
)



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