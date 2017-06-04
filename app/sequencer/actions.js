import {playVoiceForTrack} from '../voices/actions'

export function selectStep (stepId) {
  return { type: 'SEQUENCER_STEP_SELECT', stepId }
}

export function unselectStep (stepId) {
  return { type: 'SEQUENCER_STEP_UNSELECT', stepId }
}

export function turnStepOn (trackId, stepNumber, pitch, velocity) {
  return (dispatch, getState) => {
    const {
      entities: { steps: { allIds } }
    } = getState()
    const id = `step${allIds.length}`
    dispatch({ type: 'STEP_TURN_ON', id, trackId, stepNumber, pitch, velocity })
    return id
  }
}

export function updateStepPitch(id, pitch) {
  return { type: 'STEP_UPDATE_PITCH', id, pitch }
}

export function turnStepOff (id) {
  return (dispatch, getState) => {
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
      sequencer: { currentStep, patternId, deleteModeTrackIds },
      entities: { steps, patterns, tracks, voices }
    } = getState()
    patterns.byId[patternId].trackIds.forEach((trackId, index) => {
      const track = tracks.byId[trackId]
      const stepId = track.stepIds[currentStep]
      if (!stepId) return
      const step = steps.byId[stepId]
      dispatch(deleteModeTrackIds.includes(trackId)
        ? turnStepOff(stepId)
        : playVoiceForTrack(trackId, {
            pitch: step.midiPitch,
            velocity: step.midiVelocity
          })
      )
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

export function recordStep (trackId, { pitch, velocity }) {
  return (dispatch, getState) => {
    const { entities: { tracks, voices }, sequencer: { currentStep, playing } } = getState()
    dispatch(turnStepOn(trackId, Math.max(0, currentStep), pitch, velocity))
    if (!playing) {
      dispatch(startSequence(0))
    }
  }
}

export function deleteModeOn (trackId) {
  return { type: 'SEQUENCER_DELETE_MODE_ON', trackId}
}

export function deleteModeOff (trackId) {
  return { type: 'SEQUENCER_DELETE_MODE_OFF', trackId}
}
