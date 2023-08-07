import type { InjectionKey } from 'vue'
import type { DrawerServiceApiInjection } from '../../service/drawer-service/DrawerServiceProvider'

export const drawerServiceApiInjectionKey: InjectionKey<DrawerServiceApiInjection> = Symbol('')
