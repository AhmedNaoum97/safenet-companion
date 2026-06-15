import os
from google import genai
from dotenv import load_dotenv
from app.prompts import SYSTEM_PROMPTS

# Load the .env file so we can read the key
load_dotenv()

# Create the Gemini client with the key (read from environment, never hardcoded)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_reply(message: str, age_group: str) -> str:
    # Pick the right system prompt for the age group
    system_prompt = SYSTEM_PROMPTS.get(age_group, SYSTEM_PROMPTS["adult"])

    # Call Gemini with the user's message and the age-appropriate instruction
    response = client.models.generate_content(
        model="gemini-flash-latest",
        config={"system_instruction": system_prompt},
        contents=message,
    )
    return response.text