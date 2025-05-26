import type { House } from '$schema_types';
import { renderHtmlSync } from 'cmark-gfm';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { house }: { house: House } = await parent();
	if (!house.page_md) {
		return { html: null };
	}

	// Step 1: Parse Markdown to HTML
	let html = renderHtmlSync(house.page_md, {
		extensions: {
			table: true,
			strikethrough: true,
			autolink: true,
			tagfilter: true,
			tasklist: true
		},
		smart: true,
		githubPreLang: true
	});

	// Step 2: Highlight code blocks
	html = html.replace(
		/<pre><code class="language-(.+?)">([\s\S]*?)<\/code><\/pre>/g,
		(_, lang, code) => {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext';
			const highlighted = hljs.highlight(code, { language }).value;
			return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
		}
	);

	// Step 3: Sanitize the HTML
	html = sanitizeHtml(html, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			code: ['class'],
			pre: ['class']
		}
	});

	return { html };
};
