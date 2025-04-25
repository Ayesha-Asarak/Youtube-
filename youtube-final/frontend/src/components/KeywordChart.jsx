import React from "react";
import { Typography, Box } from "@mui/material";

function KeywordChart({ wordcloudPath, barchartPath, title }) {
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:8000/${path.replace(/^\/+/, "")}`;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Box>
        <img 
          src={title === "Word Cloud" ? getImageUrl(wordcloudPath) : getImageUrl(barchartPath)}
          alt={title}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
}

export default KeywordChart;
