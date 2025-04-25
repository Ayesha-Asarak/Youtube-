from utils.gemini import generate_content

def extract_keywords(text: str) -> list:
    """Extract key topics from text using Gemini"""
    prompt = f"Extract the key topics as a comma-separated list from this transcript:\n\n{text}"
    response = generate_content(prompt)
    return [topic.strip() for topic in response.split(",")]
