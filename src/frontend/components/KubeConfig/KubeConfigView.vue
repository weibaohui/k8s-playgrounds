<script setup lang="ts">
import type { Cluster } from '@backend/model/KubeConfig'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { Star } from '@vicons/fa'
import { NButton, NCard, NGi, NGrid, NHr, NIcon, NIconWrapper, NSpace } from 'naive-ui'
import { onMounted, ref } from 'vue'

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
  K8sService.playService.clientControllerSetContext({ name })
  getConfigs()
}

onMounted(() => {
  getConfigs()
})
</script>

<template>
  <NGrid :cols="3">
    <NGi v-for="c in Clusters" :key="c.name">
      <NCard :title=" c.name ">
        {{ c.server }}
        <NHr />
        <NIconWrapper v-if="currentContext === c.name" :size="34" :border-radius="10" color="#1E3835">
          <NIcon :component="Star" color="#ED4C3C" />
        </NIconWrapper>
        <NIconWrapper v-else :size="34" :border-radius="10" color="gray">
          <NIcon :component="Star" />
        </NIconWrapper>
        <template #action>
          <NSpace>
            <NButton :disabled="currentContext === c.name" type="warning" @click="handleCheckedChange(c.name)">
              选择
            </NButton>
            <NButton type="success" @click="handleCheckedChange(c.name)">
              查看
            </NButton>
          </NSpace>
        </template>
      </NCard>
    </NGi>
  </NGrid>
</template>

<style scoped>
.n-card {
  max-width: 400px;
  margin: 30px;
}
</style>
