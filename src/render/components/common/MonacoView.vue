<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import MonacoEditor from '@liting-yes/vue-monaco-editor'
import YAML from 'yaml'

const props = defineProps({
  item: Object,
})
const options: monaco.editor.IEditorOptions = {
  theme: 'vs-dark',
  autoDetectHighContrast: true,
  automaticLayout: true,
  wordWrap: 'wordWrapColumn',
}

const code = ref('')
const editorRef = shallowRef()

// your action
function formatCode() {
  editorRef.value?.getAction('editor.action.formatDocument').run()
}
function getCode() {
  code.value = YAML.stringify(props.item)
}
getCode()
</script>

<template>
  <MonacoEditor
    :ref="editorRef"
    v-model:value="code"
    class="editor"
    :options="options"
  />
</template>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
}
</style>
