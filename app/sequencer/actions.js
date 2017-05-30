import {playSample} from '../voices/actions'

export function enterStepEditMode (voice, step) {
  return { type: 'SEQUENCER_STEP_EDIT_ON', voice, step }
}

export function exitStepEditMode (voice, step) {
  return { type: 'SEQUENCER_STEP_EDIT_OFF', voice, step }
}

export function selectStep (voice, step) {
  return { type: 'SEQUENCER_STEP_SELECT', voice, step }
}

export function unselectStep (voice, step) {
  return { type: 'SEQUENCER_STEP_UNSELECT', voice, step }
}

export function turnStepOn (voice, stepNumber, pitch, velocity) {
  return (dispatch, getState) => {
    const { entities: { steps: { allIds } } } = getState()
    return dispatch({
      type: 'SEQUENCER_STEP_ON',
      id: `step${allIds.length}`,
      voice,
      stepNumber,
      step: stepNumber,
      pitch,
      velocity
    })
  }
}

export function turnStepOff (voice, stepNumber) { // TODO pass stepId here
  return (dispatch, getState) => {
    const {sequencer: {voices}} = getState()
    const id = voices[voice].stepsById[stepNumber]
    if (id === 'emptyStep') return
    return dispatch({ type: 'SEQUENCER_STEP_OFF', voice, step: stepNumber, stepNumber, id })
  }
}

export function stopSequence () {
  return { type: 'SEQUENCER_STOP' }
}

export function startSequence (step = 0) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCER_START', step })
      dispatch(advanceSequence())
    } else {
      dispatch({ type: 'SEQUENCER_NEXT_STEP', step })
    }
  }
}

function advanceSequence () {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) return
    dispatch({ type: 'SEQUENCER_ADVANCE_STEP' })
    return dispatch(playSequencedVoices())
  }
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { voices: voicesState, sequencer: { currentStep, voices } } = getState()
    voices.forEach((voice, index) => {
      const step = voice.steps[currentStep]
      if (step.midiVelocity !== null) {
        dispatch(voice.deleteMode
          ? turnStepOff(index, currentStep)
          : playSample(index, step.midiPitch || voicesState[index].pitch, step.midiVelocity)
        )
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}

export function disarmSequencer () {
  return { type: 'SEQUENCER_DISARM' }
}

export function armSequencer () {
  return { type: 'SEQUENCER_ARM' }
}

export function recordStep (voice, { pitch, velocity }) {
  return (dispatch, getState) => {
    const { sequencer: { currentStep, playing } } = getState()
    if (!playing) {
      dispatch(startSequence(0))
    }

    dispatch(turnStepOn(voice, Math.max(0, currentStep), pitch, velocity))
  }
}

export function deleteModeOn (voice) {
  return { type: 'SEQUENCER_DELETE_MODE_ON', voice}
}

export function deleteModeOff (voice) {
  return { type: 'SEQUENCER_DELETE_MODE_OFF', voice}
}
