'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Link,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useLoginMutation } from '@/store/api';
import { setCredentials } from '@/store/slices/authSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useTypedDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const result = await login(data).unwrap();
      dispatch(setCredentials(result.data));
    } catch (err: any) {
      setError(err.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your AutoCare account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
          />
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link component="button" type="button" onClick={onSwitchToRegister} sx={{ textDecoration: 'none' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
