import type { VNode } from '@vue/runtime-core'
import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import {
  defineComponent,
  h, provide, ref,
} from 'vue'

import { drawerServiceApiInjectionKey } from '@render/DrawerService/context'

type ContentType = string

export interface DrawerServiceApiInjection {
  show: (content: ContentType, drawerProps?: DrawerServiceProps, children?: VNode) => void
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
      show(content: ContentType, drawerProps?: DrawerServiceProps, children?: VNode) {
        create(content, drawerProps, children)
      },
    }
    provide(drawerServiceApiInjectionKey, api)
    function onClose() {
      show.value = false
    }
    function create(content: ContentType, dp?: DrawerServiceProps, child?: VNode) {
      if (!dp?.width)
        dp.width = 500

      show.value = true
      drawerProps.value = dp
      children.value = child
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
                h(NButton,
                  {
                    onClick: () => alert('x'),
                  },
                  () => 'xxx'),
              ],
            ),
        )
        : h('div'),
      ],
      [this.$slots.default?.()],
    ]
  },
})
