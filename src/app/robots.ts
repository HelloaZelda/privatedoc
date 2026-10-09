import { MetadataRoute } from 'next';

const BASE_URL = 'https://privatedoc-green.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
