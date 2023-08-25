<script setup lang="ts">
import { V1StatefulSet } from '@backend/k8s/model/v1StatefulSet'
import { K8sService } from '@frontend/service/k8s/K8sService'
import { useDrawerService } from '@frontend/service/drawer-service/use-drawer'
import { Docker } from '@vicons/fa'
import { NButton, NIcon, NIconWrapper, NInputNumber, NSlider, NSpace, useNotification } from 'naive-ui'
import { ref } from 'vue'

const props = defineProps({
  sts: V1StatefulSet,
})
const drawer = useDrawerService()
const notification = useNotification()

const replicas = ref(props.sts.spec.replicas)
const marks = {
  0: '0',
  5: '5',
  10: '10',
  15: '15',
  20: '20',
  30: '30',
  50: '50',
  80: '80',
  100: '100',
}
function cancel() {
  drawer.close()
}
async function scale() {
  const ret = await K8sService.playService.statefulSetControllerScaleStatefulSet(
    {
      ns: props.sts.metadata.namespace,
      name: props.sts.metadata.name,
      replicas: replicas.value,
    })
  notification.success({
    title: '应用成功',
    content: `副本数已设置为:${ret.spec.replicas ? ret.spec.replicas : 0}`,
    duration: 1500,
    onAfterLeave: () => {
      drawer.close()
    },
  })
}
</script>

<template>
  <NTable bordered>
    <tbody>
      <tr>
        <td class="left">
          当前
        </td>
        <td class="right">
          {{ props.sts.spec.replicas }}
        </td>
      </tr>
      <tr>
        <td />
        <td>
          &nbsp;
        </td>
      </tr>
      <tr>
        <td>
          设置
        </td>
        <td>
          <NSlider v-model:value="replicas" show-tooltip :marks="marks">
            <template #thumb>
              <NIconWrapper :size="24" :border-radius="12">
                <NIcon :size="18" :component="Docker" />
              </NIconWrapper>
            </template>
          </NSlider>
        </td>
      </tr>
      <tr>
        <td />
        <td>
          &nbsp;
        </td>
      </tr>
      <tr>
        <td />
        <td>
          <NInputNumber v-model:value="replicas" size="small" />
        </td>
      </tr>
      <tr>
        <td />
        <td>
          &nbsp;
        </td>
      </tr>
      <tr>
        <td>
          操作
        </td>
        <td>
          <NSpace>
            <NButton type="success" @click="scale">
              应用
            </NButton>
            <NButton @click="cancel">
              取消
            </NButton>
          </NSpace>
        </td>
      </tr>
    </tbody>
  </NTable>
</template>

<style scoped>
.left {
  width: 120px;
}
.right {
  width: 80%;
}
</style>
