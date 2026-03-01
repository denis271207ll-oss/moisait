'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <Card className="bg-[#121212] border-white/10 text-center">
              <CardContent className="p-12">
                {/* Success Icon */}
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-4">
                  {t.success.title}
                </h1>

                {/* Message */}
                <p className="text-lg text-white/70 mb-8">
                  {t.success.message}
                </p>

                {/* Back Button */}
                <Link href="/autopark">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    {t.success.backToFleet}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
