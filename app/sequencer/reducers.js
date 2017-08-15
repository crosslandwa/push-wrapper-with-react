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
      return { ...state, currentSteps, lastStepTimeMs: action.nowMs, nextSteps }
    case 'SEQUENCER_NEXT_STEP':
      return { ...state, nextSteps: emptyStepNumbers().map(x => action.stepNumber) }
    case 'SEQUENCER_START':
      return { ...state, currentSteps: emptyStepNumbers(),  nextSteps: emptyStepNumbers().map(x => action.stepNumber), playing: true }
    case 'SEQUENCER_STOP':
      return { ...state, currentSteps: emptyStepNumbers(), nextSteps: emptyStepNumbers(), playing: false }
    case 'SEQUENCER_ARM':
      return { ...state, recording: true }
    case 'SEQUENCER_DISARM':
      return { ...state, recording: false }
    case 'PATTERN_CREATE_THEN_SELECT':
    case 'PATTERN_SELECT':
      return { ...state, patternId: action.id }
    case 'SEQUENCER_UPDATE_BPM':
      return { ...state, bpm: action.bpm }
    case 'SEQUENCER_UPDATE_SWING':
      return { ...state, swing: action.swing }
  }
  return state
}

function selectStep (state, {stepId})  {
  const current = state.selectedStepIds.slice()
  const selectedStepIds = current.concat(current.includes(stepId) ? [] : stepId)
  return { ...state, selectedStepIds }
}

function unselectAllSteps (state) {
  return { ...state, selectedStepIds: initialSequencerState.selectedStepIds }
}

function unselectStep (state, stepId)  {
  return { ...state, selectedStepIds: state.selectedStepIds.slice().filter(id => id !== stepId) }
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
