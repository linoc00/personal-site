import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	if (import.meta.env.DEV && ['/guida-php/', '/2048/'].includes(context.url.pathname)) {
		return context.redirect(`${context.url.pathname}index.html${context.url.search}`, 307);
	}

	return next();
});
