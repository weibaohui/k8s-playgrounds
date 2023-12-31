<script lang="ts" setup>
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NButton, NButtonGroup, NHr } from 'naive-ui'
import { onMounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor'
import YAML from 'yaml'

const props = defineProps({
  item: Object,
  saveActionOverride: Boolean,
  itemKey: String,
  minHeight: Number,
})
const emit = defineEmits(['onSaveBtnClicked'])
const monacoEditorRef = ref()
const editor = ref<monaco.editor.IStandaloneCodeEditor>()
const drawer = useDrawerService()

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

async function onSaveBtnClicked() {
  emit('onSaveBtnClicked', props.itemKey, toRaw(editor.value).getValue())
  if (props.saveActionOverride !== true) {
    K8sService.playService.clientControllerUpdate({
      requestBody: [toRaw(editor.value).getValue({
        preserveBOM: false,
        lineEnding: '',
      })],
    })
  }
  drawer.close()
}
</script>

<template>
  <NButtonGroup>
    <NButton type="success" @click="onSaveBtnClicked">
      Save
    </NButton>
  </NButtonGroup>
  <NHr />
  <div
    ref="monacoEditorRef" class="vue-monaco-editor"
    :style="{
      minHeight: `${props.minHeight ? props.minHeight : 800}px`,
    }"
  />
</template>

<style scoped>
.vue-monaco-editor {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  resize: vertical;
  overflow: auto;
}
</style>
