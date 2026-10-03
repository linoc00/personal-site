// @ts-check

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Temporary publication mode: keep the portfolio source intact, but publish
// only the standalone PHP guide and the site's 404 response.
const GUIDE_ONLY_MODE = true;

/** @type {import('astro').AstroIntegration} */
const guideOnlyBuild = {
	name: 'guide-only-build',
	hooks: {
		'astro:build:done': async ({ dir, logger }) => {
			if (!GUIDE_ONLY_MODE) return;

			const outputDirectory = fileURLToPath(dir);
			const publicEntries = await readdir(outputDirectory, { withFileTypes: true });
			const allowedEntries = new Set(['guida-php', '404.html']);

			await Promise.all(
				publicEntries
					.filter((entry) => !allowedEntries.has(entry.name))
					.map((entry) => rm(fileURLToPath(new URL(entry.name, dir)), { recursive: true, force: true })),
			);

			logger.info('Publication limited to /guida-php/.');
		},
	},
};

// https://astro.build/config
export default defineConfig({
	site: 'https://personal-site-2j5.pages.dev',
	integrations: [sitemap(), mdx(), guideOnlyBuild],
	i18n: {
		defaultLocale: 'en',
		locales: ['it', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
