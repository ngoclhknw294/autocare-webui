import { Edit, Delete, Add, Visibility } from '@mui/icons-material';
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
  Chip
} from '@mui/material';

import { useGetAppointmentsQuery } from '@/store/api';

export const Appointments = () => {
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery();
  const appointments = appointmentsData?.data ?? [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'warning';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
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
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Schedule Appointment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date & Time</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(appointment => (
              <TableRow key={appointment.id}>
                <TableCell>{new Date(appointment.scheduledDate).toLocaleString()}</TableCell>
                <TableCell>
                  {appointment.customer
                    ? `${appointment.customer.firstName} ${appointment.customer.lastName}`
                    : 'Unknown'}
                </TableCell>
                <TableCell>
                  {appointment.car ? `${appointment.car.make} ${appointment.car.model}` : 'Unknown'}
                </TableCell>
                <TableCell>{appointment.serviceType}</TableCell>
                <TableCell>
                  <Chip label={appointment.status} color={getStatusColor(appointment.status) as any} size="small" />
                </TableCell>
                <TableCell>${appointment.actualCost ?? appointment.estimatedCost}</TableCell>
                <TableCell>
                  <IconButton>
                    <Visibility />
                  </IconButton>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
