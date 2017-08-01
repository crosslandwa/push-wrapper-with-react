import { currentVoice, modifiersDuplicateSelector, voicesForCurrentKit, voiceForTrack } from '../selectors'
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

export function switchSample(trackId, sampleId) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_SWITCH_SAMPLE', voiceId, sampleId })
  }
}

export function updatePitch (delta) {
  return (dispatch, getState) => {
    const state = getState()
    const voices = modifiersDuplicateSelector(state)
      ? voicesForCurrentKit(state)
      : [currentVoice(state)]
    return dispatch({
      type: 'VOICES_UPDATE_PITCH',
      ids: voices.map(voice => voice.id),
      pitches: voices.map(voice => clampBetween0And127(voice.pitch + delta))
    })
  }
}

export function updateDecay (delta) {
  return (dispatch, getState) => {
    const state = getState()
    const voices = modifiersDuplicateSelector(state)
      ? voicesForCurrentKit(state)
      : [currentVoice(state)]
    return dispatch({
      type: 'VOICES_UPDATE_DECAY',
      ids: voices.map(voice => voice.id),
      decays: voices.map(voice => clampBetween1And100(voice.decay + delta))
    })
  }
}

export function updateFilterFrequency (delta) {
  return (dispatch, getState) => {
    const state = getState()
    const voices = modifiersDuplicateSelector(state)
      ? voicesForCurrentKit(state)
      : [currentVoice(state)]
    return dispatch({
      type: 'VOICES_UPDATE_FILTER_FREQ',
      ids: voices.map(voice => voice.id),
      filterAmounts: voices.map(voice => clampBetween0And127(voice.filterAmount + delta))
    })
  }
}

export function updateVolume (delta) {
  return (dispatch, getState) => {
    const state = getState()
    const voices = modifiersDuplicateSelector(state)
      ? voicesForCurrentKit(state)
      : [currentVoice(state)]
    return dispatch({
      type: 'VOICES_UPDATE_VOLUME',
      ids: voices.map(voice => voice.id),
      midiVolumes: voices.map(voice => clampBetween0And127(delta + voice.midiVolume))
    })
  }
}
