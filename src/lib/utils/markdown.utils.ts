import { renderHtmlSync } from 'cmark-gfm';
import sanitizeHtml from 'sanitize-html';
import { JSDOM } from 'jsdom';
import hljs from 'highlight.js';

export function cleanHtml(dirty_html: string | null): { clean_html: string | null } {
	//safe for client and server side sanitization
	let clean_html: string | null = null;
	if (!dirty_html) {
		return { clean_html };
	}
	clean_html = sanitizeHtml(dirty_html, {
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
		allowProtocolRelative: false,
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' })
		}
	});
	return { clean_html };
}

export function mdToHtml(md: string | null): { html: string | null } {
	let html: string | null = null;
	if (!md) {
		return { html };
	}
	// Step 1: Parse Markdown to raw HTML
	html = renderHtmlSync(md, {
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
	return { html };
}

export function mdToCleanHtml(md: string | null): { clean_html: string | null } {
	const { html } = mdToHtml(md);
	const { clean_html } = cleanHtml(html);
	return { clean_html };
}
