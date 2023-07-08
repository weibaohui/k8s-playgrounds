<script setup lang="ts">
import NodeRoleView from '@render/components/node/NodeRoleView.vue'
import { NBadge, NCollapse, NCollapseItem, NSpace, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'
import moment from 'moment/moment'
import { V1Node } from '../../../model/V1Node'

const props = defineProps({
  item: V1Node,
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
          {{ moment(item.metadata.creationTimestamp).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(item.metadata.creationTimestamp).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.item.metadata.name }}</td>
      </tr>
      <tr>
        <td>Role</td>
        <td>
          <NodeRoleView :node="item" />
        </td>
      </tr>

      <tr v-if="props.item.metadata.labels">
        <td>Labels</td>
        <td>
          <NSpace v-for="(v, k) in props.item.metadata.labels" :key="k">
            <NTag>
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.item.metadata.annotations">
        <td>Annotations</td>
        <td>
          <NSpace v-for="(v, k) in props.item.metadata.annotations" :key="k">
            <NTag v-if="!k.endsWith('last-applied-configuration')">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr>
        <td>Address</td>
        <td>
          <NTag v-for="p in props.item.status.addresses" :key="p.address">
            {{ p.type }}: {{ p.address }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.item.spec.podCIDR">
        <td>podCIDR</td>
        <td>{{ props.item.spec.podCIDR }}</td>
      </tr>
      <tr v-if="props.item.spec.podCIDRs">
        <td>podCIDR</td>
        <td>
          <NTag v-for="p in props.item.spec.podCIDRs" :key="p">
            {{ p }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.architecture">
        <td>architecture</td>
        <td>
          {{ props.item.status.nodeInfo.architecture }}
        </td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.operatingSystem">
        <td>OS</td>
        <td>{{ props.item.status.nodeInfo.operatingSystem }}</td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.osImage">
        <td>osImage</td>
        <td>{{ props.item.status.nodeInfo.osImage }}</td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.kernelVersion">
        <td>kernelVersion</td>
        <td>{{ props.item.status.nodeInfo.kernelVersion }}</td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.containerRuntimeVersion">
        <td>containerRuntime</td>
        <td>{{ props.item.status.nodeInfo.containerRuntimeVersion }}</td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.kubeletVersion">
        <td>kubeletVersion</td>
        <td>{{ props.item.status.nodeInfo.kubeletVersion }}</td>
      </tr>
      <tr v-if="props.item.status.nodeInfo.kubeProxyVersion">
        <td>kubeProxyVersion</td>
        <td>{{ props.item.status.nodeInfo.kubeProxyVersion }}</td>
      </tr>
      <tr v-if="props.item.metadata.ownerReferences">
        <td>Controlled By</td>
        <td>
          <span v-for="r in props.item.metadata.ownerReferences" :key="r.uid">
            {{ r.kind }} {{ r.name }}
          </span>
        </td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td>
          <span v-for="c in props.item.status.conditions" :key="c.type" style="margin-left: 5px">
            <NTag v-if="c.status === 'True'" type="success">
              {{ c.type }}
            </NTag>
            <NTag v-else type="error">
              {{ c.type }}
            </NTag>
          </span>
        </td>
      </tr>

      <tr v-if="props.item.spec.taints?.length">
        <td>taints</td>
        <td>
          <NCollapse>
            <NCollapseItem
              :title="getShowText()" name="1" @click="toggle()"
            >
              <template #header-extra>
                <NBadge :value="props.item.spec.taints.length " />
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
                  <tr v-for="t in props.item.spec.taints" :key="t.key">
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
