import DsListView from '@frontend/components/daemonset/DsListView.vue'
import DeployListView from '@frontend/components/deployment/DeployListView.vue'
import RcListView from '@frontend/components/replicacontroller/RcListView.vue'
import RsListView from '@frontend/components/replicaset/RsListView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@frontend/components/event/EventListView.vue'
import NodeListView from '@frontend/components/node/NodeListView.vue'
import NsListView from '@frontend/components/ns/NsListView.vue'
import PodListView from '@frontend/components/pod/PodListView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/nodes',
      component: NodeListView,
    },
    {
      path: '/ns',
      component: NsListView,
    },
    {
      path: '/pods',
      component: PodListView,
    },
    {
      path: '/events',
      component: EventListView,
    },
    {
      path: '/deployments',
      component: DeployListView,
    },
    {
      path: '/replicaSets',
      component: RsListView,
    },
    {
      path: '/replicationControllers',
      component: RcListView,
    },
    {
      path: '/daemonSets',
      component: DsListView,
    },
  ],
})
