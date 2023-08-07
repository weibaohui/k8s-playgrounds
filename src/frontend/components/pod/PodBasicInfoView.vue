<script setup lang="ts">
import { CheckCircle, ExclamationCircle } from '@vicons/fa'
import moment from 'moment/moment'
import { NBadge, NButton, NCollapse, NCollapseItem, NIcon, NSpace, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'
import ContainerStatusText from '../../components/container/ContainerStatusText.vue'
import NodeView from '../../components/node/NodeView.vue'
import { useDrawerService } from '../../service/drawer-service/use-drawer'
import { K8sService } from '../../service/k8s/K8sService'
import { DrawerHelper } from '../../service/page/DrawerHelper'
import { V1Pod } from '../../../backend/k8s/model/V1Pod'

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
    .show(name, NodeView, { node: await K8sService.nodeService.getNode(name) })
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
          {{ moment(pod.status.startTime).format('yyyy-MM-DD H:mm:s Z') }}
          {{ moment(pod.status.startTime).fromNow() }}
        </td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ props.pod.metadata.name }}</td>
      </tr>
      <tr>
        <td>Namespace</td>
        <td>{{ props.pod.metadata.namespace }}</td>
      </tr>
      <tr v-if="props.pod.metadata.labels">
        <td>Labels</td>
        <td>
          <NSpace v-for="(v, k) in props.pod.metadata.labels" :key="k">
            <NTag>
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.pod.metadata.annotations">
        <td>Annotations</td>
        <td>
          <NSpace v-for="(v, k) in props.pod.metadata.annotations" :key="k">
            <NTag v-if="!k.endsWith('last-applied-configuration')">
              {{ k }}={{ v }}
            </NTag>
          </NSpace>
        </td>
      </tr>
      <tr v-if="props.pod.metadata.ownerReferences">
        <td>Controlled By</td>
        <td>
          <span v-for="r in props.pod.metadata.ownerReferences" :key="r.uid">
            {{ r.kind }} {{ r.name }}
          </span>
        </td>
      </tr>
      <tr>
        <td>Status</td>
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
