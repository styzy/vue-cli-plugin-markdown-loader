# Vue CLI Plugin Markdown Loader

这是一款基于 `Vue Cli 4` 的插件，它让你可以直接将 `markdown` 当做 `Vue` 的组件来使用。
`vue-cli-plugin-markdown-loader` 基于 `markdown-it` 实现，并且内置了 `markdown-it-emoji` 和 `markdown-it-container` 插件。样式上集成了 `github-markdown-css` 的语法样式以及 `highlight.js` 的代码风格样式。

## 快速安装

```bash
vue add markdown-loader
```

## 基本使用

```javascript
< template >
    Markdown <
    /template>

    <
    script >
    import Markdown from "@/assets/markdown.md";

export default {
    components: {
        Markdown
    }
}; <
/script>
```

<!-- >请注意：容器上的 `class="markdown-body"` 是必须的，因为这是 `github-markdown-css` 的样式容器类名。 -->

## 代码块样式

### 必选样式 github-markdown-css

```javascript
// Vue的入口main.js
import 'github-markdown-css'
```

因为markdown的基本样式都依靠 `github-markdown-css` 渲染，所以这是必须引入的样式

### 可选样式 highlight.js代码风格

```javascript
// Vue的入口main.js
import 'highlight.js/styles/atom-one-dark.css'
// 注意：如果使用了highlight.js的atom-one-dark代码风格，请引入下方的atom-one-dark.fixed.css,修复因为与github-markdown-css样式冲突带来的问题。
import 'vue-cli-plugin-markdown-loader/atom-one-dark.fixed.css'
```

## 配置

```javascript
// vue.config.js

pluginOptions: {
    'markdown-loader': {
        container: {
            demo: {
                // demo容器的名字，用于匹配关键字
                blockName: 'demo',
                // 渲染的vue组件名
                componentName: 'demo-box'
            }
        },
        // 是否使用缓存，默认为true
        useCache: false
    }
}
```

## 示例

[VueTabRouter](http://vue-tab-router.styzy.cn) 官方文档基于 `vue-cli-plugin-markdown-loader` 实现，可以参考该文档 `markdown` 样式。

## 引用

[markdown-it](https://github.com/markdown-it/markdown-it)

[markdown-it-container](https://github.com/markdown-it/markdown-it-container)

[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)

[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

[highlight.js](https://github.com/highlightjs/highlight.js)
