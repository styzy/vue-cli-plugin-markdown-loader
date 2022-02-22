# Vue CLI Plugin Markdown Loader

这是一款基于 `Vue Cli 4` 的插件，它让你可以直接使用 `import` 命令来引入并格式化 `markdown`，并且内置了`github-markdown-css` 的markdown样式和 `highlight.js` 的代码块解析和 `atom-one-dark` 代码样式。

## 快速安装

```bash
vue add markdown-loader
```

## 示例

### 基本使用
```javascript
<template>
  <div class="markdown-body" v-html="markdown"/>
</template>

<script>
import markdown from "@/assets/markdown.md";

export default {
  data() {
    return {
      markdown
    }
  }
};
</script>
```

>请注意：容器上的 `class="markdown-body"` 是必须的，因为这是 `github-markdown-css` 的样式容器类名。

### 代码块样式

```javascript
// Vue的入口main.js
import 'vue-cli-plugin-markdown-loader/atom-one-dark.css'
```

当然，如果你只喜欢 `github-markdown-css` 的代码样式风格，你也可以不引入。