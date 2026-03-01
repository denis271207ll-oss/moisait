export interface Car {
  id: string;
  name: string;
  category: 'business' | 'premium' | 'electric';
  transmission: 'automatic' | 'manual';
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  price: number;
  image: string;
  available: boolean;
}

export interface RentalRequest {
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
  status: 'new' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
