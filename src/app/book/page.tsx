'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getUnavailableDatesForCar, checkDateAvailability, addBooking, Booking } from '@/lib/bookingStorage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DateRangeCalendar from '@/components/calendar/DateRangeCalendar';
import { MapPin, User, Mail, Phone, Car as CarIcon, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
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
import { toast } from '@/hooks/use-toast';

const carImages: Record<string, string> = {
  '1': '/images/cars/sedan.png',
  '2': '/images/cars/luxury.png',
  '3': '/images/cars/electric.png',
  '4': '/images/cars/luxury.png',
  '5': '/images/cars/sedan.png',
  '6': '/images/cars/sedan.png',
  '7': '/images/cars/electric.png',
  '8': '/images/cars/sedan.png',
};

const cars: Record<string, any> = {
  '1': { id: '1', name: 'Volkswagen Passat', category: 'business', transmission: 'automatic', fuel: 'diesel', seats: 5, price: 50 },
  '2': { id: '2', name: 'BMW 5 Series', category: 'premium', transmission: 'automatic', fuel: 'petrol', seats: 5, price: 120 },
  '3': { id: '3', name: 'Tesla Model 3', category: 'electric', transmission: 'automatic', fuel: 'electric', seats: 5, price: 90 },
  '4': { id: '4', name: 'Mercedes E-Class', category: 'premium', transmission: 'automatic', fuel: 'diesel', seats: 5, price: 130 },
  '5': { id: '5', name: 'Audi A4', category: 'business', transmission: 'automatic', fuel: 'petrol', seats: 5, price: 70 },
  '6': { id: '6', name: 'Toyota Camry', category: 'business', transmission: 'automatic', fuel: 'hybrid', seats: 5, price: 55 },
  '7': { id: '7', name: 'Porsche Taycan', category: 'electric', transmission: 'automatic', fuel: 'electric', seats: 4, price: 200 },
  '8': { id: '8', name: 'Skoda Octavia', category: 'business', transmission: 'manual', fuel: 'petrol', seats: 5, price: 45 },
};

function BookingContent() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const carId = searchParams.get('car');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [pickupOffice, setPickupOffice] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [availabilityError, setAvailabilityError] = useState('');

  const car = carId ? {
    ...cars[carId],
    image: carImages[carId] || '/images/cars/sedan.png',
  } : null;

  const unavailableDates = carId ? getUnavailableDatesForCar(carId) : [];

  useEffect(() => {
    if (startDate && endDate && car) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setTotalDays(diffDays);
        setTotalPrice(diffDays * car.price);

        // Check for availability conflicts
        const check = checkDateAvailability(carId, startDate, endDate);
        if (!check.available) {
          if (check.conflict === 'overlap') {
            setAvailabilityError(t.calendar.overlapError);
          } else if (check.conflict === 'min_duration') {
            setAvailabilityError(t.calendar.minStay);
          }
        } else {
          setAvailabilityError('');
        }
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, carId, t]);

  const validateForm = () => {
    if (!startDate || !endDate || !pickupOffice || !fullName.trim() || !email.trim() || !phone.trim()) {
      return false;
    }
    if (availabilityError) {
      return false;
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: t.common.error,
        description: t.booking.validationError,
        variant: 'destructive',
      });
      return;
    }

    if (!car || !startDate || !endDate) return;

    // Add booking
    const newBooking: Omit<Booking, 'id' | 'createdAt'> = {
      carId: car.id,
      carName: car.name,
      customerName: fullName,
      email: email,
      phone: phone,
      pickupDate: startDate.toISOString().split('T')[0],
      returnDate: endDate.toISOString().split('T')[0],
      pickupOffice: pickupOffice,
      totalDays: totalDays,
      totalPrice: totalPrice,
      status: 'pending',
    };

    addBooking(newBooking);

    toast({
      title: t.success.title,
      description: t.success.message,
    });

    // Redirect to success page after a short delay
    setTimeout(() => {
      window.location.href = '/success';
    }, 1000);
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setAvailabilityError('');
  };

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <CarIcon className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-lg text-white/60">{t.fleet.noCarsFound}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-glow">
              {t.booking.title}
            </h1>
            <p className="text-lg text-white/80">{t.booking.subtitle}</p>
          </div>
        </section>

        {/* Booking Content */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Selected Car */}
              <Card className="card-enhanced">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">{t.fleet.bookNow}</h2>
                  <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                  <p className="text-white/60 mb-4">{t.fleet[`category${car.category.charAt(0).toUpperCase() + car.category.slice(1)}` as keyof typeof t.fleet]}</p>
                  <div className="space-y-2 text-sm text-white/60 mb-4">
                    <div className="flex justify-between">
                      <span>{t.fleet.transmission}:</span>
                      <span className="text-white/90 font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.fleet.fuelType}:</span>
                      <span className="text-white/90 font-medium capitalize">{car.fuel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.fleet.seats}:</span>
                      <span className="text-white/90 font-medium">{car.seats}</span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    €{car.price}
                    <span className="text-sm font-normal text-white/60">/{t.fleet.pricePerDay}</span>
                  </p>
                </CardContent>
              </Card>

              {/* Booking Form */}
              <Card className="card-enhanced">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Calendar */}
                    <div>
                      <Label className="text-white font-semibold mb-3 flex items-center">
                        <CalendarIcon className="inline h-4 w-4 mr-2" />
                        {t.calendar.selectDates}
                      </Label>
                      <DateRangeCalendar
                        onDateRangeChange={handleDateRangeChange}
                        unavailableDates={unavailableDates}
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                      />
                    </div>

                    {/* Availability Error */}
                    {availabilityError && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 mb-4">
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-500">{availabilityError}</p>
                      </div>
                    )}

                    {/* Pickup Office */}
                    <div>
                      <Label htmlFor="pickupOffice" className="text-white">
                        <MapPin className="inline h-4 w-4 mr-2" />
                        {t.booking.pickupOffice} *
                      </Label>
                      <Select value={pickupOffice} onValueChange={setPickupOffice}>
                        <SelectTrigger className="input-enhanced text-white">
                          <SelectValue placeholder={t.booking.pickupOffice} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1A] border-white/10">
                          <SelectItem value="office1">{t.booking.pickupOffice1}</SelectItem>
                          <SelectItem value="office2">{t.booking.pickupOffice2}</SelectItem>
                          <SelectItem value="office3">{t.booking.pickupOffice3}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-white">
                          <User className="inline h-4 w-4 mr-2" />
                          {t.booking.fullName} *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="mt-2 input-enhanced text-white placeholder:text-white/40"
                          placeholder={t.booking.fullName}
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">
                          <Mail className="inline h-4 w-4 mr-2" />
                          {t.booking.email} *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-2 input-enhanced text-white placeholder:text-white/40"
                          placeholder={t.booking.email}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-white">
                          <Phone className="inline h-4 w-4 mr-2" />
                          {t.booking.phone} *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-2 input-enhanced text-white placeholder:text-white/40"
                          placeholder="+373 XX XXX XXX"
                        />
                      </div>
                    </div>

                    {/* Total */}
                    {totalDays > 0 && (
                      <div className="border-t border-white/10 pt-4 space-y-2">
                        <div className="flex justify-between text-white/60">
                          <span>{t.booking.rentalDays}:</span>
                          <span className="text-white font-medium">{totalDays} {t.calendar.nights}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-white">
                          <span>{t.booking.totalPrice}:</span>
                          <span className="text-primary">€{totalPrice}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full btn-primary-gradient text-white font-semibold py-6"
                      disabled={!!availabilityError}
                    >
                      {t.booking.submitButton}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
