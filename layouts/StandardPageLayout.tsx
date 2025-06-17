import React from 'react';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import Link from 'next/link';

export interface Breadcrumb {
  label: string;
  href: string;
}

interface StandardPageLayoutProps {
  /** Заголовок страницы */
  title: string;
  /** Дополнительное описание под заголовком */
  description?: string;
  /** Хлебные крошки навигации */
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

const StandardPageLayout: React.FC<StandardPageLayoutProps> = ({
  title,
  description,
  breadcrumbs,
  children,
}) => (
  <div className="main-content-area">
    <div className="flex justify-end mb-2">
      <LanguageSwitcher />
    </div>
    {breadcrumbs && (
      <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, idx) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline">
              {crumb.label}
            </Link>
            {idx < breadcrumbs.length - 1 && ' / '}
          </span>
        ))}
      </nav>
    )}
    <h1 className="text-3xl font-bold mb-2 font-pragmatica">{title}</h1>
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    {children || <p>Content for {title} will go here.</p>}
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Quick Navigation:</h2>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home (Landing)
          </Link>
        </li>
        <li>
          <Link href="/public-profile/demo" className="text-blue-600 hover:underline">
            Public Profile (Current Design)
          </Link>
        </li>
        <li>
          <Link href="/auth" className="text-blue-600 hover:underline">
            Authentication
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default StandardPageLayout;

// Стандартный макет страницы с простым меню навигации
