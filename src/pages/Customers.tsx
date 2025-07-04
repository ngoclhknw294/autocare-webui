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

import { CustomerForm } from '@/components/Forms/CustomerForm';
import {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation
} from '@/store/api';
import type { Customer, CreateCustomerRequest } from '@/types';

export const Customers = () => {
  const [open, setOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const { data: customersData, isLoading } = useGetCustomersQuery();
  const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation();
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();
  const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

  const customers = customersData?.data ?? [];

  const handleSubmit = async (data: CreateCustomerRequest) => {
    try {
      if (editingCustomer) {
        await updateCustomer({ id: editingCustomer.id, data }).unwrap();
      } else {
        await createCustomer(data).unwrap();
      }
      handleClose();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete) {
      try {
        await deleteCustomer(customerToDelete.id).unwrap();
        setDeleteDialogOpen(false);
        setCustomerToDelete(null);
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCustomer(null);
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
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Customer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(customer => (
              <TableRow key={customer.id}>
                <TableCell>
                  {customer.firstName} {customer.lastName}
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.city}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(customer)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(customer)}>
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
          <CustomerForm
            customer={editingCustomer ?? undefined}
            onSubmit={handleSubmit}
            loading={isCreating || isUpdating}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {customerToDelete?.firstName} {customerToDelete?.lastName}?
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
