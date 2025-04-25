// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import OverlayLoader from "../components/OverlayLoader";
import { fetchVideoData } from "../utils/api";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await fetchVideoData(url);
      setLoading(false);
      navigate("/results", { state: { summaryData: data } });
    } catch (err) {
      setLoading(false);
      alert("Error: Could not summarize the video.");
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 6, position: "relative" }}>
      <OverlayLoader loading={loading} color="#FF3C3C" />
      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundColor: "#000000",
          borderRadius: "20px",
          p: { xs: 4, md: 6 },
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* TEXT + IMAGE ROW */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE: TEXT */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#FFFFFF",
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Summarize <br /> Videos in Minutes.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#CCCCCC", fontSize: "1.1rem" }}
            >
              AI-powered summaries help you review faster, learn smarter, and save time.
              Upload any YouTube video link and get a structured summary in minutes.
            </Typography>
          </Box>
          {/* RIGHT SIDE: IMAGE */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Video AI Summary Illustration"
              sx={{
                maxWidth: "100%",
                maxHeight: "320px",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Box>
        {/* INPUT FORM BELOW TEXT+IMAGE */}
        <Box sx={{ width: { xs: "100%", md: "90%" }, mx: "auto" }}>
          <Box
            sx={{
              display: "flex",
              border: "2px solid #FF3C3C",
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#000000",
            }}
          >
            <input
              type="text"
              placeholder="Enter YouTube Video URL"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              style={{
                flex: 1,
                padding: "18px 20px",
                fontSize: "1rem",
                color: "#FFFFFF",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                minWidth: "400px",
              }}
            />
            <button
              onClick={handleSummarize}
              style={{
                backgroundColor: "transparent",
                color: "#FF3C3C",
                padding: "0 30px",
                fontWeight: "bold",
                borderLeft: "2px solid #FF3C3C",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              SUMMARIZE
            </button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
