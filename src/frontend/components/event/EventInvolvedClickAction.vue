<script setup lang="ts">
import { NButton } from 'naive-ui'
import NodeView from '@frontend/components/node/NodeView.vue'
import PodView from '@frontend/components/pod/PodView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { V1Event } from '@backend/k8s/model/V1Event'

const props = defineProps({
  event: V1Event,
})
const drawer = useDrawerService()
async function openDrawer() {
  const ns = props.event.involvedObject.namespace
  const name = props.event.involvedObject.name
  const kind = props.event.involvedObject.kind
  switch (kind) {
    case 'Pod':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(name, PodView, { pod: await K8sService.podService.getPod(ns, name) })
      break
    case 'Node':
      DrawerHelper
        .instance
        .drawer(drawer)
        .show(name, NodeView, { node: await K8sService.nodeService.getNode(name) })
      break
    default:
      alert(`${kind}尚未实现`)
  }
}
</script>

<template>
  <NButton text @click="openDrawer">
    {{ event.involvedObject.kind }}:{{ event.involvedObject.name }}
  </NButton>
</template>

<style scoped>

</style>
