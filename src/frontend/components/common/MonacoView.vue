<script lang="ts" setup>
import { NButton, NButtonGroup, NHr } from 'naive-ui'
import { onMounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor'
import YAML from 'yaml'

const props = defineProps({
  item: Object,
  showToolbar: Boolean,
  itemKey: String,
})
const emit = defineEmits(['onSaveBtnClicked'])
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
    foldingImportsByDefault: false,
    matchOnWordStartOnly: true,
    mouseWheelZoom: true,
    smoothScrolling: true,
    tabSize: 2,
    wrappingIndent: 'indent',
    autoClosingBrackets: 'always',
    autoSurround: 'languageDefined',
    language: 'yaml',
    theme: 'vs-dark',
    fontSize: 16,
    value: typeof props.item === 'string' ? props.item : YAML.stringify(props.item),
  })
})

function onSaveBtnClicked() {
  emit('onSaveBtnClicked', props.itemKey, toRaw(editor.value).getValue())
}
</script>

<template>
  <NButtonGroup v-if="props.showToolbar === true">
    <NButton type="success" @click="onSaveBtnClicked">
      Save
    </NButton>
  </NButtonGroup>
  <NHr />
  <div ref="monacoEditorRef" class="vue-monaco-editor" />
</template>

<style scoped>
.vue-monaco-editor {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>
