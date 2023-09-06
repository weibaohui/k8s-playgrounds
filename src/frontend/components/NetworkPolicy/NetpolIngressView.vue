<script setup lang="ts">
import { V1NetworkPolicy } from '@backend/k8s/model/v1NetworkPolicy'
import { ColorHelper } from '@frontend/service/page/ColorHelper'
import { NSpace, NTable, NTag } from 'naive-ui'

const props = defineProps({
  netpol: V1NetworkPolicy,
})
</script>

<template>
  <div v-for="rule in props.netpol.spec.ingress" :key="rule">
    <NTable v-if="rule.ports">
      <tbody>
        <tr>
          <td class="left">
            Ports
          </td>
          <td>
            <NSpace vertical>
              <NTag v-for="m in rule.ports" :key="m" :color="{ color: ColorHelper.randomColor() }">
                {{ m.protocol }}:{{ m.port }} {{ m.endPort ? `~ ${m.endPort}` : '' }}
              </NTag>
            </NSpace>
          </td>
        </tr>
      </tbody>
    </NTable>
  </div>
  <div v-for="rule in props.netpol.spec.ingress" :key="rule">
    <NTable v-if="rule.from">
      <tr>
        <td class="left">
          From
        </td>
        <td>
          <NTable v-for="m in rule.from" :key="m">
            <tr v-if="m.ipBlock">
              <td class="left">
                ipBlock
              </td>
              <td>
                <NSpace vertical>
                  <span>
                    cidr:{{ m.ipBlock.cidr }}
                    <span v-if="m.ipBlock.except">
                      except {{ m.ipBlock.except.join(',') }}
                    </span>
                  </span>
                </NSpace>
              </td>
            </tr>
            <tr v-if="m.namespaceSelector">
              <td class="left">
                nsSelector
              </td>
              <td>
                <NSpace vertical>
                  <NTag v-for="(v, k) in m.namespaceSelector.matchLabels" :key="k" :color="{ color: ColorHelper.randomColor() }">
                    {{ k }}={{ v }}
                  </NTag>
                  <NTag v-for="exp in m.namespaceSelector.matchExpressions" :key="exp" :color="{ color: ColorHelper.randomColor() }">
                    {{ exp.key }} {{ exp.operator }} {{ exp.values }}
                  </NTag>
                </NSpace>
              </td>
            </tr>
            <tr v-if="m.podSelector">
              <td class="left">
                podSelector
              </td>
              <td>
                <NSpace vertical>
                  <NTag v-for="(v, k) in m.podSelector?.matchLabels" :key="k" :color="{ color: ColorHelper.randomColor() }">
                    {{ k }}={{ v }}
                  </NTag>
                  <NTag v-for="exp in m.podSelector?.matchExpressions" :key="exp" :color="{ color: ColorHelper.randomColor() }">
                    {{ exp.key }} {{ exp.operator }} {{ exp.values }}
                  </NTag>
                </NSpace>
              </td>
            </tr>
          </NTable>
        </td>
      </tr>
    </NTable>
  </div>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
