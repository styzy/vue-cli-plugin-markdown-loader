const container = require('markdown-it-container')

module.exports = (md) => {
	md.use(...createContainer('tip', 'Tip'))
		.use(...createContainer('success', 'Success'))
		.use(...createContainer('warning', 'Warning'))
		.use(...createContainer('danger', 'Danger'))
		// explicitly escape Vue syntax
		.use(container, 'v-pre', {
			render: (tokens, idx) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`)
		})
}

function createContainer(className, defaultTitle) {
	return [
		container,
		className,
		{
			render(tokens, idx) {
				const token = tokens[idx]
				const customTitle = token.info.trim().match(new RegExp(`/^${className}\s+(.*)$/`))
				if (token.nesting === 1) {
					return `<div class="${className} custom-block"><p class="custom-block-title">${
						customTitle || defaultTitle
					}</p>\n`
				} else {
					return `</div>\n`
				}
			}
		}
	]
}
