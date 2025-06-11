// В этом файле объявляется точка входа UI
import React from 'react'; // базовая библиотека React
import { useRoutes } from 'react-router-dom'; // хук для переключения страниц
import { routes } from './routes'; // список всех роутов приложения
import { useGATracking } from './hooks/useGATracking';

// Компонент App отвечает за отображение нужной страницы
const App: React.FC = () => {
  useGATracking();
  // Возвращаем дерево маршрутов, соответствующее текущему URL
  return useRoutes(routes);
};

export default App;

// Главный компонент приложения, подключающий маршрутизацию
