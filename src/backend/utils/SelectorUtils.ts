import type { V1LabelSelector } from '@backend/k8s/model/v1LabelSelector'

export class SelectorUtils {
  static getSelector(src: V1LabelSelector) {
    let selector = ''
    for (const k in src.matchLabels) {
      const v = src.matchLabels[k]
      selector += `${k}=${v},`
    }
    if (selector.endsWith(','))
      selector = selector.slice(0, selector.length - 1)

    return selector
  }
}
