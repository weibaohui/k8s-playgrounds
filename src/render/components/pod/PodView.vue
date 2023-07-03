<script setup lang="ts">
import ContainersView from '@render/components/container/ContainersView.vue'
import PodActions from '@render/components/pod/PodActions.vue'
import PodBasicInfoView from '@render/components/pod/PodBasicInfoView.vue'
import PodEventsView from '@render/components/event/PodEventsView.vue'
import PodVolumesView from '@render/components/volume/PodVolumesView.vue'
import { NH6, NText } from 'naive-ui'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <PodActions />

  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Basic Info
    </NText>
  </NH6>
  <PodBasicInfoView :item="props.item" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Containers
    </NText>
  </NH6>
  <ContainersView :item="props.item" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Volumes
    </NText>
  </NH6>
  <PodVolumesView :item="props.item" />
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      Events
    </NText>
  </NH6>
  <PodEventsView :pod="props.item" />
</template>
