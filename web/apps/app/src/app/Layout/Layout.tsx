import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <Box sx={{ p: 0, width: '100%', height: '100%' }}>
      <Outlet />
    </Box>
  );
}
