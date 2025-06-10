import React from 'react';
import { BasisBSolidIcon } from './icons/IconComponents';

export const ProfileSidebar: React.FC = () => {
  // Сайдбар публичного профиля
  return (
    <aside className="w-full md:max-w-[484px] md:flex-shrink-0 space-y-[36px] py-4 md:py-0">
      {/* Profile Image Section */}
      <div className="relative group">
        <div className="w-[184px] h-[184px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-[12px] flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border border-blue-300/30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <BasisBSolidIcon
            className="w-[92px] h-[130px] text-white relative z-10 group-hover:scale-105 transition-transform duration-300"
            innercolor="#3B82F6"
          />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-[13px] opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
      </div>

      {/* Profile Text Section */}
      <div className="space-y-[20px]">
        <h1 className="font-pragmatica text-gray-900 text-[56px] font-[750] leading-[52px] tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          Your name goes here
        </h1>
        <p className="text-gray-600 text-[19px] font-normal leading-[28px] max-w-[420px]">
          Hipster ipsum tattooed brunch I'm baby. Stumptown chicken I'm bruh big
          raw jomo. Hot fit literally kitsch fanny tilde celiac tote.
          Single-origin forage raw neutra kombucha.
        </p>
        
        {/* Social Links */}
        <div className="flex items-center space-x-4 pt-4">
          <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
};

