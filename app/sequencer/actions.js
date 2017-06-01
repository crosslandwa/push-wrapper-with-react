import {playSample} from '../voices/actions'

export function selectStep (voice, stepId) {
  return { type: 'SEQUENCER_STEP_SELECT', voice, stepId }
}

export function unselectStep (voice, stepId) {
  return { type: 'SEQUENCER_STEP_UNSELECT', voice, stepId }
}

export function turnStepOn (voice, stepNumber, pitch, velocity) {
  return (dispatch, getState) => {
    const {
      entities: { steps: { allIds } }
    } = getState()
    const id = `step${allIds.length}`
    dispatch({ type: 'STEP_TURN_ON', id, trackId: `track${voice}`, voice, stepNumber, pitch, velocity })
    return id
  }
}

export function updateStepPitch(id, pitch) {
  return { type: 'STEP_UPDATE_PITCH', id, pitch }
}

export function turnStepOff (id) {
  return (dispatch, getState) => {
    if (id === 'emptyStep') return
    dispatch({ type: 'STEP_TURN_OFF', id })
  }
}

export function stopSequence () {
  return { type: 'SEQUENCER_STOP' }
}

export function startSequence (stepNumber = 0) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCER_START', stepNumber })
      dispatch(advanceSequence())
    } else {
      dispatch({ type: 'SEQUENCER_NEXT_STEP', stepNumber })
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
    const {
      voices: voicesState,
      sequencer: { currentStep, voices, sequencesInDeleteMode },
      entities: { steps }
    } = getState()
    voices.forEach((voice, voiceNumber) => {
      const stepId = voice.stepsById[currentStep]
      const step = steps.byId[stepId]
      if (step.midiVelocity !== null) {
        dispatch(sequencesInDeleteMode.includes(voiceNumber)
          ? turnStepOff(stepId)
          : playSample(voiceNumber, step.midiPitch || voicesState[voiceNumber].pitch, step.midiVelocity)
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
