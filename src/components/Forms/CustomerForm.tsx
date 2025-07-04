'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { CreateCustomerRequest, Customer } from '@/types';

const customerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 characters')
});

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CreateCustomerRequest) => void;
  loading?: boolean;
}

export const CustomerForm = ({ customer, onSubmit, loading = false }: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCustomerRequest>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer
      ? {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          zipCode: customer.zipCode
        }
      : undefined
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {customer ? 'Edit Customer' : 'Add New Customer'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('firstName')}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('lastName')}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('email')}
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('phone')}
              label="Phone"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('address')}
              label="Address"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('city')}
              label="City"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('zipCode')}
              label="Zip Code"
              fullWidth
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : customer ? 'Update Customer' : 'Create Customer'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
