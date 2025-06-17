import MainLayout from '../layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Dashboard() {
  return (
    <MainLayout>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 