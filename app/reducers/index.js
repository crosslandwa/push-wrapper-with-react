import { combineReducers } from 'redux'
import { TOGGLE_SEQUENCE, TOGGLE_RAINBOW, ADVANCE_SEQUENCE } from '../actions'
import voices from '../voices/reducers'
const initialSequenceState = {
  kick: { toggles: [] },
  snare : { toggles: [] },
  hat: { toggles: [] },
  currentStep: -1,
  nextStep: -1,
  playing: false
}
function sequencer (state = initialSequenceState, action) {
  switch (action.type) {
    case TOGGLE_SEQUENCE:
      const toggles = state[action.sequence].toggles.slice()
      toggles[action.index] = !toggles[action.index]
      const newSequence = Object.assign({}, state[action.sequence], { toggles })
      return Object.assign({}, state, { [action.sequence]: newSequence })
    case ADVANCE_SEQUENCE:
      const { currentStep, nextStep } = state;
      return Object.assign({}, state, { currentStep: nextStep, nextStep: (nextStep + 1) % 8 })
    case 'SEQUENCE_NEXT_STEP':
      return Object.assign({}, state, { nextStep: action.step })
    case 'SEQUENCE_START':
      return Object.assign({}, state, { currentStep: -1, nextStep: action.step, playing: true })
    case 'SEQUENCE_STOP':
      return Object.assign({}, state, { currentStep: -1, nextStep: -1, playing: false })
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

export default combineReducers({
  rainbow,
  sequencer,
  voices
})
