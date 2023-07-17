<script setup lang="ts">
import { K8sService } from '@render/service/k8s/K8sService'
import { WarningSharp } from '@vicons/ionicons5'
import { NCard, NIcon, NText, NTooltip } from 'naive-ui'
import { ref } from 'vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const message = ref('')
async function getPodEventsList() {
  if (props.pod.status.phase === 'Pending' || props.pod.status.phase === 'Failed') {
    const events = await K8sService.eventService.getPodEventsList(props.pod)
    message.value = events.filter(r => r.type === 'Warning').map(r => r.message).join(';')
  }
}
getPodEventsList()
</script>

<template>
  <NTooltip v-if="message" trigger="hover">
    <template #trigger>
      <NIcon size="20" :component="WarningSharp" color="#F3CD4E" />
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
