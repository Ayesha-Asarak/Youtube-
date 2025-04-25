import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

function InputForm({ onSubmit }) {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 16, marginBottom: 32 }}>
      <TextField
        label="YouTube URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>
        Analyze
      </Button>
    </form>
  );
}

export default InputForm;
