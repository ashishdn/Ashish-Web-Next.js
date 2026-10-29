import { siteConfig } from '@/data/site';
import { getProjects } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  const projects = await getProjects({ publishedOnly: true });
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
