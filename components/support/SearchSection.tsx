import React from 'react';

interface SearchSectionProps {
  onSearch?: (value: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => (
  <section className="text-center">
    <h2 className="text-2xl font-semibold font-pragmatica mb-3">
      Чем мы можем помочь?
    </h2>
    <input
      type="search"
      placeholder="Поиск по базе знаний..."
      className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      onChange={(e) => onSearch?.(e.target.value)}
    />
  </section>
);

export default SearchSection;
