<script setup lang="ts">
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import { CheckCircle, ExclamationCircle } from '@vicons/fa'
import { NBadge, NButton, NCollapse, NCollapseItem, NIcon, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'
import ContainerStatusText from '@frontend/components/container/ContainerStatusText.vue'
import NodeView from '@frontend/components/node/NodeView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { V1Pod } from '@backend/k8s/model/V1Pod'

const props = defineProps({
  pod: V1Pod,
})
const isExpended = ref(false)
const expendedText = ref('Hide')
const drawer = useDrawerService()

function getShowText() {
  expendedText.value = isExpended.value ? 'Hide' : 'Show'
  return expendedText.value
}

function toggle() {
  isExpended.value = !isExpended.value
}
async function showNodeView(name: string) {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`Node:${name}`, NodeView, { node: await K8sService.playService.nodeControllerGetNode({ name }) })
}
</script>

<template>
  <ResourceMetadataView :item="props.pod.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Status
        </td>
        <td>
          <ContainerStatusText :pod="props.pod" />
        </td>
      </tr>
      <tr>
        <td>Node</td>
        <td>
          <NButton text @click="showNodeView(props.pod.spec.nodeName)">
            {{ props.pod.spec.nodeName }}
          </NButton>
        </td>
      </tr>
      <tr>
        <td>Pod IP</td>
        <td>{{ props.pod.status.podIP }}</td>
      </tr>
      <tr>
        <td>Pod IPs</td>
        <td>
          <NTag v-for="p in props.pod.status.podIPs" :key="p.ip">
            {{ p.ip }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.pod.spec.dnsPolicy">
        <td>dnsPolicy</td>
        <td>{{ props.pod.spec.dnsPolicy }}</td>
      </tr>
      <tr v-if="props.pod.spec.schedulerName">
        <td>schedulerName</td>
        <td>{{ props.pod.spec.schedulerName }}</td>
      </tr>
      <tr v-if="props.pod.spec.restartPolicy">
        <td>restartPolicy</td>
        <td>{{ props.pod.spec.restartPolicy }}</td>
      </tr>
      <tr v-if="props.pod.spec.serviceAccount">
        <td>Service Account</td>
        <td>{{ props.pod.spec.serviceAccount }}</td>
      </tr>
      <tr v-if="props.pod.spec.priorityClassName">
        <td>Priority Class</td>
        <td>{{ props.pod.spec.priorityClassName }}</td>
      </tr>
      <tr>
        <td>QoS Class</td>
        <td>{{ props.pod.status.qosClass }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td>
          <span v-for="c in props.pod.status.conditions" :key="c.type" style="margin-left: 5px">
            <NTag v-if="c.status === 'True'" type="success">
              {{ c.type }}
              <template #icon>
                <NIcon :component="CheckCircle" />
              </template>
            </NTag>
            <NTag v-else type="error">
              {{ c.type }}
              <template #icon>
                <NIcon :component="ExclamationCircle" />
              </template>
            </NTag>
          </span>
        </td>
      </tr>
      <tr v-if="props.pod.spec.nodeSelector">
        <td>Node Selector</td>
        <td>
          <NTag v-for="(v, k) in props.pod.spec.nodeSelector" :key="k">
            {{ k }}:{{ v }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.pod.spec.tolerations.length">
        <td>Tolerations</td>
        <td>
          <NCollapse>
            <NCollapseItem
              :title="getShowText()" name="1" @click="toggle()"
            >
              <template #header-extra>
                <NBadge :value="props.pod.spec.tolerations.length " />
              </template>
              <NTable :single-line="false">
                <thead>
                  <tr>
                    <th>key</th>
                    <th>operator</th>
                    <th>value</th>
                    <th>effect</th>
                    <th>seconds</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="t in props.pod.spec.tolerations" :key="t.key">
                    <td>{{ t.key }}</td>
                    <td>{{ t.operator }}</td>
                    <td>{{ t.value }}</td>
                    <td>{{ t.effect }}</td>
                    <td>{{ t.tolerationSeconds }}</td>
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
