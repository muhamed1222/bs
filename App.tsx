// Основной компонент приложения
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

const App: React.FC = () => {
  // Основной компонент приложения
  return useRoutes(routes);
};

export default App;

