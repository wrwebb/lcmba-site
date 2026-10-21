import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://lcmba.org/', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://lcmba.org/support', changeFrequency: 'monthly', priority: 0.8 },
  ];
}
