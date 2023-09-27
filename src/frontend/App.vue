<script setup lang="ts">
import {
  Clock,
  Cube,
  FileArchive,
  LayerGroup,
  ListAlt,
  NetworkWired,
  Server,
  StackExchange,
  UserShield,
} from '@vicons/fa'
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
  NNotificationProvider, NSpace, darkTheme,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import DrawerServiceProvider from './service/drawer-service/DrawerServiceProvider'
import router from './router'

const containerRef = ref<HTMLElement>()
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/g6',
          },
        },
        { default: () => 'g6' },
      ),
    key: 'go-to-g6',
    icon: renderIcon(StackExchange),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/kubeconfig',
          },
        },
        { default: () => 'Clusters' },
      ),
    key: 'go-to-kubeconfig',
    icon: renderIcon(StackExchange),
  }, {
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
            { default: () => 'Replica Sets' },
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
            { default: () => 'Replication Controllers' },
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
            { default: () => 'Daemon Sets' },
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
            { default: () => 'Stateful Sets' },
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
            { default: () => 'Cron Jobs' },
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
            { default: () => 'Config Maps' },
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
            { default: () => 'Priority Classes' },
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
            { default: () => 'Resource Quotas' },
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
            { default: () => 'Limit Ranges' },
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
            { default: () => 'Horizontal Pod Autoscalers' },
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
            { default: () => 'Pod Disruption Budgets' },
          ),
        key: 'go-to-podDisruptionBudgets',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/mutatingWebhookConfigurations',
              },
            },
            { default: () => 'Mutating Webhooks' },
          ),
        key: 'go-to-mutatingWebhookConfigurations',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/validatingWebhookConfigurations',
              },
            },
            { default: () => 'Validating Webhooks' },
          ),
        key: 'go-to-validatingWebhookConfigurations',
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
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/ingressClasses',
              },
            },
            { default: () => 'Ingress Classes' },
          ),
        key: 'go-to-ingressClasses',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/networkPolices',
              },
            },
            { default: () => 'Network Polices' },
          ),
        key: 'go-to-networkPolices',
      },
    ],
  },
  {
    label: 'Storage',
    key: 'Storage',
    icon: renderIcon(FileArchive),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/persistentVolumesClaims',
              },
            },
            { default: () => 'Persistent Volumes Claims' },
          ),
        key: 'go-to-persistentVolumesClaims',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/persistentVolumes',
              },
            },
            { default: () => 'Persistent Volumes' },
          ),
        key: 'go-to-persistentVolumes',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/storageClasses',
              },
            },
            { default: () => 'Storage Classes' },
          ),
        key: 'go-to-storageClasses',
      },
    ],
  },
  {
    label: 'Rbac',
    key: 'Rbac',
    icon: renderIcon(UserShield),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/serviceAccounts',
              },
            },
            { default: () => 'Service Accounts' },
          ),
        key: 'go-to-serviceAccounts',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/clusterRoles',
              },
            },
            { default: () => 'Cluster Roles' },
          ),
        key: 'go-to-clusterRoles',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/clusterRoleBindings',
              },
            },
            { default: () => 'Cluster Role Bindings' },
          ),
        key: 'go-to-clusterRoleBindings',
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/roles',
              },
            },
            { default: () => 'Roles' },
          ),
        key: 'go-to-roles',
      }, {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/roleBindings',
              },
            },
            { default: () => 'Role Bindings' },
          ),
        key: 'go-to-roleBindings',
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
    <NSpace ref="containerRef" vertical>
      <NLayout has-sider position="absolute">
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
