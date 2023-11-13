<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import { YamlUtils } from '@backend/utils/yamlUtils'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NTabPane, NTabs, useMessage } from 'naive-ui'

const props = defineProps({
  cm: V1ConfigMap,
})
const message = useMessage()

async function onSaveBtnClicked(key: string, data: string) {
  const cm = await K8sService.playService.configmapControllerUpdate({
    ns: props.cm.metadata.namespace,
    name: props.cm.metadata.name,
    key,
    requestBody: { data },
  })
  message.success('更新成功')
}
</script>

<template>
  <NTabs type="card">
    <NTabPane v-for="(v, k) in props.cm.data" :key="k" :name="k" :tab="k">
      <div style="height: 100%;min-height: 20px">
        <MonacoView :item="YamlUtils.removeScalar(v)" :item-key="k" :save-action-override="true" @on-save-btn-clicked="onSaveBtnClicked" />
      </div>
    </NTabPane>
  </NTabs>
</template>

<style scoped>

</style>
