export function arrayFillOf(o, length) {
  return [...Array(length).keys()].map(() => Object.assign({}, o))
}

export function clone (x) {
  return JSON.parse(JSON.stringify(x))
}
