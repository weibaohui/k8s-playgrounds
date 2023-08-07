import { createRouter, createWebHistory } from 'vue-router'
import EventListView from './components/event/EventListView.vue'
import HelloWorld from './components/HelloWorld.vue'
import NodeListView from './components/node/NodeListView.vue'
import NsListView from './components/ns/NsListView.vue'
import PodListView from './components/pod/PodListView.vue'

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
      path: '/hello',
      component: HelloWorld,
    },
  ],
})
