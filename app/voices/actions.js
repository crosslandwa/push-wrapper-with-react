import { sampleBuffer } from '../samples/actions'
import { currentPattern, sampleForTrack, voiceForTrack } from '../selectors'
import Player from '../player'
import NonLinearScale from '../utils/nonLinearScale'
import midiVelocityToAbsolute from './midiVelocityToAbsolute'

let players = []

const clamp = (min, max) => x => Math.max(min, Math.min(x, max))
const clampBetween0And127 = clamp(0, 127)
const clampBetween0And100 = clamp(0, 100)
const clampBetween1And100 = clamp(1, 100)
const frequencyScaling = NonLinearScale(0, 100, 80, 20000, 1000)

const player = (state, trackId) => players[currentPattern(state).trackIds.indexOf(trackId)]

export function playVoiceForTrack (trackId, {pitch, velocity, stepTimeMs}) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    player(getState(), trackId).play({
      buffer: sampleBuffer(voice.sampleId),
      pitch: pitch || voice.pitch,
      velocity,
      decayPercent: voice.decay,
      filterFrequency: frequencyScaling(voice.filterAmount),
      stepTimeMs
    })
  }
}

function voicePlaying (voiceId, velocity) {
  return { type: 'VOICE_PLAYING', velocity, id: voiceId }
}

export function initialisePlayers () {
  return (dispatch, getState) => {
    return Promise.all(
      [...Array(8).keys()].map(index => new Player())
    ).then(newPlayers => {
      players = newPlayers
      players.forEach((player, index) => {
        player.onStarted(velocity => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, velocity))
        })
        player.onStopped(() => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, 0))
        })
      })
    })
  }
}

export function switchSample(trackId, sampleId) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_SWITCH_SAMPLE', voiceId, sampleId })
  }
}

export function updatePitch(trackId, delta) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    dispatch({
      type: 'VOICE_UPDATE_PITCH',
      id: voice.id,
      pitch: clampBetween0And127(voice.pitch + delta)
    })
  }
}

export function updateDecay(trackId, delta) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    dispatch({
      type: 'VOICE_UPDATE_DECAY',
      id: voice.id,
      decay: clampBetween1And100((voice.decay || 100) + delta)
    })
  }
}

export function updateFilterFrequency (trackId, delta) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    dispatch({
      type: 'VOICE_UPDATE_FILTER_F',
      id: voice.id,
      filterAmount: clampBetween0And100(delta + voice.filterAmount)
    })
  }
}

export function updateVolumeAction (trackId, delta) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    dispatch({
      type: 'VOICE_UPDATE_VOLUME',
      id: voice.id,
      midiVolume: clampBetween0And127(delta + voice.midiVolume)
    })
  }
}

export function updateVolume (trackId, midiVolume) {
  return (dispatch, getState) => {
    player(getState(), trackId).updateVolume(midiVelocityToAbsolute(midiVolume))
  }
}
