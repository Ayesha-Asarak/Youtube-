import React from "react";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default Loader;
