// eslint-disable-next-line no-extend-native
Number.prototype.thousandsSeparator = function (): string {
  return Number(this).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export {}
