<script setup lang="ts">
import { Clock, Cube, LayerGroup, ListAlt, NetworkWired, Server } from '@vicons/fa'
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
  NNotificationProvider,
  NSpace, darkTheme,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import DrawerServiceProvider from './service/drawer-service/DrawerServiceProvider'
import router from './router'

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
    icon: renderIcon(LayerGroup),
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
    icon: renderIcon(Clock),
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
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/deployments',
              },
            },
            { default: () => 'Deployments' },
          ),
        key: 'go-to-deployments',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/replicaSets',
              },
            },
            { default: () => 'ReplicaSets' },
          ),
        key: 'go-to-replicaSets',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/replicationControllers',
              },
            },
            { default: () => 'ReplicationControllers' },
          ),
        key: 'go-to-replicationControllers',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/daemonSets',
              },
            },
            { default: () => 'DaemonSets' },
          ),
        key: 'go-to-daemonSets',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/statefulSets',
              },
            },
            { default: () => 'StatefulSets' },
          ),
        key: 'go-to-statefulSets',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/jobs',
              },
            },
            { default: () => 'Jobs' },
          ),
        key: 'go-to-jobs',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/cronJobs',
              },
            },
            { default: () => 'CronJobs' },
          ),
        key: 'go-to-cronJobs',
      },
    ],
  },
  {
    label: 'Config',
    key: 'Config',
    icon: renderIcon(ListAlt),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/configMaps',
              },
            },
            { default: () => 'ConfigMaps' },
          ),
        key: 'go-to-configMaps',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/secrets',
              },
            },
            { default: () => 'Secrets' },
          ),
        key: 'go-to-secrets',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/priorityClasses',
              },
            },
            { default: () => 'PriorityClasses' },
          ),
        key: 'go-to-priorityClasses',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/resourceQuotas',
              },
            },
            { default: () => 'ResourceQuotas' },
          ),
        key: 'go-to-resourceQuotas',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/limitRanges',
              },
            },
            { default: () => 'LimitRanges' },
          ),
        key: 'go-to-limitRanges',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/horizontalPodAutoscaler',
              },
            },
            { default: () => 'HorizontalPodAutoscalers' },
          ),
        key: 'go-to-horizontalPodAutoscaler',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/podDisruptionBudgets',
              },
            },
            { default: () => 'PodDisruptionBudgets' },
          ),
        key: 'go-to-podDisruptionBudgets',
      },
    ],
  },
  {
    label: 'Network',
    key: 'Network',
    icon: renderIcon(NetworkWired),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/endpoints',
              },
            },
            { default: () => 'Endpoints' },
          ),
        key: 'go-to-endpoints',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/services',
              },
            },
            { default: () => 'Services' },
          ),
        key: 'go-to-services',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/ingresses',
              },
            },
            { default: () => 'Ingresses' },
          ),
        key: 'go-to-ingresses',
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
          <NNotificationProvider :max="4">
            <NDialogProvider>
              <DrawerServiceProvider>
                <RouterView />
              </DrawerServiceProvider>
            </NDialogProvider>
          </NNotificationProvider>
        </NLayout>
      </NLayout>
    </NSpace>
  </NConfigProvider>
</template>
