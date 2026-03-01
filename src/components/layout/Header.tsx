'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import AccountModal from '@/components/account/AccountModal';
import { Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/autopark', label: t.nav.carFleet },
    { href: '/requirements', label: t.nav.requirements },
    { href: '/about', label: t.nav.aboutUs },
    { href: '/contacts', label: t.nav.contacts },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D0D0D]/95 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-primary group-hover:text-purple-400 transition-colors duration-300">ZIMBREAN</div>
            <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300">RENT CAR</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary text-glow'
                      : 'text-white/90 hover:text-primary hover:scale-105'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4 text-white/60" />
              {(['ru', 'en', 'ro'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    language === lang
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg badge-glow scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/5 hover:scale-105'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Account Icon */}
            <AccountModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/90 hover:text-primary transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-4">
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-white/90 hover:text-primary hover:bg-white/5'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-2 pt-4 border-t border-white/10 px-4">
              <Languages className="h-4 w-4 text-white/60" />
              {(['ru', 'en', 'ro'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    language === lang
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg badge-glow'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Mobile Account Icon */}
            <div className="px-4 pt-2">
              <AccountModal />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
