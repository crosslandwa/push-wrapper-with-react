import { combineReducers } from 'redux'
import { TOGGLE_TOGGLES, TOGGLE_RAINBOW } from '../actions'

function toggles (state = Array(8).fill(false), action) {
  switch (action.type) {
    case TOGGLE_TOGGLES:
      const toggles = state.slice()
      toggles[action.index] = !toggles[action.index]
      return toggles
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

export default combineReducers({
  rainbow,
  sampleUrls,
  toggles
})
