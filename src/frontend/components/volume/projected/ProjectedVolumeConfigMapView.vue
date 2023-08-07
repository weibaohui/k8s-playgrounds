<script setup lang="ts">
import { NAlert, NDivider } from 'naive-ui'
import { V1VolumeProjection } from '../../../../backend/k8s/model/V1VolumeProjection'

const props = defineProps({
  x: V1VolumeProjection,
})
</script>

<template>
  <NDivider title-placement="left">
    ConfigMap
  </NDivider>
  <NAlert type="success" :show-icon="false">
    Name:{{ x.configMap.name }}
    <br>Items:{{ x.configMap.items.map(r => `${r.key}->${r.path}`).join() }}
  </NAlert>
</template>
