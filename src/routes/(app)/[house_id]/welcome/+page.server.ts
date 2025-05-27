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

	// Step 2: Highlight code blocks
	const dom = new JSDOM(html);
	console.log('before:', html);
	const { document } = dom.window;
	const codeBlocks = document.querySelectorAll('pre > code');

	codeBlocks.forEach((block) => {
		const pre = block.parentElement;
		const lang = pre?.getAttribute('lang')?.trim();

		if (lang && hljs.getLanguage(lang)) {
			const highlighted = hljs.highlight(block.textContent || '', { language: lang });
			block.innerHTML = highlighted.value;
			block.classList.add('hljs', `language-${lang}`);
		} else {
			const highlighted = hljs.highlightAuto(block.textContent || '');
			block.innerHTML = highlighted.value;
			block.classList.add('hljs', `language-${highlighted.language || 'plaintext'}`);
		}
	});

	html = dom.serialize();
	// Step 3: Sanitize HTML
	html = sanitizeHtml(html, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code', 'span']),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			a: ['href', 'name', 'target', 'rel'],
			img: ['src', 'alt', 'title', 'width', 'height'],
			code: ['class'],
			pre: ['class'],
			span: ['class']
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedSchemesByTag: {
			img: ['http', 'https'],
			a: ['http', 'https', 'mailto']
		},
		allowProtocolRelative: false, // Don't allow //cdn.example.com, must be https://
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' })
		}
	});
	return { html };
};
