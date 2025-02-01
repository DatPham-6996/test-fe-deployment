import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flip.vn';
  const env = process.env.NEXT_PUBLIC_ENV ?? 'development';

  if (env !== 'production') {
    return {
      rules: {
        userAgent: '*',
        allow: [],
        disallow: ['/', '/events'],
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/events'],
      disallow: [],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
