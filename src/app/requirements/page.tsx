'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { AlertCircle, FileText, Shield, Info, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function RequirementsPage() {
  const { t } = useLanguage();

  const requirements = [
    {
      icon: AlertCircle,
      title: t.requirements.minAge,
      description: t.requirements.minAgeDesc,
    },
    {
      icon: FileText,
      title: t.requirements.documents,
      description: t.requirements.documentsDesc,
    },
    {
      icon: CreditCard,
      title: t.requirements.deposit,
      description: t.requirements.depositDesc,
    },
    {
      icon: Info,
      title: t.requirements.rules,
      description: t.requirements.rulesDesc,
    },
    {
      icon: Shield,
      title: t.requirements.insurance,
      description: t.requirements.insuranceDesc,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.requirements.title}
            </h1>
            <p className="text-lg text-white/70">{t.requirements.subtitle}</p>
          </div>
        </section>

        {/* Requirements Cards */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requirements.map((req, index) => {
                const Icon = req.icon;
                return (
                  <Card
                    key={index}
                    className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{req.title}</h3>
                      <p className="text-white/60 leading-relaxed">{req.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 to-purple-900/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t.requirements.insurance}
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    {t.requirements.insuranceDesc}
                  </p>
                  <div className="space-y-2 text-white/60">
                    <p>• Базовая страховка включена в стоимость аренды</p>
                    <p>• Дополнительная страховка (CDW) доступна по запросу</p>
                    <p>• Страхование покрывает ущерб от ДТП</p>
                    <p>• Сорнячки и утеря ключей не покрываются страховкой</p>
                  </div>
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
