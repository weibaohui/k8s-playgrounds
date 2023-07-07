import type { DrawerServiceApiInjection, DrawerServiceSetupProps } from '@render/DrawerService/DrawerServiceProvider'
import { createInjectionKey } from 'naive-ui/es/_utils'
import type { InjectionKey } from 'vue'

export const drawerServiceApiInjectionKey: InjectionKey<DrawerServiceApiInjection> = Symbol('')

export const drawerServiceProviderInjectionKey = createInjectionKey<{
  props: DrawerServiceSetupProps
}>('drawer-service-provider')
