import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Appointments } from '@/pages/Appointments';
import { Auth } from '@/pages/Auth';
import { Cars } from '@/pages/Cars';
import { ComingSoon } from '@/pages/ComingSoon.tsx';
import { Customers } from '@/pages/Customers';
import { Dashboard } from '@/pages/Dashboard';
import { store } from '@/store';
import { theme } from '@/theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="cars" element={<Cars />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="services" element={<ComingSoon>Services</ComingSoon>} />
                <Route path="users" element={<ComingSoon>Users</ComingSoon>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
