import { People, DirectionsCar, Event, TrendingUp, Person, Build, Schedule, CheckCircle } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  ListItemAvatar,
  Avatar,
  Button
} from '@mui/material';

import { StatsCard } from '@/components/Dashboard/StatsCard';
import { useGetCustomersQuery, useGetCarsQuery, useGetAppointmentsQuery } from '@/store/api';

export const Dashboard = () => {
  const { data: customersData } = useGetCustomersQuery();
  const { data: carsData } = useGetCarsQuery();
  const { data: appointmentsData } = useGetAppointmentsQuery();

  const customers = customersData?.data ?? [];
  const cars = carsData?.data ?? [];
  const appointments = appointmentsData?.data ?? [];

  const todayAppointments = appointments.filter(
    appointment => new Date(appointment.scheduledDate).toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = appointments
    .filter(appointment => new Date(appointment.scheduledDate) > new Date() && appointment.status === 'SCHEDULED')
    .slice(0, 5);

  const completedAppointments = appointments.filter(appointment => appointment.status === 'COMPLETED');
  const inProgressAppointments = appointments.filter(appointment => appointment.status === 'IN_PROGRESS');

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle />;
      case 'IN_PROGRESS':
        return <Build />;
      default:
        return <Schedule />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your auto care business today.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Customers"
            value={customers.length}
            icon={<People />}
            color="#2563eb"
            trend={{ value: 12, isPositive: true }}
            subtitle="Active customers"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Vehicles"
            value={cars.length}
            icon={<DirectionsCar />}
            color="#10b981"
            trend={{ value: 8, isPositive: true }}
            subtitle="Registered vehicles"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Today's Appointments"
            value={todayAppointments.length}
            icon={<Event />}
            color="#f59e0b"
            trend={{ value: 5, isPositive: false }}
            subtitle="Scheduled for today"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Completed This Month"
            value={completedAppointments.length}
            icon={<TrendingUp />}
            color="#7c3aed"
            trend={{ value: 15, isPositive: true }}
            subtitle="Services completed"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Today's Schedule
                </Typography>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              {todayAppointments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Schedule sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No appointments today
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enjoy your free day or catch up on other tasks!
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {todayAppointments.map(appointment => (
                    <ListItem
                      key={appointment.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'grey.200',
                        borderRadius: 2,
                        mb: 1,
                        '&:last-child': { mb: 0 }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: getStatusColor(appointment.status) + '.main'
                          }}
                        >
                          {getStatusIcon(appointment.status)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {appointment.customer?.firstName} {appointment.customer?.lastName}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.serviceType} • {new Date(appointment.scheduledDate).toLocaleTimeString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.car?.make} {appointment.car?.model}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={appointment.status}
                          color={getStatusColor(appointment.status) as any}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          ${appointment.estimatedCost}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Upcoming Appointments
              </Typography>
              {upcomingAppointments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    No upcoming appointments
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {upcomingAppointments.map(appointment => (
                    <ListItem key={appointment.id} sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main'
                          }}
                        >
                          <Person sx={{ fontSize: 18 }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {appointment.customer?.firstName} {appointment.customer?.lastName}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {appointment.serviceType} • {new Date(appointment.scheduledDate).toLocaleDateString()}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    In Progress
                  </Typography>
                  <Chip label={inProgressAppointments.length} color="warning" size="small" />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                  <Chip label={completedAppointments.length} color="success" size="small" />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${completedAppointments.reduce((sum, apt) => sum + (apt.actualCost ?? apt.estimatedCost), 0)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
