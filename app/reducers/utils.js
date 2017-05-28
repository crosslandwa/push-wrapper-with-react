export function arrayFillOf(o, length) {
  return [...Array(length).keys()].map(() => Object.assign({}, o))
}
