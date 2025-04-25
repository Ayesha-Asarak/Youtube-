import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_model():
    return genai.GenerativeModel('gemini-2.0-flash') 

def generate_content(prompt):
    model = get_gemini_model()
    response = model.generate_content(prompt)
    return response.text
