export function clone (x) {
  return JSON.parse(JSON.stringify(x))
}

const unique = (x, i, self) => self.indexOf(x) === i
export function filterUnique (arr) {
  return arr.filter(unique)
}
