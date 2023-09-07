<script setup lang="ts">
import DocTreeView from '@frontend/components/common/DocTreeView.vue'
import MonacoView from '@frontend/components/common/MonacoView.vue'
import { NTabPane, NTabs } from 'naive-ui'

const props = defineProps({
  docType: String,
  item: Object,
  showToolbar: Boolean,
  itemKey: String,
})
</script>

<template>
  <NTabs type="line" animated>
    <NTabPane name="edit" tab="Edit">
      <MonacoView
        :item-key="props.itemKey"
        :item="props.item"
        :show-toolbar="props.showToolbar"
      />
    </NTabPane>
    <NTabPane name="doc" tab="Doc">
      <DocTreeView :doc-type="props.docType" />
    </NTabPane>
  </NTabs>
</template>

<style scoped>

</style>
