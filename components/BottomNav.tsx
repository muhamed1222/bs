import { Link } from 'react-router-dom';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white shadow-md p-2 flex justify-around">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

// Нижняя навигационная панель для мобильных устройств
