<script setup lang="ts">
import type { V1ContainerPort } from '@backend/k8s/model/V1ContainerPort'
import ContainerStatusIcon from '@frontend/components/container/ContainerStatusIcon.vue'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { ArrowsAltH, Docker } from '@vicons/fa'
import { NButton, NDivider, NIcon, NSpace, NTable, NTag, NText, useMessage } from 'naive-ui'
import ContainerProbeView from '@frontend/components/container/ContainerProbeView.vue'
import ContainerState from '@frontend/components/container/ContainerState.vue'
import { V1Pod } from '@backend/k8s/model/V1Pod'
import * as _ from 'lodash'

const props = defineProps({
  pod: V1Pod,
})

const message = useMessage()

function getContainerStatusByName(name) {
  return props.pod.status.containerStatuses.filter(r => r.name === name).pop()
}
async function forward(pod: V1Pod, p: V1ContainerPort) {
  const randomInt = _.random(30000, 60000)
  await K8sService.playService.shellControllerForwardPod({
    ns: pod.metadata.namespace,
    localPort: randomInt,
    podPort: `${p.containerPort}`,
    podName: pod.metadata.name,
  })
  message.success('转发成功')
}
</script>

<template>
  <NSpace v-for="t in props.pod.spec.containers" :key="t.name">
    <NDivider title-placement="left">
      <NIcon v-if="getContainerStatusByName(t.name).ready" :component="Docker" color="green" size="20" />
      <NIcon v-else :component="Docker" color="red" size="20" />
      &nbsp;&nbsp;{{ t.name }}
    </NDivider>
    <NTable :single-line="false">
      <tbody>
        <tr>
          <td class="left">
            Status
          </td>
          <td>
            <ContainerStatusIcon :container-name="t.name" :pod="props.pod" />
            <ContainerState :state="getContainerStatusByName(t.name).state" />
            <NText v-if="getContainerStatusByName(t.name).ready" type="success">
              ready
            </NText>
          </td>
        </tr>
        <tr>
          <td>Image</td>
          <td>
            {{ getContainerStatusByName(t.name).image }}
          </td>
        </tr>
        <tr>
          <td>ImagePullPolicy</td>
          <td>
            {{ t.imagePullPolicy }}
          </td>
        </tr>
        <tr v-if="t.ports">
          <td>Ports</td>
          <td>
            <p v-for="p in t.ports" :key="p.containerPort">
              {{ p.name }}:{{ p.containerPort }}/{{ p.protocol }}
              <NButton type="success" @click="forward(props.pod, p)">
                Forward
              </NButton>
            </p>
          </td>
        </tr>
        <tr v-if="t.env">
          <td>Environment</td>
          <td>
            <p v-for="p in t.env" :key="p.name" :style="{ backgroundColor: ColorHelper.randomColor() }">
              {{ p.name }}:{{ p.value }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Mounts</td>
          <td>
            <div v-for="p in t.volumeMounts" :key="p.name">
              <NTag type="success">
                {{ p.mountPath }}{{ p.subPath }}
              </NTag>
              <NTag v-if="p.readOnly" type="warning">
                ro
              </NTag>
              <NTag v-else type="error">
                rw
              </NTag>
              <NIcon :component="ArrowsAltH" />
              <NTag type="success">
                {{ p.name }}
              </NTag>
            </div>
          </td>
        </tr>
        <tr v-if="t.command">
          <td>Command</td>
          <td>
            {{ t.command }}
          </td>
        </tr>
        <tr v-if="t.livenessProbe">
          <td>readinessProbe</td>
          <td>
            <ContainerProbeView :probe="t.livenessProbe" />
          </td>
        </tr>
        <tr v-if="t.readinessProbe">
          <td>readinessProbe</td>
          <td>
            <ContainerProbeView :probe="t.readinessProbe" />
          </td>
        </tr>
        <tr v-if="t.startupProbe">
          <td>startupProbe</td>
          <td>
            <ContainerProbeView :probe="t.startupProbe" />
          </td>
        </tr>
      </tbody>
    </NTable>
  </NSpace>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
