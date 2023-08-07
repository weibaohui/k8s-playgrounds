<script setup lang="ts">
import { NTag } from 'naive-ui'
import { ref } from 'vue'
import _ from 'lodash'
import { V1Node } from '../../../backend/k8s/model/V1Node'

const props = defineProps({
  node: V1Node,
})
const nodeRole = ref<Array<string>>(new Array<string>())

function getNodeRole() {
  if (_.has(props.node.metadata.labels, 'node-role.kubernetes.io/control-plane'))
    nodeRole.value.push('control-plane')
  if (_.has(props.node.metadata.labels, 'node-role.kubernetes.io/agent'))
    nodeRole.value.push('agent')
}

getNodeRole()
</script>

<template>
  <NTag v-for="r in nodeRole" :key="r" type="success">
    {{ r }}
  </NTag>
</template>

<style scoped>

</style>
