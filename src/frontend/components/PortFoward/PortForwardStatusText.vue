<script setup lang="ts">
import { PortForward } from '@backend/model/PortForward'
import { NGradientText } from 'naive-ui'

const props = defineProps({
  pf: PortForward,
})
</script>

<template>
  <div v-if="props.pf">
    <NGradientText v-if="props.pf.status === 'succeeded'" type="success">
      Succeeded
    </NGradientText>
    <NGradientText v-else-if="props.pf.status === 'refused'" type="error">
      Refused
    </NGradientText>
  </div>
</template>

<style scoped>

</style>
