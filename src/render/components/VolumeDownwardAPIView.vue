<script setup lang="ts">
import { NAlert, NDivider } from 'naive-ui'
import { V1VolumeProjection } from '../../model/V1VolumeProjection'

const props = defineProps({
  x: V1VolumeProjection,
})
</script>

<template>
  <NDivider title-placement="left">
    Downward API
  </NDivider>
  <NAlert type="success" :show-icon="false">
    <div v-for="d in x.downwardAPI.items" :key="d.path">
      <div v-if="d.fieldRef">
        {{ d.path }} -> {{ d.mode }} {{ d.fieldRef.apiVersion }}/{{ d.fieldRef.fieldPath }}
      </div>
      <div v-if="d.resourceFieldRef">
        {{ d.path }} -> {{ d.mode }} {{ d.resourceFieldRef.containerName }}:{{ d.resourceFieldRef.resource }}
      </div>
    </div>
  </NAlert>
</template>
