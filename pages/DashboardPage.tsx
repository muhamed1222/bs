// Панель управления
import React, { useEffect } from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { useAsync } from '../hooks/useAsync';
import { fetchJson } from '../services/api';
import { z } from 'zod';
import { Loader } from '../components/Loader';
import { Onboarding } from '../components/Onboarding';

const DashboardPage: React.FC = () => {
  const schema = z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      lastUpdated: z.string(),
    })
  );

  const {
    data: projects,
    loading,
    run,
  } = useAsync(() => fetchJson('/api/projects', schema));

  useEffect(() => {
    run();
  }, [run]);

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
