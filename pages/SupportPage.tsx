// Поддержка пользователей
import React, { useState } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';

const SupportPage: React.FC = () => {
  // Поддержка пользователей
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqItems = [
    {
      q: 'Как создать свою первую страницу?',
      a: "Перейдите в Дашборд и нажмите кнопку 'Создать новую страницу'. Выберите шаблон или начните с пустой страницы. Используйте drag-and-drop для добавления блоков контента.",
    },
    {
      q: 'Можно ли подключить свой домен?',
      a: 'Да, на тарифе Pro и выше вы можете подключить собственный домен. Перейдите в настройки проекта и добавьте ваш домен в разделе "Кастомный домен".',
    },
    {
      q: 'Как изменить тему оформления?',
      a: "В редакторе страницы, в панели 'Кастомизация', вы найдете опции для смены тем, цветов и шрифтов. Все изменения применяются в реальном времени.",
    },
    {
      q: 'Как экспортировать мою страницу?',
      a: 'В настройках проекта есть раздел "Экспорт", где вы можете скачать HTML-код страницы или получить ссылку для встраивания.',
    },
    {
      q: 'Есть ли мобильная версия редактора?',
      a: 'Редактор оптимизирован для работы на планшетах и мобильных устройствах. Все основные функции доступны в мобильной версии.',
    },
  ];

  const filteredFaq = faqItems.filter(item => 
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StandardPageLayout title="Центр поддержки">
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Чем мы можем помочь?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Найдите ответы на ваши вопросы или свяжитесь с нашей командой поддержки
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <input
                type="search"
                placeholder="Поиск по базе знаний..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 pr-6 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">Live-чат</h3>
            <p className="text-gray-600 mb-4">Получите мгновенную помощь от нашей команды поддержки</p>
            <button className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
              Начать чат
            </button>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">Email поддержка</h3>
            <p className="text-gray-600 mb-4">Создайте тикет и получите детальный ответ в течение 24 часов</p>
            <button className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors">
              Создать тикет
            </button>
          </div>
          
          <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0A7.5 7.5 0 0019.5 12H4.5A7.5 7.5 0 0012 17.747z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 transition-colors">База знаний</h3>
            <p className="text-gray-600 mb-4">Изучите подробные руководства и документацию</p>
            <Link 
              to="/docs" 
              className="block w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors text-center"
            >
              Открыть документацию
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-gray-600 text-lg">
              Ответы на самые популярные вопросы наших пользователей
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFaq.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-bold text-gray-900 text-lg pr-4">{item.q}</h3>
                  <div className={`flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === index ? 'rotate-180 bg-blue-600' : ''}`}>
                    <svg className={`w-4 h-4 transition-colors ${openFaq === index ? 'text-white' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredFaq.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
              <p className="text-gray-600">Попробуйте изменить поисковый запрос или свяжитесь с поддержкой</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link
              to="/support/all-faq"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Посмотреть все FAQ
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-gray-50 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Полезные ресурсы
            </h2>
            <p className="text-gray-600 text-lg">
              Дополнительные материалы для изучения платформы
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/docs/user-guide"
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m0 0A7.5 7.5 0 0019.5 12H4.5A7.5 7.5 0 0012 17.747z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Руководство пользователя
              </h3>
              <p className="text-gray-600 text-sm">Пошаговые инструкции по работе с платформой</p>
            </Link>
            
            <Link
              to="/docs/api"
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Документация API
              </h3>
              <p className="text-gray-600 text-sm">Техническая документация для разработчиков</p>
            </Link>
            
            <Link
              to="/docs/tutorials"
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Видеоуроки
              </h3>
              <p className="text-gray-600 text-sm">Обучающие видео от экспертов</p>
            </Link>
            
            <Link
              to="/docs/block-types"
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                Типы блоков
              </h3>
              <p className="text-gray-600 text-sm">Описание всех доступных блоков контента</p>
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-gray-600 mb-6">
              Наша команда поддержки всегда готова помочь вам
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@basis.dev"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Написать в поддержку
              </a>
              <a
                href="tel:+74950000000"
                className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 495 000 00 00
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Время работы поддержки: Пн-Пт 9:00-18:00 (МСК)
            </p>
          </div>
        </section>
      </div>
    </StandardPageLayout>
  );
};

export default SupportPage;

// Справочный центр со статьями и FAQ