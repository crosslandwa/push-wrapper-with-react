const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const Scheduling = require('wac.scheduling')(context)

import { playVoiceForTrack } from '../voices/actions'
import { currentBpm, currentPattern, currentVoice, currentStepNumberForTrack, nextStepNumberForTrack, stepIds, stepSelector, trackSelector, selectedStep } from '../selectors'

export function selectStep (stepId) {
  return { type: 'SEQUENCER_STEP_SELECT', stepId }
}

export function unselectStep (stepId) {
  return { type: 'SEQUENCER_STEP_UNSELECT', id: stepId }
}

export function turnStepOn (trackId, stepNumber, pitch, velocity) {
  return (dispatch, getState) => {
    const indexesLargestFirst = stepIds(getState()).map(id => id.split('-')[1])
      .map(Number).sort((a, b) => b - a)
    const id = `step-${indexesLargestFirst.length > 0 ? indexesLargestFirst[0] + 1 : 0}`
    dispatch({ type: 'STEP_TURN_ON', id, trackId, stepNumber, pitch, velocity })
    return id
  }
}

export function changeStepPitchBy(id, delta) {
  return (dispatch, getState) => dispatch(updateStepPitch(
    id,
    (stepSelector(getState(), id).midiPitch || currentVoice(getState()).pitch) + delta
  ))
}

export function changeStepVelocityBy(id, delta) {
  return (dispatch, getState) => dispatch({
    type: 'STEP_UPDATE_VELOCITY',
    id,
    velocity: Math.max(1, Math.min(stepSelector(getState(), id).midiVelocity + delta, 127))
  })
}

function updateStepPitch(id, pitch) {
  return {type: 'STEP_UPDATE_PITCH', id, pitch}
}

export function updateSelectedStepPitch(pitch) {
  return (dispatch, getState) => dispatch(updateStepPitch(selectedStep(getState()).id, pitch))
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

function advanceSequence (stepTimeMs) {
  return (dispatch, getState) => {
    const { sequencer: { nextStep, playing } } = getState()
    if (!playing) return
    dispatch({
      type: 'SEQUENCER_ADVANCE_STEP',
      currentStep: nextStep,
      nextStep: (nextStep + 1) % 32,
      nowMs: stepTimeMs || Scheduling.nowMs()
    })
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
    const { sequencer: { bpm, currentStep, deleteModeTrackIds, lastStepTimeMs } } = getState()
    currentPattern(getState()).trackIds.forEach((trackId, index) => {
      const track = trackSelector(getState(), trackId)
      const stepId = track.stepIds[currentStep]
      if (!stepId) return
      const step = stepSelector(getState(), stepId)
      dispatch(deleteModeTrackIds.includes(trackId)
        ? turnStepOff(stepId)
        : playVoiceForTrack(trackId, {
            pitch: step.midiPitch,
            velocity: step.midiVelocity
          })
      )
    })
    const nextStepTime = lastStepTimeMs + stepLengthMs(bpm)
    Scheduling.atATime(() => dispatch(advanceSequence(nextStepTime)), nextStepTime)
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
    const { sequencer: { playing, lastStepTimeMs } } = getState()
    const beatTimeDelta = playing
      ? (Scheduling.nowMs() - lastStepTimeMs) / stepLengthMs(currentBpm(getState()))
      : 0
    const stepNumber = beatTimeDelta > 0.5
      ? nextStepNumberForTrack(getState(), trackId)
      : currentStepNumberForTrack(getState(), trackId)
    dispatch(turnStepOn(trackId, Math.max(0, stepNumber), pitch, velocity))
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

export function changeBpmBy (delta) {
  return (dispatch, getState) => dispatch({
    type: 'SEQUENCER_UPDATE_BPM',
    bpm: Math.max(20, Math.min(currentBpm(getState()) + delta, 300))
  })
}
