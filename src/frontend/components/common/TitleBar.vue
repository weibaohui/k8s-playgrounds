<script setup lang="ts">
import { NH6, NText } from 'naive-ui'

const props = defineProps({
  title: String,
})
</script>

<template>
  <NH6 prefix="bar" align-text type="success">
    <NText type="success">
      {{ title }}
    </NText>
  </NH6>
</template>
