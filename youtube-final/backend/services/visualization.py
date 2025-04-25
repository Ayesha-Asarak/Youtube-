import os
import matplotlib.pyplot as plt
from wordcloud import WordCloud, STOPWORDS
import re
from collections import Counter
import numpy as np

def generate_word_cloud(text: str, video_id: str) -> str:
    """Generate word cloud from transcript text"""
    # Create directory for visualizations
    os.makedirs("visualizations", exist_ok=True)
    output_path = f"visualizations/{video_id}_wordcloud.png"
    
    # Add more stopwords specific to transcripts
    stopwords = set(STOPWORDS)
    stopwords.update(['um', 'uh', 'like', 'know', 'just', 'going', 'got', 'yeah'])
    
    # Clean text - remove punctuation and convert to lowercase
    text = re.sub(r'[^\w\s]', '', text.lower())
    
    # Create word cloud
    wordcloud = WordCloud(
        width=800, 
        height=400,
        background_color='white',
        stopwords=stopwords,
        max_words=100,
        colormap='viridis',
        collocations=False
    ).generate(text)
    
    # Save the word cloud image
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.tight_layout(pad=0)
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    return output_path

def generate_keyword_barchart(text: str, video_id: str, top_n: int = 10) -> str:
    """Generate bar chart of top keywords"""
    os.makedirs("visualizations", exist_ok=True)
    output_path = f"visualizations/{video_id}_barchart.png"
    
    # Add more stopwords specific to transcripts
    stopwords = set(STOPWORDS)
    stopwords.update(['um', 'uh', 'like', 'know', 'just', 'going', 'got', 'yeah'])
    
    # Clean and tokenize text
    text = re.sub(r'[^\w\s]', '', text.lower())
    words = [word for word in text.split() if word not in stopwords and len(word) > 2]
    
    # Count word frequencies
    word_counts = Counter(words)
    top_words = word_counts.most_common(top_n)
    
    # Create bar chart
    words, counts = zip(*top_words) if top_words else ([], [])
    plt.figure(figsize=(12, 6))
    bars = plt.bar(words, counts, color='skyblue')
    
    # Add labels and title
    plt.xlabel('Keywords')
    plt.ylabel('Frequency')
    plt.title(f'Top {top_n} Keywords in Video')
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    # Add count labels on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                 f'{height}', ha='center', va='bottom')
    
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    return output_path
