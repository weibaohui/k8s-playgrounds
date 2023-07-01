<script setup lang="ts">
import { NAlert, NDivider } from 'naive-ui'
import { V1VolumeProjection } from '../../model/V1VolumeProjection'

const props = defineProps({
  x: V1VolumeProjection,
})
</script>

<template>
  <NDivider title-placement="left">
    ServiceAccount
  </NDivider>
  <NAlert type="success" :show-icon="false">
    <div>
      expirationSeconds:{{ props.x.serviceAccountToken.expirationSeconds }}
    </div>
    <div>
      path:{{ props.x.serviceAccountToken.path }}
    </div>
  </NAlert>
</template>

<style scoped>

</style>
