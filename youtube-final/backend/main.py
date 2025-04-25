import os
from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from routers import summarize
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

load_dotenv()

ffmpeg_path = os.path.abspath("ffmpeg/bin/ffmpeg.exe")
os.environ["FFMPEG_BINARY"] = ffmpeg_path
os.environ["PATH"] = os.path.dirname(ffmpeg_path) + os.pathsep + os.environ["PATH"]

# Create all required directories
os.makedirs("thumbnails", exist_ok=True)
os.makedirs("visualizations", exist_ok=True)
os.makedirs("pdf_summaries", exist_ok=True)
os.makedirs("audio", exist_ok=True)
os.makedirs("transcripts", exist_ok=True)

app = FastAPI(
    title="YouTube Summarizer API",
    description="API for summarizing YouTube videos using Whisper and Gemini AI",
    version="1.0.0"
)

# Configure BASE_URL for absolute path construction
BASE_URL = os.getenv("BASE_URL", "http://localhost:8000")

@app.middleware("http")
async def add_base_url(request: Request, call_next):
    request.state.base_url = BASE_URL
    response = await call_next(request)
    return response

# Mount static directories after creating them
app.mount("/thumbnails", StaticFiles(directory="thumbnails"), name="thumbnails")
app.mount("/visualizations", StaticFiles(directory="visualizations"), name="visualizations")
app.mount("/pdf_summaries", StaticFiles(directory="pdf_summaries"), name="pdf_summaries")
app.mount("/audio", StaticFiles(directory="audio"), name="audio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
