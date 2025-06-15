import React from "react";

const HowItWorksSection: React.FC = () => (
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
          bgColor: "from-blue-50 to-blue-100",
        },
        {
          step: "2",
          title: "Кастомизируй",
          description: "Меняй цвета, шрифты, интегрируй соцсети и сервисы без кода",
          color: "from-purple-500 to-purple-600",
          bgColor: "from-purple-50 to-purple-100",
        },
        {
          step: "3",
          title: "Публикуй за секунду",
          description: "Поделись ссылкой или подключи собственный домен",
          color: "from-green-500 to-green-600",
          bgColor: "from-green-50 to-green-100",
        },
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
);

export default HowItWorksSection;
