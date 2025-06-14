// Панель управления
import React, { useEffect } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { fetchJson } from '../services/api';
import { z } from 'zod';
import { Loader } from '../components/Loader';
import { Onboarding } from '../components/Onboarding';
import ProjectCardPlaceholder from '../components/dashboard/ProjectCardPlaceholder';

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
    <StandardPageLayout title="3. Dashboard">
      <Onboarding />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            {/* Placeholder for project switcher/tabs */}
            <select className="p-2 border border-gray-300 rounded-md bg-white shadow-sm">
              <option>Все проекты</option>
              <option>Активные</option>
              <option>Архивные</option>
            </select>
          </div>
          <Link
            id="create-project-btn"
            to="/editor"
            state={{ newProject: true }}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors w-full sm:w-auto text-center"
          >
            Создать новую страницу
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
            Список ваших страниц/проектов
          </h2>
          {loading && <Loader />}
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
            <p className="text-gray-600">
              У вас пока нет созданных страниц. Начните с создания новой!
            </p>
          ) : null}
        </section>

        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
          <section>
            <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
              Быстрые настройки
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-indigo-600 hover:underline">
                  Настройки аккаунта
                </Link>
              </li>
              <li>
                <Link
                  to="/account#security"
                  className="text-indigo-600 hover:underline"
                >
                  Безопасность
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
              Тарифы и Подписка
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              Ваш текущий тариф:{' '}
              <span className="font-semibold text-green-600">Free</span>
            </p>
            <Link to="/billing" className="text-indigo-600 hover:underline">
              Управление подпиской и тарифами
            </Link>
          </section>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default DashboardPage;

// Центр управления проектами пользователя
