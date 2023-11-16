<script setup lang="ts">
import { NRadioButton, NRadioGroup } from 'naive-ui'

const props = defineProps({
  type: String,
})
</script>

<template>
  <NRadioGroup :value="props.type" size="small">
    <NRadioButton value="exec">
      exec
    </NRadioButton>
    <NRadioButton value="httpGet">
      httpGet
    </NRadioButton>
    <NRadioButton value="tcpSocket">
      tcpSocket
    </NRadioButton>
    <NRadioButton value="grpc">
      grpc
    </NRadioButton>
  </NRadioGroup>
</template>
