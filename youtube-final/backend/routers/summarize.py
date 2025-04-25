from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from services import youtube, transcription, summarizer, keywords, visualization
from services import db
from services import pdf_generator
import re
import os

router = APIRouter(prefix="/api", tags=["video"])

class VideoRequest(BaseModel):
    youtube_url: str

class VideoResponse(BaseModel):
    title: str
    thumbnail_url: str
    transcription: str
    summary: str
    topics: list
    wordcloud_path: str
    barchart_path: str
    audio_url: str = None
    pdf_summary_url: str = None

@router.post("/process-video", response_model=VideoResponse)
async def process_video(request: VideoRequest, request_obj: Request):
    try:
        # Extract video ID from URL
        video_id_match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11}).*", request.youtube_url)
        video_id = video_id_match.group(1) if video_id_match else "unknown"
        
        # Get base URL from request state
        base_url = request_obj.state.base_url
        
        # Get video metadata (title, thumbnail)
        video_info = youtube.get_video_info(request.youtube_url)
        
        # Download thumbnail
        thumbnail_path = youtube.download_thumbnail(video_info['thumbnail'], video_id)
        thumbnail_url = f"{base_url}/thumbnails/{os.path.basename(thumbnail_path)}" if thumbnail_path else None
        
        # Download audio with save for user option
        audio_path, user_audio_path = youtube.download_youtube_audio(request.youtube_url, save_for_user=True)
        
        # Transcribe audio
        transcript = transcription.transcribe_audio(audio_path)
        
        # Generate summary
        summary = summarizer.generate_summary(transcript)
        
        # Extract keywords/topics
        topics = keywords.extract_keywords(transcript)
        
        # Generate visualizations
        wordcloud_path = visualization.generate_word_cloud(transcript, video_id)
        barchart_path = visualization.generate_keyword_barchart(transcript, video_id)
        
        # Convert relative paths to absolute URLs
        wordcloud_url = f"{base_url}/visualizations/{os.path.basename(wordcloud_path)}"
        barchart_url = f"{base_url}/visualizations/{os.path.basename(barchart_path)}"
        
        # Create audio download URL
        audio_download_url = None
        if user_audio_path:
            audio_download_url = f"{base_url}/audio/{os.path.basename(user_audio_path)}"
        
        # Generate PDF summary
        pdf_path = pdf_generator.create_summary_pdf(
            video_info['title'], summary, topics, video_id
        )
        pdf_url = f"{base_url}/pdf_summaries/{os.path.basename(pdf_path)}"
        
        await db.save_video_analysis(
            video_id, 
            request.youtube_url, 
            video_info['title'], 
            summary, 
            topics,
            thumbnail_url,
            wordcloud_url,
            barchart_url,
            transcript,
            audio_download_url,
            pdf_url
        )
        
        return {
            "title": video_info['title'],
            "thumbnail_url": thumbnail_url,
            "transcription": transcript,
            "summary": summary,
            "topics": topics,
            "wordcloud_path": wordcloud_url,
            "barchart_path": barchart_url,
            "audio_url": audio_download_url,
            "pdf_summary_url": pdf_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recent-videos", response_model=list)
async def get_recent_videos(request: Request, limit: int =5):
    """Get recent video analyses"""
    videos = await db.get_recent_videos(limit)
    
    base_url = request.state.base_url
    for video in videos:
        if 'thumbnail_path' in video and video['thumbnail_path']:
            if not video['thumbnail_path'].startswith('http'):
                video['thumbnail_path'] = f"{base_url}/{video['thumbnail_path']}"
        
        if 'wordcloud_path' in video and video['wordcloud_path']:
            if not video['wordcloud_path'].startswith('http'):
                video['wordcloud_path'] = f"{base_url}/{video['wordcloud_path']}"
        
        if 'barchart_path' in video and video['barchart_path']:
            if not video['barchart_path'].startswith('http'):
                video['barchart_path'] = f"{base_url}/{video['barchart_path']}"
    
    return videos

@router.get("/video/{video_id}")
async def get_video(video_id: str, request: Request):
    """Get specific video analysis"""
    video = await db.get_video_by_id(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    base_url = request.state.base_url
    if 'thumbnail_path' in video and video['thumbnail_path']:
        if not video['thumbnail_path'].startswith('http'):
            video['thumbnail_path'] = f"{base_url}/{video['thumbnail_path']}"
    
    if 'wordcloud_path' in video and video['wordcloud_path']:
        if not video['wordcloud_path'].startswith('http'):
            video['wordcloud_path'] = f"{base_url}/{video['wordcloud_path']}"
    
    if 'barchart_path' in video and video['barchart_path']:
        if not video['barchart_path'].startswith('http'):
            video['barchart_path'] = f"{base_url}/{video['barchart_path']}"
    
    return video
