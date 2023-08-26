<script setup lang="ts">
import type { V1Event } from '@backend/k8s/model/V1Event'
import { V1ObjectMeta } from '@backend/k8s/model/V1ObjectMeta'
import { ExclamationTriangle } from '@vicons/fa'
import moment from 'moment'
import { NCard, NIcon, NText, NTooltip } from 'naive-ui'
import { ref } from 'vue'
import { K8sService } from '@frontend/service/k8s/K8sService'

const props = defineProps({
  item: V1ObjectMeta,
  skip: Boolean,
})
const events = ref<V1Event[]>()
async function getEventsList() {
  if (props.skip)
    return

  events.value = await K8sService.playService.eventControllerListInvolvedWarningEvenByNsName({
    ns: props.item.namespace,
    name: props.item.name,
  })
}
getEventsList()
</script>

<template>
  <NTooltip v-if="events && events.length > 0 " trigger="hover">
    <template #trigger>
      <NIcon size="20" :component="ExclamationTriangle" color="#F3CD4E" />
    </template>
    <NCard title="Warning" size="small">
      <NText type="warning">
        <span v-for="e in events" :key="e.metadata.name">
          - {{ e.message }} {{ moment(e.lastTimestamp).fromNow() }}
        </span>
      </NText>
    </NCard>
  </NTooltip>
</template>

<style scoped>
.n-card {
  max-width: 400px;
}
</style>
