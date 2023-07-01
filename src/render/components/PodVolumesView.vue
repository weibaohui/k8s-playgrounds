<script setup lang="ts">
import HostPathVolumeView from '@render/components/HostPathVolumeView.vue'
import ProjectedVolumeView from '@render/components/ProjectedVolumeView.vue'
import { Square16Filled } from '@vicons/fluent'
import { NDivider, NIcon } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <div v-for="v in props.item.spec.volumes" :key="v.name">
    <NDivider title-placement="left">
      <NIcon :component="Square16Filled" color="green" />
      {{ v.name }}
    </NDivider>
    <ProjectedVolumeView v-if="v.projected" :v="v" />
    <HostPathVolumeView v-if="v.hostPath" :v="v" />
  </div>
</template>
