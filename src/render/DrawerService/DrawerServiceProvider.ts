import { NButton, NDrawer, NDrawerContent } from 'naive-ui'
import {
  defineComponent,
  h,
  provide, reactive, ref,
} from 'vue'
import type { ExtractPropTypes } from 'vue'
import { drawerServiceApiInjectionKey, drawerServiceProviderInjectionKey } from '@render/DrawerService/context'

type ContentType = string

export interface DrawerServiceApiInjection {
  error: (content: ContentType, drawerProps: DrawerServiceProps) => DrawerServiceReactive
}

export interface DrawerServiceReactive {
  content?: ContentType
  duration?: number
  closable?: boolean
  showIcon?: boolean
}

export class DrawerServiceProps {
  width?: string | number
  title?: string
}

export const drawerServiceProviderProps = {}

export type DrawerServiceSetupProps = ExtractPropTypes<typeof drawerServiceProviderProps>

export default defineComponent({
  name: 'DrawerServiceProvider',
  props: drawerServiceProviderProps,
  setup(props) {
    const drawerServiceRef = ref<DrawerServiceReactive>()
    const show = ref(true)
    const drawerProps = ref<DrawerServiceProps>()
    const api: DrawerServiceApiInjection = {
      error(content: ContentType, drawerProps: DrawerServiceProps) {
        return create(content, drawerProps)
      },
    }

    provide(drawerServiceProviderInjectionKey, { props })
    provide(drawerServiceApiInjectionKey, api)

    function onClose() {
      show.value = false
    }
    function create(content: ContentType, dp: DrawerServiceProps): DrawerServiceReactive {
      const showIcon = false
      const drawerServiceReactive = reactive({
        content,
        showIcon,
      })
      drawerServiceRef.value = drawerServiceReactive
      show.value = true
      drawerProps.value = dp
      return drawerServiceReactive
    }

    return Object.assign(
      {
        drawerProps,
        drawerServiceRef,
        show,
        onClose,
      },
      api,
    )
  },
  render() {
    return [
      [this.drawerServiceRef
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
                h('div', this.drawerServiceRef.content),
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
      [],

    ]
  },
})
