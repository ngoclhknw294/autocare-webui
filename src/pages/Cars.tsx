'use client';

import { Edit, Delete, Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useState } from 'react';

import { CarForm } from '@/components/Forms/CarForm';
import { useGetCarsQuery, useCreateCarMutation, useUpdateCarMutation, useDeleteCarMutation } from '@/store/api';
import type { Car, CreateCarRequest } from '@/types';

export const Cars = () => {
  const [open, setOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const { data: carsData, isLoading } = useGetCarsQuery();
  const [createCar, { isLoading: isCreating }] = useCreateCarMutation();
  const [updateCar, { isLoading: isUpdating }] = useUpdateCarMutation();
  const [deleteCar, { isLoading: isDeleting }] = useDeleteCarMutation();

  const cars = carsData?.data ?? [];

  const handleSubmit = async (data: CreateCarRequest) => {
    try {
      if (editingCar) {
        await updateCar({ id: editingCar.id, data }).unwrap();
      } else {
        await createCar(data).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setOpen(true);
  };

  const handleDelete = (car: Car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (carToDelete) {
      try {
        await deleteCar(carToDelete.id).unwrap();
        setDeleteDialogOpen(false);
        setCarToDelete(null);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCar(null);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant="h4">Vehicles</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Vehicle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make & Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map(car => (
              <TableRow key={car.id}>
                <TableCell>
                  {car.make} {car.model}
                </TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.licensePlate}</TableCell>
                <TableCell>{car.customer ? `${car.customer.firstName} ${car.customer.lastName}` : 'Unknown'}</TableCell>
                <TableCell>{car.mileage.toLocaleString()} miles</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(car)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(car)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <CarForm car={editingCar ?? undefined} onSubmit={handleSubmit} loading={isCreating || isUpdating} />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {carToDelete?.make} {carToDelete?.model} ({carToDelete?.licensePlate})?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" disabled={isDeleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
