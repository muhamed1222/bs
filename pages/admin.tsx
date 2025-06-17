import MainLayout from '../layouts/MainLayout';
import AdminPage from '../pages/AdminPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Admin() {
  return (
    <MainLayout>
      <ProtectedRoute requiredRole="admin">
        <AdminPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 