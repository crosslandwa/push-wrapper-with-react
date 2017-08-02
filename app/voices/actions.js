import { currentVoice, modifiersDuplicateSelector, voicesForCurrentKit, voiceForTrack } from '../selectors'
import { currentSample, sampleIds } from '../selectors'
import Player from '../player'
import midiVelocityToAbsolute from './midiVelocityToAbsolute'

const clamp = (min, max) => x => Math.max(min, Math.min(x, max))
const clampBetween0And127 = clamp(0, 127)
const clampBetween0And100 = clamp(0, 100)
const clampBetween1And100 = clamp(1, 100)

export function voicePlaying (trackId, velocity) {
  return (dispatch, getState) => {
    dispatch({ type: 'VOICE_PLAYING', velocity, id: voiceForTrack(getState(), trackId).id })
  }
}

export function switchSample (delta) {
  return (dispatch, getState) => {
    return dispatch(dispatchVoicesUpdate(
      'VOICES_SWITCH_SAMPLE',
      delta > 0
        ? function nextSample (voice) {
          const allSampleIds = sampleIds(getState())
          const index = allSampleIds.indexOf(voice.sampleId)
          return allSampleIds[(index + 1) % allSampleIds.length]
        }
        : function previousSample (voice) {
          const allSampleIds = sampleIds(getState())
          const index = allSampleIds.indexOf(voice.sampleId)
          return allSampleIds[index === 0 ? allSampleIds.length - 1 : index - 1]
        }
    ))
  }
}

function selectedVoiceOrCurrentKitVoices (getState) {
  const state = getState()
  return modifiersDuplicateSelector(state) ? voicesForCurrentKit(state) : [currentVoice(state)]
}

function dispatchVoicesUpdate (type, transform) {
  return (dispatch, getState) => {
    const voices = selectedVoiceOrCurrentKitVoices(getState)
    return dispatch({
      type,
      ids: voices.map(voice => voice.id),
      values: voices.map(transform)
    })
  }
}

function dispatchVoicesReset (type) {
  return (dispatch, getState) => {
    const voices = selectedVoiceOrCurrentKitVoices(getState)
    return dispatch({
      type,
      ids: voices.map(voice => voice.id)
    })
  }
}

export function resetPitch () {
  return dispatchVoicesReset('VOICES_RESET_PITCH')
}

export function updatePitch (delta) {
  return dispatchVoicesUpdate(
    'VOICES_UPDATE_PITCH',
    voice => clampBetween0And127(voice.pitch + delta)
  )
}

export function resetDecay () {
  return dispatchVoicesReset('VOICES_RESET_DECAY')
}

export function updateDecay (delta) {
  return dispatchVoicesUpdate(
    'VOICES_UPDATE_DECAY',
    voice => clampBetween1And100(voice.decay + delta)
  )
}

export function resetFilterFrequency () {
  return dispatchVoicesReset('VOICES_RESET_FILTER_FREQ')
}

export function updateFilterFrequency (delta) {
  return dispatchVoicesUpdate(
    'VOICES_UPDATE_FILTER_FREQ',
    voice => clampBetween0And127(voice.filterAmount + delta)
  )
}

export function resetVolume () {
  return dispatchVoicesReset('VOICES_RESET_VOLUME')
}

export function updateVolume (delta) {
  return dispatchVoicesUpdate(
    'VOICES_UPDATE_VOLUME',
    voice => clampBetween0And127(delta + voice.midiVolume)
  )
}
