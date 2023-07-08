import HelloWorld from '@render/components/HelloWorld.vue'
import NodeListView from '@render/components/node/NodeListView.vue'
import PodListView from '@render/components/pod/PodListView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/nodes',
      component: NodeListView,
    },
    {
      path: '/pods',
      component: PodListView,
    },

    {
      path: '/hello',
      component: HelloWorld,
    },
  ],
})
