import {playSample} from '../voices/actions'

export function toggleStep (voice, step) {
  return (dispatch, getState) => {
    const { sequencer: { voices } } = getState()
    const currentStep = voices[voice].steps[step]
    const toggle = (currentStep.midiPitch !== null) ? turnStepOff : turnStepOn
    dispatch(toggle(voice, step))
  }
}

function turnStepOn (voice, step) {
  return { type: 'SEQUENCER_STEP_ON', voice, step }
}

function turnStepOff (voice, step) {
  return { type: 'SEQUENCER_STEP_OFF', voice, step }
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
    const { sequencer: { currentStep, voices } } = getState()
    voices.forEach((voice, index) => {
      const step = voice.steps[currentStep]
      if (step.midiPitch !== null) {
        dispatch(voice.deleteMode
          ? turnStepOff(index, currentStep)
          : playSample(index, 1, step.midiVelocity)
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

export function deleteModeOn (voice) {
  return { type: 'SEQUENCER_DELETE_MODE_ON', voice}
}

export function deleteModeOff (voice) {
  return { type: 'SEQUENCER_DELETE_MODE_OFF', voice}
}
