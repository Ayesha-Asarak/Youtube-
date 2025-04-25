// src/components/SummaryDisplay.jsx
import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

function SummaryDisplay({ summaryBullets }) {
  if (!summaryBullets || summaryBullets.length === 0) return null;
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Summary
        </Typography>
        <List dense>
          {summaryBullets.map((point, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemText primary={point} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default SummaryDisplay;
