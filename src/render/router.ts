import EventListView from '@render/components/event/EventListView.vue'
import HelloWorld from '@render/components/HelloWorld.vue'
import NodeListView from '@render/components/node/NodeListView.vue'
import NsListView from '@render/components/ns/NsListView.vue'
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
      path: '/ns',
      component: NsListView,
    },
    {
      path: '/pods',
      component: PodListView,
    }, {
      path: '/events',
      component: EventListView,
    },

    {
      path: '/hello',
      component: HelloWorld,
    },
  ],
})
