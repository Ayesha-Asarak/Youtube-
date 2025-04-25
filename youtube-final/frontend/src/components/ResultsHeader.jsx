import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function ResultsHeader() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ bgcolor: "#000", boxShadow: 0 }}>
      <Toolbar>
        <IconButton
          edge="start"
          sx={{
            color: "#fff",
            mr: 2,
            transition: "background 0.2s",
            "&:hover": {
              bgcolor: "#FF3C3C",
              color: "#fff"
            }
          }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: 600,
            letterSpacing: 1,
            userSelect: "none"
          }}
        >
          Results
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
