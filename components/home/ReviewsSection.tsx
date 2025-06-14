import React from "react";
import { Skeleton } from "../../components/Skeleton";
import { type HomeReview } from "../../mock/home";

interface ReviewsSectionProps {
  reviews: HomeReview[];
  loading: boolean;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, loading }) => (
  <section className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Отзывы пользователей</h2>
      <p className="text-xl md:text-2xl text-gray-600 font-light">Что говорят о нас наши пользователи</p>
    </div>

    {loading ? (
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
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
          <div
            key={r.id}
            className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 border border-gray-100 hover:-translate-y-1"
          >
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
);

export default ReviewsSection;
