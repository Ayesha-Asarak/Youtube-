// src/utils/api.js
const API_URL = "http://localhost:8000/api/process-video";
const RECENT_URL = "http://localhost:8000/api/recent-videos";

// Utility: Convert summary string to bullet points array
function parseSummaryToBullets(summary) {
  if (!summary) return [];

  return summary
    .replace(/here'?s a summary of the transcript.*?:|^summary:?/i, '') // remove unwanted intro lines
    .split(/\n|•|\*/g) // split into bullets
    .map(line => line.trim()) // trim whitespace
    .filter(line =>
      line.length > 0 &&
      !/^here'?s a summary of the transcript/i.test(line) // filter if any leftover matching line exists
    );
}

export const fetchVideoData = async (url) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ youtube_url: url }),
  });
  if (!response.ok) throw new Error("Error processing video");
  const backendData = await response.json();
  return {
    ...backendData,
    thumbnail: backendData.thumbnail_url,
    key_topics: backendData.topics,
    wordcloudPath: backendData.wordcloud_path,
    barchartPath: backendData.barchart_path,
    summaryBullets: parseSummaryToBullets(backendData.summary),
  };
};

export const fetchHistory = async (limit = 2) => {
  const response = await fetch(`${RECENT_URL}?limit=${limit}`);
  if (!response.ok) throw new Error("Error fetching history");
  const backendData = await response.json();
  return backendData.map(video => ({
    id: video.video_id || video._id,
    title: video.title,
    thumbnail: video.thumbnail_url || '', // Add fallback for undefined
    key_topics: video.topics || [], // Add fallback for undefined
    summaryBullets: parseSummaryToBullets(video.summary) || [], // Add fallback
    url: video.video_url,
    wordcloudPath: video.wordcloud_path || '',
    barchartPath: video.barchart_path || '',
  }));
};
