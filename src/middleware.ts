import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
	if (import.meta.env.DEV && context.url.pathname === '/guida-php/') {
		return context.redirect('/guida-php/index.html', 307);
	}

	return next();
});
