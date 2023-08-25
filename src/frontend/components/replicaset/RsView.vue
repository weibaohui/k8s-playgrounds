<script setup lang="ts">
import { V1ReplicaSet } from '@backend/k8s/model/V1ReplicaSet'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import RsActionView from '@frontend/components/replicaset/RsActionView.vue'
import RsBasicInfoView from '@frontend/components/replicaset/RsBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  rs: V1ReplicaSet,
})
// const selector = SelectorUtils.getSelector(props.rs.spec.selector)
// const pods = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
// console.log('podControllerGetPodsByLabelSelector', pods)
</script>

<template>
  <NMessageProvider>
    <RsActionView :is-dropdown="false" :rs="props.rs" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <RsBasicInfoView :rs="rs" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.rs.metadata" />
</template>

<style scoped>

</style>
