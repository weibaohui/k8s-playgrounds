<script setup lang="ts">
import { V1MutatingWebhookConfiguration } from '@backend/k8s/model/V1MutatingWebhookConfiguration'
import LabelSelectorView from '@frontend/components/common/LabelSelectorView.vue'
import MiniJsonMonacoView from '@frontend/components/common/MiniJsonMonacoView.vue'
import ResourceMetadataView from '@frontend/components/common/ResourceMetadataView.vue'
import TitleBar from '@frontend/components/common/TitleBar.vue'
import { NDivider, NTable } from 'naive-ui'

const props = defineProps({
  mw: V1MutatingWebhookConfiguration,
  showTitle: Boolean,
})
</script>

<template>
  <TitleBar v-if="props.showTitle === true" title="Basic info" />
  <ResourceMetadataView :item="props.mw.metadata" />

  <TitleBar title="webhooks" />

  <div v-for="hook in props.mw.webhooks" :key="hook">
    <NDivider title-placement="left">
      {{ hook.name }}
    </NDivider>
    <NTable :single-line="false">
      <tbody>
        <tr>
          <td class="left">
            name
          </td>
          <td>
            {{ hook.name }}
          </td>
        </tr>
        <tr v-if="hook.clientConfig">
          <td class="left">
            Client Config
          </td>
          <td>
            <div style="width:90%;height: 100%">
              <MiniJsonMonacoView
                :min-height="200"
                :item="hook.clientConfig"
              />
            </div>
          </td>
        </tr>
        <tr v-if="hook.matchPolicy">
          <td class="left">
            matchPolicy
          </td>
          <td>
            {{ hook.matchPolicy }}
          </td>
        </tr>
        <tr v-if="hook.failurePolicy">
          <td class="left">
            failurePolicy
          </td>
          <td>
            {{ hook.failurePolicy }}
          </td>
        </tr>
        <tr v-if="hook.admissionReviewVersions">
          <td class="left">
            admissionReviewVersions
          </td>
          <td>
            {{ hook.admissionReviewVersions }}
          </td>
        </tr>
        <tr v-if="hook.reinvocationPolicy">
          <td class="left">
            reinvocationPolicy
          </td>
          <td>
            {{ hook.reinvocationPolicy }}
          </td>
        </tr>
        <tr v-if="hook.sideEffects">
          <td class="left">
            sideEffects
          </td>
          <td>
            {{ hook.sideEffects }}
          </td>
        </tr>
        <tr v-if="hook.timeoutSeconds">
          <td class="left">
            timeoutSeconds
          </td>
          <td>
            {{ hook.timeoutSeconds }}
          </td>
        </tr>
        <tr v-if="hook.rules">
          <td class="left">
            rules
          </td>
          <td>
            {{ hook.rules }}
          </td>
        </tr>
        <tr v-if="hook.namespaceSelector">
          <td class="left">
            nsSelector
          </td>
          <td>
            <LabelSelectorView :ls="hook.namespaceSelector" />
          </td>
        </tr>
        <tr v-if="hook.objectSelector">
          <td class="left">
            objectSelector
          </td>
          <td>
            <LabelSelectorView :ls="hook.objectSelector" />
          </td>
        </tr>
      </tbody>
    </NTable>
  </div>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
