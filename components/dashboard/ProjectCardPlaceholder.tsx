import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardPlaceholderProps {
  title: string;
  lastUpdated: string;
}

const ProjectCardPlaceholder: React.FC<ProjectCardPlaceholderProps> = ({
  title,
  lastUpdated,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
    <h3 className="text-lg font-semibold font-pragmatica text-gray-800">
      {title}
    </h3>
    <p className="text-sm text-gray-500 mb-3">Последнее обновление: {lastUpdated}</p>
    <div className="space-x-2">
      <Link
        to="/editor"
        state={{ projectId: title }}
        className="text-sm text-indigo-600 hover:text-indigo-800"
      >
        Редактировать
      </Link>
      <button className="text-sm text-gray-600 hover:text-gray-800">Настройки</button>
      <button className="text-sm text-red-500 hover:text-red-700">Удалить</button>
    </div>
    <div className="mt-2 text-xs">
      <button className="text-gray-400 hover:text-gray-600 mr-2">Клонировать</button>
      <button className="text-gray-400 hover:text-gray-600">Архивировать</button>
    </div>
  </div>
);

export default ProjectCardPlaceholder;
