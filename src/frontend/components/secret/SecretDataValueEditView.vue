<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1Secret } from '@backend/k8s/model/V1Secret'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NButton, NInput, useMessage } from 'naive-ui'
import { isBase64 } from 'is-base64'
import { ref } from 'vue'

const props = defineProps({
  v: String,
  k: String,
  meta: V1ObjectMeta,
})
const message = useMessage()
const secretValue = ref(props.v)
async function onSeeBtnClicked() {
  secretValue.value = isBase64(secretValue.value) ? atob(secretValue.value) : btoa(secretValue.value)
}
async function onSaveBtnClicked() {
  const data = isBase64(secretValue.value) ? secretValue.value : btoa(secretValue.value)
  K8sService.playService.secretControllerUpdate({
    ns: props.meta.namespace,
    name: props.meta.name,
    key: props.k,
    requestBody: { data },
  }).then((resp) => {
    const secret = resp.body as V1Secret
    if (secret.data[props.k] === data)
      message.success('更新成功')
    else
      message.error('更新失败')
  })
}
</script>

<template>
  <NInput
    v-model:value="secretValue"
    type="text"
    placeholder="基本的 Textarea"
  />
  <NButton type="success" @click="onSeeBtnClicked">
    c
  </NButton>
  <NButton type="success" @click="onSaveBtnClicked">
    Save
  </NButton>
</template>

<style scoped>

</style>
