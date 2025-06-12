// Страница авторизации
import React, { useState, useCallback, useRef } from 'react'; // React и хуки
import { Link, useLocation, useNavigate } from 'react-router-dom'; // работа с маршрутами
import StandardPageLayout from '../layouts/StandardPageLayout'; // общий макет страниц
import { useAuth } from '../contexts/AuthContext'; // контекст авторизации
import Spinner from '../ui/Spinner'; // индикатор загрузки

type AuthMode = 'login' | 'signup' | 'reset';
type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 6;

const AuthPage: React.FC = () => {
  // Страница авторизации
  const location = useLocation(); // текущий URL
  const navigate = useNavigate(); // навигация по страницам
  const queryParams = new URLSearchParams(location.search);
  const mode = (queryParams.get('action') as AuthMode) || 'login';

  const { login, signup, resetPassword } = useAuth(); // функции из контекста

  const [fields, setFields] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  }); // значения полей формы

  const [showPassword, setShowPassword] = useState(false); // видимость пароля
  const [status, setStatus] = useState<AuthStatus>('idle'); // состояние процесса
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // сообщение об ошибке
  const [successMsg, setSuccessMsg] = useState<string | null>(null); // успешное сообщение

  const emailRef = useRef<HTMLInputElement>(null); // ссылка на поле email

  // Сброс формы при смене режима
  React.useEffect(() => {
    setFields({ email: '', password: '', name: '', confirmPassword: '' });
    setStatus('idle');
    setErrorMsg(null);
    setSuccessMsg(null);
    emailRef.current?.focus();
  }, [mode]);

  // Изменение значений формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const validate = useCallback(() => {
    if (!EMAIL_REGEX.test(fields.email)) return 'Введите корректный email.';
    if ((mode === 'login' || mode === 'signup') && fields.password.length < PASSWORD_MIN)
      return `Пароль не менее ${PASSWORD_MIN} символов.`;
    if (mode === 'signup') {
      if (!fields.name.trim()) return 'Введите имя.';
      if (fields.password !== fields.confirmPassword) return 'Пароли не совпадают.';
    }
    return null;
  }, [fields, mode]);

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const validation = validate();
    if (validation) {
      setErrorMsg(validation);
      return;
    }
    setStatus('loading');
    try {
      if (mode === 'login') {
        await login(fields.email, fields.password);
        setStatus('success');
        setSuccessMsg('Вход выполнен успешно. Перенаправляю…');
        setTimeout(() => navigate('/'), 1200);
      } else if (mode === 'signup') {
        await signup(fields.email, fields.password, fields.name);
        setStatus('success');
        setSuccessMsg('Регистрация успешна! Войдите под своими данными.');
        setTimeout(() => navigate('/auth?action=login'), 1800);
      } else if (mode === 'reset') {
        await resetPassword(fields.email);
        setStatus('success');
        setSuccessMsg('Письмо для восстановления отправлено на почту.');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Показывать или скрывать пароль
  const toggleShowPassword = () => setShowPassword((s) => !s);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          aria-label={mode === 'login' ? 'Вход' : mode === 'signup' ? 'Регистрация' : 'Сброс пароля'}
          className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-3xl p-8 space-y-6 animate-fade-in-up"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mode === 'signup' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                ) : mode === 'reset' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                )}
              </svg>
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              {mode === 'login' ? 'Добро пожаловать!' : mode === 'signup' ? 'Создать аккаунт' : 'Восстановление пароля'}
            </h1>
            <p className="text-gray-600">
              {mode === 'login' ? 'Войдите в свой аккаунт' : mode === 'signup' ? 'Присоединяйтесь к Basis' : 'Восстановите доступ к аккаунту'}
            </p>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Имя
              </label>
              <input
                ref={mode === 'signup' ? emailRef : undefined}
                type="text"
                id="name"
                name="name"
                required
                autoFocus={mode === 'signup'}
                value={fields.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                placeholder="Ваше имя"
                data-testid="signup-name"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              ref={mode !== 'signup' ? emailRef : undefined}
              type="email"
              id="email"
              name="email"
              required
              autoFocus={mode !== 'signup'}
              value={fields.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
              placeholder="you@example.com"
              data-testid="auth-email"
              aria-label="Введите email"
            />
          </div>

          {mode !== 'reset' && (
            <div className="relative space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={fields.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm pr-12"
                  placeholder="••••••••"
                  data-testid="auth-password"
                  aria-label="Введите пароль"
                  minLength={PASSWORD_MIN}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  tabIndex={0}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors"
                  data-testid="toggle-password"
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M3 3l18 18M1 1l22 22" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 4C7 4 2.73 7.11 1 12c.62 1.67 1.62 3.21 2.9 4.5l2.12-2.12A7.96 7.96 0 0112 6a7.96 7.96 0 015.98 2.38l2.12-2.12C21.37 7.11 17 4 12 4z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                Повторите пароль
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={fields.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm"
                placeholder="••••••••"
                data-testid="signup-confirm"
                aria-label="Повторите пароль"
                minLength={PASSWORD_MIN}
              />
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-fade-in" role="alert" data-testid="error-msg">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
            </div>
          )}
          
          {successMsg && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-fade-in" role="status" data-testid="success-msg">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-green-700 text-sm font-medium">{successMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            aria-busy={status === 'loading'}
            className={`w-full flex justify-center items-center py-4 px-6 rounded-2xl shadow-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-2xl'
                : mode === 'reset'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:shadow-2xl'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-2xl'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            data-testid="auth-submit"
          >
            {status === 'loading' && <Spinner size="h-5 w-5" className="mr-3" />}
            {status === 'loading'
              ? 'Обработка…'
              : mode === 'login'
              ? 'Войти в аккаунт'
              : mode === 'signup'
              ? 'Создать аккаунт'
              : 'Отправить ссылку'}
          </button>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
            {mode !== 'login' && (
              <Link 
                to="/auth?action=login" 
                className="text-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline" 
                tabIndex={0}
              >
                Уже есть аккаунт? Войти
              </Link>
            )}
            {mode !== 'signup' && (
              <Link 
                to="/auth?action=signup" 
                className="text-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 hover:underline" 
                tabIndex={0}
              >
                Нет аккаунта? Зарегистрироваться
              </Link>
            )}
            {mode !== 'reset' && (
              <Link 
                to="/auth?action=reset" 
                className="text-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 hover:underline" 
                tabIndex={0}
              >
                Забыли пароль?
              </Link>
            )}
          </div>

          {mode === 'signup' && (
            <p className="text-xs text-center text-gray-500 pt-4 border-t border-gray-200">
              Нажимая "Создать аккаунт", вы соглашаетесь с{' '}
              <Link to="/legal#terms" className="text-blue-600 hover:text-blue-700 underline transition-colors">
                Условиями использования
              </Link>{' '}
              и{' '}
              <Link to="/legal#privacy" className="text-blue-600 hover:text-blue-700 underline transition-colors">
                Политикой конфиденциальности
              </Link>
              .
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;

// Страница входа, регистрации и восстановления пароля