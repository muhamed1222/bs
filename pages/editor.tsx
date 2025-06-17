import MainLayout from '../layouts/MainLayout';
import EditorPage from '../pages/EditorPage';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function Editor() {
  return (
    <MainLayout>
      <ProtectedRoute>
        <EditorPage />
      </ProtectedRoute>
    </MainLayout>
  );
} 