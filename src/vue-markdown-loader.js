const hash = require('hash-sum')
const LRU = require('lru-cache')
const loaderUtils = require('loader-utils')
const cheerio = require('cheerio')

const cache = new LRU({ max: 1000 })

module.exports = function (source) {
	const isProd = process.env.NODE_ENV === 'production',
		file = this.resourcePath,
		key = hash(file + source),
		cached = cache.get(key),
		options = loaderUtils.getOptions(this),
		{
			useCache = true,
			wrapperClassName = 'markdown-body',
			wrapperTag = 'div'
		} = options || {}

	// 热编译模式下构建时使用缓存以提高性能
	if (useCache && cached && (isProd || /\?vue/.test(this.resourceQuery))) {
		return cached
	}

	const vueSFC = createVueSFC(source, { wrapperClassName, wrapperTag })

	cache.set(key, vueSFC)

	return vueSFC
}

function createVueSFC(html, { wrapperClassName, wrapperTag }) {
	const $ = cheerio.load(html, {
			decodeEntities: false,
			lowerCaseTags: false,
			lowerCaseAttributeNames: false
		}),
		style = $.html('style'),
		script = $.html($('script').first())

	$('style').remove()
	$('script').remove()

	const template = `<template><${wrapperTag} class="${wrapperClassName}">${$(
		'body'
	).html()}</${wrapperTag}></template>`

	const sfc = `${template}\n${script}\n${style}`

	return sfc
}
