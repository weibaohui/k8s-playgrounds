<script setup lang="ts">
import { V1Job } from '@backend/k8s/model/v1Job'
import type { V1Pod } from '@backend/k8s/model/V1Pod'
import { SelectorUtils } from '@backend/utils/SelectorUtils'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import JobActionView from '@frontend/components/job/JobActionView.vue'
import JobBasicInfoView from '@frontend/components/job/JobBasicInfoView.vue'
import PodListMiniView from '@frontend/components/pod/PodListMiniView.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { NH6, NMessageProvider, NText } from 'naive-ui'
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
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <JobBasicInfoView :job="props.job" />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Pods (filter by label )
    </NText>
  </NH6>
  <PodListMiniView :item-list="podList" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.job.metadata" />
</template>

<style scoped>

</style>
