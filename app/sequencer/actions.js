const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const Scheduling = require('wac.scheduling')(context)

import { playVoiceForTrack } from '../player/actions'
import { currentBpm, currentStepNumberForTrack, currentSwing, currentTracksForPattern, nextStepNumberForTrack, stepIds, stepSelector } from '../selectors'

export function selectStep (stepId) {
  return { type: 'SEQUENCER_STEP_SELECT', stepId }
}

export function unselectStep (stepId) {
  return { type: 'SEQUENCER_STEP_UNSELECT', ids: [stepId] }
}

export function turnStepOn (trackId, stepNumber, pitch, velocity) {
  return (dispatch, getState) => {
    const id = `${trackId}-s-${stepNumber}`
    dispatch({ type: 'STEP_TURN_ON', id, trackId, stepNumber, pitch, velocity })
    return id
  }
}

export function turnStepsOff (ids) {
  return { type: 'STEPS_TURN_OFF', ids }
}

export function stopSequence () {
  return { type: 'SEQUENCER_STOP' }
}

export function startSequence (stepNumber = 0) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) {
      dispatch({ type: 'SEQUENCER_START', stepNumber })
      dispatch(advanceSequence(Scheduling.nowMs()))
    } else {
      dispatch({ type: 'SEQUENCER_NEXT_STEP', stepNumber })
    }
  }
}

function advanceSequence (stepTimeMs) {
  return (dispatch, getState) => {
    const { sequencer: { playing } } = getState()
    if (!playing) return

    const patternTracks = currentTracksForPattern(getState())
    const currentSteps = patternTracks.map(track => nextStepNumberForTrack(getState(), track.id))
    const nextSteps = patternTracks.map((track, index) => (currentSteps[index] + 1) % track.numberOfSteps)
    dispatch({ type: 'SEQUENCER_ADVANCE_STEP', currentSteps, nextSteps, nowMs: stepTimeMs})
    return dispatch(playSequencedVoices())
  }
}

function beatLengthMs (bpm) {
  return (60 / bpm) * 1000 // 1 beat = 1000ms at 60bpm, 1 beat = 500ms at 120bpm
}

function stepLengthMs(bpm) {
  return beatLengthMs(bpm) * 0.25 // assume 16n for now
}

function playSequencedVoices  () {
  return (dispatch, getState) => {
    const { sequencer: { deleteModeTrackIds, lastStepTimeMs } } = getState()
    const stepLength = stepLengthMs(currentBpm(getState()))
    currentTracksForPattern(getState()).forEach(track => {
      const stepNumber = currentStepNumberForTrack(getState(), track.id)
      const stepId = track.stepIds[stepNumber]
      if (!stepId) return
      const step = stepSelector(getState(), stepId)
      deleteModeTrackIds.includes(track.id)
        ? dispatch(turnStepOff(stepId))
        : dispatch(playVoiceForTrack(track.id, {
          decay: step.voiceDecay,
          pitch: step.midiPitch,
          velocity: step.midiVelocity,
          stepTimeMs: lastStepTimeMs + ((stepNumber % 2) * currentSwing(getState()) * 0.01 * stepLength)
        }))
    })
    const nextStepTime = lastStepTimeMs + stepLength
    Scheduling.atATime(() => dispatch(advanceSequence(nextStepTime)), nextStepTime)
  }
}

export function disarmSequencer () {
  return { type: 'SEQUENCER_DISARM' }
}

export function armSequencer () {
  return { type: 'SEQUENCER_ARM' }
}

export function realtimeStepRecord (trackId, { pitch, velocity }) {
  return (dispatch, getState) => {
    const { sequencer: { playing, lastStepTimeMs } } = getState()
    const beatTimeDelta = playing
      ? (Scheduling.nowMs() - lastStepTimeMs) / stepLengthMs(currentBpm(getState()))
      : 0
    const nextStepNumber = nextStepNumberForTrack(getState(), trackId)
    const stepNumber = Math.max(0, beatTimeDelta > 0.5
      ? nextStepNumber
      : currentStepNumberForTrack(getState(), trackId)
    )
    dispatch(turnStepOn(trackId, stepNumber, pitch, velocity))
    if (!playing) {
      dispatch(startSequence(0))
    } else if (stepNumber !== nextStepNumber) {
      // play if the step has been recorded for CURRENT step
      // do not play if its recorded on NEXT step (as sequencer will play it)
      dispatch(playVoiceForTrack(trackId, { pitch, velocity }))
    }
  }
}

export function deleteModeOn (trackId) {
  return { type: 'SEQUENCER_DELETE_MODE_ON', trackId}
}

export function deleteModeOff (trackId) {
  return { type: 'SEQUENCER_DELETE_MODE_OFF', trackId}
}

export function changeBpmBy (delta) {
  return (dispatch, getState) => dispatch({
    type: 'SEQUENCER_UPDATE_BPM',
    bpm: Math.max(20, Math.min(currentBpm(getState()) + delta, 300))
  })
}

export function changeSwingBy (delta) {
  return (dispatch, getState) => dispatch({
    type: 'SEQUENCER_UPDATE_SWING',
    swing: Math.max(0, Math.min(currentSwing(getState()) + delta, 50))
  })
}

export function changeNumberOfStepsTo (trackId, numberOfSteps) {
  return {
    type: 'TRACK_UPDATE_NUMBER_OF_STEPS',
    id: trackId,
    numberOfSteps
  }
}


export function muteTrack (trackId) {
  return {
    type: 'TRACK_MUTE_ON',
    id: trackId
  }
}

export function unmuteTrack (trackId) {
  return {
    type: 'TRACK_MUTE_OFF',
    id: trackId
  }
}
