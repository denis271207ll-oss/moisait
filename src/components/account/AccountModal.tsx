'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { X, LogOut, Calendar, User, Car } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBookingsByPhone, Booking } from '@/lib/bookingStorage';

export default function AccountModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // Check login state from localStorage
  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const phone = localStorage.getItem('userPhone');
    setIsLoggedIn(loggedIn);
    setUserPhone(phone || '');

    if (loggedIn && phone) {
      const bookings = getBookingsByPhone(phone);
      setUserBookings(bookings);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - accept any valid phone format
    setTimeout(() => {
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userPhone', userPhone);
      setIsLoggedIn(true);

      const bookings = getBookingsByPhone(userPhone);
      setUserBookings(bookings);

      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userPhone');
    setIsLoggedIn(false);
    setUserPhone('');
    setPassword('');
    setUserBookings([]);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Listen for ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      case 'active':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-white/10 text-white/60 border-white/10';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t.account.statusPending;
      case 'active':
        return t.account.statusActive;
      case 'completed':
        return t.account.statusCompleted;
      default:
        return status;
    }
  };

  const getCarImage = (carId: string) => {
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
    return carImages[carId] || '/images/cars/sedan.png';
  };

  return (
    <>
      {/* Account Button (visible in header) */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-105 text-white/70 hover:text-[#8A3FFC]"
        aria-label={t.account.myAccount}
      >
        <User className="h-5 w-5" />
      </button>

      {/* Account Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#121212] border-white/10 text-white max-w-2xl" showCloseButton={false}>
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-2xl font-bold text-white">
              {isLoggedIn ? t.account.myRentals : t.account.loginTitle}
            </DialogTitle>
            <button
              onClick={closeModal}
              className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-110 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isLoggedIn ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-white">
                  {t.account.phone} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="mt-2 input-enhanced text-white placeholder:text-white/40"
                  placeholder="+373 XX XXX XXX"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  {t.account.password} *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 input-enhanced text-white placeholder:text-white/40"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !userPhone.trim()}
                className="w-full btn-primary-gradient text-white font-semibold py-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2">⟳</div>
                    {t.common.loading}
                  </>
                ) : (
                  t.account.loginButton
                )}
              </Button>
            </form>
          ) : (
            /* User Dashboard */
            <div className="space-y-4">
              {/* User Info */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/60">{t.account.phone}:</p>
                <p className="text-lg font-semibold text-white">{userPhone}</p>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/5 hover:border-primary hover:text-primary transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.account.logout}
              </Button>

              {/* Rentals */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white mb-4">{t.account.myRentals}</h3>

                {userBookings.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-lg bg-white/5 border border-white/10">
                    <Car className="h-12 w-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/60">{t.account.noRentals}</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {userBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/10">
                            <img
                              src={getCarImage(booking.carId)}
                              alt={booking.carName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white mb-1">{booking.carName}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                {getStatusLabel(booking.status)}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                {booking.totalDays} {t.calendar.nights}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center gap-2 text-white/60">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="text-white/80 font-semibold">
                                €{booking.totalPrice}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
