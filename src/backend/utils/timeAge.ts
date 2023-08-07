import moment from 'moment'

export class TimeAge {
  static getK8sAge(b) {
    const a = moment()
    return this.getK8sAgeWith(a, b)
  }

  static getK8sAgeWith(a, b) {
    const now = moment(a)
    const seconds = now.diff(moment(b), 'seconds')
    const minutes = now.diff(moment(b), 'minutes')
    const hours = now.diff(moment(b), 'hours')
    const days = now.diff(moment(b), 'days')

    const hoursMod = hours % 24
    const minutesMod = minutes % 60
    const secondsMod = seconds % 60
    if (days > 5)
      return `${days}d`

    if (days <= 5 && days > 0) {
      if (hoursMod > 0)
        return `${days}d${hoursMod}h`
      return `${days}d`
    }
    if (days === 0) {
      if (hours > 0 && minutesMod > 0)
        return `${hours}h${minutesMod}m`
      if (hours > 0 && minutesMod === 0)
        return `${hours}h`
      if (hours === 0) {
        if (minutes > 0 && secondsMod > 0)
          return `${minutes}m${secondsMod}s`
        if (minutes > 0 && secondsMod === 0)
          return `${minutes}m`
        if (minutes === 0)
          return `${seconds}s`
      }
    }
  }

  testAge() {
    console.log('xx', TimeAge.getK8sAge('2023-06-29 09:28:36'))
    console.log('0s', TimeAge.getK8sAgeWith('2023-06-23 00:00:00', '2023-06-23 00:00:00'))
    console.log('59s', TimeAge.getK8sAgeWith('2023-06-23 00:00:59', '2023-06-23 00:00:00'))
    console.log('1m', TimeAge.getK8sAgeWith('2023-06-23 00:01:00', '2023-06-23 00:00:00'))
    console.log('1m30s', TimeAge.getK8sAgeWith('2023-06-23 00:01:30', '2023-06-23 00:00:00'))
    console.log('59m', TimeAge.getK8sAgeWith('2023-06-23 00:59:00', '2023-06-23 00:00:00'))
    console.log('59m59s', TimeAge.getK8sAgeWith('2023-06-23 00:59:59', '2023-06-23 00:00:00'))
    console.log('1h', TimeAge.getK8sAgeWith('2023-06-23 01:00:00', '2023-06-23 00:00:00'))
    console.log('1h20m', TimeAge.getK8sAgeWith('2023-06-23 01:20:00', '2023-06-23 00:00:00'))
    console.log('1d', TimeAge.getK8sAgeWith('2023-06-24 00:00:00', '2023-06-23 00:00:00'))
    console.log('1d2h', TimeAge.getK8sAgeWith('2023-06-24 02:00:00', '2023-06-23 00:00:00'))
    console.log('3d', TimeAge.getK8sAgeWith('2023-06-26 00:00:00', '2023-06-23 00:00:00'))
    console.log('30d', TimeAge.getK8sAgeWith('2023-07-23 00:00:00', '2023-06-23 00:00:00'))
    console.log('18h23m', TimeAge.getK8sAgeWith('2023-06-23 18:23:55', '2023-06-23 00:00:00'))
  }
}
