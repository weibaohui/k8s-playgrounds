export class YamlUtils {
  static removeScalar(str: string) {
    const s = str.split('\n').filter(r => !(r.trim() === '|' || r.trim() === '|-' || r.trim() === '>-' || r.trim() === '>')).join('\n')
    console.log('removeScalar')
    console.log(s)
    return s
  }
}
