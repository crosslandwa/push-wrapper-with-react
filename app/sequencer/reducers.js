import { clone } from '../reducers/utils'

const emptyStepNumbers = () => [-1, -1, -1, -1, -1, -1, -1, -1]

const initialSequencerState = {
  bpm: 120,
  currentSteps: emptyStepNumbers(),
  deleteModeTrackIds: [],
  patternId: null,
  playing: false,
  nextSteps: emptyStepNumbers(),
  recording: false,
  selectedStepIds: [],
  swing: 0
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'SEQUENCER_DELETE_MODE_ON':
      return deleteModeOn(state, action.trackId)
    case 'SEQUENCER_DELETE_MODE_OFF':
      return deleteModeOff(state, action.trackId)
    case 'UI_SELECT_TRACK':
      return unselectAllSteps(state)
    case 'SEQUENCER_STEP_SELECT':
      return selectStep(state, action)
    case 'SEQUENCER_STEP_UNSELECT':
    case 'STEPS_TURN_OFF':
      return action.ids.reduce((state, id) => unselectStep(state, id), state)
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
    case 'PATTERN_CREATE_THEN_SELECT':
    case 'PATTERN_SELECT':
      return Object.assign({}, state, { patternId: action.id })
    case 'SEQUENCER_UPDATE_BPM':
      return Object.assign({}, state, { bpm: action.bpm })
    case 'SEQUENCER_UPDATE_SWING':
      return Object.assign({}, state, { swing: action.swing })
  }
  return state
}

function selectStep (state, {stepId})  {
  const currentlySelected = state.selectedStepIds.slice()
  return Object.assign({}, state, {
    selectedStepIds: currentlySelected.concat(
      currentlySelected.includes(stepId) ? [] : stepId
    )
  })
}

function unselectAllSteps (state) {
  return Object.assign({}, state, { selectedStepIds: initialSequencerState.selectedStepIds })
}

function unselectStep (state, stepId)  {
  return Object.assign({}, state, {
    selectedStepIds: state.selectedStepIds.slice().filter(id => id !== stepId)
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
