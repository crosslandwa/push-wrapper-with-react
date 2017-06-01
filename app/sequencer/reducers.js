import { clone } from '../reducers/utils'

const initialSequencerState = {
  patternId: 'pattern0',
  sequencesInDeleteMode: [],
  currentStep: -1,
  nextStep: -1,
  selectedStepId: null,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'SEQUENCER_DELETE_MODE_ON':
      return deleteModeOn(state, action.voice)
    case 'SEQUENCER_DELETE_MODE_OFF':
      return deleteModeOff(state, action.voice)
    case 'SEQUENCER_STEP_SELECT':
      return selectStep(state, action)
    case 'SEQUENCER_STEP_UNSELECT':
      return unselectStep(state, action)
    case 'SEQUENCER_ADVANCE_STEP':
      const { currentStep, nextStep } = state;
      return Object.assign({}, state, { currentStep: nextStep, nextStep: (nextStep + 1) % 32 })
    case 'SEQUENCER_NEXT_STEP':
      return Object.assign({}, state, { nextStep: action.stepNumber })
    case 'SEQUENCER_START':
      return Object.assign({}, state, { currentStep: -1, nextStep: action.stepNumber, playing: true })
    case 'SEQUENCER_STOP':
      return Object.assign({}, state, { currentStep: -1, nextStep: -1, playing: false })
    case 'SEQUENCER_ARM':
      return Object.assign({}, state, { recording: true })
    case 'SEQUENCER_DISARM':
      return Object.assign({}, state, { recording: false })
  }
  return state
}

function selectStep (state, {stepId})  {
  return Object.assign({}, state, { selectedStepId: stepId})
}

function unselectStep (state, {stepId})  {
  return Object.assign({}, state, {
    selectedStepId: state.selectedStepId === stepId ? null : state.selectedStepId
  })
}

function deleteModeOn (state, voiceNumber) {
  const updated = clone(state)
  if (!updated.sequencesInDeleteMode.includes(voiceNumber)) {
    updated.sequencesInDeleteMode = updated.sequencesInDeleteMode.concat(voiceNumber)
  }
  return updated
}

function deleteModeOff (state, voiceNumber) {
  const updated = clone(state)
  updated.sequencesInDeleteMode = updated.sequencesInDeleteMode.filter(x => x !== voiceNumber)
  return updated
}
