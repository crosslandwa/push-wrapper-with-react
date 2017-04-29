import { combineReducers } from 'redux'

function toggles (state = Array(8).fill(false), action) {
  switch (action.type) {
    case 'TOGGLE':
      const toggles = state.slice()
      toggles[action.index] = !toggles[action.index]
      return toggles
  }
  return state
}

const randomBetweenZeroAndTwo = max => Math.floor(Math.random() * (2 + 1))

function rainbow (state = [...Array(8).keys()].map(randomBetweenZeroAndTwo), {type, index}) {
  switch (type) {
    case 'TOGGLE_RAINBOW':
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
