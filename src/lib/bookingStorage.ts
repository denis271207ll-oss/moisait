export interface Booking {
  id: string;
  carId: string;
  carName: string;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  pickupOffice: string;
  totalDays: number;
  totalPrice: number;
  status: 'pending' | 'active' | 'completed';
  createdAt: string;
}

const STORAGE_KEY = 'zimbrean_bookings';

// Initialize with mock data if empty
const initializeMockData = (): Booking[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Mock bookings
  const mockBookings: Booking[] = [
    {
      id: '1',
      carId: '1',
      carName: 'Volkswagen Passat',
      customerName: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+373 69 123 456',
      pickupDate: '2025-01-15',
      returnDate: '2025-01-20',
      pickupOffice: 'office1',
      totalDays: 5,
      totalPrice: 250,
      status: 'completed',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      carId: '2',
      carName: 'BMW 5 Series',
      customerName: 'Мария Попеску',
      email: 'maria@example.com',
      phone: '+373 78 987 654',
      pickupDate: '2025-02-10',
      returnDate: '2025-02-15',
      pickupOffice: 'office2',
      totalDays: 5,
      totalPrice: 600,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      carId: '3',
      carName: 'Tesla Model 3',
      customerName: 'Андрей Иванов',
      email: 'andrey@example.com',
      phone: '+373 60 111 222',
      pickupDate: '2025-03-01',
      returnDate: '2025-03-05',
      pickupOffice: 'office1',
      totalDays: 4,
      totalPrice: 360,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBookings));
  return mockBookings;
};

export function getBookings(): Booking[] {
  return initializeMockData();
}

export function getBookingsByCar(carId: string): Booking[] {
  return getBookings().filter((b) => b.carId === carId);
}

export function getBookingsByPhone(phone: string): Booking[] {
  return getBookings().filter((b) => b.phone === phone);
}

export function getUnavailableDatesForCar(carId: string): Date[] {
  const bookings = getBookingsByCar(carId);
  const unavailableDates: Date[] = [];

  bookings.forEach((booking) => {
    const start = new Date(booking.pickupDate);
    const end = new Date(booking.returnDate);
    const current = new Date(start);

    while (current <= end) {
      unavailableDates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  });

  return unavailableDates;
}

export function checkDateAvailability(
  carId: string,
  startDate: Date,
  endDate: Date
): { available: boolean; conflict?: string } {
  const bookings = getBookingsByCar(carId);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  // Check minimum duration (1 day)
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return { available: false, conflict: 'min_duration' };
  }

  // Check for overlaps with existing bookings
  for (const booking of bookings) {
    if (booking.status === 'completed') continue;

    const bookingStart = new Date(booking.pickupDate);
    bookingStart.setHours(0, 0, 0, 0);
    const bookingEnd = new Date(booking.returnDate);
    bookingEnd.setHours(23, 59, 59, 999);

    // Check for overlap
    if (
      (start >= bookingStart && start <= bookingEnd) ||
      (end >= bookingStart && end <= bookingEnd) ||
      (start <= bookingStart && end >= bookingEnd)
    ) {
      return { available: false, conflict: 'overlap' };
    }
  }

  return { available: true };
}

export function addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: 'pending' | 'active' | 'completed'
): void {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

export function deleteBooking(id: string): void {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearBookings(): void {
  localStorage.removeItem(STORAGE_KEY);
}
