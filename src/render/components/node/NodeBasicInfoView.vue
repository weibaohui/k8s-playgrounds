<script setup lang="ts">
import NodeRoleView from '@render/components/node/NodeRoleView.vue'
import { CheckmarkCircle } from '@vicons/ionicons5'
import { NBadge, NCollapse, NCollapseItem, NIcon, NSpace, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'
import moment from 'moment/moment'
import { V1Node } from '../../../model/V1Node'

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
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Created
        </td>
        <td>
          {{ moment(node.metadata.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(node.metadata.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.node.metadata.name }}</td>
      </tr>
      <tr>
        <td>Role</td>
        <td>
          <NodeRoleView :node="node" />
        </td>
      </tr>

      <tr v-if="props.node.metadata.labels">
        <td>Labels</td>
        <td>
          <NSpace v-for="(v, k) in props.node.metadata.labels" :key="k">
            <NTag>
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.node.metadata.annotations">
        <td>Annotations</td>
        <td>
          <NSpace v-for="(v, k) in props.node.metadata.annotations" :key="k">
            <NTag v-if="!k.endsWith('last-applied-configuration')">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
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
          </NTag>
          <NTag v-else type="success">
            Schedulable
          </NTag>
        </td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td>
          <span v-for="c in props.node.status.conditions" :key="c.type" style="margin-left: 5px">
            <NTag v-if="c.status === 'True' && c.type === 'Ready'" type="success">
              {{ c.type }}
              <template #icon>
                <NIcon :component="CheckmarkCircle" />
              </template>
            </NTag>
            <NTag v-else-if="c.status === 'False' && c.type.endsWith('Pressure') " type="success">
              {{ c.type }}
              <template #icon>
                <NIcon :component="CheckmarkCircle" />
              </template>
            </NTag>
            <NTag v-else type="error">
              {{ c.type }}
            </NTag>
          </span>
        </td>
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
