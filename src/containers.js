const container = require('markdown-it-container')
const pug = require('pug')

module.exports = (
	md,
	{
		customBlocks = [
			{
				spoiler: 'tip',
				tag: 'div'
			},
			{
				spoiler: 'success',
				tag: 'div'
			},
			{
				spoiler: 'warning',
				tag: 'div'
			},
			{
				spoiler: 'error',
				tag: 'div'
			}
		],
		demo: {
			spoiler = 'demo',
			tag = 'demo-box',
			renderLanguages = ['html', 'pug', 'jade']
		} = {}
	} = {}
) => {
	md.use(...createDemoContainer({ spoiler, tag, renderLanguages }))
		// explicitly escape Vue syntax
		.use(container, 'v-pre', {
			render: (tokens, idx) =>
				tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
		})

	for (let index = 0; index < customBlocks.length; index++) {
		const customBlock = customBlocks[index]
		md.use(...createCustomContainer(customBlock))
	}
}
function createDemoContainer({ spoiler, tag, renderLanguages }) {
	return [
		container,
		spoiler,
		{
			render(tokens, idx) {
				const token = tokens[idx]
				if (token.nesting === 1) {
					let contentStr = ''

					for (let index = idx + 1; index < 999999; index++) {
						const _token = tokens[index]
						if (_token.nesting === -1) {
							break
						}

						let { content, info } = tokens[index]

						if (!renderLanguages.includes(info)) {
							continue
						}

						if (info === 'pug' || info === 'jade') {
							content = pug.render(content)
						}
						contentStr += content
					}
					return `<${tag} :spoiler="${spoiler}"><template #demo>${contentStr}</template><template #code>`
				} else {
					return `</template></${tag}>\n`
				}
			}
		}
	]
}

function createCustomContainer({ spoiler, tag }) {
	return [
		container,
		spoiler,
		{
			render(tokens, idx) {
				const token = tokens[idx]
				const customTitle = token.info
					.trim()
					.match(new RegExp(`/^${spoiler}\s+(.*)$/`))
				if (token.nesting === 1) {
					return `<${tag} class="custom-block ${spoiler}" :spoiler="${spoiler}">\n`
				} else {
					return `</${tag}>\n`
				}
			}
		}
	]
}
