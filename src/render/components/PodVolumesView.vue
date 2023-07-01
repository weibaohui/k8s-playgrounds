<script setup lang="ts">
import { NAlert, NDivider, NTable } from 'naive-ui'
import { V1Pod } from '../../model/V1Pod'

const props = defineProps({
  item: V1Pod,
})
</script>

<template>
  <div v-for="v in props.item.spec.volumes" :key="v.name">
    {{ v.name }}
    <div v-if="v.projected">
      <NTable bordered :single-line="false">
        <tr>
          <td class="left">
            Kind
          </td>
          <td>projected</td>
        </tr>
        <tr>
          <td>Default Mount Mode</td>
          <td>{{ v.projected.defaultMode }}</td>
        </tr>
        <tr>
          <td>source</td>
          <td>
            {{ v.projected.sources }}
            <div v-for="x in v.projected.sources" :key="x">
              <div v-if="x.serviceAccountToken">
                <NDivider title-placement="left">
                  serviceAccount
                </NDivider>
                <NTable :single-line="false">
                  <thead>
                    <tr>
                      <th>Abandon</th>
                      <th>Abnormal</th>
                      <th>Abolish</th>
                      <th>...</th>
                      <th>万事开头难</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>放弃</td>
                      <td>反常的</td>
                      <td>彻底废除</td>
                      <td>...</td>
                      <td>干！我刚才背的是啥</td>
                    </tr>
                    <tr>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                      <td>...</td>
                    </tr>
                  </tbody>
                </NTable>
                <NTable :bordered="true">
                  <tr>
                    <td class="left">
                      expirationSeconds
                    </td>
                    <td>{{ x.serviceAccountToken.expirationSeconds }}</td>
                  </tr>
                  <tr>
                    <td>path</td>
                    <td>{{ x.serviceAccountToken.path }}</td>
                  </tr>
                  <tr>
                    <td>path</td>
                    <td>{{ x.serviceAccountToken.path }}</td>
                  </tr>
                  <tr>
                    <td>path</td>
                    <td>{{ x.serviceAccountToken.path }}</td>
                  </tr>
                </NTable>
              </div>
              <div v-if="x.configMap">
                <NDivider title-placement="left">
                  configMap
                </NDivider>
                <NAlert type="success" :show-icon="false">
                  Name:{{ x.configMap.name }}
                  <br>Items:{{ x.configMap.items.map(r => `${r.key}->${r.path}`).join() }}
                </NAlert>
              </div>
            </div>
          </td>
        </tr>
      </NTable>
    </div>
    {{ v }}
  </div>
</template>

<style scoped>
.left {
  width: 120px;
}
</style>
