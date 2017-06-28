import { clone } from '../reducers/utils'

const emptyStepNumbers = () => [-1, -1, -1, -1, -1, -1, -1, -1]

const initialSequencerState = {
  patternId: null,
  bpm: 120,
  deleteModeTrackIds: [],
  currentSteps: emptyStepNumbers(),
  nextSteps: emptyStepNumbers(),
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
      const { currentSteps, nextSteps } = action
      return Object.assign({}, state, { currentSteps, lastStepTimeMs: action.nowMs, nextSteps })
    case 'SEQUENCER_NEXT_STEP':
      return Object.assign({}, state, { nextSteps: emptyStepNumbers().map(x => action.stepNumber) })
    case 'SEQUENCER_START':
      return Object.assign({}, state, { currentSteps: emptyStepNumbers(),  nextSteps: emptyStepNumbers().map(x => action.stepNumber), playing: true })
    case 'SEQUENCER_STOP':
      return Object.assign({}, state, { currentSteps: emptyStepNumbers(), nextSteps: emptyStepNumbers(), playing: false })
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
