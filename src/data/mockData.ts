import { Car, RentalRequest } from '@/types/data';

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'Volkswagen Passat',
    category: 'business',
    transmission: 'automatic',
    fuel: 'diesel',
    seats: 5,
    price: 50,
    image: '/api/placeholder/400/250?text=VW+Passat',
    available: true,
  },
  {
    id: '2',
    name: 'BMW 5 Series',
    category: 'premium',
    transmission: 'automatic',
    fuel: 'petrol',
    seats: 5,
    price: 120,
    image: '/api/placeholder/400/250?text=BMW+5+Series',
    available: true,
  },
  {
    id: '3',
    name: 'Tesla Model 3',
    category: 'electric',
    transmission: 'automatic',
    fuel: 'electric',
    seats: 5,
    price: 90,
    image: '/api/placeholder/400/250?text=Tesla+Model+3',
    available: true,
  },
  {
    id: '4',
    name: 'Mercedes E-Class',
    category: 'premium',
    transmission: 'automatic',
    fuel: 'diesel',
    seats: 5,
    price: 130,
    image: '/api/placeholder/400/250?text=Mercedes+E-Class',
    available: true,
  },
  {
    id: '5',
    name: 'Audi A4',
    category: 'business',
    transmission: 'automatic',
    fuel: 'petrol',
    seats: 5,
    price: 70,
    image: '/api/placeholder/400/250?text=Audi+A4',
    available: true,
  },
  {
    id: '6',
    name: 'Toyota Camry',
    category: 'business',
    transmission: 'automatic',
    fuel: 'hybrid',
    seats: 5,
    price: 55,
    image: '/api/placeholder/400/250?text=Toyota+Camry',
    available: true,
  },
  {
    id: '7',
    name: 'Porsche Taycan',
    category: 'electric',
    transmission: 'automatic',
    fuel: 'electric',
    seats: 4,
    price: 200,
    image: '/api/placeholder/400/250?text=Porsche+Taycan',
    available: true,
  },
  {
    id: '8',
    name: 'Skoda Octavia',
    category: 'business',
    transmission: 'manual',
    fuel: 'petrol',
    seats: 5,
    price: 45,
    image: '/api/placeholder/400/250?text=Skoda+Octavia',
    available: true,
  },
];

export const mockRentalRequests: RentalRequest[] = [];

// Simulate in-memory storage
let cars = [...mockCars];
let requests = [...mockRentalRequests];

export function getCars(): Car[] {
  return cars;
}

export function getCarById(id: string): Car | undefined {
  return cars.find(car => car.id === id);
}

export function getRentalRequests(): RentalRequest[] {
  return requests;
}

export function addRentalRequest(request: RentalRequest): void {
  requests.push(request);
}

export function updateRequestStatus(id: string, status: 'new' | 'confirmed' | 'completed'): void {
  const index = requests.findIndex(req => req.id === id);
  if (index !== -1) {
    requests[index].status = status;
  }
}

export function addCar(car: Omit<Car, 'id'>): Car {
  const newCar: Car = {
    ...car,
    id: Date.now().toString(),
  };
  cars.push(newCar);
  return newCar;
}

export function updateCar(id: string, carData: Partial<Car>): void {
  const index = cars.findIndex(car => car.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...carData };
  }
}

export function deleteCar(id: string): void {
  cars = cars.filter(car => car.id !== id);
}

export function searchCars(query: string, category: string, minPrice: number, maxPrice: number): Car[] {
  return cars.filter(car => {
    const matchesQuery = car.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || car.category === category;
    const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
    return matchesQuery && matchesCategory && matchesPrice && car.available;
  });
}
