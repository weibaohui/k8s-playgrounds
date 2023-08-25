<script setup lang="ts">
import { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import InvolvedEventView from '@frontend/components/common/InvolvedEventView.vue'
import StsActionView from '@frontend/components/statefulset/StsActionView.vue'
import StsBasicInfoView from '@frontend/components/statefulset/StsBasicInfoView.vue'
import { NH6, NMessageProvider, NText } from 'naive-ui'

const props = defineProps({
  sts: V1StatefulSet,
})
// const selector = SelectorUtils.getSelector(props.sts.spec.selector)
// const pods = await K8sService.playService.podControllerGetPodsByLabelSelector({ selector })
// console.log('podControllerGetPodsByLabelSelector', pods)
</script>

<template>
  <NMessageProvider>
    <StsActionView :is-dropdown="false" :sts="props.sts" />
  </NMessageProvider>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <StsBasicInfoView :sts="sts" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <InvolvedEventView :item="props.sts.metadata" />
</template>

<style scoped>

</style>
