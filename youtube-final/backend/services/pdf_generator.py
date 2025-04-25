from fpdf import FPDF
import os

def create_summary_pdf(title: str, summary: str, topics: list, video_id: str) -> str:
    """Generate a PDF summary of the video analysis"""
    os.makedirs("pdf_summaries", exist_ok=True)
    pdf_path = f"pdf_summaries/{video_id}.pdf"
    
    pdf = FPDF()
    pdf.add_page()
    
    # Add title
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(0, 10, txt=title, ln=1, align='C')
    
    # Add summary
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, txt="Summary:", ln=1)
    
    # Split summary by bullet points if present
    if "•" in summary:
        for point in summary.split("•"):
            if point.strip():
                pdf.multi_cell(0, 10, txt=f"• {point.strip()}")
    else:
        pdf.multi_cell(0, 10, txt=summary)
    
    # Add topics
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(0, 10, txt="Key Topics:", ln=1)
    pdf.set_font("Arial", size=12)
    for topic in topics:
        pdf.cell(0, 10, txt=f"- {topic}", ln=1)
    
    pdf.output(pdf_path)
    return pdf_path
