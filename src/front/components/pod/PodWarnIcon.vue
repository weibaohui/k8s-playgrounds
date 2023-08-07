<script setup lang="ts">
import { ExclamationTriangle } from '@vicons/fa'
import { NCard, NIcon, NText, NTooltip } from 'naive-ui'
import { ref } from 'vue'
import { K8sService } from '../../service/k8s/K8sService'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const message = ref('')
async function getPodEventsList() {
  if (props.pod.status.phase === 'Pending' || props.pod.status.phase === 'Failed') {
    const events = await K8sService.eventService.getPodEventList(props.pod)
    message.value = events.filter(r => r.type === 'Warning').map(r => r.message).join(';')
  }
}
getPodEventsList()
</script>

<template>
  <NTooltip v-if="message" trigger="hover">
    <template #trigger>
      <NIcon size="20" :component="ExclamationTriangle" color="#F3CD4E" />
    </template>
    <NCard :title="props.pod.status.phase " size="small">
      <NText type="warning">
        {{ message }}
      </NText>
    </NCard>
  </NTooltip>
</template>

<style scoped>
.n-card {
  max-width: 400px;
}
</style>
