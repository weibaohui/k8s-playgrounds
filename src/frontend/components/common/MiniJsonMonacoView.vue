<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as monaco from 'monaco-editor'

const props = defineProps({
  item: Object,
  minHeight: Number,
})
const monacoEditorRef = ref()
const editor = ref<monaco.editor.IStandaloneCodeEditor>()

onMounted(() => {
  editor.value = monaco.editor.create(monacoEditorRef.value, {
    automaticLayout: true,
    bracketPairColorization: {
      enabled: true,
      independentColorPoolPerBracketType: true,
    },
    copyWithSyntaxHighlighting: true,
    cursorSmoothCaretAnimation: 'on',
    emptySelectionClipboard: false,
    find: {
      addExtraSpaceOnTop: true,
    },
    wordWrap: 'on',
    wrappingStrategy: 'advanced',
    autoIndent: 'full',
    lineNumbers: 'off',
    foldingImportsByDefault: false,
    matchOnWordStartOnly: true,
    mouseWheelZoom: true,
    smoothScrolling: true,
    tabSize: 2,
    wrappingIndent: 'indent',
    autoClosingBrackets: 'always',
    autoSurround: 'languageDefined',
    language: 'json',
    theme: 'vs-dark',
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    value: typeof props.item === 'string' ? props.item : JSON.stringify(props.item, null, '\t'),
  })
})
</script>

<template>
  <div
    ref="monacoEditorRef" class="vue-monaco-editor"
    :style="{
      minHeight: `${props.minHeight ? props.minHeight : 200}px`,
    }"
  />
</template>

<style scoped>
.vue-monaco-editor {
  min-height: 10px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  resize: vertical;
  overflow: auto;
}
</style>
