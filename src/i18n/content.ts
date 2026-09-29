import type { CollectionEntry } from 'astro:content';
import type { Locale } from './ui';

type LocalizedEntry = {
  id: string;
  data: { lang: Locale; translationKey?: string };
};

// A shared key pairs translations even when their filenames differ.
export function contentKey(entry: LocalizedEntry): string {
  return entry.data.translationKey ?? entry.id.replace(/^(it|en)\//, '');
}

export function localizedContent<T extends LocalizedEntry>(entries: T[], locale: Locale): T[] {
  const selected = new Map<string, T>();
  const seen = new Set<string>();
  for (const entry of entries) {
    const key = contentKey(entry);
    const current = selected.get(key);
    const translation = `${key}:${entry.data.lang}`;
    if (seen.has(translation)) {
      throw new Error(`Duplicate translation: ${key} (${entry.data.lang})`);
    }
    seen.add(translation);
    if (!current || entry.data.lang === locale) selected.set(key, entry);
  }
  return [...selected.values()];
}

export function localizedMaterials(entries: CollectionEntry<'materials'>[], locale: Locale) {
  return localizedContent(entries, locale).map((entry) => {
    const alternate = entries.find((other) => contentKey(other) === contentKey(entry) && other.data.lang !== entry.data.lang);
    const download = entry.data.downloadHref ? entry : alternate;
    return {
      ...entry,
      data: {
        ...entry.data,
        resourceLang: entry.data.resourceLang ?? entry.data.lang,
        downloadHref: download?.data.downloadHref,
        downloadLang: download?.data.downloadLang ?? download?.data.resourceLang ?? download?.data.lang,
      },
    };
  }).sort((a, b) => a.data.order - b.data.order);
}

export type ResolvedMaterial = ReturnType<typeof localizedMaterials>[number];
