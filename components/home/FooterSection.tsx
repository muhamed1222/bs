import React from "react";
import { Link } from "react-router-dom";

const FooterSection: React.FC = () => (
  <footer className="mt-32 pt-20 border-t border-gray-200">
    <div className="grid md:grid-cols-4 gap-12 text-gray-600 mb-16">
      <div>
        <h3 className="font-bold text-gray-900 mb-6 text-lg">О компании</h3>
        <ul className="space-y-4">
          <li><Link to="/about" className="hover:text-blue-600 transition-colors duration-300">О Basis</Link></li>
          <li><Link to="/team" className="hover:text-blue-600 transition-colors duration-300">Команда</Link></li>
          <li><Link to="/careers" className="hover:text-blue-600 transition-colors duration-300">Карьера</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Продукт</h3>
        <ul className="space-y-4">
          <li><Link to="/features" className="hover:text-blue-600 transition-colors duration-300">Возможности</Link></li>
          <li><Link to="/pricing" className="hover:text-blue-600 transition-colors duration-300">Тарифы</Link></li>
          <li><Link to="/templates" className="hover:text-blue-600 transition-colors duration-300">Шаблоны</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Поддержка</h3>
        <ul className="space-y-4">
          <li><Link to="/support#faq" className="hover:text-blue-600 transition-colors duration-300">FAQ</Link></li>
          <li><Link to="/support#contact" className="hover:text-blue-600 transition-colors duration-300">Контакты</Link></li>
          <li><Link to="/support#guides" className="hover:text-blue-600 transition-colors duration-300">Руководства</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Правовая информация</h3>
        <ul className="space-y-4">
          <li><Link to="/legal#terms" className="hover:text-blue-600 transition-colors duration-300">Условия использования</Link></li>
          <li><Link to="/legal#privacy" className="hover:text-blue-600 transition-colors duration-300">Политика конфиденциальности</Link></li>
          <li><Link to="/legal#cookies" className="hover:text-blue-600 transition-colors duration-300">Политика Cookie</Link></li>
        </ul>
      </div>
    </div>

    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-gray-500">&copy; {new Date().getFullYear()} Basis Platform. Все права защищены.</p>
      <div className="flex items-center gap-8">
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.292 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </a>
      </div>
    </div>

    <div className="text-center mt-12 pt-8 border-t border-gray-200">
      <p className="text-sm text-gray-400">Сделано с ♥ в Rara Avis</p>
    </div>
  </footer>
);

export default FooterSection;
