module.exports = (api) => {
	api.chainWebpack((webpackConfig) => {
		webpackConfig.module.rules.delete('md')

		webpackConfig.module
			.rule('md')
			.test(/\.md$/)
			.use('vue-loader')
			.loader('vue-loader')
			.end()
			.use('markdown-loader')
			.loader(require.resolve('./src/loader'))
			.end()
	})
}
