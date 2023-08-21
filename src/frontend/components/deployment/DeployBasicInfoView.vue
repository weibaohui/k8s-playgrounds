<script setup lang="ts">
import { V1Deployment } from '@backend/k8s/model/V1Deployment'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import DeployConditionView from '@frontend/components/deployment/DeployConditionView.vue'
import { NBadge, NCollapse, NCollapseItem, NTable } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  deploy: V1Deployment,
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
  <ResourceMetadataView :item="props.deploy.metadata" />
  <NTable :single-line="false">
    <tbody>
      <tr>
        <td class="left">
          Replicas
        </td>
        <td>
          {{
            `${props.deploy.status.replicas ? props.deploy.status.replicas : 0} desired,
${props.deploy.status.updatedReplicas ? props.deploy.status.updatedReplicas : 0} updated,
${props.deploy.status.replicas ? props.deploy.status.replicas : 0} total,
${props.deploy.status.availableReplicas ? props.deploy.status.availableReplicas : 0} available,
${props.deploy.status.unavailableReplicas ? props.deploy.status.unavailableReplicas : 0} unavailable`
          }}
        </td>
      </tr>
      <tr>
        <td>revisionHistoryLimit</td>
        <td>{{ props.deploy.spec.revisionHistoryLimit }}</td>
      </tr><tr>
        <td>progressDeadlineSeconds</td>
        <td>{{ props.deploy.spec.progressDeadlineSeconds }}</td>
      </tr>
      <tr>
        <td>Strategy Type</td>
        <td>{{ props.deploy.spec.strategy.type }}</td>
      </tr>
      <tr>
        <td>Conditions</td>
        <td><DeployConditionView :deploy="props.deploy" /></td>
      </tr>
      <tr v-if="props.deploy.spec.template.spec.tolerations && props.deploy.spec.template.spec.tolerations.length">
        <td>Tolerations</td>
        <td>
          <NCollapse>
            <NCollapseItem
              :title="getShowText()" name="1" @click="toggle()"
            >
              <template #header-extra>
                <NBadge :value="props.deploy.spec.template.spec.tolerations.length " />
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
                  <tr v-for="t in props.deploy.spec.template.spec.tolerations" :key="t.key">
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
