'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Car as CarIcon, DollarSign, Heart, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useLanguage();

  const whyChooseUs = [
    {
      icon: Shield,
      title: t.about.whyChoose1Title,
      description: t.about.whyChoose1Desc,
    },
    {
      icon: CarIcon,
      title: t.about.whyChoose2Title,
      description: t.about.whyChoose2Desc,
    },
    {
      icon: DollarSign,
      title: t.about.whyChoose3Title,
      description: t.about.whyChoose3Desc,
    },
    {
      icon: Heart,
      title: t.about.whyChoose4Title,
      description: t.about.whyChoose4Desc,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t.about.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/70">
              {t.about.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Company Description */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                {t.about.descriptionTitle}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed text-center">
                {t.about.descriptionText}
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-purple-900/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              {t.about.whyChooseUs}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {t.about.missionTitle}
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {t.about.missionText}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/20 to-purple-900/20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t.about.ctaText}
              </h2>
              <Link href="/autopark">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  {t.about.ctaButton}
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
