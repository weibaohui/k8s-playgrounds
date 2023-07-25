import type { VNode } from '@vue/runtime-core'
import { NDrawer, NDrawerContent } from 'naive-ui'
import {
  defineComponent,
  h, provide, ref,
} from 'vue'

import { drawerServiceApiInjectionKey } from '@render/service/drawer-service/context'

export interface DrawerServiceApiInjection {
  showDrawer: (drawerProps: DrawerServiceProps, children: VNode) => void
  close()
}

export class DrawerServiceProps {
  width?: string | number = 500
  title?: string
}

export const drawerServiceProviderProps = {}

export default defineComponent({
  name: 'DrawerServiceProvider',
  props: drawerServiceProviderProps,
  setup() {
    const show = ref(false)
    const drawerProps = ref<DrawerServiceProps>()
    const children = ref<VNode>()
    const api: DrawerServiceApiInjection = {
      showDrawer(drawerProps: DrawerServiceProps, children: VNode) {
        create(drawerProps, children)
      },
      close() {
        onClose()
      },
    }
    provide(drawerServiceApiInjectionKey, api)
    function onClose() {
      show.value = false
    }
    function create(dp: DrawerServiceProps, child: VNode) {
      if (!dp.width)
        dp.width = 500
      drawerProps.value = dp
      children.value = child
      show.value = true
    }

    return Object.assign(
      {
        drawerProps,
        children,
        show,
        onClose,
      },
      api,
    )
  },
  render() {
    return [
      [this.show
        ? h(
          NDrawer,
          {
            width: this.drawerProps.width,
            show: this.show,
            closeOnEsc: true,
            maskClosable: true,
            onUpdateShow: () => {
              this.onClose()
            },
          },
          () =>
            h(
              NDrawerContent,
              {
                title: this.drawerProps.title,
                closable: true,
              },
              [
                this.children,
                h('div'),
              ],
            ),
        )
        : h('div'),
      ],
      [this.$slots.default?.()],
    ]
  },
})
