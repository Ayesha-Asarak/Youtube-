import React from "react";
import { Box, Container, Card, CardMedia, Typography, Button, Paper } from "@mui/material";
import ResultsHeader from "../components/ResultsHeader";
import SummaryDisplay from "../components/SummaryDisplay";
import TopicsTags from "../components/TopicsTags";
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useLocation, useNavigate } from "react-router-dom";
import AppFooter from "../components/footer";

export default function ResultsPage() {
  const { state } = useLocation();
  const data = state?.summaryData;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  if (!data) return null;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#f8f8f8" }}>
      <ResultsHeader />
      
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: { xs: 3, sm: 3, md: 4 }
          }}
        >
          {/* LEFT COLUMN */}
          <Box 
            sx={{ 
              width: { xs: "100%", sm: "100%", md: "40%", lg: "38%" },
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            {/* Card Component */}
            <Card
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "#fff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  image={data.thumbnail}
                  alt={data.title}
                  height={280}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    p: 2
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      textAlign: "center"
                    }}
                  >
                    {data.title}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Download Buttons */}
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                gap: 2
              }}
            >
              {data.audio_url && (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  href={data.audio_url}
                  target="_blank"
                  sx={{
                    bgcolor: "#FF3C3C",
                    color: "#fff",
                    py: 1.5,
                    fontWeight: "bold",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#e62c2c",
                      transform: "scale(1.02)",
                      boxShadow: 4
                    }
                  }}
                >
                  DOWNLOAD AUDIO
                </Button>
              )}
              {data.pdf_summary_url && (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PictureAsPdfIcon />}
                  href={data.pdf_summary_url}
                  target="_blank"
                  sx={{
                    bgcolor: "#FF3C3C",
                    color: "#fff",
                    py: 1.5,
                    fontWeight: "bold",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "#e62c2c",
                      transform: "scale(1.02)",
                      boxShadow: 4
                    }
                  }}
                >
                  DOWNLOAD PDF
                </Button>
              )}
            </Box>

            {/* Key Topics */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: "#fff",
                height: "fit-content",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold",
                  borderBottom: "2px solid #f1f1f1",
                  pb: 1
                }}
              >
                Key Topics
              </Typography>
              <TopicsTags topics={data.key_topics} />
            </Paper>
          </Box>

          {/* RIGHT COLUMN */}
          <Box 
            sx={{ 
              width: { xs: "100%", sm: "100%", md: "60%", lg: "62%" },
              display: "flex",
              flexDirection: "column",
              gap: 4
            }}
          >
            {/* Summary Section */}
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                bgcolor: "#fff",
                p: 0,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8
                }
              }}
            >
              <SummaryDisplay summaryBullets={data.summaryBullets} />
            </Paper>

            {/* Visualizations Section */}
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                gap: 3
              }}
            >
              {/* Keyword Bar Chart */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: "bold",
                    borderBottom: "2px solid #f1f1f1",
                    pb: 1
                  }}
                >
                  Keyword Analysis
                </Typography>
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={data.barchartPath}
                    alt="Keyword Bar Chart"
                    style={{ 
                      width: '100%', 
                      borderRadius: '8px',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Paper>
              
              {/* Word Cloud */}
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: "#fff",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 8
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: "bold",
                    borderBottom: "2px solid #f1f1f1",
                    pb: 1 
                  }}
                >
                  Word Cloud
                </Typography>
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={data.wordcloudPath}
                    alt="Word Cloud"
                    style={{ 
                      width: '100%', 
                      borderRadius: '8px',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
      
      <AppFooter />
    </Box>
  );
}
