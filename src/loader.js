const fs = require('fs')
const path = require('path')
const hash = require('hash-sum')
const LRU = require('lru-cache')
const hljs = require('highlight.js')
const loaderUtils = require('loader-utils')

const markdown = require('markdown-it')
// markdown-it plugins
const emoji = require('markdown-it-emoji')
const containers = require('./containers')

const createMd = ({ emoji: emojiOptions, container: containerOptions } = {}) => {
	const md = markdown({
		// Enable HTML tags in source
		html: true,
		// CSS language prefix for fenced blocks. Can be useful for external highlighters.
		langPrefix: 'language-',
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return (
						'<pre class="hljs" v-pre><code>' +
						hljs.highlight(str, {
							language: lang,
							ignoreIllegals: true
						}).value +
						'</code></pre>'
					)
				} catch (__) {}
			}
			return '<pre class="hljs" v-pre><code>' + md.utils.escapeHtml(str) + '</code></pre>'
		}
	})
		.use(emoji, emojiOptions)
		.use(containers, containerOptions)

	return md
}

const cache = new LRU({ max: 1000 })

module.exports = function (source) {
	const isProd = process.env.NODE_ENV === 'production',
		file = this.resourcePath,
		key = hash(file + source),
		cached = cache.get(key),
		options = loaderUtils.getOptions(this),
		useCache = options.useCache,
		md = createMd(options)

	// 热编译模式下构建时使用缓存以提高性能
	if (useCache !== false && cached && (isProd || /\?vue/.test(this.resourceQuery))) {
		return cached
	}

	const html = md.render(source)

	const res = `<template>\n` + `<div class="markdown-body">${html}</div>\n` + `</template>\n`
	cache.set(key, res)
	return res
}
