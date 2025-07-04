export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MECHANIC' | 'CUSTOMER';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  color: string;
  mileage: number;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
}

export interface Appointment {
  id: string;
  customerId: string;
  carId: string;
  mechanicId?: string;
  serviceType: string;
  description: string;
  scheduledDate: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  estimatedDuration: number;
  estimatedCost: number;
  actualCost?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  car?: Car;
  mechanic?: User;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number;
  basePrice: number;
  category: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface CreateCarRequest {
  customerId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  color: string;
  mileage: number;
}

export interface CreateAppointmentRequest {
  customerId: string;
  carId: string;
  mechanicId?: string;
  serviceType: string;
  description: string;
  scheduledDate: string;
  estimatedDuration: number;
  estimatedCost: number;
}
