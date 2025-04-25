from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
import datetime

load_dotenv()

mongo_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(mongo_url)
db = client.youtube_analyzer

async def setup_indexes():
    """Create necessary indexes for efficient queries"""
    await db.video_analyses.create_index([("created_at", -1)])
    
    indexes = await db.video_analyses.list_indexes()
    for index in indexes:
        if 'expireAfterSeconds' in index:
            await db.video_analyses.drop_index(index['name'])

async def save_video_analysis(video_id, video_url, title, summary, topics, 
                             thumbnail_path=None, wordcloud_path=None, 
                             barchart_path=None, transcript=None, audio_path=None,
                             pdf_path=None):
    """Save complete video analysis to MongoDB"""
    result = await db.video_analyses.update_one(
        {"video_id": video_id},
        {"$set": {
            "video_id": video_id,
            "video_url": video_url,
            "title": title,
            "summary": summary,
            "topics": topics,
            "thumbnail_path": thumbnail_path,
            "wordcloud_path": wordcloud_path,
            "barchart_path": barchart_path,
            "transcript": transcript,
            "audio_path": audio_path,
            "pdf_path": pdf_path,
            "created_at": datetime.datetime.now()
        }},
        upsert=True
    )
    return video_id

async def get_all_videos():
    """Get all analyzed videos"""
    cursor = db.video_analyses.find()
    videos = await cursor.to_list(length=100)
    for video in videos:
        video["_id"] = str(video["_id"])
    return videos

async def get_video_by_id(video_id):
    """Get video analysis by ID"""
    video = await db.video_analyses.find_one({"video_id": video_id})
    if video:
        video["_id"] = str(video["_id"])
    return video

async def get_recent_videos(limit=3):
    """Get the most recent analyzed videos"""
    cursor = db.video_analyses.find().sort("created_at", -1).limit(limit)
    videos = await cursor.to_list(length=limit)
    for video in videos:
        video["_id"] = str(video["_id"])
    return videos
