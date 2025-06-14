import React from 'react';
import ProjectCardPlaceholder from './ProjectCardPlaceholder';

export interface ProjectInfo {
  id: string;
  title: string;
  lastUpdated: string;
}

interface ProjectsSectionProps {
  projects: ProjectInfo[];
  loading?: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading }) => (
  <section>
    <h2 className="text-xl font-semibold font-pragmatica mb-3 text-gray-700">
      Список ваших страниц/проектов
    </h2>
    {loading && <div>Loading...</div>}
    {!loading && projects && projects.length > 0 ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCardPlaceholder
            key={project.id}
            title={project.title}
            lastUpdated={project.lastUpdated}
          />
        ))}
      </div>
    ) : !loading ? (
      <p className="text-gray-600">
        У вас пока нет созданных страниц. Начните с создания новой!
      </p>
    ) : null}
  </section>
);

export default ProjectsSection;
