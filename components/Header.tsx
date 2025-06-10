import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white border-b shadow-sm p-4">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Basis
        </Link>
        <nav className="space-x-4 text-sm">
          <Link to="/auth?action=login">Войти</Link>
          <Link to="/auth?action=signup">Регистрация</Link>
        </nav>
      </div>
    </header>
  );
}

// Шапка сайта с логотипом и простыми ссылками
