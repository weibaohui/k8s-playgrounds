<script setup lang="ts">
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import type { V1Secret } from '@backend/k8s/model/V1Secret'
import { Base64Util } from '@backend/utils/base64Util'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { EyeRegular, EyeSlash } from '@vicons/fa'
import { NButton, NIcon, NInput, useMessage } from 'naive-ui'
import type { Component } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  v: String,
  k: String,
  meta: V1ObjectMeta,
})
const message = useMessage()
const secretValue = ref(props.v)
const eyeIcon = ref<Component>()
async function onSeeBtnClicked() {
  secretValue.value = Base64Util.validate(secretValue.value) ? atob(secretValue.value) : btoa(secretValue.value)
  eyeIcon.value = Base64Util.validate(secretValue.value) ? EyeSlash : EyeRegular
}
async function onSaveBtnClicked() {
  const isBase64 = Base64Util.validate(secretValue.value)
  if (!isBase64) {
    message.error('格式错误')
    return
  }
  const data = isBase64 ? secretValue.value : btoa(secretValue.value)

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
eyeIcon.value = Base64Util.validate(secretValue.value) ? EyeSlash : EyeRegular
</script>

<template>
  <NInput v-model:value="secretValue" type="textarea" />
  <NButton strong secondary circle type="error" @click="onSeeBtnClicked">
    <template #icon>
      <NIcon :component="eyeIcon" />
    </template>
  </NButton>
  <NButton type="success" @click="onSaveBtnClicked">
    Save
  </NButton>
</template>

<style scoped>

</style>
