// Поддержка пользователей
import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import SearchSection from '../components/support/SearchSection';
import FaqSection from '../components/support/FaqSection';
import SupportResourcesSection from '../components/support/SupportResourcesSection';

const SupportPage: React.FC = () => {
  // Поддержка пользователей
  const faqItems = [
    {
      q: 'Как создать свою первую страницу?',
      a: "Перейдите в Дашборд и нажмите кнопку 'Создать новую страницу'...",
    },
    {
      q: 'Можно ли подключить свой домен?',
      a: 'Да, на тарифе Pro и выше вы можете подключить собственный домен.',
    },
    {
      q: 'Как изменить тему оформления?',
      a: "В редакторе страницы, в панели 'Кастомизация', вы найдете опции для смены тем.",
    },
  ];

  return (
    <StandardPageLayout title="9. Support & Help Center">
      <div className="space-y-10">
        <SearchSection />

        <FaqSection items={faqItems} />

        <SupportResourcesSection />
      </div>
    </StandardPageLayout>
  );
};

export default SupportPage;

// Справочный центр со статьями и FAQ
