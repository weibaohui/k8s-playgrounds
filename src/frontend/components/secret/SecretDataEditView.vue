<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import { YamlUtils } from '@backend/utils/yamlUtils'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NDivider, useMessage } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})
const message = useMessage()

async function onSaveBtnClicked(key: string, data: string) {
  const cm = await K8sService.playService.secretControllerUpdate({
    ns: props.secret.metadata.namespace,
    name: props.secret.metadata.name,
    key,
    requestBody: { data },
  })
  message.success('更新成功')
}
</script>

<template>
  <div v-for="(v, k) in props.secret.data" :key="k" style="height: 50%;max-height: 100px">
    <NDivider title-placement="left">
      {{ k }}
    </NDivider>
    <MonacoView :item="YamlUtils.removeScalar(v)" :item-key="k" :show-toolbar="true" @on-save-btn-clicked="onSaveBtnClicked" />
  </div>
</template>

<style scoped>

</style>
