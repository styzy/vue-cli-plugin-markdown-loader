module.exports = (api, options) => {
	api.chainWebpack(webpackConfig => {
		webpackConfig.module.rules.delete('md')

		webpackConfig.module
			.rule('md')
			.test(/\.md$/)
			.use('vue-loader')
			.tap(() => {
				return {
					compilerOptions: {
						whitespace: 'condense'
					}
				}
			})
			.loader('vue-loader')
			.end()
			.use('vue-markdown-loader')
			.tap(() => {
				return options.pluginOptions['markdown-loader']
			})
			.loader(require.resolve('./src/vue-markdown-loader'))
			.end()
			.use('markdown-loader')
			.tap(() => {
				return options.pluginOptions['markdown-loader']
			})
			.loader(require.resolve('./src/markdown-loader'))
			.end()
	})
}
