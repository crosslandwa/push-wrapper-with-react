const initialSequenceState = {
  toggles: []
}

const initialSequencerState = {
  voices: [...Array(8).keys()].map(() => initialSequenceState),
  currentStep: -1,
  nextStep: -1,
  playing: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'TOGGLE_SEQUENCE':
      const voices = state.voices.slice()
      voices[action.voice] = toggleStep(state.voices[action.voice], action)
      return Object.assign({}, state, { voices })
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

function toggleStep (state = initialSequenceState, {step}) {
  const toggles = state.toggles.slice()
  toggles[step] = !toggles[step]
  return Object.assign({}, state, { toggles })
}