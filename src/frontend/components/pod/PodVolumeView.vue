<script setup lang="ts">
import { Server } from '@vicons/fa'
import { NDivider, NIcon } from 'naive-ui'
import ConfigMapVolumeView from '@frontend/components/volume/ConfigMapVolumeView.vue'
import HostPathVolumeView from '@frontend/components/volume/HostPathVolumeView.vue'
import ProjectedVolumeView from '@frontend/components/volume/projected/ProjectedVolumeView.vue'

import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
</script>

<template>
  <div v-for="v in props.pod.spec.volumes" :key="v.name">
    <NDivider title-placement="left">
      <NIcon :component="Server" />
      {{ v.name }}
    </NDivider>

    <ProjectedVolumeView v-if="v.projected" :v="v" />
    <HostPathVolumeView v-if="v.hostPath" :v="v" />
    <ConfigMapVolumeView v-if="v.configMap" :v="v" />
  </div>
</template>
