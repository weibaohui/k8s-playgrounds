<script setup lang="ts">
import ConfigMapVolumeView from '@render/components/volume/ConfigMapVolumeView.vue'
import HostPathVolumeView from '@render/components/volume/HostPathVolumeView.vue'
import ProjectedVolumeView from '@render/components/volume/projected/ProjectedVolumeView.vue'
import { Storage24Regular } from '@vicons/fluent'
import { NDivider, NIcon } from 'naive-ui'
import { V1Pod } from '../../../model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <div v-for="v in props.pod.spec.volumes" :key="v.name">
    <NDivider title-placement="left">
      <NIcon :component="Storage24Regular" size="30" />
      {{ v.name }}
    </NDivider>

    <ProjectedVolumeView v-if="v.projected" :v="v" />
    <HostPathVolumeView v-if="v.hostPath" :v="v" />
    <ConfigMapVolumeView v-if="v.configMap" :v="v" />
  </div>
</template>
