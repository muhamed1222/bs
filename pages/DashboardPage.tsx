// Панель управления
import React, { useEffect } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { useAsync } from '../hooks/useAsync';
import { api } from '../services/api';
import { z } from 'zod';
import { Loader } from '../components/Loader';
import { Onboarding } from '../components/Onboarding';
import DashboardTopBar from '../components/dashboard/DashboardTopBar';
import ProjectsSection from '../components/dashboard/ProjectsSection';
import QuickLinksSection from '../components/dashboard/QuickLinksSection';

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

const ProjectsSchema = z.array(ProjectSchema);

const DashboardPage: React.FC = () => {
  const {
    data: projects,
    loading,
    error
  } = useAsync(() => api.get('/api/projects', ProjectsSchema));

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <StandardPageLayout title="3. Dashboard">
      <Onboarding />
      <div className="space-y-6">
        <DashboardTopBar />
        <ProjectsSection projects={projects || []} loading={loading} />
        <QuickLinksSection />
      </div>
    </StandardPageLayout>
  );
};

export default DashboardPage;

// Центр управления проектами пользователя
