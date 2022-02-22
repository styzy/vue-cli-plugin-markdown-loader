const highlight = require('highlight.js')

module.exports = (api) => {
	api.chainWebpack((config) => {
		config.module.rules.delete('md')

		config.module
			.rule('md')
			.test(/\.md$/)
			.use('html')
			.loader('html-loader')
			.end()
			.use('markdown')
			.loader('markdown-loader')
			.tap(() => {
				return {
					highlight(code, lang) {
						if (!lang) return code
						try {
							return highlight.highlight(lang, code).value
						} catch (error) {
							return code
						}
					},
					langPrefix: 'hljs language-'
				}
			})
			.end()
	})
}
