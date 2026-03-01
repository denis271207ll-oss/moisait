'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from '@/types/i18n';
import { getTranslations, defaultLanguage, supportedLanguages } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && supportedLanguages.includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    if (supportedLanguages.includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = getTranslations(language);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default values if context is not available (SSR or hydration)
    return {
      language: defaultLanguage,
      setLanguage: () => {},
      t: getTranslations(defaultLanguage),
    };
  }
  return context;
}
