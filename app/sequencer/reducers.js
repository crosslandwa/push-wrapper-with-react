const initialSequenceState = {
  kick: { toggles: [] },
  snare : { toggles: [] },
  hat: { toggles: [] },
  currentStep: -1,
  nextStep: -1,
  playing: false
}

export default function sequencer (state = initialSequenceState, action) {
  switch (action.type) {
    case 'TOGGLE_SEQUENCE':
      const toggles = state[action.sequence].toggles.slice()
      toggles[action.index] = !toggles[action.index]
      const newSequence = Object.assign({}, state[action.sequence], { toggles })
      return Object.assign({}, state, { [action.sequence]: newSequence })
    case 'ADVANCE_SEQUENCE':
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
