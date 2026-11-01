import { getProjects } from '@/lib/mongodb';
import ProjectsArchive from '@/components/sections/ProjectsArchive';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'WordPress & Web Development Portfolio | ASHISHWEB',
  description: 'Explore WordPress, Elementor, WooCommerce and web development projects by Ashish Kumar Deb Nath, with project details, technologies and case studies.',
  path: '/projects',
});

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects({ publishedOnly: true });
  return <ProjectsArchive projects={projects} />;
}
