export const TOGGLE_RAINBOW = 'TOGGLE_RAINBOW'
export const TOGGLE_TOGGLES = 'TOGGLE_TOGGLES'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const players = {}

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

export function playSample (key, velocity = 100) {
  if (players[key]) players[key].play(midiGain(velocity))
  return { type: 'DO_NOTHING' }
}

export function samplePlaying (key, gain) {
  return { type: 'SAMPLE_PLAYING', velocity: gain.velocity(), key }
}

export function loadSample (key, url) {
  return function (dispatch) {
    return players[key]
    ? players[key].loadResource(url)
    : PlayerFactory.forResource(url)
    .then(player => {
      players[key] = player
      player.toMaster()
      player.on('started', gain => dispatch(samplePlaying(key, gain)))
      player.on('stopped', () => dispatch(samplePlaying(key, { velocity: () => 0 })))
    })
  } // TODO handle url load failure (does wac.sample-player reject promise correctly?)
}

export function toggleRainbow (index) {
  return { type: TOGGLE_RAINBOW, index }
}

export function toggleToggles (index) {
  return { type: TOGGLE_TOGGLES, index }
}
