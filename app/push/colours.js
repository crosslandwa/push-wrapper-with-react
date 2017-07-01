const Colours = {
  black: [20, 20, 20],
  blue: [0, 100, 200],
  green: [0, 200, 10],
  off: [199, 204, 206],
  orange: [250, 160, 10],
  red: [200, 10, 0],
  turquoise: [30, 220, 170],
  white: [240, 240, 240],
  yellow: [230, 240, 70],
}

const fade = (rgb, velocity) => rgb.map(x => Math.round(x / 127 * velocity))
const domFade = ([r, g, b], velocity) => [
  Math.round(((r - 199) / 127) * velocity) + 199,
  Math.round(((g - 204) / 127) * velocity) + 204,
  Math.round(((b - 206) / 127) * velocity) + 206
]

export { Colours, fade, domFade }
