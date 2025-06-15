import React from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";
import { type HomeCase } from "../../mock/home";

interface ExamplesSectionProps {
  cases: HomeCase[];
  loading: boolean;
}

const ExamplesSection: React.FC<ExamplesSectionProps> = ({ cases, loading }) => (
  <section className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Примеры страниц пользователей</h2>
      <p className="text-xl md:text-2xl text-gray-600 font-light">Вдохновляйтесь работами нашего сообщества</p>
    </div>

    {loading ? (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
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
          <div
            key={c.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
          >
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
        <Link
          to="/cases"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Больше примеров
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    )}
  </section>
);

export default ExamplesSection;
