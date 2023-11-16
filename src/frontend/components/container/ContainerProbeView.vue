<script setup lang="ts">
import { V1Probe } from '@backend/k8s/model/V1Probe'
import CopyableText from '@frontend/components/common/CopyableText.vue'
import ProbeType from '@frontend/components/container/ProbeType.vue'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  probe: V1Probe,
})
</script>

<template>
  <NSpace v-if="props.probe">
    <div v-if="props.probe.httpGet">
      <ProbeType type="httpGet" />
      <CopyableText :text="`${props.probe.httpGet.scheme.toLowerCase()}://${probe.httpGet.host}:${probe.httpGet.port}${probe.httpGet.path}`" />
      <NTag v-for="h in probe.httpGet.httpHeaders" :key="h.name">
        {{ h.name }}={{ h.value }}
      </NTag>
    </div>
    <div v-if="probe.exec">
      <ProbeType type="exec" />
      <CopyableText :text="probe.exec.command.join(' ')" />
    </div>
    <div v-if="probe.tcpSocket">
      <ProbeType type="tcpSocket" />
      <CopyableText :text="`${probe.tcpSocket.host}:${probe.tcpSocket.port}`" />
    </div>
    <div v-if="probe.grpc">
      <ProbeType type="grpc" />
      <CopyableText :text="`${probe.grpc.service}:${probe.grpc.port}`" />
    </div>
    <NSpace>
      <NTag type="success">
        delay={{ probe.initialDelaySeconds }}s
      </NTag>
      <NTag type="success">
        period={{ probe.periodSeconds }}s
      </NTag>
      <NTag type="success">
        timeout={{ probe.timeoutSeconds }}s
      </NTag>
      <NTag type="success">
        #success={{ probe.successThreshold }}
      </NTag>
      <NTag type="success">
        #failure={{ probe.failureThreshold }}
      </NTag>
    </NSpace>
  </NSpace>
</template>
