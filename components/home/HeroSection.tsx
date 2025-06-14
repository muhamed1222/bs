import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";
import { type HomeStats } from "../../mock/home";

interface HeroSectionProps {
  stats: HomeStats | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => setEmail(""), 200);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
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
          <span className="text-gray-800 text-4xl md:text-5xl lg:text-6xl font-bold">умный бенто‑конструктор</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-light"
          style={{ animationDelay: "0.2s" }}
        >
          Создай портфолио или мульти‑линк быстрее, чем за 2 минуты.
          <br />
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Никакой рутины, всё — drag&drop.
          </span>{" "}
          Покажи миру себя по‑новому.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
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
            style={{ animationDelay: "0.6s" }}
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
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          {stats ? (
            <>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stats.users}+
                </div>
                <div className="text-sm text-gray-600 font-medium">Пользователей</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stats.pages}+
                </div>
                <div className="text-sm text-gray-600 font-medium">Страниц создано</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stats.integrations}
                </div>
                <div className="text-sm text-gray-600 font-medium">Интеграций</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  4.9/5
                </div>
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
  );
};

export default HeroSection;
