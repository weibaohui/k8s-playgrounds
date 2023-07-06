import {
  defineComponent,
  provide,
  reactive,
} from 'vue'
import type { ExtractPropTypes } from 'vue'
import { drawerServiceApiInjectionKey, drawerServiceProviderInjectionKey } from '@render/DrawerService/context'

type ContentType = string

export interface DrawerServiceApiInjection {
  error: (content: ContentType) => DrawerServiceReactive
}

export interface DrawerServiceReactive {
  content?: ContentType
  duration?: number
  closable?: boolean
  showIcon?: boolean
}

export const drawerServiceProviderProps = {
  x: String,
}

export type DrawerServiceSetupProps = ExtractPropTypes<
    typeof drawerServiceProviderProps
>

export default defineComponent({
  name: 'DrawerServiceProvider',
  props: drawerServiceProviderProps,
  setup(props) {
    const api: DrawerServiceApiInjection = {
      error(content: ContentType) {
        return create(content)
      },
    }
    provide(drawerServiceProviderInjectionKey, { props })
    provide(drawerServiceApiInjectionKey, api)

    function create(content: ContentType): DrawerServiceReactive {
      const showIcon = true
      const drawerServiceReactive = reactive({
        content,
        showIcon,
      })
      return drawerServiceReactive
    }

    return api
  },
  render() {
    return (
            <>
                <div>xxxxx</div>
            </>
    )
  },
})
