import MainLayout from '../layouts/MainLayout';
import AnalyticsPage from '../pages/AnalyticsPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Analytics() {
  return (
    <MainLayout>
      <ProtectedRoute>
        <AnalyticsPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 