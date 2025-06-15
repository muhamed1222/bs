import React, { createContext, useContext, useState } from 'react';

const translations = {
  ru: {
    noBlocks: 'Нет блоков',
    addBlock: 'Добавь блок для начала работы',
  },
  en: {
    noBlocks: 'No blocks',
    addBlock: 'Add a block to start',
  },
};

interface I18nContextValue {
  lang: keyof typeof translations;
  setLang: (lang: keyof typeof translations) => void;
  t: (key: keyof typeof translations['ru']) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<keyof typeof translations>('ru');
  const t = (key: keyof typeof translations['ru']) => translations[lang][key] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
