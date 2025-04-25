import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import Dashboard from "./pages/Dashboard";
import HistoryPage from "./pages/HistoryPage";
import ResultsPage from "./pages/ResultsPage"; // If you have a results page
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

function AppLayout() {
  const location = useLocation();
  // Only show AppHeader and AppFooter on dashboard ("/")
  const showHeaderFooter = location.pathname === "/";

  return (
    <>
      {showHeaderFooter && <AppHeader />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
      {showHeaderFooter && <AppFooter />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
