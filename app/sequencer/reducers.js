import { arrayFillOf } from '../reducers/utils'
const clone = array =>  JSON.parse(JSON.stringify(array))

const initialStepOffState = {
  midiPitch: null,
  midiVelocity: null
}

const initialSequenceState = {
  steps: arrayFillOf(initialStepOffState, 32),
  deleteMode: false,
  stepsUnderEdit: []
}

const initialSequencerState = {
  voices: arrayFillOf(initialSequenceState, 8),
  currentStep: -1,
  nextStep: -1,
  playing: false,
  recording: false
}

export default function sequencer (state = initialSequencerState, action) {
  switch (action.type) {
    case 'SEQUENCER_STEP_ON':
    case 'SEQUENCER_STEP_OFF':
      return updateVoice(state, action, toggleStep)
    case 'SEQUENCER_DELETE_MODE_ON':
    case 'SEQUENCER_DELETE_MODE_OFF':
      return updateVoice(state, action, toggleDeleteMode)
    case 'SEQUENCER_STEP_EDIT_ON':
      return updateVoice(state, action, addStepUnderEdit)
    case 'SEQUENCER_STEP_EDIT_OFF':
      return updateVoice(state, action, removeStepUnderEdit)
    case 'SEQUENCER_ADVANCE_STEP':
      const { currentStep, nextStep } = state;
      return Object.assign({}, state, { currentStep: nextStep, nextStep: (nextStep + 1) % 32 })
    case 'SEQUENCER_NEXT_STEP':
      return Object.assign({}, state, { nextStep: action.step })
    case 'SEQUENCER_START':
      return Object.assign({}, state, { currentStep: -1, nextStep: action.step, playing: true })
    case 'SEQUENCER_STOP':
      return Object.assign({}, state, { currentStep: -1, nextStep: -1, playing: false })
    case 'SEQUENCER_ARM':
      return Object.assign({}, state, { recording: true })
    case 'SEQUENCER_DISARM':
      return Object.assign({}, state, { recording: false })
  }
  return state
}

function updateVoice (state = initialSequencerState, action, func) {
  const voices = clone(state.voices)
  voices[action.voice] = func(state.voices[action.voice], action)
  return Object.assign({}, state, { voices })
}

function toggleStep (state = initialSequenceState, {type, step, pitch, velocity}) {
  const steps = clone(state.steps)
  steps[step] = (type === 'SEQUENCER_STEP_ON')
    ? { midiPitch: pitch || null, midiVelocity: velocity || 100}
    : initialStepOffState
  return Object.assign({}, state, { steps })
}

function addStepUnderEdit (state = initialSequenceState, {step}) {
  if (state.stepsUnderEdit.includes(step)) return state
  const stepsUnderEdit = state.stepsUnderEdit.concat(step)
  return Object.assign({}, state, { stepsUnderEdit })
}

function removeStepUnderEdit (state = initialSequenceState, {step}) {
  return Object.assign({}, state, {
    stepsUnderEdit: state.stepsUnderEdit.filter(underEdit => underEdit !== step)
  })
}

function toggleDeleteMode (state = initialSequenceState, {type}) {
  return Object.assign({}, state, { deleteMode: type === 'SEQUENCER_DELETE_MODE_ON' })
}
