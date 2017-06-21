import { clone } from '../reducers/utils'

const initialSequencerState = {
  patternId: null,
  bpm: 120,
  deleteModeTrackIds: [],
  currentStep: -1,
  nextStep: -1,
  selectedStepId: null,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'SEQUENCER_DELETE_MODE_ON':
      return deleteModeOn(state, action.trackId)
    case 'SEQUENCER_DELETE_MODE_OFF':
      return deleteModeOff(state, action.trackId)
    case 'SEQUENCER_STEP_SELECT':
      return selectStep(state, action)
    case 'SEQUENCER_STEP_UNSELECT':
    case 'STEP_TURN_OFF':
      return unselectStep(state, action.id)
    case 'SEQUENCER_ADVANCE_STEP':
      const { currentStep, nextStep } = state;
      return Object.assign({}, state, { currentStep: nextStep, lastStepTimeMs: action.nowMs, nextStep: (nextStep + 1) % 32 })
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
    case 'PATTERN_SELECT':
      return Object.assign({}, state, { patternId: action.id })
    case 'SEQUENCER_UPDATE_BPM':
      return Object.assign({}, state, { bpm: action.bpm })
  }
  return state
}

function selectStep (state, {stepId})  {
  return Object.assign({}, state, { selectedStepId: stepId})
}

function unselectStep (state, stepId)  {
  return Object.assign({}, state, {
    selectedStepId: state.selectedStepId === stepId ? null : state.selectedStepId
  })
}

function deleteModeOn (state, trackId) {
  const updated = clone(state)
  if (!updated.deleteModeTrackIds.includes(trackId)) {
    updated.deleteModeTrackIds = updated.deleteModeTrackIds.concat(trackId)
  }
  return updated
}

function deleteModeOff (state, trackId) {
  const updated = clone(state)
  updated.deleteModeTrackIds = updated.deleteModeTrackIds.filter(x => x !== trackId)
  return updated
}
