'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PriceRangeSlider from '@/components/filters/PriceRangeSlider';
import { Car, Search, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';

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

export default function FleetPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([25, 200]);
  const [showFilters, setShowFilters] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const cars = useMemo(() => {
    return [
      {
        id: '1',
        name: 'Volkswagen Passat',
        category: 'business',
        transmission: 'automatic',
        fuel: 'diesel',
        seats: 5,
        price: 50,
        image: carImages['1'],
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
        image: carImages['2'],
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
        image: carImages['3'],
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
        image: carImages['4'],
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
        image: carImages['5'],
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
        image: carImages['6'],
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
        image: carImages['7'],
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
        image: carImages['8'],
        available: true,
      },
    ].filter(car => {
      const matchesQuery = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      return matchesQuery && matchesCategory && matchesPrice && car.available;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  const categories = ['all', 'business', 'premium', 'electric'];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-glow">
              {t.fleet.title}
            </h1>
            <p className="text-lg text-white/80">{t.fleet.subtitle}</p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-[#0D0D0D] pb-8 pattern-dots">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  type="text"
                  placeholder={t.fleet.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 input-enhanced text-white placeholder:text-white/40"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full border-white/20 text-white hover:border-primary hover:bg-white/5 transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                {t.fleet.filter}
              </Button>
            </div>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:flex md:items-center md:gap-6`}>
              {/* Category Filter */}
              <div className="flex-1">
                <label className="text-sm text-white/80 mb-2 block font-medium">{t.fleet.categoryFilter}</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg badge-glow scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/5 hover:scale-105 border border-white/10'
                      }`}
                    >
                      {t.fleet[`category${cat.charAt(0).toUpperCase() + cat.slice(1)}` as keyof typeof t.fleet]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter - Desktop */}
              <div className="hidden lg:block">
                <PriceRangeSlider
                  min={25}
                  max={200}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </div>

              {/* Price Filter - Mobile Button */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowPriceModal(true)}
                  className="w-full border-white/20 text-white hover:border-primary hover:bg-white/5 transition-all duration-300"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t.fleet.priceFilter}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-8 md:py-12 section-gradient">
          <div className="container mx-auto px-4">
            {cars.length === 0 ? (
              <div className="text-center py-20">
                <Car className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <p className="text-lg text-white/60">{t.fleet.noCarsFound}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cars.map((car) => (
                  <Link key={car.id} href={`/book?car=${car.id}`}>
                    <Card className="card-enhanced overflow-hidden group cursor-pointer">
                      <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <div className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide badge-glow">
                            {car.category}
                          </div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          {car.name}
                        </h3>
                        <div className="space-y-1.5 text-sm text-white/60 mb-4">
                          <div className="flex justify-between items-center">
                            <span>{t.fleet.transmission}:</span>
                            <span className="text-white/90 font-medium">{car.transmission}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>{t.fleet.fuelType}:</span>
                            <span className="text-white/90 font-medium capitalize">{car.fuel}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>{t.fleet.seats}:</span>
                            <span className="text-white/90 font-medium">{car.seats}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">€{car.price}</p>
                            <p className="text-sm text-white/60">/{t.fleet.pricePerDay}</p>
                          </div>
                          <Button
                            size="sm"
                            className="btn-primary-gradient text-white text-sm px-4 py-2"
                          >
                            {t.fleet.bookNow}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Mobile Price Filter Modal */}
      <Dialog open={showPriceModal} onOpenChange={setShowPriceModal}>
        <DialogContent className="bg-[#121212] border-white/10 text-white w-full max-w-md p-6">
          <DialogTitle className="sr-only">{t.fleet.priceFilter}</DialogTitle>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{t.fleet.priceFilter}</h3>
            <button
              onClick={() => setShowPriceModal(false)}
              className="p-2 rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-110 text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <PriceRangeSlider
            min={25}
            max={200}
            value={priceRange}
            onChange={setPriceRange}
          />
          <Button
            onClick={() => setShowPriceModal(false)}
            className="w-full mt-4 bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-semibold"
          >
            {t.common.submit || 'Apply'}
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
