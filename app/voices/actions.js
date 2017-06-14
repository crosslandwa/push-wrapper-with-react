import { sampleBuffer } from '../samples/actions'
import { currentPattern, sampleForTrack, voiceForTrack } from '../selectors'

const context = window.AudioContext ? new window.AudioContext() : new window.webkitAudioContext() // should this be a singleton
const PlayerFactory = require('wac.sample-player')(context)
let players = []

const midiGain = velocity => ({ toAbsolute: () => velocity / 127, velocity: () => velocity })

const midiNoteToF = note => 440.0 * Math.pow(2, (note - 69.0) / 12.0)
const middleCFreq = midiNoteToF(36)
const playbackRate = note => midiNoteToF(note) / middleCFreq

export function playVoiceForTrack (trackId, {pitch, velocity}) {
  return (dispatch, getState) => {
    const voice = voiceForTrack(getState(), trackId)
    const playerIndex = currentPattern(getState()).trackIds.indexOf(trackId)
    players[playerIndex]
      .updatePlaybackRate(playbackRate(pitch || voice.pitch))
      .play(midiGain(velocity))
  }
}

function voicePlaying (voiceId, gain) {
  return { type: 'VOICE_PLAYING', velocity: gain.velocity(), id: voiceId }
}

export function initialisePlayers () {
  const emptyBuffer = context.createBuffer(1, context.sampleRate / 1000, context.sampleRate)
  return (dispatch, getState) => {
    return Promise.all(
      [...Array(8).keys()].map(index => PlayerFactory.withBuffer(emptyBuffer))
    ).then(newPlayers => {
      players = newPlayers
      players.forEach((player, index) => {
        player.toMaster()
        player.on('started', gain => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, gain))
        })
        player.on('stopped', () => {
          const trackId = currentPattern(getState()).trackIds[index]
          const voiceId = voiceForTrack(getState(), trackId).id
          dispatch(voicePlaying(voiceId, { velocity: () => 0 }))
        })
      })
    })
  }
}

export function switchPlayerToTrack (trackId) {
  return (dispatch, getState) => {
    const index = currentPattern(getState()).trackIds.indexOf(trackId)
    const sample = sampleForTrack(getState(), trackId)
    players[index].setBuffer(sampleBuffer(sample.id))
  }
}

export function switchSample(trackId, sampleId) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_SWITCH_SAMPLE', voiceId, sampleId })
    dispatch(switchPlayerToTrack(trackId))
  }
}

export function updatePitch(trackId, delta) {
  return (dispatch, getState) => {
    const voiceId = voiceForTrack(getState(), trackId).id
    dispatch({ type: 'VOICE_UPDATE_PITCH', voiceId, delta })
  }
}
