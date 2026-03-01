'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import AccountModal from '@/components/account/AccountModal';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/autopark', label: t.nav.carFleet },
    { href: '/requirements', label: t.nav.requirements },
    { href: '/about', label: t.nav.aboutUs },
    { href: '/contacts', label: t.nav.contacts },
  ];

  const legalLinks = [
    { href: '/legal/privacy-policy', label: t.nav.privacyPolicy },
    { href: '/legal/terms-of-service', label: t.nav.termsOfService },
    { href: '/legal/rental-terms', label: t.nav.rentalTerms },
    { href: '/legal/cookies-policy', label: t.nav.cookiesPolicy },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="text-xl font-bold text-primary">ZIMBREAN</div>
              <div className="text-xs text-white/80">RENT CAR</div>
            </div>
            <p className="text-sm text-white/60">{t.footer.description}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">{t.footer.quickLinks}</h3>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">{t.footer.contactInfo}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/60">{t.common.emailAddress}</p>
                  <a href="mailto:info@zimbrean.md" className="text-sm text-white/90 hover:text-primary transition-colors duration-300">
                    info@zimbrean.md
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-white/60">{t.common.address}</p>
                  <p className="text-sm text-white/90">
                    ул. Митрополит Дософтей, 1<br />
                    Кишинёв, Молдова MD-2001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">{t.common.socialLinks}</h3>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white/80 hover:text-primary" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white/80 hover:text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-all duration-300 hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white/80 hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} ZIMBREAN RENT CAR. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
