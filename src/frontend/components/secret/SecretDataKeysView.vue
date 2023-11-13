<script setup lang="ts">
import { V1Secret } from '@backend/k8s/model/V1Secret'
import { ResType } from '@backend/k8s/watch/watch.model'
import SecretView from '@frontend/components/secret/SecretView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NSpace, NTag } from 'naive-ui'

const props = defineProps({
  secret: V1Secret,
})

const drawer = useDrawerService()

function show() {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`${ResType.Secret}:${props.secret.metadata.name}`, SecretView, { secret: props.secret })
}
</script>

<template>
  <NSpace v-for="(v, k) in props.secret.data" :key="k" :vertical="false">
    <NTag :color="{ color: ColorHelper.randomColor() }">
      <span @click="show">
        {{ k }}
      </span>
    </NTag>
  </NSpace>
</template>

<style scoped>

</style>
