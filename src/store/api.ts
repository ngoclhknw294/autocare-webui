import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  ApiResponse,
  Appointment,
  Car,
  CreateAppointmentRequest,
  CreateCarRequest,
  CreateCustomerRequest,
  Customer,
  PaginatedResponse,
  Service,
  User
} from '@/types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Customer', 'Car', 'Appointment', 'User', 'Service'],
  endpoints: builder => ({
    // Customers
    getCustomers: builder.query<PaginatedResponse<Customer>, void>({
      query: () => '/customers',
      providesTags: ['Customer']
    }),
    getCustomer: builder.query<ApiResponse<Customer>, string>({
      query: id => `/customers/${id}`,
      providesTags: ['Customer']
    }),
    createCustomer: builder.mutation<ApiResponse<Customer>, CreateCustomerRequest>({
      query: body => ({
        url: '/customers',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Customer']
    }),
    updateCustomer: builder.mutation<ApiResponse<Customer>, { id: string; data: Partial<CreateCustomerRequest> }>({
      query: ({ id, data }) => ({
        url: `/customers/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Customer']
    }),
    deleteCustomer: builder.mutation<ApiResponse<void>, string>({
      query: id => ({
        url: `/customers/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Customer']
    }),

    // Cars
    getCars: builder.query<PaginatedResponse<Car>, void>({
      query: () => '/cars',
      providesTags: ['Car']
    }),
    getCar: builder.query<ApiResponse<Car>, string>({
      query: id => `/cars/${id}`,
      providesTags: ['Car']
    }),
    getCarsByCustomer: builder.query<ApiResponse<Car[]>, string>({
      query: customerId => `/customers/${customerId}/cars`,
      providesTags: ['Car']
    }),
    createCar: builder.mutation<ApiResponse<Car>, CreateCarRequest>({
      query: body => ({
        url: '/cars',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Car']
    }),
    updateCar: builder.mutation<ApiResponse<Car>, { id: string; data: Partial<CreateCarRequest> }>({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Car']
    }),
    deleteCar: builder.mutation<ApiResponse<void>, string>({
      query: id => ({
        url: `/cars/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Car']
    }),

    // Appointments
    getAppointments: builder.query<PaginatedResponse<Appointment>, void>({
      query: () => '/appointments',
      providesTags: ['Appointment']
    }),
    getAppointment: builder.query<ApiResponse<Appointment>, string>({
      query: id => `/appointments/${id}`,
      providesTags: ['Appointment']
    }),
    createAppointment: builder.mutation<ApiResponse<Appointment>, CreateAppointmentRequest>({
      query: body => ({
        url: '/appointments',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Appointment']
    }),
    updateAppointment: builder.mutation<
      ApiResponse<Appointment>,
      { id: string; data: Partial<CreateAppointmentRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/appointments/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Appointment']
    }),
    deleteAppointment: builder.mutation<ApiResponse<void>, string>({
      query: id => ({
        url: `/appointments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Appointment']
    }),

    // Users
    getUsers: builder.query<PaginatedResponse<User>, void>({
      query: () => '/users',
      providesTags: ['User']
    }),
    getMechanics: builder.query<ApiResponse<User[]>, void>({
      query: () => '/users?role=MECHANIC',
      providesTags: ['User']
    }),

    // Services
    getServices: builder.query<PaginatedResponse<Service>, void>({
      query: () => '/services',
      providesTags: ['Service']
    }),

    // Authentication
    login: builder.mutation<ApiResponse<{ user: User; token: string }>, { email: string; password: string }>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<
      ApiResponse<{ user: User; token: string }>,
      {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: string;
      }
    >({
      query: userData => ({
        url: '/auth/register',
        method: 'POST',
        body: userData
      })
    })
  })
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCarsQuery,
  useGetCarQuery,
  useGetCarsByCustomerQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetUsersQuery,
  useGetMechanicsQuery,
  useGetServicesQuery,
  useLoginMutation,
  useRegisterMutation
} = api;
