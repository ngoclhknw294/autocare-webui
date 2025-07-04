'use client';

import { Dashboard, People, DirectionsCar, Event, Build, Person } from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Vehicles', icon: <DirectionsCar />, path: '/cars' },
  { text: 'Appointments', icon: <Event />, path: '/appointments' },
  { text: 'Services', icon: <Build />, path: '/services' },
  { text: 'Users', icon: <Person />, path: '/users' }
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DirectionsCar color="primary" />
          <Typography variant="h6" noWrap component="div">
            AutoCare
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
