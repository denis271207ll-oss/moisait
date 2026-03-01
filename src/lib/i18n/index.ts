import { ru } from './ru';
import { en } from './en';
import { ro } from './ro';
import { Language, Translations } from '@/types/i18n';

export const translations: Record<Language, Translations> = {
  ru,
  en,
  ro,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export const defaultLanguage: Language = 'ru';

export const supportedLanguages: Language[] = ['ru', 'en', 'ro'];
