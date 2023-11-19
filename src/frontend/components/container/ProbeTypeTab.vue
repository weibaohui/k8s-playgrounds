<script setup lang="ts">
import { V1Probe } from '@backend/k8s/model/V1Probe'
import CopyableText from '@frontend/components/common/CopyableText.vue'
import { NTabPane, NTabs, NTag } from 'naive-ui'

const props = defineProps({
  probe: V1Probe,
})
function getDefaultTabName() {
  if (props.probe.httpGet)
    return 'httpGet'
  if (props.probe.exec)
    return 'exec'
  if (props.probe.tcpSocket)
    return 'tcpSocket'
  if (props.probe.grpc)
    return 'grpc'
}
</script>

<template>
  <NTabs
    type="card"
    :default-value="getDefaultTabName()"
    :pane-style="{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#60ddb2' }"
  >
    <NTabPane name="httpGet" :disabled="!props.probe.httpGet" tab="httpGet">
      <CopyableText :text="`${props.probe.httpGet.scheme.toLowerCase()}://${probe.httpGet.host}:${probe.httpGet.port}${probe.httpGet.path}`" />
      <NTag v-for="h in probe.httpGet.httpHeaders" :key="h.name">
        {{ h.name }}={{ h.value }}
      </NTag>
    </NTabPane>
    <NTabPane name="exec" :disabled="!props.probe.exec" tab="exec">
      <CopyableText :text="probe.exec.command.join(' ')" />
    </NTabPane>
    <NTabPane name="tcpSocket" :disabled="!props.probe.tcpSocket" tab="tcpSocket">
      <CopyableText :text="`${probe.tcpSocket.host ? probe.tcpSocket.host : ''}:${probe.tcpSocket.port}`" />
    </NTabPane>
    <NTabPane name="grpc" tab="grpc" :disabled="!props.probe.grpc">
      <CopyableText :text="`${probe.grpc.service}:${probe.grpc.port}`" />
    </NTabPane>
  </NTabs>
</template>

<style scoped>

</style>
