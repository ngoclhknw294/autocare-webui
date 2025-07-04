'use client';

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '@/hooks/useTypedSelector';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, token } = useTypedSelector(state => state.auth);

  if (!isAuthenticated && !token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
