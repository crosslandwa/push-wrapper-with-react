const initialSequenceState = {
  toggles: [],
  deleteMode: false
}

const initialSequencerState = {
  voices: [...Array(16).keys()].map(() => initialSequenceState),
  currentStep: -1,
  nextStep: -1,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'TURN_STEP_ON':
    case 'TURN_STEP_OFF':
      return updateVoice(state, action, toggleStep)
    case 'SEQUENCER_DELETE_MODE_ON':
    case 'SEQUENCER_DELETE_MODE_OFF':
      return updateVoice(state, action, toggleDeleteMode)
    case 'ADVANCE_SEQUENCE':
      const { currentStep, nextStep } = state;
      return Object.assign({}, state, { currentStep: nextStep, nextStep: (nextStep + 1) % 16 })
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

function updateVoice (state = initialSequencerState, action, func) {
  const voices = state.voices.slice()
  voices[action.voice] = func(state.voices[action.voice], action)
  return Object.assign({}, state, { voices })
}

function toggleStep (state = initialSequenceState, {type, step}) {
  const toggles = state.toggles.slice()
  toggles[step] = type === 'TURN_STEP_ON'
  return Object.assign({}, state, { toggles })
}

function toggleDeleteMode (state = initialSequencerState, {type}) {
  return Object.assign({}, state, { deleteMode: type === 'SEQUENCER_DELETE_MODE_ON' })
}
