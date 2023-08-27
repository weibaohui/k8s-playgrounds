<script setup lang="ts">
import ResourceConditionView from '@frontend/components/common/ResourceConditionView.vue'
import { CheckCircle, ExclamationCircle } from '@vicons/fa'

import { NBadge, NCollapse, NCollapseItem, NIcon, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'
import NodeRoleView from '@frontend/components/node/NodeRoleView.vue'
import { V1Node } from '@backend/k8s/model/V1Node'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'

const props = defineProps({
  node: V1Node,
})
const isExpended = ref(false)
const expendedText = ref('Hide')

function getShowText() {
  expendedText.value = isExpended.value ? 'Hide' : 'Show'
  return expendedText.value
}

function toggle() {
  isExpended.value = !isExpended.value
}
</script>

<template>
  <ResourceMetadataView :item="props.node.metadata" />

  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Role
        </td>
        <td>
          <NodeRoleView :node="node" />
        </td>
      </tr>
      <tr>
        <td>Address</td>
        <td>
          <NTag v-for="p in props.node.status.addresses" :key="p.address">
            {{ p.type }}: {{ p.address }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.node.spec.podCIDR">
        <td>podCIDR</td>
        <td>{{ props.node.spec.podCIDR }}</td>
      </tr>
      <tr v-if="props.node.spec.podCIDRs">
        <td>podCIDR</td>
        <td>
          <NTag v-for="p in props.node.spec.podCIDRs" :key="p">
            {{ p }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.architecture">
        <td>architecture</td>
        <td>
          {{ props.node.status.nodeInfo.architecture }}
        </td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.operatingSystem">
        <td>OS</td>
        <td>{{ props.node.status.nodeInfo.operatingSystem }}</td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.osImage">
        <td>osImage</td>
        <td>{{ props.node.status.nodeInfo.osImage }}</td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.kernelVersion">
        <td>kernelVersion</td>
        <td>{{ props.node.status.nodeInfo.kernelVersion }}</td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.containerRuntimeVersion">
        <td>containerRuntime</td>
        <td>{{ props.node.status.nodeInfo.containerRuntimeVersion }}</td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.kubeletVersion">
        <td>kubeletVersion</td>
        <td>{{ props.node.status.nodeInfo.kubeletVersion }}</td>
      </tr>
      <tr v-if="props.node.status.nodeInfo.kubeProxyVersion">
        <td>kubeProxyVersion</td>
        <td>{{ props.node.status.nodeInfo.kubeProxyVersion }}</td>
      </tr>
      <tr v-if="props.node.metadata.ownerReferences">
        <td>Controlled By</td>
        <td>
          <span v-for="r in props.node.metadata.ownerReferences" :key="r.uid">
            {{ r.kind }} {{ r.name }}
          </span>
        </td>
      </tr>
      <tr>
        <td>
          schedule
        </td>
        <td>
          <NTag v-if="props.node.spec.unschedulable" type="error">
            Unschedulable
            <template #icon>
              <NIcon :component="ExclamationCircle" />
            </template>
          </NTag>
          <NTag v-else type="success">
            Schedulable
            <template #icon>
              <NIcon :component="CheckCircle" />
            </template>
          </NTag>
        </td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td><ResourceConditionView :items="props.node.status.conditions" /></td>
      </tr>
      <tr v-if="props.node.spec.taints?.length">
        <td>taints</td>
        <td>
          <NCollapse>
            <NCollapseItem
              :title="getShowText()" name="1" @click="toggle()"
            >
              <template #header-extra>
                <NBadge :value="props.node.spec.taints.length " />
              </template>
              <NTable :single-line="false">
                <thead>
                  <tr>
                    <th>key</th>
                    <th>value</th>
                    <th>effect</th>
                    <th>timeAdded</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in props.node.spec.taints" :key="t.key">
                    <td>{{ t.key }}</td>
                    <td>{{ t.value }}</td>
                    <td>{{ t.effect }}</td>
                    <td>{{ t.timeAdded }}</td>
                  </tr>
                </tbody>
              </NTable>
            </NCollapseItem>
          </NCollapse>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
