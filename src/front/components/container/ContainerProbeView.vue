<script setup lang="ts">
import { NTag } from 'naive-ui'
import { V1Probe } from '../../../model/V1Probe'

const props = defineProps({
  probe: V1Probe,
})
</script>

<template>
  <NSpace v-if="props.probe">
    <div v-if="props.probe.httpGet">
      <NTag type="success">
        http-get
      </NTag>
      <NTag type="success">
        {{ props.probe.httpGet.scheme.toLowerCase() }}://{{ probe.httpGet.host }}:{{ probe.httpGet.port }}{{ probe.httpGet.path }}
      </NTag>
      <NTag v-for="h in probe.httpGet.httpHeaders" :key="h.name">
        {{ h.name }}={{ h.value }}
      </NTag>
    </div>
    <div v-if="probe.exec">
      <NTag type="success">
        exec
      </NTag>
      <NTag type="success">
        {{ probe.exec.command }}
      </NTag>
    </div>
    <div v-if="probe.tcpSocket">
      <NTag type="success">
        tcpSocket
      </NTag>
      <NTag type="success">
        {{ probe.tcpSocket.host }}:{{ probe.tcpSocket.port }}
      </NTag>
    </div>
    <div v-if="probe.grpc">
      <NTag type="success">
        grpc
      </NTag>
      <NTag type="success">
        :{{ probe.grpc.port }}/{{ probe.grpc.service }}
      </NTag>
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

<style scoped>

</style>
