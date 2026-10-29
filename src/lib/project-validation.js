function cleanText(value, maxLength = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanList(value, maxItems = 30, maxLength = 120) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

export function slugify(value) {
  return cleanText(value, 180)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeProjectInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Project data is required.');
  }

  const title = cleanText(input.title, 160);
  const category = cleanText(input.category, 140);
  const description = cleanText(input.description, 1200);
  const slug = slugify(input.slug || title);
  const siteUrl = cleanText(input.siteUrl, 500);

  if (!title || !category || !description || !slug) {
    throw new Error('Title, category, description, and a valid slug are required.');
  }

  if (siteUrl) {
    try {
      const parsedUrl = new URL(siteUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error();
    } catch {
      throw new Error('Live website URL must be a valid http or https URL.');
    }
  }

  const metrics = Array.isArray(input.metrics)
    ? input.metrics
        .slice(0, 4)
        .map((metric) => ({
          label: cleanText(metric?.label, 80),
          value: cleanText(metric?.value, 80),
        }))
        .filter((metric) => metric.label && metric.value)
    : [];

  const caseStudy = input.caseStudy && typeof input.caseStudy === 'object'
    ? input.caseStudy
    : {};

  return {
    slug,
    title,
    category,
    siteUrl,
    demoDomain: cleanText(input.demoDomain, 240),
    description,
    technologies: cleanList(input.technologies, 24, 60),
    featured: Boolean(input.featured),
    published: input.published !== false,
    client: cleanText(input.client, 140),
    year: cleanText(input.year, 40),
    duration: cleanText(input.duration, 60),
    role: cleanText(input.role, 140),
    metrics,
    caseStudy: {
      summary: cleanText(caseStudy.summary, 5000),
      challenge: cleanText(caseStudy.challenge, 5000),
      solution: cleanText(caseStudy.solution, 5000),
      features: cleanList(caseStudy.features, 24, 300),
    },
    seoTitle: cleanText(input.seoTitle, 180),
    seoDescription: cleanText(input.seoDescription, 320),
    sortOrder: Number.isFinite(Number(input.sortOrder))
      ? Math.max(0, Math.min(10000, Number(input.sortOrder)))
      : 100,
    accentColor: 'var(--accent-primary)',
    themeColor: 'from-[var(--accent-primary)] to-[var(--accent-secondary)]',
  };
}
