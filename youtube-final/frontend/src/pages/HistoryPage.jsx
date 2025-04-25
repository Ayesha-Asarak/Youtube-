import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, IconButton, Link } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { fetchHistory } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import HistoryHeader from '../components/HistoryHeader';
import AppFooter from '../components/footer';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchHistory(3);
        setHistory(data);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff',
      }}
    >
      <HistoryHeader />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {loading ? (
          <Typography>Loading history...</Typography>
        ) : history.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" sx={{ color: '#666' }}>
              No videos have been analyzed yet.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ width: '100%', maxWidth: 1200 }}>
            {history.length > 0 && (
              <Box sx={{ width: '100%', mb: 5 }}>
                <Card
                  sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    width: '100%',
                    minHeight: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" sx={{ color: '#555', fontWeight: 600 }}>
                      FEATURED SUMMARY
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {history[0].title}
                    </Typography>
                    {Array.isArray(history[0].summaryBullets) && history[0].summaryBullets.length > 0 ? (
                      <Box component="ul" sx={{ mt: 2, mb: 3, pl: 3 }}>
                        {history[0].summaryBullets.map((bullet, idx) => (
                          <li key={idx} style={{ color: '#333', fontSize: '1rem', marginBottom: 8 }}>
                            {bullet}
                          </li>
                        ))}
                      </Box>
                    ) : (
                      <Typography sx={{ mt: 2, mb: 3, fontSize: '1rem', color: '#333' }}>
                        {typeof history[0].summaryBullets === 'string'
                          ? history[0].summaryBullets
                          : 'No summary available.'}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#555', mb: 1 }}>
                      Top Topics
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {(history[0].key_topics || []).slice(0, 4).map((topic, i) => (
                        <Chip
                          key={i}
                          label={topic}
                          size="small"
                          sx={{
                            backgroundColor: '#e0e0e0',
                            color: '#333',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            borderRadius: '12px',
                          }}
                        />
                      ))}
                    </Box>
                    <Link
                      href={history[0].url}
                      target="_blank"
                      rel="noopener"
                      underline="hover"
                      sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#3a69ad' }}
                    >
                      Watch Video ↗
                    </Link>
                  </CardContent>
                  <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                    <IconButton onClick={() => handleCardClick(history[0].url)} sx={{ color: '#3a69ad' }}>
                      <ArrowCircleRightIcon fontSize="large" />
                    </IconButton>
                  </Box>
                </Card>
              </Box>
            )}
            
            {history.length > 1 && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  justifyContent: 'space-between',
                  gap: '5%' 
                }}
              >
                {history.slice(1, 3).map((video, index) => (
                  <Box
                    key={video.id}
                    sx={{
                      width: { xs: '100%', sm: '47.5%' },
                      mb: { xs: 4, sm: 0 }, 
                    }}
                  >
                    <Card
                      sx={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        width: '100%',
                        height: '100%',
                        minHeight: 220,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="overline" sx={{ color: '#555', fontWeight: 600 }}>
                          SUMMARY
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {video.title}
                        </Typography>
                        {Array.isArray(video.summaryBullets) && video.summaryBullets.length > 0 ? (
                          <Box component="ul" sx={{ mt: 1, mb: 2, pl: 3 }}>
                            {video.summaryBullets.slice(0, 2).map((bullet, idx) => (
                              <li key={idx} style={{ color: '#333', fontSize: '0.95rem', marginBottom: 4 }}>
                                {bullet}
                              </li>
                            ))}
                          </Box>
                        ) : (
                          <Typography sx={{ mt: 1, mb: 2, fontSize: '0.95rem', color: '#333' }}>
                            {typeof video.summaryBullets === 'string'
                              ? video.summaryBullets
                              : 'No summary available.'}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#555', mb: 1 }}>
                          Top Topics
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                          {(video.key_topics || []).slice(0, 2).map((topic, i) => (
                            <Chip
                              key={i}
                              label={topic}
                              size="small"
                              sx={{
                                backgroundColor: '#e0e0e0',
                                color: '#333',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                borderRadius: '12px',
                              }}
                            />
                          ))}
                        </Box>
                        <Link
                          href={video.url}
                          target="_blank"
                          rel="noopener"
                          underline="hover"
                          sx={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#3a69ad' }}
                        >
                        Watch Video ↗
                      </Link>
                      </CardContent>
                      <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                        <IconButton onClick={() => handleCardClick(video.url)} sx={{ color: '#3a69ad' }}>
                          <ArrowCircleRightIcon fontSize="large" />
                        </IconButton>
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Container>
      <AppFooter />
 </Box>
 );
}
