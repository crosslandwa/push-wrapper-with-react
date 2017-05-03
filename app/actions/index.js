export const TOGGLE_RAINBOW = 'TOGGLE_RAINBOW'
export const TOGGLE_SEQUENCE = 'TOGGLE_SEQUENCE'
export const ADVANCE_SEQUENCE = 'ADVANCE_SEQUENCE'

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

export function toggleSequence (key, index) {
  return { type: TOGGLE_SEQUENCE, sequence: key, index }
}

export function stopSequence () {
  return dispatch => {
    dispatch({ type: 'SEQUENCE_STOP' })
  }
}

export function startSequence (step = 0) {
  return dispatch => {
    dispatch({ type: 'SEQUENCE_START', step })
    dispatch(advanceSequence())
  }
}

function advanceSequence () {
  return (dispatch, getState) => {
    const { sequences: { playing } } = getState()
    if (!playing) return
    dispatch({ type: ADVANCE_SEQUENCE })
    return dispatch(playSequencedVoices())
  }
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { sequences, sequences: { currentStep } } = getState();
    ['kick', 'snare', 'hat'].forEach(key => {
      if (sequences[key].toggles[currentStep]) {
        dispatch(playSample(key))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}
