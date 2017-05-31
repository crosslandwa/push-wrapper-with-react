import { arrayFillOf } from '../reducers/utils'
const clone = array =>  JSON.parse(JSON.stringify(array))

const initialSequenceState = {
  stepsById: [...Array(32).keys()].map(i => 'emptyStep'),
  deleteMode: false
}

const initialSequencerState = {
  voices: arrayFillOf(initialSequenceState, 8),
  currentStep: -1,
  nextStep: -1,
  selectedStepId: null,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'STEP_TURN_OFF':
      return removeStep(state, action.id)
    case 'STEP_TURN_ON':
      return turnStepOn(state, action.voice, action.id, action.stepNumber)
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

function turnStepOn (state, voice, stepId, stepNumber) {
  const updated = clone(state)
  updated.voices[voice].stepsById[stepNumber] = stepId
  return updated
}

function removeStep (state, id) {
  const updated = clone(state)
  updated.voices.forEach(voice => {
    voice.stepsById[voice.stepsById.indexOf(id)] = 'emptyStep'
  })
  return updated
}

function selectStep (state, {stepId})  {
  return Object.assign({}, state, { selectedStepId: stepId})
}

function unselectStep (state, {stepId})  {
  return Object.assign({}, state, {
    selectedStepId: state.selectedStepId === stepId ? null : state.selectedStepId
  })
}

function deleteModeOn (state, voice) {
  const updated = clone(state)
  updated.voices[voice].deleteMode = true
  return updated
}

function deleteModeOff (state, voice) {
  const updated = clone(state)
  updated.voices[voice].deleteMode = false
  return updated
}
