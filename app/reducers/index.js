import { combineReducers } from 'redux'
import { TOGGLE_SEQUENCE, TOGGLE_RAINBOW, ADVANCE_SEQUENCE } from '../actions'
const initialSequenceState = {
  kick: { toggles: Array(8).fill(false) },
  snare : { toggles: Array(8).fill(false) },
  hat: { toggles: [] },
  step: { toggles: Array(8).fill(false) },
  currentStep: -1,
  playing: false
}
function sequences (state = initialSequenceState, action) {
  switch (action.type) {
    case TOGGLE_SEQUENCE:
      const toggles = state[action.sequence].toggles.slice()
      toggles[action.index] = !toggles[action.index]
      const newSequence = Object.assign({}, state[action.sequence], { toggles })
      return Object.assign({}, state, { [action.sequence]: newSequence })
    case ADVANCE_SEQUENCE:
      const nextStep = state.currentStep + 1 >= 8 ? 0 : state.currentStep + 1
      const steps = [...Array(8).keys()].map(i => i === state.currentStep)
      return Object.assign(
        {},
        state,
        { currentStep: nextStep >= 8 ? 0 : nextStep },
        { step: { toggles: steps } }
      )
    case 'SEQUENCE_START':
      return Object.assign(
        {},
        state,
        { currentStep: 0, playing: !state.playing }
      )
    case 'SEQUENCE_STOP':
      return Object.assign(
        {},
        state,
        { currentStep: -1, playing: false, step: initialSequenceState.step }
      )
  }
  return state
}

const randomBetweenZeroAndTwo = max => Math.floor(Math.random() * (2 + 1))

function rainbow (state = [...Array(8).keys()].map(randomBetweenZeroAndTwo), {type, index}) {
  switch (type) {
    case TOGGLE_RAINBOW:
      const rainbow = state.slice()
      while(state[index] === rainbow[index]) {
        rainbow[index] = randomBetweenZeroAndTwo()
      }
      return rainbow
  }
  return state
}

function sampleUrls (state = { snare: 'snare.mp3', kick: 'kick.mp3' }) {
  return state
}

function samples (state = {}, { type, key, velocity = 0 }) {
  switch (type) {
    case 'SAMPLE_PLAYING':
      const sample = Object.assign({}, state[key] ? state[key] : { } , { velocity })
      return Object.assign({}, state, { [key]: sample })
  }
  return state
}

export default combineReducers({
  rainbow,
  sampleUrls,
  sequences,
  samples
})
