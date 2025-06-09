import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$route: 'src/route',
			$css: 'src/app.css',
			$schemas: 'src/lib/schemas',
			$server: 'src/lib/server',
			$ui: 'src/lib/ui',
			$schema_types: 'src/lib/schema_types.ts',
			$env: 'src/lib/server/env.ts',
			$utils: 'src/lib/utils'
		}
	},
	compilerOptions: {
		runes: true
	}
};
export default config;
