import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', width: '100%' }}>
    <CircularProgress size={60} thickness={4} color="primary" />
  </Box>
);

export default Loader;
