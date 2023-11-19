<script setup lang="ts">
import { V1Probe } from '@backend/k8s/model/V1Probe'
import ProbeTypeTab from '@frontend/components/container/ProbeTypeTab.vue'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  probe: V1Probe,
})
</script>

<template>
  <NSpace v-if="props.probe">
    <NSpace>
      <ProbeTypeTab :probe="probe" />
    </NSpace>
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
