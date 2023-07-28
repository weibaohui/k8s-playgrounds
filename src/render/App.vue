<script setup lang="ts">
import router from '@render/router'
import DrawerServiceProvider from '@render/service/drawer-service/DrawerServiceProvider'
import { Cube, Layers, Time } from '@vicons/ionicons5'
import { Server } from '@vicons/fa'
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'

import {
  NConfigProvider,
  NDialogProvider,
  NIcon,
  NLayout,
  NLayoutSider,
  NMenu,
  NSpace,
  darkTheme,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/nodes',
          },
        },
        { default: () => 'Node' },
      ),
    key: 'go-to-nodes',
    icon: renderIcon(Server),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/ns',
          },
        },
        { default: () => 'Namespace' },
      ),
    key: 'go-to-ns',
    icon: renderIcon(Layers),
  }, {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/events',
          },
        },
        { default: () => 'Events' },
      ),
    key: 'go-to-events',
    icon: renderIcon(Time),
  },

  {
    label: 'Workloads',
    key: 'workloads',
    icon: renderIcon(Cube),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/pods',
              },
            },
            { default: () => 'Pods' },
          ),
        key: 'go-to-pods',
      },
    ],
  },

]

const collapsed = ref(true)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
// 默认首屏跳转
router.push('/pods')
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NSpace vertical>
      <NLayout has-sider>
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <NMenu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </NLayoutSider>
        <NLayout>
          <NDialogProvider>
            <DrawerServiceProvider>
              <RouterView />
            </DrawerServiceProvider>
          </NDialogProvider>
        </NLayout>
      </NLayout>
    </NSpace>
  </NConfigProvider>
</template>
