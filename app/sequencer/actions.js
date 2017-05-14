import {playSample} from '../voices/actions'

export function toggleStep (voice, step) {
  return (dispatch, getState) => {
    const { sequencer: { voices } } = getState()
    const stepOn = voices[voice].toggles[step]
    const toggle = stepOn ? turnStepOff : turnStepOn
    dispatch(toggle(voice, step))
  }
}

function turnStepOn (voice, step) {
  return { type: 'TURN_STEP_ON', voice, step }
}

function turnStepOff (voice, step) {
  return { type: 'TURN_STEP_OFF', voice, step }
}

export function stopSequence () {
  return { type: 'SEQUENCE_STOP' }
}

export function startSequence (step = 0) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCE_START', step })
      dispatch(advanceSequence())
    } else {
      dispatch({ type: 'SEQUENCE_NEXT_STEP', step })
    }
  }
}

function advanceSequence () {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) return
    dispatch({ type: 'ADVANCE_SEQUENCE' })
    return dispatch(playSequencedVoices())
  }
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { sequencer, sequencer: { currentStep } } = getState()
    sequencer.voices.forEach((voice, index) => {
      if (voice.toggles[currentStep]) {
        dispatch(playSample(index))
      }
    })
    setTimeout(() => dispatch(advanceSequence()), 125)
  }
}

export function disarmSequencer () {
  return { type: 'SEQUENCE_DISARM' }
}

export function armSequencer () {
  return { type: 'SEQUENCE_ARM' }
}

export function recordStep (voice, velocity) {
  return (dispatch, getState) => {
    const { sequencer: { recording, currentStep, playing } } = getState()
    if (!recording) return
    if (!playing) {
      dispatch(startSequence(0))
    }

    dispatch(turnStepOn(voice, Math.max(0, currentStep)))
  }
}
