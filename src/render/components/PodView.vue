<script setup lang="ts">
import ContainersView from '@render/components/ContainersView.vue'
import PodBasicInfoView from '@render/components/PodBasicInfoView.vue'
import PodVolumesView from '@render/components/PodVolumesView.vue'
import { GameControllerOutline } from '@vicons/ionicons5'
import { NAlert, NButton, NDivider, NIcon, NSpace } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <NSpace>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
    <NButton size="tiny" type="primary">
      <NIcon :component="GameControllerOutline" />
    </NButton>
  </NSpace>
  <NDivider title-placement="left" />
  <PodBasicInfoView :item="props.item" />
  <NAlert type="info" :show-icon="false">
    Containers
  </NAlert>
  <ContainersView :item="props.item" />
  <NAlert type="info" :show-icon="false">
    Volumes
  </NAlert>
  <PodVolumesView :item="props.item" />
</template>

<style scoped>

</style>
