# Vue CLI Plugin Markdown Loader

这是一款基于 `Vue Cli 4` 的插件，它让你可以直接使用 `import` 命令来引入并格式化 `markdown`，并且内置了 `highlight.js` 的代码块解析和样式。

## 快速安装

```bash
vue add markdown
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

>请注意：容器上的 `class="markdown-body"` 是必须的，因为这是 `highlight.js` 的样式容器类名。

### 代码块样式

```javascript
// Vue的入口main.js
import 'highlight.js/styles/atom-one-dark.css'
```