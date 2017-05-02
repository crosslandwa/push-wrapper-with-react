import { combineReducers } from 'redux'
import { TOGGLE_SEQUENCE, TOGGLE_RAINBOW } from '../actions'
const initialSequenceState = {
  kicks: { toggles: Array(8).fill(false) },
  snares: { toggles: Array(8).fill(false) }
}
function sequences (state = initialSequenceState, action) {
  switch (action.type) {
    case TOGGLE_SEQUENCE:
      const toggles = state[action.sequence].toggles.slice()
      toggles[action.index] = !toggles[action.index]
      const newSequence = Object.assign({}, state[action.sequence], { toggles })
      return Object.assign({}, state, { [action.sequence]: newSequence })
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
