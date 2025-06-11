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
      <main className="space-y-32">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-8 animate-fade-in-up border border-blue-200/50 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 animate-pulse"></div>
              ✨ Новая эра цифровых портфолио
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent drop-shadow-sm">
                Basis
              </span>
              <br />
              <span className="text-gray-800 text-4xl md:text-5xl lg:text-6xl font-bold">
                умный бенто‑конструктор
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.2s' }}>
              Создай портфолио или мульти‑линк быстрее, чем за 2 минуты.<br />
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Никакой рутины, всё — drag&drop.
              </span> Покажи миру себя по‑новому.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/auth?action=signup"
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center">
                  Попробовать бесплатно
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              <Link
                to="/auth?action=login"
                className="group px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200/50 hover:border-gray-300/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  Войти в аккаунт
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Email Subscription */}
            {!subscribed && (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto animate-fade-in-up bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/50"
                style={{ animationDelay: '0.6s' }}
                aria-label="Форма подписки на обновления"
              >
                <input
                  type="email"
                  placeholder="Введите свой email"
                  className="flex-1 px-6 py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500 min-w-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 whitespace-nowrap transform hover:scale-105"
                >
                  Получить гайд
                </button>
              </form>
            )}
            
            {subscribed && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-green-700 font-semibold animate-fade-in-up shadow-lg">
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Спасибо! Ссылка на гайд отправлена на почту.
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              {stats ? (
                <>
                  <div className="text-center group">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.users}+</div>
                    <div className="text-sm text-gray-600 font-medium">Пользователей</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.pages}+</div>
                    <div className="text-sm text-gray-600 font-medium">Страниц создано</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.integrations}</div>
                    <div className="text-sm text-gray-600 font-medium">Интеграций</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">4.9/5</div>
                    <div className="text-sm text-gray-600 font-medium">Оценка пользователей</div>
                  </div>
                </>
              ) : (
                <div className="col-span-4">
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Как работает Basis?</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Три простых шага до вашей идеальной цифровой страницы
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Создай страницу",
                description: "Выбери шаблон или начни с нуля — drag&drop любой блок",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100"
              },
              {
                step: "2", 
                title: "Кастомизируй",
                description: "Меняй цвета, шрифты, интегрируй соцсети и сервисы без кода",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100"
              },
              {
                step: "3",
                title: "Публикуй за секунду", 
                description: "Поделись ссылкой или подключи собственный домен",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100`}></div>
                <div className="relative z-10 p-8">
                  <div className={`w-24 h-24 bg-gradient-to-r ${item.color} rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500`}>
                    <span className="text-white text-3xl font-black">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <div className="relative rounded-3xl overflow-hidden shadow-3xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-500"></div>
              <iframe
                width="640"
                height="360"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Демонстрация редактора Basis"
                frameBorder={0}
                className="rounded-3xl relative z-10"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Примеры страниц пользователей</h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light">Вдохновляйтесь работами нашего сообщества</p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-96 rounded-3xl" />
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-2xl font-semibold">Нет кейсов — стань первым!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {cases.slice(0, 3).map((c) => (
                <div key={c.id} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img
                      src={c.preview}
                      alt={`Превью страницы ${c.title}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{c.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{c.desc}</p>
                    <Link 
                      to={`/profile/${c.username}`} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-transform duration-300"
                    >
                      Посмотреть
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {cases.length > 3 && (
            <div className="text-center mt-16">
              <Link to="/cases" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Больше примеров
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Отзывы пользователей</h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light">Что говорят о нас наши пользователи</p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map(i => (
                <Skeleton key={i} className="h-48 rounded-3xl" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-2xl font-semibold">Пока нет отзывов.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((r) => (
                <div key={r.id} className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100 hover:-translate-y-1">
                  <div className="flex items-center mb-8">
                    <img src={r.avatar} alt={r.name} className="w-16 h-16 rounded-full mr-6 ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300" />
                    <div>
                      <div className="font-bold text-lg text-gray-900">{r.name}</div>
                      <div className="text-gray-600">{r.job}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">"{r.text}"</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`text-2xl ${i < r.stars ? "text-yellow-400" : "text-gray-300"} transition-colors duration-300`}>
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
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl"></div>
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 text-center text-white px-6">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Присоединяйся — стань автором своей страницы</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto font-light">
              Более 1000 пользователей уже создали свои уникальные страницы. Твоя очередь!
            </p>
            <Link
              to="/auth?action=signup"
              className="group inline-flex items-center px-12 py-6 bg-white text-blue-600 rounded-3xl font-black text-xl shadow-3xl hover:shadow-4xl hover:scale-105 transition-all duration-300"
            >
              Начать бесплатно
              <svg className="w-7 h-7 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-20 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-12 text-gray-600 mb-16">
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">О компании</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors duration-300">О Basis</Link></li>
                <li><Link to="/team" className="hover:text-blue-600 transition-colors duration-300">Команда</Link></li>
                <li><Link to="/careers" className="hover:text-blue-600 transition-colors duration-300">Карьера</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Продукт</h3>
              <ul className="space-y-4">
                <li><Link to="/features" className="hover:text-blue-600 transition-colors duration-300">Возможности</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-600 transition-colors duration-300">Тарифы</Link></li>
                <li><Link to="/templates" className="hover:text-blue-600 transition-colors duration-300">Шаблоны</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Поддержка</h3>
              <ul className="space-y-4">
                <li><Link to="/support#faq" className="hover:text-blue-600 transition-colors duration-300">FAQ</Link></li>
                <li><Link to="/support#contact" className="hover:text-blue-600 transition-colors duration-300">Контакты</Link></li>
                <li><Link to="/support#guides" className="hover:text-blue-600 transition-colors duration-300">Руководства</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Правовая информация</h3>
              <ul className="space-y-4">
                <li><Link to="/legal#terms" className="hover:text-blue-600 transition-colors duration-300">Условия использования</Link></li>
                <li><Link to="/legal#privacy" className="hover:text-blue-600 transition-colors duration-300">Политика конфиденциальности</Link></li>
                <li><Link to="/legal#cookies" className="hover:text-blue-600 transition-colors duration-300">Политика Cookie</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Basis Platform. Все права защищены.
            </p>
            <div className="flex items-center gap-8">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">Сделано с ♥ в Rara Avis</p>
          </div>
        </footer>
      </main>
    </StandardPageLayout>
  );
};

export default HomePage;