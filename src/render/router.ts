import HelloWorld from '@render/components/HelloWorld.vue'
import PodList from '@render/components/pod/PodList.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/pods',
      component: PodList,
    },

    {
      path: '/hello',
      component: HelloWorld,
    },
  ],
})
