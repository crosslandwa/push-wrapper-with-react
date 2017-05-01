export const TOGGLE_RAINBOW = 'TOGGLE_RAINBOW'
export const TOGGLE_TOGGLES = 'TOGGLE_TOGGLES'

export function toggleRainbow (index) {
  return { type: TOGGLE_RAINBOW, index }
}

export function toggleToggles (index) {
  return { type: TOGGLE_TOGGLES, index }
}
