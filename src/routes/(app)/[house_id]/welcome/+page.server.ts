import type { House } from '$schema_types';
import { renderHtmlSync } from 'cmark-gfm';
import sanitizeHtml from 'sanitize-html';
import hljs from 'highlight.js';
import type { PageServerLoad } from './$types';
import { JSDOM } from 'jsdom';
export const load: PageServerLoad = async ({ parent }) => {
	const { house }: { house: House } = await parent();
	if (!house.page_md) {
		return { html: null };
	}

	// Step 1: Parse Markdown to raw HTML
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
	console.log('before:', html);
	// Step 2: Highlight code blocks
	const dom = new JSDOM(html);
	const { document } = dom.window;
	const codeBlocks = document.querySelectorAll('pre > code');

	codeBlocks.forEach((block) => {
		const className = block.className; // e.g., 'language-js'
		const language = className?.replace('language-', '').trim();

		if (language && hljs.getLanguage(language)) {
			const highlighted = hljs.highlight(block.textContent || '', { language });
			block.innerHTML = highlighted.value;
			block.classList.add('hljs');
		} else {
			const highlighted = hljs.highlightAuto(block.textContent || '');
			block.innerHTML = highlighted.value;
			block.classList.add('hljs');
		}
	});

	html = dom.serialize();

	// Step 3: Sanitize HTML
	html = sanitizeHtml(html, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			code: ['class'],
			pre: ['class']
		}
	});
	console.log('after:', html);
	return { html };
};
