import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import EditorPage from '../pages/EditorPage';
import PublicProfilePage from '../pages/PublicProfilePage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import BillingPage from '../pages/BillingPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import SupportPage from '../pages/SupportPage';
import AdminPage from '../pages/AdminPage';
import LegalPage from '../pages/LegalPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth', element: <AuthPage /> },
      { 
        path: 'dashboard', 
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'editor', 
        element: (
          <ProtectedRoute>
            <EditorPage />
          </ProtectedRoute>
        ) 
      },
      { path: 'public-profile/:slug', element: <PublicProfilePage /> },
      { 
        path: 'account', 
        element: (
          <ProtectedRoute>
            <AccountSettingsPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'billing', 
        element: (
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        ) 
      },
      { 
        path: 'analytics', 
        element: (
          <ProtectedRoute>
            <AnalyticsPage />
          </ProtectedRoute>
        ) 
      },
      { path: 'support', element: <SupportPage /> },
      { 
        path: 'admin', 
        element: (
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        ) 
      },
      { path: 'legal', element: <LegalPage /> },
      { path: '*', element: <StandardPageLayout title="404 - Page Not Found" /> },
    ],
  },
];
