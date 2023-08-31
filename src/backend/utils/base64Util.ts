export class Base64Util {
  static validate(str: string) {
    if (str === '' || str.trim() === '')
      return false
    try {
      btoa(str)
      atob(str)
      return btoa(atob(str)) === str
    }
    catch (err) {
      return false
    }
  }
}
