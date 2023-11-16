<script setup lang="ts">
import { ClipboardHelper } from '@frontend/service/page/ClipboardHelper'
import { NAlert, useMessage } from 'naive-ui'

const props = defineProps({
  text: String,
})

const message = useMessage()

function copy() {
  ClipboardHelper.copyToClipboard(props.text,
    () => {
      message.success('复制成功')
    },
    (error) => {
      message.error(`${props.text}复制出错:${error}`)
    },
  )
}
</script>

<template>
  <NAlert :show-icon="false" :bordered="false" @click="copy()">
    {{ text }}
  </NAlert>
</template>

<style scoped>
</style>
