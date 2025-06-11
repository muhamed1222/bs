import React from 'react';
import { useI18n } from '../contexts/I18nContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useI18n();
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value as 'ru' | 'en')}
      className="text-sm border rounded p-1"
    >
      <option value="ru">Русский</option>
      <option value="en">English</option>
    </select>
  );
};
