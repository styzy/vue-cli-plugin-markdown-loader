const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')

const markdown = require('markdown-it')
// markdown-it plugins
const emoji = require('markdown-it-emoji')
const containers = require('./containers')

const md = markdown({
	// Enable HTML tags in source
	html: true,
	// CSS language prefix for fenced blocks. Can be useful for external highlighters.
	langPrefix: 'language-',
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre class="hljs"><code>' +
					hljs.highlight(str, {
						language: lang,
						ignoreIllegals: true
					}).value +
					'</code></pre>'
				)
			} catch (__) {}
		}
		return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
	}
})
	.use(emoji)
	.use(containers)

const cache = new LRU({ max: 1000 })

module.exports = function (src) {
	const isProd = process.env.NODE_ENV === 'production'

	const file = this.resourcePath
	const key = hash(file + src)
	const cached = cache.get(key)

	// 热编译模式下构建时使用缓存以提高性能
	if (cached && (isProd || /\?vue/.test(this.resourceQuery))) {
		return cached
	}

	const html = md.render(src)

	const res = `<template>\n` + `<div class="markdown-body">${html}</div>\n` + `</template>\n`
	cache.set(key, res)
	return res
}
