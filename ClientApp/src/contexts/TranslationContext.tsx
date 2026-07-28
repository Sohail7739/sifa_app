import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

type TranslationKey = string;
type Translations = typeof enTranslations;

interface TranslationContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: TranslationKey) => any;
  isRTL: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<'en' | 'ar'>(() => {
    // Get language from localStorage or default to 'en'
    const saved = localStorage.getItem('language') as 'en' | 'ar' | null;
    return saved || 'en';
  });

  const translations: Record<'en' | 'ar', Translations> = {
    en: enTranslations,
    ar: arTranslations,
  };

  const setLanguage = (lang: 'en' | 'ar') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Update document direction and lang when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: TranslationKey): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    // Try to traverse the nested object
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (value && typeof value === 'object') {
        // First check if the remaining path exists as a single key
        // This handles cases like "services.branding" as a single key in the form object
        const remainingPath = keys.slice(i).join('.');
        if (remainingPath && Object.prototype.hasOwnProperty.call(value, remainingPath)) {
          value = value[remainingPath];
          break;
        }
        // If not found as remaining path, try the direct key
        if (k in value) {
          value = value[k];
          // If the value is not an object and we have more keys to traverse, it's an error
          if (i < keys.length - 1 && typeof value !== 'object') {
            // Try English fallback
            let fallbackValue: any = translations.en;
            for (let j = 0; j <= i; j++) {
              if (fallbackValue && typeof fallbackValue === 'object') {
                fallbackValue = fallbackValue[keys[j]];
              } else {
                fallbackValue = null;
                break;
              }
            }
            if (fallbackValue && typeof fallbackValue === 'object') {
              const remainingPath2 = keys.slice(i + 1).join('.');
              if (remainingPath2 && Object.prototype.hasOwnProperty.call(fallbackValue, remainingPath2)) {
                const fVal = fallbackValue[remainingPath2];
                if (typeof fVal === 'string') {
                  return fVal.replace('{year}', new Date().getFullYear().toString());
                }
                return fVal;
              }
            }
            return key;
          }
        } else {
          // If still not found, try English fallback
          let fallbackValue: any = translations.en;
          let foundInFallback = true;
          for (let j = 0; j < keys.length; j++) {
            const k2 = keys[j];
            if (fallbackValue && typeof fallbackValue === 'object') {
              const remainingPath2 = keys.slice(j).join('.');
              if (remainingPath2 && Object.prototype.hasOwnProperty.call(fallbackValue, remainingPath2)) {
                fallbackValue = fallbackValue[remainingPath2];
                break;
              }
              if (k2 in fallbackValue) {
                fallbackValue = fallbackValue[k2];
              } else {
                foundInFallback = false;
                break;
              }
            } else {
              foundInFallback = false;
              break;
            }
          }
          if (foundInFallback) {
            if (typeof fallbackValue === 'string') {
              return fallbackValue.replace('{year}', new Date().getFullYear().toString());
            }
            return fallbackValue;
          }
          // If not found, return the key
          return key;
        }
      } else {
        return key;
      }
    }

    if (typeof value === 'string') {
      // Replace {year} placeholder if present
      return value.replace('{year}', new Date().getFullYear().toString());
    }

    // If we get here, return the value (could be object/array) or key if undefined
    return value !== undefined ? value : key;
  };

  const isRTL = language === 'ar';

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}


