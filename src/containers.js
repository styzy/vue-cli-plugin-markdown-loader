const container = require('markdown-it-container')
const pug = require('pug')

module.exports = (md, { demo: { blockName = 'demo', componentName = 'demo-box' } = {} } = {}) => {
	md.use(...createContainer('tip', 'Tip'))
		.use(...createContainer('success', 'Success'))
		.use(...createContainer('warning', 'Warning'))
		.use(...createContainer('danger', 'Danger'))
		.use(...createDemoContainer(blockName, componentName))
		// explicitly escape Vue syntax
		.use(container, 'v-pre', {
			render: (tokens, idx) => (tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`)
		})
}

function createDemoContainer(blockName, componentName) {
	return [
		container,
		blockName,
		{
			render(tokens, idx) {
				const token = tokens[idx]
				if (token.nesting === 1) {
					let info = tokens[idx + 1].info
					content = tokens[idx + 1].content
					if (info === 'pug' || info === 'jade') {
						content = pug.render(content)
					}
					return `<${componentName}><template #default>${content}</template><template #code>`
				} else {
					return `</template></${componentName}}>\n`
				}
			}
		}
	]
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
