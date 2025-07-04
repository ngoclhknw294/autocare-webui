'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { useGetCustomersQuery } from '@/store/api';
import type { CreateCarRequest, Car } from '@/types';

const carSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  vin: z.string().min(17, 'VIN must be 17 characters').max(17),
  licensePlate: z.string().min(1, 'License plate is required'),
  color: z.string().min(1, 'Color is required'),
  mileage: z.number().min(0, 'Mileage must be positive')
});

interface CarFormProps {
  car?: Car;
  onSubmit: (data: CreateCarRequest) => void;
  loading?: boolean;
}

export const CarForm = ({ car, onSubmit, loading = false }: CarFormProps) => {
  const { data: customersData } = useGetCustomersQuery();
  const customers = customersData?.data ?? [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateCarRequest>({
    resolver: zodResolver(carSchema),
    defaultValues: car
      ? {
          customerId: car.customerId,
          make: car.make,
          model: car.model,
          year: car.year,
          vin: car.vin,
          licensePlate: car.licensePlate,
          color: car.color,
          mileage: car.mileage
        }
      : undefined
  });

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {car ? 'Edit Vehicle' : 'Add New Vehicle'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.customerId}>
              <InputLabel>Customer</InputLabel>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Customer">
                    {customers.map(customer => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('make')}
              label="Make"
              fullWidth
              error={!!errors.make}
              helperText={errors.make?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('model')}
              label="Model"
              fullWidth
              error={!!errors.model}
              helperText={errors.model?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('year', { valueAsNumber: true })}
              label="Year"
              type="number"
              fullWidth
              error={!!errors.year}
              helperText={errors.year?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('color')}
              label="Color"
              fullWidth
              error={!!errors.color}
              helperText={errors.color?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('vin')}
              label="VIN"
              fullWidth
              error={!!errors.vin}
              helperText={errors.vin?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('licensePlate')}
              label="License Plate"
              fullWidth
              error={!!errors.licensePlate}
              helperText={errors.licensePlate?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('mileage', { valueAsNumber: true })}
              label="Mileage"
              type="number"
              fullWidth
              error={!!errors.mileage}
              helperText={errors.mileage?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : car ? 'Update Vehicle' : 'Create Vehicle'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
