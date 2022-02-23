# Vue CLI Plugin Markdown Loader

这是一款基于 `Vue Cli 4` 的插件，它让你可以直接将 `markdown` 当做 `Vue` 的组件来使用。
`vue-cli-plugin-markdown-loader` 基于 `markdown-it` 实现，并且内置了 `markdown-it-emoji` 和 `markdown-it-container` 插件。样式上集成了 `github-markdown-css` 的语法样式以及 `highlight.js` 的代码风格样式。

## 快速安装

```bash
vue add markdown-loader
```

## 基本使用
```javascript
<template>
  Markdown
</template>

<script>
import Markdown from "@/assets/markdown.md";

export default {
  components: {
    Markdown
  }
};
</script>
```

<!-- >请注意：容器上的 `class="markdown-body"` 是必须的，因为这是 `github-markdown-css` 的样式容器类名。 -->

## 代码块样式

```javascript
// Vue的入口main.js

// 引入github的markdown风格样式
import 'github-markdown-css'
// 引入highlight.js内置的代码风格样式，风格可以自己选择
import 'highlight.js/styles/atom-one-dark.css'
```

## 示例

[VueTabRouter](http://vue-tab-router.styzy.cn) 官方文档基于 `vue-cli-plugin-markdown-loader` 实现。

## 引用

[markdown-it](https://github.com/markdown-it/markdown-it)
[markdown-it-container](https://github.com/markdown-it/markdown-it-container)
[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)
[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
[highlight.js](https://github.com/highlightjs/highlight.js)