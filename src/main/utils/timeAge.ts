import moment from 'moment'

export class TimeAge {
  showWeeks = true
  // gregorian calendar days in month lookup table
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  // gregorian calendar leap year computation
  daysInFebruary(y) {
    return y % 4 ? 28 : y % 400 ? y % 100 ? 29 : 28 : 29
  }

  daysInLastMonth(now) {
    let month = now.getMonth()
    let year = now.getFullYear()
    // if Jan, wrap back to Dec of previous year
    if (month === 0) {
      month = 11
      year--
    }
    else {
      month--
    }

    // if it's february, we have to determine if it's a leap year
    if (month === 1)
      return this.daysInFebruary(year)
    else
      return this.daysInMonth[month]
  }

  daysInPenultimateMonth(now) {
    let month = now.getMonth()
    let year = now.getFullYear()

    // back up 2 months
    if (month === 0) {
      month = 10
      year--
    }
    else if (month === 1) {
      month = 11
      year--
    }
    else {
      month -= 2
    }

    // if it's february, we have to determine if it's a leap year
    if (month === 1)
      return this.daysInFebruary(year)
    else
      return this.daysInMonth[month]
  }

  getUnixAge(bday) {
    bday = '2023-06-29 14:25:34'
    const now = moment()
    const seconds = now.diff(moment(bday), 'seconds')
    const minutes = now.diff(moment(bday), 'minutes')
    const hours = now.diff(moment(bday), 'hours')
    const days = now.diff(moment(bday), 'days')
    console.log(seconds, minutes, hours, days)

    const hoursMod = hours % 24
    const minutesMod = minutes % 60
    const secondsMod = seconds % 60
    if (days > 2)
      return `${days}D`

    if (days <= 2 && days > 0) {
      if (hoursMod > 0)
        return `${days}d${hoursMod}h`

      return `${days}d`
    }
    if (days === 0) {
      if (hours > 0 && minutesMod > 0)
        return `${hours}h${minutesMod}m`
      if (hours > 0 && minutesMod === 0)
        return `${hours}h`
      if (hours === 0)
        return `${minutes}m`
    }
    if (hours === 0) {
      if (minutes > 0 && secondsMod > 0)
        return `${minutes}m${secondsMod}s`

      if (minutes > 0 && secondsMod === 0)
        return `${minutes}m`

      if (minutes === 0)
        return `${seconds}s`
    }
  }

  public getCalendarAge(bday, now, accuracy) {
    console.log(this.getUnixAge(bday))
    const arr = []
    let years = now.getFullYear() - bday.getFullYear()
    let months = now.getMonth() - bday.getMonth()
    let days = now.getDate() - bday.getDate()

    let hours = now.getHours() - bday.getHours()
    let minutes = now.getMinutes() - bday.getMinutes()
    let seconds = now.getSeconds() - bday.getSeconds()
    let weeks = 0

    function fmt(vector, singular, num, acc) {
      if (num === 0 || acc > accuracy)
        console.log()
      else if (num === 1)
        vector.push(`${String(num)}${singular}`)
      else
        vector.push(`${String(num)}${singular}s`)
    }

    if (!accuracy)
      accuracy = 7

    // rollover adjustments
    if (seconds < 0) {
      seconds += 60
      minutes--
    }
    if (minutes < 0) {
      minutes += 60
      hours--
    }
    if (hours < 0) {
      hours += 24
      days--
    }
    if (days < 0) {
      days += this.daysInLastMonth(now)
      months--

      if (days < 0) {
        days += this.daysInPenultimateMonth(now)
        months--
      }
    }
    if (months < 0) {
      months += 12
      years--
    }
    if (this.showWeeks) {
      // compute weeks...
      weeks = Math.floor(days / 7)
      days = days % 7
    }

    // fmt(arr, 'year', years, 1)
    // fmt(arr, 'month', months, 2)
    // fmt(arr, 'week', weeks, 3)
    // fmt(arr, 'day', days, 4)
    // fmt(arr, 'hour', hours, 5)
    // fmt(arr, 'minute', minutes, 6)
    // fmt(arr, 'second', seconds, 7)
    fmt(arr, 'Y', years, 1)
    fmt(arr, 'M', months, 2)
    fmt(arr, 'w', weeks, 3)
    fmt(arr, 'd', days, 4)
    fmt(arr, 'h', hours, 5)
    fmt(arr, 'm', minutes, 6)
    fmt(arr, 's', seconds, 7)

    if (arr.length > 1)
      arr[arr.length - 1] = `${arr[arr.length - 1]}`

    return arr.join('')
  }

  /**
     * Format a millisecond time value as a human readable display time.
     */
  public getDuration(msec, accuracy) {
    const end = new Date()
    const start = new Date(end.getTime() - msec)
    return this.getCalendarAge(start, end, accuracy)
  }
}
