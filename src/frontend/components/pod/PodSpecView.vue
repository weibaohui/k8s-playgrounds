<script setup lang="ts">
import { V1PodSpec } from '@backend/k8s/model/v1PodSpec'
import NodeView from '@frontend/components/node/NodeView.vue'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { DrawerHelper } from '@frontend/service/page/DrawerHelper'
import { NBadge, NButton, NCollapse, NCollapseItem, NTable, NTag } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  spec: V1PodSpec,
})
const isExpended = ref(false)
const expendedText = ref('Hide')
const drawer = useDrawerService()

function getShowText() {
  expendedText.value = isExpended.value ? 'Hide' : 'Show'
  return expendedText.value
}

async function showNodeView(name: string) {
  DrawerHelper
    .instance
    .drawer(drawer)
    .show(`Node:${name}`, NodeView, { node: await K8sService.playService.nodeControllerGetOneByName({ name }) })
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
          restartPolicy
        </td>
        <td>{{ props.spec.restartPolicy }}</td>
      </tr>
      <tr v-if="props.spec.nodeName">
        <td>
          Node
        </td>
        <td>
          <NButton text @click="showNodeView(props.spec.nodeName)">
            {{ props.spec.nodeName }}
          </NButton>
        </td>
      </tr>
      <tr v-if="props.spec.dnsPolicy">
        <td>dnsPolicy</td>
        <td>{{ props.spec.dnsPolicy }}</td>
      </tr>
      <tr v-if="props.spec.schedulerName">
        <td>schedulerName</td>
        <td>{{ props.spec.schedulerName }}</td>
      </tr>

      <tr v-if="props.spec.serviceAccount">
        <td>Service Account</td>
        <td>{{ props.spec.serviceAccount }}</td>
      </tr>
      <tr v-if="props.spec.serviceAccountName">
        <td>Service Account Name</td>
        <td>{{ props.spec.serviceAccountName }}</td>
      </tr>
      <tr v-if="props.spec.priorityClassName">
        <td>Priority Class</td>
        <td>{{ props.spec.priorityClassName }}</td>
      </tr>
      <tr v-if="props.spec.nodeSelector">
        <td>Node Selector</td>
        <td>
          <NTag v-for="(v, k) in props.spec.nodeSelector" :key="k">
            {{ k }}={{ v }}
          </NTag>
        </td>
      </tr>
      <tr v-if="props.spec.tolerations.length">
        <td>Tolerations</td>
        <td>
          <NCollapse>
            <NCollapseItem
              :title="getShowText()" name="1" @click="toggle()"
            >
              <template #header-extra>
                <NBadge :value="props.spec.tolerations.length " />
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
                  <tr v-for="t in props.spec.tolerations" :key="t.key">
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
      <tr v-if="props.spec.hostNetwork">
        <td>hostNetwork</td>
        <td>{{ props.spec.hostNetwork }}</td>
      </tr>
      <tr v-if="props.spec.hostIPC">
        <td>hostIPC</td>
        <td>{{ props.spec.hostIPC }}</td>
      </tr>
      <tr v-if="props.spec.hostPID">
        <td>hostPID</td>
        <td>{{ props.spec.hostPID }}</td>
      </tr>
      <tr v-if="props.spec.hostUsers">
        <td>hostUsers</td>
        <td>{{ props.spec.hostUsers }}</td>
      </tr>
      <tr v-if="props.spec.setHostnameAsFQDN">
        <td>setHostnameAsFQDN</td>
        <td>{{ props.spec.setHostnameAsFQDN }}</td>
      </tr>
      <tr v-if="props.spec.hostAliases">
        <td>hostAliases</td>
        <td>
          <div v-for="k in props.spec.hostAliases" :key="k">
            <NTag v-for="m in k.hostnames" :key="m">
              {{ k.ip }} {{ m }}
            </NTag>
          </div>
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
