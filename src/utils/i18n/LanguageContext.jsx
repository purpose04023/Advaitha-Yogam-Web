import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const detectLanguage = () => {
      // 1. Check localStorage first
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && translations[savedLang]) {
        return savedLang;
      }

      // 2. Detect browser language - prioritize if it's a supported Indian language (non-English)
      const browserLang = navigator.language.split('-')[0];
      if (browserLang !== 'en' && translations[browserLang]) {
        return browserLang;
      }

      // 3. Region-based detection via Timezone
      // If user is in India (Asia/Kolkata), default to Telugu as per requirements
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone === 'Asia/Kolkata' || timezone.includes('Calcutta')) {
          return 'te';
        }
      } catch (e) {
        console.warn('Region detection failed');
      }

      // 4. Fallback to English if specifically set in browser
      if (browserLang === 'en') {
        return 'en';
      }

      // Default to English
      return 'en';
    };

    setLanguage(detectLanguage());
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
