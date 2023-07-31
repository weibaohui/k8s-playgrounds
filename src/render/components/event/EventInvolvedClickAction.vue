<script setup lang="ts">
import NodeView from '@render/components/node/NodeView.vue'
import PodView from '@render/components/pod/PodView.vue'
import { useDrawerService } from '@render/service/drawer-service/use-drawer'
import { K8sService } from '@render/service/k8s/K8sService'
import { DrawerHelper } from '@render/service/page/DrawerHelper'
import { NButton } from 'naive-ui'
import { V1Event } from '../../../model/V1Event'

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
