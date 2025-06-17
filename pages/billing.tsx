import MainLayout from '../layouts/MainLayout';
import BillingPage from '../pages/BillingPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Billing() {
  return (
    <MainLayout>
      <ProtectedRoute>
        <BillingPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 