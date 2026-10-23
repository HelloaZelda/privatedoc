import { MetadataRoute } from 'next';
import { CONVERSION_PAIRS } from '@/lib/format-registry';

const BASE_URL = 'https://irisproject.dpdns.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/en/privacy`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  for (const pair of CONVERSION_PAIRS) {
    routes.push({
      url: `${BASE_URL}/convert/${pair.slug}`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    routes.push({
      url: `${BASE_URL}/en/convert/${pair.slug}`,
      lastModified: new Date('2026-10-24'),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  return routes;
}
