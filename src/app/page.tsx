'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getCars } from '@/data/mockData';
import { Car as CarIcon, Check, ArrowRight, Shield, DollarSign, Headphones } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

export default function HomePage() {
  const { t } = useLanguage();
  const popularCars = getCars().slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section with Background */}
        <section className="relative overflow-hidden hero-gradient py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/hero-bg.png')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/90 to-transparent" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight text-glow">
                {t.home.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                {t.home.heroSubtitle}
              </p>
              <Link href="/autopark">
                <Button
                  size="lg"
                  className="btn-primary-gradient text-white font-semibold px-8 py-6 text-lg"
                >
                  {t.home.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 pattern-dots">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              {t.home.benefitsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t.home.benefit1Title}</h3>
                  <p className="text-white/70 leading-relaxed">{t.home.benefit1Desc}</p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t.home.benefit2Title}</h3>
                  <p className="text-white/70 leading-relaxed">{t.home.benefit2Desc}</p>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="card-enhanced group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Headphones className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{t.home.benefit3Title}</h3>
                  <p className="text-white/70 leading-relaxed">{t.home.benefit3Desc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Cars Section */}
        <section className="py-16 md:py-24 section-gradient">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              {t.home.popularCarsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCars.map((car) => (
                <Link key={car.id} href={`/book?car=${car.id}`}>
                  <Card className="card-enhanced overflow-hidden group cursor-pointer">
                    <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden">
                      <img
                        src={carImages[car.id] || '/images/cars/sedan.png'}
                        alt={car.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold badge-glow">
                          {car.category}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{car.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">€{car.price}</p>
                          <p className="text-sm text-white/60">/{t.fleet.pricePerDay}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 section-highlight relative overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-glow">
                {t.home.ctaSectionTitle}
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {t.home.ctaSectionDesc}
              </p>
              <Link href="/autopark">
                <Button
                  size="lg"
                  className="btn-primary-gradient text-white font-semibold px-8 py-6 text-lg"
                >
                  {t.home.ctaButton2}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
