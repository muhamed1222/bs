import React from 'react';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ items }) => (
  <section>
    <h3 className="text-xl font-semibold font-pragmatica mb-4">
      FAQ (Часто задаваемые вопросы)
    </h3>
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 group"
        >
          <summary className="font-medium text-gray-800 cursor-pointer list-none flex justify-between items-center">
            {item.q}
            <span className="text-indigo-500 group-open:rotate-180 transition-transform duration-200">
              &#9660;
            </span>
          </summary>
          <p className="text-gray-600 mt-2 text-sm">{item.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default FaqSection;
