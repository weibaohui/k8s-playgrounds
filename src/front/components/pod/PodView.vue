<script setup lang="ts">
import { NH6, NMessageProvider, NText } from 'naive-ui'
import ContainersView from '../../components/container/ContainersView.vue'
import PodActionView from '../../components/pod/PodActionView.vue'
import PodBasicInfoView from '../../components/pod/PodBasicInfoView.vue'
import PodEventsView from '../../components/pod/PodEventView.vue'
import PodVolumesView from '../../components/pod/PodVolumeView.vue'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <NMessageProvider>
    <PodActionView :is-dropdown="false" :pod="props.pod" />
  </NMessageProvider>

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PodBasicInfoView :pod="props.pod" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Containers
    </NText>
  </NH6>
  <ContainersView :pod="props.pod" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Volumes
    </NText>
  </NH6>
  <PodVolumesView :pod="props.pod" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <PodEventsView :pod="props.pod" />
</template>
