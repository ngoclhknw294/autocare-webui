'use client';

import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '@/components/Auth/LoginForm';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useTypedSelector(state => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3b82f6 0%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm">
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </Container>
    </Box>
  );
};
