<script setup lang="ts">
import DocTreeView from '@frontend/components/common/DocTreeView.vue'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import { NTabPane, NTabs } from 'naive-ui'

const props = defineProps({
  docType: String,
  item: Object,
  saveActionOverride: Boolean,
  itemKey: String,
})
</script>

<template>
  <NTabs type="line" animated>
    <NTabPane name="edit" tab="Edit">
      <MonacoView
        :item-key="props.itemKey"
        :item="props.item"
        :save-action-override="props.saveActionOverride"
      />
    </NTabPane>
    <NTabPane name="doc" tab="Doc">
      <DocTreeView :doc-type="props.docType" />
    </NTabPane>
  </NTabs>
</template>

<style scoped>

</style>
