const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

export function publicAsset(src: string) {
  if (!src.startsWith('/') || src.startsWith('//')) return src;
  return `${basePath}${src}`;
}
