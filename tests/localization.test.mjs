import test from 'node:test';
import assert from 'node:assert/strict';
import { contentKey, localizedContent, localizedMaterials } from '../src/i18n/content.ts';
import { resolveGameLocale, messages } from '../public/2048/i18n.js';

const entry = (id, lang, extra = {}) => ({ id, data: { lang, ...extra } });
const entries = [
  entry('it/guida-php', 'it', { translationKey: 'php' }),
  entry('en/php-guide', 'en', { translationKey: 'php' }),
  entry('it/solo-italiano', 'it'),
  entry('en/english-only', 'en'),
];
for (const locale of ['it', 'en']) {
  test(`${locale}: prefer translation and include both one-language resources once`, () => {
    const result = localizedContent(entries, locale);
    assert.equal(result.length, 3);
    assert.equal(result.find((item) => contentKey(item) === 'php').data.lang, locale);
    assert.ok(result.some((item) => item.id === 'it/solo-italiano'));
    assert.ok(result.some((item) => item.id === 'en/english-only'));
    assert.deepEqual(localizedContent([...entries].reverse(), locale).map((item) => item.id).sort(), result.map((item) => item.id).sort());
  });
}
test('blog translations pair by relative path without explicit keys', () => {
  const posts = [entry('it/topic/post', 'it'), entry('en/topic/post', 'en')];
  assert.equal(contentKey(localizedContent(posts, 'en')[0]), 'topic/post');
  assert.equal(localizedContent(posts, 'en').length, 1);
});
test('fallback PDF keeps its real language without replacing the translated page', () => {
  const resources = [
    entry('it/php', 'it', { href: '/it-guide/', downloadHref: '/it.pdf', order: 1 }),
    entry('en/php', 'en', { href: '/en-guide/', order: 1 }),
  ];
  const result = localizedMaterials(resources, 'en')[0].data;
  assert.equal(result.href, '/en-guide/');
  assert.equal(result.resourceLang, 'en');
  assert.equal(result.downloadHref, '/it.pdf');
  assert.equal(result.downloadLang, 'it');
  assert.equal(resources[1].data.downloadHref, undefined);
});
test('native PDF wins over fallback; resource language can differ from description', () => {
  const result = localizedMaterials([
    entry('it/php', 'it', { href: '/it-guide/', downloadHref: '/it.pdf', order: 1 }),
    entry('en/php', 'en', { href: '/it-guide/', resourceLang: 'it', downloadHref: '/en.pdf', downloadLang: 'en', order: 1 }),
  ], 'en')[0].data;
  assert.equal(result.resourceLang, 'it');
  assert.equal(result.downloadHref, '/en.pdf');
  assert.equal(result.downloadLang, 'en');
});
test('game defaults to English and rejects unsupported locales', () => {
  assert.equal(resolveGameLocale(), 'en');
  assert.equal(resolveGameLocale({ search: '?lang=fr', stored: 'de' }), 'en');
});
for (const locale of ['it', 'en']) {
  test(`game preserves explicit ${locale} over saved preference and referrer`, () => {
    const other = locale === 'it' ? 'en' : 'it';
    assert.equal(resolveGameLocale({ search: `?lang=${locale}`, stored: other, origin: 'https://site.test', referrer: `https://site.test/${other}/progetti/` }), locale);
    assert.equal(resolveGameLocale({ stored: locale }), locale);
    assert.equal(typeof messages[locale].cell(0, 1, 2), 'string');
  });
}
test('game honors only a same-origin referrer before saved preference', () => {
  assert.equal(resolveGameLocale({ origin: 'https://site.test', referrer: 'https://site.test/it/', stored: 'en' }), 'it');
  assert.equal(resolveGameLocale({ origin: 'https://site.test', referrer: 'https://other.test/it/', stored: 'en' }), 'en');
});
test('game dictionaries cover the same interface and live messages', () => {
  assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages.it).sort());
});
test('Italian catalogue can use an English-only PDF', () => {
  const resources = [
    entry('it/guide', 'it', { href: '/it-guide/', order: 1 }),
    entry('en/guide', 'en', { href: '/en-guide/', downloadHref: '/en.pdf', order: 1 }),
  ];
  const result = localizedMaterials(resources, 'it')[0].data;
  assert.equal(result.href, '/it-guide/');
  assert.equal(result.downloadHref, '/en.pdf');
  assert.equal(result.downloadLang, 'en');
});
test('duplicate translation keys fail regardless of entry order', () => {
  assert.throws(() => localizedContent([...entries, entries[0]], 'en'), /Duplicate translation/);
});
