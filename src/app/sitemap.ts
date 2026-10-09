import { MetadataRoute } from 'next';
import { CONVERSION_PAIRS } from '@/lib/format-registry';

const BASE_URL = 'https://privatedoc-green.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date('2026-10-09'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  for (const pair of CONVERSION_PAIRS) {
    routes.push({
      url: `${BASE_URL}/convert/${pair.slug}`,
      lastModified: new Date('2026-10-09'),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  return routes;
}
