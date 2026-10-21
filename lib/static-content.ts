import savedContent from '@/content/site-content.json';
import { mergeContent, type Content, type PageId } from './content';

const content = savedContent as Record<PageId, Record<string, string>>;

export async function loadContent<T extends PageId>(ids: T[]): Promise<Record<T, Content>> {
  const result = {} as Record<T, Content>;
  for (const id of ids) result[id] = mergeContent(id, content[id]);
  return result;
}
