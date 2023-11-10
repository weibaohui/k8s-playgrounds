<script setup lang="ts">
import { NGradientText } from 'naive-ui'

const props = defineProps({
  obj: Object,
  objKey: String,
  green: String,
  greenText: String,
  redText: String,
})
</script>

<template>
  <div v-if="props.obj">
    <NGradientText v-if="props.obj[props.objKey] === props.green" type="success">
      {{ greenText }}
    </NGradientText>
    <NGradientText v-else type="error">
      {{ redText }}
    </NGradientText>
  </div>
</template>

<style scoped>

</style>
