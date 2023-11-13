<script setup lang="ts">
import { V1ConfigMap } from '@backend/k8s/model/V1ConfigMap'
import { ResType } from '@backend/k8s/watch/watch.model'
import CmView from '@frontend/components/configmap/CmView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  cm: V1ConfigMap,
})
const drawer = useDrawerService()

function show() {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.ConfigMap}:${props.cm.metadata.name}`, CmView, { cm: props.cm })
}
</script>

<template>
  <NSpace v-for="(v, k) in props.cm.data" :key="k" :vertical="false">
    <NTag :color="{ color: ColorHelper.randomColor() }">
      <span @click="show">
        {{ k }}
      </span>
    </NTag>
  </NSpace>
</template>

<style scoped>

</style>
