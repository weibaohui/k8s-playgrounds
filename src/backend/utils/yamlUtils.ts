export class YamlUtils {
  static removeScalar(str: string) {
    return str
      .split('\n')
      .filter(r => !(
        r.trim() === '|'
            || r.trim() === '|-'
            || r.trim() === '>-'
            || r.trim() === '|+'
            || r.trim() === '>'
      )).join('\n')
  }
}
