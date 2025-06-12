// Панель управления
import React, { useEffect } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { fetchJson } from '../services/api';
import { z } from 'zod';
import { Loader } from '../components/Loader';
import { Onboarding } from '../components/Onboarding';

const ProjectCardPlaceholder: React.FC<{
  // Панель управления
  title: string;
  lastUpdated: string;
}> = ({ title, lastUpdated }) => (
  <div className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 hover:-translate-y-2 relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10">
      {/* Project Icon */}
      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      
      <h3 className="text-xl font-bold font-pragmatica text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Обновлено: {lastUpdated}
      </p>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Link
          to="/editor"
          state={{ projectId: title }}
          className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Редактировать
        </Link>
        <button className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Настройки
        </button>
      </div>
      
      {/* Secondary actions */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex space-x-3">
          <button className="hover:text-blue-500 transition-colors">
            Клонировать
          </button>
          <button className="hover:text-orange-500 transition-colors">
            Архивировать
          </button>
        </div>
        <button className="hover:text-red-500 transition-colors">
          Удалить
        </button>
      </div>
    </div>
  </div>
);

const DashboardPage: React.FC = () => {
  const schema = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      lastUpdated: z.string(),
    })
  );

  const {
    data: projects,
    loading,
    run,
  } = useAsync(() => fetchJson('/api/projects', schema));

  useEffect(() => {
    run();
  }, [run]);

  return (
    <StandardPageLayout title="Панель управления">
      <Onboarding />
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-4">Добро пожаловать в Basis!</h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl">
              Создавайте потрясающие страницы за считанные минуты. Ваши проекты ждут вас.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                id="create-project-btn"
                to="/editor"
                state={{ newProject: true }}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Создать новую страницу
              </Link>
              
              <select className="px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50">
                <option className="text-gray-900">Все проекты</option>
                <option className="text-gray-900">Активные</option>
                <option className="text-gray-900">Архивные</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-pragmatica text-gray-900">
              Ваши проекты
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Сортировка:</span>
                <select className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>По дате изменения</option>
                  <option>По названию</option>
                  <option>По популярности</option>
                </select>
              </div>
            </div>
          </div>
          
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-2xl h-64 animate-pulse"></div>
              ))}
            </div>
          )}
          
          {!loading && projects && projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCardPlaceholder
                  key={project.id}
                  title={project.title}
                  lastUpdated={project.lastUpdated}
                />
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Пока нет проектов</h3>
              <p className="text-gray-600 mb-6">Создайте свою первую страницу и начните делиться с миром!</p>
              <Link
                to="/editor"
                state={{ newProject: true }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Создать первый проект
              </Link>
            </div>
          ) : null}
        </section>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-200">
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold font-pragmatica text-gray-900">
                Быстрые настройки
              </h2>
            </div>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/account" 
                  className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">Настройки аккаунта</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/account#security"
                  className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">Безопасность</span>
                </Link>
              </li>
            </ul>
          </section>
          
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h2 className="text-xl font-bold font-pragmatica text-gray-900">
                Тарифы и подписка
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-sm text-gray-600">Текущий тариф:</span>
                <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">Free</span>
              </div>
              <Link 
                to="/billing" 
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Управление подпиской
              </Link>
            </div>
          </section>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default DashboardPage;

// Центр управления проектами пользователя