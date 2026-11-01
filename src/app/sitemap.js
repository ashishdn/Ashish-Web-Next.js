import { siteConfig } from '@/data/site';
import { getProjects } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  const projects = await getProjects({ publishedOnly: true });
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    ...(project.updatedAt && !Number.isNaN(Date.parse(project.updatedAt))
      ? { lastModified: new Date(project.updatedAt) }
      : {}),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
