<script setup lang="ts">
import { V1CronJob } from '@backend/k8s/model/v1CronJob'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import CronJobActionView from '@frontend/components/cronjob/CronJobActionView.vue'
import CronJobBasicInfoView from '@frontend/components/cronjob/CronJobBasicInfoView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  cj: V1CronJob,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector({ matchLabels: props.cj.metadata.labels })
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <CronJobActionView :is-dropdown="false" :cj="props.cj" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <CronJobBasicInfoView :cj="props.cj" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.cj.metadata" />
</template>

<style scoped>

</style>
