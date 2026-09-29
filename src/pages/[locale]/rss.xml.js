import { getCollection } from 'astro:content';
import { localizedContent, contentKey } from '../../i18n/content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../../consts';

export function getStaticPaths() {
	return [{ params: { locale: 'it' } }, { params: { locale: 'en' } }];
}

export async function GET(context) {
	const locale = context.params.locale === 'it' ? 'it' : 'en';
	const posts = localizedContent(await getCollection('blog'), locale).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return rss({
		title: `${SITE_TITLE[locale]} — Blog`,
		description: SITE_DESCRIPTION[locale],
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/${locale}/blog/${contentKey(post)}/`,
		})),
	});
}