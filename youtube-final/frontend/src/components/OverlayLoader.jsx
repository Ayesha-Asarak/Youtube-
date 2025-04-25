import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function OverlayLoader({ loading, color = "#FF3C3C" }) {
  if (!loading) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        bgcolor: "rgba(0,0,0,0.3)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)"
      }}
    >
      <CircularProgress size={72} sx={{ color, background: "#fff", borderRadius: "50%", p: 2 }} />
    </Box>
  );
}
