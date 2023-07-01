<script setup lang="ts">
import VolumeConfigMapView from '@render/components/volume/projected/ProjectedVolumeConfigMapView.vue'
import VolumeDownwardAPIView from '@render/components/volume/projected/ProjectedVolumeDownwardAPIView.vue'
import VolumeServiceAccountView from '@render/components/volume/projected/ProjectedVolumeServiceAccountView.vue'
import { NTable } from 'naive-ui'
import { V1Volume } from '../../../../model/V1Volume'

const props = defineProps({
  v: V1Volume,
})
</script>

<template>
  <NTable bordered :single-line="false">
    <tr>
      <td class="left">
        Kind
      </td>
      <td>projected</td>
    </tr>
    <tr>
      <td>Default Mount Mode</td>
      <td>{{ props.v.projected.defaultMode }}</td>
    </tr>
    <tr>
      <td>source</td>
      <td>
        <div v-for="x in props.v.projected.sources" :key="x">
          <VolumeServiceAccountView v-if="x.serviceAccountToken" :x="x" />
          <VolumeConfigMapView v-if="x.configMap" :x="x" />
          <VolumeDownwardAPIView v-if="x.downwardAPI" :x="x" />
        </div>
      </td>
    </tr>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
