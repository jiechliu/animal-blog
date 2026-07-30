import type { TocItem } from './Toc';

export function extractToc(markdown: string): TocItem[] {
  return markdown.split('\n').flatMap((line) => {
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) return [];
    const text = match[2].replace(/[*_`]/g, '');
    const id = text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '');
    return [{ id, text, level: match[1].length }];
  });
}
