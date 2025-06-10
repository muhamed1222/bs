import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StandardPageLayout from "../layouts/StandardPageLayout";
import { Skeleton } from "../components/Skeleton";
import {
  fetchCases,
  fetchStats,
  fetchReviews,
  type HomeCase,
  type HomeStats,
  type HomeReview,
} from "../mock/home";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<HomeCase[]>([]);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [reviews, setReviews] = useState<HomeReview[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCases().catch(() => []),
      fetchStats().catch(() => null),
      fetchReviews().catch(() => []),
    ]).then(([cases, stats, reviews]) => {
      setCases(cases);
      setStats(stats);
      setReviews(reviews);
      setLoading(false);
    });
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => setEmail(""), 200);
  };

  return (
    <StandardPageLayout title="Basis — твоя цифровая визитка нового поколения">
      <main className="space-y-20">
        {/* Hero Section */}
        <section className="py-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 rounded-3xl"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Новая эра цифровых портфолио
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight animate-fade-in-up">
              Basis — твой умный бенто‑конструктор для цифровых страниц
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up text-balance">
              Создай портфолио или мульти‑линк быстрее, чем за 2 минуты.<br />
              Никакой рутины, всё — drag&drop. Покажи миру себя по‑новому.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up">
              <Link
                to="/auth?action=signup"
                className="btn-primary text-lg px-8 py-4"
              >
                Попробовать бесплатно
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/auth?action=login"
                className="btn-secondary text-lg px-8 py-4"
              >
                Войти в аккаунт
              </Link>
            </div>

            {!subscribed && (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto animate-fade-in-up"
                aria-label="Форма подписки на обновления"
              >
                <input
                  type="email"
                  placeholder="Введите свой email"
                  className="form-input flex-1 min-w-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 whitespace-nowrap"
                >
                  Получить гайд
                </button>
              </form>
            )}
            
            {subscribed && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-semibold animate-fade-in-up">
                ✅ Спасибо! Ссылка на гайд отправлена на почту.
              </div>
            )}

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up">
              {stats ? (
                <>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stats.users}+</div>
                    <div className="text-sm text-gray-600">Пользователей</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stats.pages}+</div>
                    <div className="text-sm text-gray-600">Страниц создано</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stats.integrations}</div>
                    <div className="text-sm text-gray-600">Интеграций</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4.9/5</div>
                    <div className="text-sm text-gray-600">Оценка пользователей</div>
                  </div>
                </>
              ) : (
                <div className="col-span-4">
                  <Skeleton className="h-16 w-full rounded-xl" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Как работает Basis?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Три простых шага до вашей идеальной цифровой страницы
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Создай страницу",
                description: "Выбери шаблон или начни с нуля — drag&drop любой блок",
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2", 
                title: "Кастомизируй",
                description: "Меняй цвета, шрифты, интегрируй соцсети и сервисы без кода",
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "Публикуй за секунду", 
                description: "Поделись ссылкой или подключи собственный домен",
                color: "from-green-500 to-green-600"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Демонстрация редактора Basis"
                frameBorder={0}
                className="rounded-2xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Примеры страниц пользователей</h2>
            <p className="text-xl text-gray-600">Вдохновляйтесь работами нашего сообщества</p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-xl">Нет кейсов — стань первым!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {cases.slice(0, 3).map((c, index) => (
                <div key={c.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={c.preview}
                      alt={`Превью страницы ${c.title}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{c.desc}</p>
                    <Link 
                      to={`/profile/${c.username}`} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Посмотреть
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {cases.length > 3 && (
            <div className="text-center mt-12">
              <Link to="/cases" className="btn-primary">
                Больше примеров
              </Link>
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Отзывы пользователей</h2>
            <p className="text-xl text-gray-600">Что говорят о нас наши пользователи</p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <p className="text-xl">Пока нет отзывов.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full mr-4 ring-2 ring-gray-100" />
                    <div>
                      <div className="font-semibold text-gray-900">{r.name}</div>
                      <div className="text-sm text-gray-600">{r.job}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed italic">"{r.text}"</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-lg ${i < r.stars ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10 text-center text-white px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Присоединяйся — стань автором своей страницы</h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Более 1000 пользователей уже создали свои уникальные страницы. Твоя очередь!
            </p>
            <Link
              to="/auth?action=signup"
              className="inline-flex items-center px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Начать бесплатно
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-16 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 mb-12">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">О компании</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">О Basis</Link></li>
                <li><Link to="/team" className="hover:text-blue-600 transition-colors">Команда</Link></li>
                <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Карьера</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Продукт</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/features" className="hover:text-blue-600 transition-colors">Возможности</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-600 transition-colors">Тарифы</Link></li>
                <li><Link to="/templates" className="hover:text-blue-600 transition-colors">Шаблоны</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Поддержка</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/support#faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                <li><Link to="/support#contact" className="hover:text-blue-600 transition-colors">Контакты</Link></li>
                <li><Link to="/support#guides" className="hover:text-blue-600 transition-colors">Руководства</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Правовая информация</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/legal#terms" className="hover:text-blue-600 transition-colors">Условия использования</Link></li>
                <li><Link to="/legal#privacy" className="hover:text-blue-600 transition-colors">Политика конфиденциальности</Link></li>
                <li><Link to="/legal#cookies" className="hover:text-blue-600 transition-colors">Политика Cookie</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Basis Platform. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-400">Сделано с ♥ в Rara Avis</p>
          </div>
        </footer>
      </main>
    </StandardPageLayout>
  );
};

export default HomePage;

// Главная страница лендинга, загружает данные и показывает блоки
