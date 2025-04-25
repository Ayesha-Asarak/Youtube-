import os
import whisper
import shutil

# Initialize Whisper model
whisper_model = whisper.load_model("base")

def transcribe_audio(file_path: str) -> str:
    """Transcribe audio file using Whisper"""
    result = whisper_model.transcribe(file_path)
    
    # Save transcript to file
    video_id = os.path.basename(file_path).split('.')[0]
    os.makedirs("transcripts", exist_ok=True)
    transcript_path = f"transcripts/{video_id}.txt"
    
    with open(transcript_path, "w", encoding="utf-8") as f:
        f.write(result["text"])
    
    return result["text"]
