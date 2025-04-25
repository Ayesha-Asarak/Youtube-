import os
import tempfile
import yt_dlp
import requests
from PIL import Image
import shutil

def download_youtube_audio(url: str, save_for_user: bool = False) -> tuple:
    """Download audio from YouTube video, optionally save for user download"""
    ffmpeg_path = os.path.abspath("ffmpeg/bin/ffmpeg.exe")
    
    # Processing audio for transcription
    ydl_opts = {
        'format': 'bestaudio/best',
        'ffmpeg_location': os.path.dirname(ffmpeg_path),
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(tempfile.gettempdir(), '%(id)s.%(ext)s'),
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        video_id = info.get('id', 'unknown')
        base = os.path.splitext(ydl.prepare_filename(info))[0]
        temp_mp3_path = base + ".mp3"
        
        if save_for_user:
            # Save a copy for user download
            os.makedirs("audio", exist_ok=True)
            user_mp3_path = f"audio/{video_id}.mp3"
            shutil.copy(temp_mp3_path, user_mp3_path)
            return temp_mp3_path, user_mp3_path
        
        return temp_mp3_path, None

def get_video_info(url: str) -> dict:
    """Extract video title and thumbnail URL"""
    ydl_opts = {
        'skip_download': True, 
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        
        # Get video details
        video_info = {
            'title': info.get('title', 'No title found'),
            'thumbnail': info.get('thumbnail', None),
            'duration': info.get('duration', 0),
            'channel': info.get('uploader', 'Unknown'),
            'view_count': info.get('view_count', 0),
            'upload_date': info.get('upload_date', 'Unknown')
        }
        
        return video_info

def download_thumbnail(url: str, video_id: str) -> str:
    """Download thumbnail image and save it"""
    os.makedirs("thumbnails", exist_ok=True)
    thumbnail_path = f"thumbnails/{video_id}.jpg"
    
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(thumbnail_path, 'wb') as f:
            f.write(response.content)
        
        # Resize thumbnail if needed
        img = Image.open(thumbnail_path)
        try:
            img = img.resize((480, 360), Image.LANCZOS)
        except AttributeError:
            # For newer Pillow versions
            img = img.resize((480, 360), Image.Resampling.LANCZOS)
        img.save(thumbnail_path)
        
        return thumbnail_path
    
    return None
