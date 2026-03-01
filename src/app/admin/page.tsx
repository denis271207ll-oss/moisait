'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LayoutDashboard, Car as CarIcon, ClipboardList, LogOut, Plus, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface Car {
  id: string;
  name: string;
  category: string;
  transmission: string;
  fuel: string;
  seats: number;
  price: number;
  image: string;
  available: boolean;
}

interface Request {
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

export default function AdminDashboard() {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'requests' | 'cars'>('requests');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Car form state
  const [carForm, setCarForm] = useState({
    name: '',
    category: 'business',
    transmission: 'automatic',
    fuel: 'petrol',
    seats: 5,
    price: 50,
    available: true,
  });

  useEffect(() => {
    // Check authentication
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      loadMockData();
    }
  }, [router]);

  const loadMockData = () => {
    setCars([
      {
        id: '1',
        name: 'Volkswagen Passat',
        category: 'business',
        transmission: 'automatic',
        fuel: 'diesel',
        seats: 5,
        price: 50,
        image: '/api/placeholder/400/250',
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
        image: '/api/placeholder/400/250',
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
        image: '/api/placeholder/400/250',
        available: true,
      },
    ]);

    setRequests([
      {
        id: '1',
        carId: '1',
        carName: 'Volkswagen Passat',
        customerName: 'Ivan Petrov',
        email: 'ivan@example.com',
        phone: '+373 69 123 456',
        pickupDate: '2025-02-01',
        returnDate: '2025-02-05',
        pickupOffice: 'office1',
        totalDays: 4,
        totalPrice: 200,
        status: 'new',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        carId: '2',
        carName: 'BMW 5 Series',
        customerName: 'Maria Popescu',
        email: 'maria@example.com',
        phone: '+373 78 987 654',
        pickupDate: '2025-02-10',
        returnDate: '2025-02-15',
        pickupOffice: 'office2',
        totalDays: 5,
        totalPrice: 600,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin/login');
  };

  const handleUpdateStatus = (requestId: string, newStatus: 'new' | 'confirmed' | 'completed') => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
    toast({
      title: t.admin.changeStatus,
      description: '',
    });
  };

  const handleDeleteCar = (carId: string) => {
    if (confirm(t.admin.confirmDelete)) {
      setCars(cars.filter(car => car.id !== carId));
      toast({
        title: t.admin.deleteCar,
        description: '',
      });
    }
  };

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setCarForm({
      name: car.name,
      category: car.category,
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      price: car.price,
      available: car.available,
    });
    setIsDialogOpen(true);
  };

  const handleSaveCar = () => {
    if (editingCar) {
      setCars(cars.map(car =>
        car.id === editingCar.id
          ? { ...car, ...carForm }
          : car
      ));
    } else {
      const newCar: Car = {
        id: Date.now().toString(),
        ...carForm,
        image: '/api/placeholder/400/250',
      };
      setCars([...cars, newCar]);
    }
    setIsDialogOpen(false);
    setEditingCar(null);
    setCarForm({
      name: '',
      category: 'business',
      transmission: 'automatic',
      fuel: 'petrol',
      seats: 5,
      price: 50,
      available: true,
    });
    toast({
      title: t.admin.saveCar,
      description: '',
    });
  };

  const filteredRequests = requests.filter(req =>
    req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold text-primary">ZIMBREAN</div>
              <div className="h-6 w-px bg-white/10" />
              <nav className="flex space-x-2">
                <Button
                  variant={activeTab === 'requests' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('requests')}
                  className={`${
                    activeTab === 'requests'
                      ? 'bg-primary text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  {t.admin.requests}
                </Button>
                <Button
                  variant={activeTab === 'cars' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('cars')}
                  className={`${
                    activeTab === 'cars'
                      ? 'bg-primary text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CarIcon className="h-4 w-4 mr-2" />
                  {t.admin.cars}
                </Button>
              </nav>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              <LogOut className="h-4 w-4 mr-2" />
              {t.nav.logout}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'requests' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{t.admin.statusNew}</p>
                      <p className="text-3xl font-bold text-white">
                        {requests.filter(r => r.status === 'new').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <ClipboardList className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{t.admin.statusConfirmed}</p>
                      <p className="text-3xl font-bold text-white">
                        {requests.filter(r => r.status === 'confirmed').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <ClipboardList className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{t.admin.statusCompleted}</p>
                      <p className="text-3xl font-bold text-white">
                        {requests.filter(r => r.status === 'completed').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <ClipboardList className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                />
              </div>
            </div>

            {/* Requests Table */}
            <Card className="bg-[#121212] border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white">{t.admin.customerName}</TableHead>
                      <TableHead className="text-white">{t.admin.customerEmail}</TableHead>
                      <TableHead className="text-white">{t.admin.carName}</TableHead>
                      <TableHead className="text-white">{t.admin.rentalPeriod}</TableHead>
                      <TableHead className="text-white">{t.admin.totalAmount}</TableHead>
                      <TableHead className="text-white">{t.admin.requestStatus}</TableHead>
                      <TableHead className="text-white">{t.admin.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="text-white">{request.customerName}</TableCell>
                        <TableCell className="text-white">{request.email}</TableCell>
                        <TableCell className="text-white">{request.carName}</TableCell>
                        <TableCell className="text-white">
                          {request.pickupDate} - {request.returnDate}
                        </TableCell>
                        <TableCell className="text-white">€{request.totalPrice}</TableCell>
                        <TableCell>
                          <Select
                            value={request.status}
                            onValueChange={(value: 'new' | 'confirmed' | 'completed') =>
                              handleUpdateStatus(request.id, value)
                            }
                          >
                            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1A1A1A] border-white/10">
                              <SelectItem value="new">{t.admin.statusNew}</SelectItem>
                              <SelectItem value="confirmed">{t.admin.statusConfirmed}</SelectItem>
                              <SelectItem value="completed">{t.admin.statusCompleted}</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Add Car Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{t.admin.cars}</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingCar(null);
                      setCarForm({
                        name: '',
                        category: 'business',
                        transmission: 'automatic',
                        fuel: 'petrol',
                        seats: 5,
                        price: 50,
                        available: true,
                      });
                    }}
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t.admin.addCar}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121212] border-white/10 text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingCar ? t.admin.editCar : t.admin.addCar}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">{t.admin.carName}</Label>
                      <Input
                        value={carForm.name}
                        onChange={(e) => setCarForm({ ...carForm, name: e.target.value })}
                        className="mt-2 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">{t.admin.carCategory}</Label>
                      <Select
                        value={carForm.category}
                        onValueChange={(value) => setCarForm({ ...carForm, category: value })}
                      >
                        <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-white/10">
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="electric">Electric</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white">{t.admin.carPrice}</Label>
                      <Input
                        type="number"
                        value={carForm.price}
                        onChange={(e) => setCarForm({ ...carForm, price: Number(e.target.value) })}
                        className="mt-2 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">{t.admin.carTransmission}</Label>
                        <Select
                          value={carForm.transmission}
                          onValueChange={(value) => setCarForm({ ...carForm, transmission: value })}
                        >
                          <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1A] border-white/10">
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white">{t.admin.carFuel}</Label>
                        <Select
                          value={carForm.fuel}
                          onValueChange={(value) => setCarForm({ ...carForm, fuel: value })}
                        >
                          <SelectTrigger className="mt-2 bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1A1A] border-white/10">
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-white">{t.admin.carSeats}</Label>
                      <Input
                        type="number"
                        value={carForm.seats}
                        onChange={(e) => setCarForm({ ...carForm, seats: Number(e.target.value) })}
                        className="mt-2 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <Button
                      onClick={handleSaveCar}
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white"
                    >
                      {t.admin.saveCar}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                />
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className="bg-[#121212] border-white/10">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-lg mb-4 flex items-center justify-center">
                      <CarIcon className="h-12 w-12 text-white/20" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{car.name}</h3>
                    <div className="space-y-1 text-sm text-white/60 mb-4">
                      <div className="flex justify-between">
                        <span>{t.admin.carCategory}:</span>
                        <span className="text-white/90">{car.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.admin.carPrice}:</span>
                        <span className="text-white/90">€{car.price}/day</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.admin.carStatus}:</span>
                        <span className={car.available ? 'text-green-500' : 'text-red-500'}>
                          {car.available ? t.admin.statusAvailable : t.admin.statusUnavailable}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/10 text-white hover:bg-white/5"
                        onClick={() => handleEditCar(car)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {t.admin.editCar}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeleteCar(car.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
