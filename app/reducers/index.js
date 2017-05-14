import { combineReducers } from 'redux'
import voices from '../voices/reducers'
import sequencer from '../sequencer/reducers'

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

export default combineReducers({
  rainbow,
  sequencer,
  voices
})
