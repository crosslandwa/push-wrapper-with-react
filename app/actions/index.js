export const TOGGLE_RAINBOW = 'TOGGLE_RAINBOW'
export const TOGGLE_SEQUENCE = 'TOGGLE_SEQUENCE'
export const ADVANCE_SEQUENCE = 'ADVANCE_SEQUENCE'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
const players = {}

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

export function playSample (voice, velocity = 100) {
  if (players[voice]) players[voice].play(midiGain(velocity))
  return { type: 'PLAY_SAMPLE' }
}

export function samplePlaying (voice, gain) {
  return { type: 'SAMPLE_PLAYING', velocity: gain.velocity(), voice }
}

export function loadSample (voice, url, sample) {
  return function (dispatch) {
    return players[voice]
    ? players[voice].loadResource(url)
    : PlayerFactory.forResource(url)
    .then(player => {
      players[voice] = player
      player.toMaster()
      player.on('started', gain => dispatch(samplePlaying(voice, gain)))
      player.on('stopped', () => dispatch(samplePlaying(voice, { velocity: () => 0 })))
    })
    .then(() => dispatch({ type: 'SAMPLE_LOADED', voice, sample }))
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
  return (dispatch, getState) => {
    const { sequences: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCE_START', step })
      dispatch(advanceSequence())
    } else {
      dispatch({ type: 'SEQUENCE_NEXT_STEP', step })
    }
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
    ['kick', 'snare', 'hat'].forEach((key, index) => {
      if (sequences[key].toggles[currentStep]) {
        dispatch(playSample(index))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}
