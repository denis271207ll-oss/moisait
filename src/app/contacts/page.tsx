'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Mail, MapPin, Send, Facebook, Instagram, Linkedin, CheckCircle, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function ContactsPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t.contacts.formSuccess,
        description: '',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.contacts.title}
            </h1>
            <p className="text-lg text-white/70">{t.contacts.subtitle}</p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                {/* Phone */}
                <Card className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{t.contacts.phone}</h3>
                        <a
                          href="tel:+37369123456"
                          className="text-primary hover:text-primary/80 transition-colors duration-300 text-lg font-semibold"
                        >
                          +373 69 123 456
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{t.contacts.email}</h3>
                        <a
                          href="mailto:info@zimbrean.md"
                          className="text-primary hover:text-primary/80 transition-colors duration-300"
                        >
                          info@zimbrean.md
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{t.contacts.address}</h3>
                        <p className="text-white/60">
                          ул. Митрополит Дософтей, 1<br />
                          Кишинёв, Молдова MD-2001
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="bg-[#121212] border-white/10 hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">{t.common.socialLinks}</h3>
                    <div className="flex space-x-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5 text-white/80 hover:text-primary" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5 text-white/80 hover:text-primary" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-white/80 hover:text-primary" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Interactive Map */}
                <Card className="bg-[#121212] border-white/10 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video relative">
                      <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=28.8200%2C47.0000%2C28.8600%2C47.0100&amp;layer=mapnik&amp;marker=47.0050%2C28.8400"
                        className="absolute inset-0 w-full h-full border-0"
                        title="Company Location - Chișinău, Moldova"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-[#121212]/20" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="bg-[#121212] border-white/10">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-white">
                        {t.contacts.formName} *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                        placeholder={t.contacts.formName}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white">
                        {t.contacts.formEmail} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
                        placeholder={t.contacts.formEmail}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        {t.contacts.formMessage} *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary min-h-[150px]"
                        placeholder={t.contacts.formMessage}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary text-white font-semibold py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          {t.common.loading}
                        </>
                      ) : (
                        <>
                          {t.contacts.formButton}
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
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
