import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardTopBarProps {
  onFilterChange?: (value: string) => void;
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({ onFilterChange }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    <div>
      <select
        className="p-2 border border-gray-300 rounded-md bg-white shadow-sm"
        onChange={(e) => onFilterChange?.(e.target.value)}
      >
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
);

export default DashboardTopBar;
