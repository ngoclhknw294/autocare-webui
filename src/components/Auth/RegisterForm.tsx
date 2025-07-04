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
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { useTypedDispatch } from '@/hooks/useTypedDispatch';
import { useRegisterMutation } from '@/store/api';
import { setCredentials } from '@/store/slices/authSlice';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['CUSTOMER', 'MECHANIC', 'ADMIN'])
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useTypedDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'CUSTOMER'
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      const { confirmPassword, ...registerData } = data;
      const result = await register(registerData).unwrap();
      dispatch(setCredentials(result.data));
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join AutoCare today
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              {...registerField('firstName')}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              {...registerField('lastName')}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Box>

          <TextField
            {...registerField('email')}
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="email"
          />

          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Role">
                  <MenuItem value="CUSTOMER">Customer</MenuItem>
                  <MenuItem value="MECHANIC">Mechanic</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          <TextField
            {...registerField('password')}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password"
          />

          <TextField
            {...registerField('confirmPassword')}
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth variant="contained" size="large" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
            {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link component="button" type="button" onClick={onSwitchToLogin} sx={{ textDecoration: 'none' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
