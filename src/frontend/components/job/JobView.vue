<script setup lang="ts">
import { V1Job } from '@backend/k8s/model/v1Job'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import JobActionView from '@frontend/components/job/JobActionView.vue'
import JobBasicInfoView from '@frontend/components/job/JobBasicInfoView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NMessageProvider } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  job: V1Job,
})

const podList = ref<V1Pod[]>()
async function getPods() {
  const selector = SelectorUtils.getSelector({ matchLabels: props.job.metadata.labels })
  podList.value = await K8sService.playService.podControllerListByLabelSelector({ selector })
}
getPods()
</script>

<template>
  <NMessageProvider>
    <JobActionView :is-dropdown="false" :job="props.job" />
  </NMessageProvider>

  <JobBasicInfoView :job="props.job" :show-title="true" />

  <PodListMiniView :item-list="podList" :show-title="true" />

  <InvolvedEventView :item="props.job.metadata" :show-title="true" />
</template>

<style scoped>

</style>
