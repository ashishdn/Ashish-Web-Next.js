import { getProjects } from '@/lib/mongodb';
import ProjectsArchive from '@/components/sections/ProjectsArchive';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects({ publishedOnly: true });
  return <ProjectsArchive projects={projects} />;
}
