const initialSequenceState = {
  toggles: []
}

const initialSequencerState = {
  voices: [...Array(8).keys()].map(() => initialSequenceState),
  currentStep: -1,
  nextStep: -1,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'TURN_STEP_ON':
    case 'TURN_STEP_OFF':
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
    case 'SEQUENCE_ARM':
      return Object.assign({}, state, { recording: true })
    case 'SEQUENCE_DISARM':
      return Object.assign({}, state, { recording: false })
  }
  return state
}

function toggleStep (state = initialSequenceState, {type, step}) {
  const toggles = state.toggles.slice()
  toggles[step] = type === 'TURN_STEP_ON'
  return Object.assign({}, state, { toggles })
}
