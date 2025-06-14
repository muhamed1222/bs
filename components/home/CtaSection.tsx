import React from "react";
import { Link } from "react-router-dom";

const CtaSection: React.FC = () => (
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
);

export default CtaSection;
