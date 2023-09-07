<script setup lang="ts">
import type { ResType } from '@backend/k8s/watch/watch.model'
import type { TreeOption } from 'naive-ui'
import { NH1, NLayout, NLayoutSider, NP, NTree } from 'naive-ui'
import { ref } from 'vue'

import { DocHelper } from '../../service/page/DocHelper'

const props = defineProps({
  docType: String,
})
const dataRef = ref(DocHelper.getDocTree(props.docType as ResType))
const desc = ref('')
const selectedKey = ref('')
async function handleLoad(node: TreeOption) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      if (node.$ref !== undefined)
        node.properties = DocHelper.getDocTreeByRef(node.$ref as string)
      else
        node.isLeaf = true
      resolve()
    }, 1)
  })
}
function nodeProps({ option }: { option: TreeOption }) {
  return {
    onClick() {
      const memo = option.description as string
      desc.value = memo ? memo.split('More info')[0] : ''
      selectedKey.value = option.name as string
    },
  }
}
</script>

<template>
  <NLayout style="height: 800px">
    <NLayout position="absolute" has-sider>
      <NLayoutSider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
        width="300px"
      >
        <NTree
          block-line
          :data="dataRef"
          key-field="name"
          label-field="name"
          children-field="properties"
          selectable
          :node-props="nodeProps"
          :on-load="handleLoad"
        />
      </NLayoutSider>
      <NLayout content-style="padding: 24px;" :native-scrollbar="false">
        <NH1 type="success">
          {{ selectedKey }}
        </NH1>
        <NP class="text">
          {{ desc }}
        </NP>
      </NLayout>
    </NLayout>
  </NLayout>
</template>

<style scoped>
.text{
  font-size: medium;
}
</style>
