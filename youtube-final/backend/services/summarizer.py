from utils.gemini import generate_content

def generate_summary(text: str) -> str:
    """Generate summary of text using Gemini"""
    prompt = f"Summarize the following transcript in 3-5 bullet points:\n\n{text}"
    return generate_content(prompt)
