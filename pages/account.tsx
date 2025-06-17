import MainLayout from '../layouts/MainLayout';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Account() {
  return (
    <MainLayout>
      <ProtectedRoute>
        <AccountSettingsPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 