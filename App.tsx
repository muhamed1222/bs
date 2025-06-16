// В этом файле объявляется точка входа UI
import React from 'react'; // базовая библиотека React
import { useRoutes } from 'react-router-dom'; // хук для переключения страниц
import { routes } from './routes'; // список всех роутов приложения
import { useGATracking } from './hooks/useGATracking';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Компонент App отвечает за отображение нужной страницы
const App: React.FC = () => {
  useGATracking();
  // Возвращаем дерево маршрутов, соответствующее текущему URL
  return (
    <ErrorBoundary>
      {useRoutes(routes)}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ErrorBoundary>
  );
};

export default App;

// Главный компонент приложения, подключающий маршрутизацию
