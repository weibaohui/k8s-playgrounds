<script setup lang="ts">
import type { Cluster } from '@backend/model/KubeConfig'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { Star } from '@vicons/fa'
import { NCard, NIcon, NIconWrapper, NSpace } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  x: String,
})
const Clusters = ref<Cluster[]>()
const currentContext = ref<string>()
async function getConfigs() {
  Clusters.value = await K8sService.playService.clientControllerList()
  currentContext.value = await K8sService.playService.clientControllerCurrentContext()
}
function handleCheckedChange(name: string) {
  console.log(name)
  K8sService.playService.clientControllerSetContext({ name })
}

getConfigs()
</script>

<template>
  <NCard :style="{ margin: 30 }" title="集群列表">
    <NSpace>
      <div v-for="c in Clusters" :key="c.name">
        <NCard :title=" c.name ">
          <NIconWrapper v-if="currentContext === c.name" :size="24" :border-radius="10">
            <NIcon :component="Star" />
          </NIconWrapper>
          {{ c.server }}
        </NCard>
      </div>
    </NSpace>
  </NCard>
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
