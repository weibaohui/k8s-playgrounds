export class TimerUtils {
  static everySecond(handler: TimerHandler) {
    return setInterval(handler, 1000)
  }

  static everyTwoSeconds(handler: TimerHandler) {
    return setInterval(handler, 2000)
  }

  static everyTenSeconds(handler: TimerHandler) {
    return setInterval(handler, 10 * 1000)
  }

  static everyTwentySeconds(handler: TimerHandler) {
    return setInterval(handler, 20 * 1000)
  }

  static delayOneSeconds(handler: TimerHandler) {
    return setTimeout(handler, 1000)
  }

  static delayTwoSeconds(handler: TimerHandler) {
    return setTimeout(handler, 2000)
  }

  static runOnceThenDelayTwoSeconds(run: () => void, handler: TimerHandler) {
    run()
    return setTimeout(handler, 2000)
  }

  static delay(handler: TimerHandler, timeout: number) {
    return setTimeout(handler, timeout)
  }
}
